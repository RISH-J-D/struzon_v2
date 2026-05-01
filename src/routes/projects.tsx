import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ExternalLink, Layers, Zap, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/lib/ContentContext";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Struzon Technologies " },
      { name: "description", content: "Explore Struzon's structural steel detailing projects in a clean, interactive environment." },
    ],
  }),
  component: ProjectsPage,
});

interface Project {
  id: string;
  title: string;
  tag: string;
  details: string;
  location: string;
  engineer: string;
  main_image: string;
  gallery: string[];
}

function ProjectsPage() {
  const { content } = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (
            image_url
          )
        `)
        .order('created_at', { ascending: false });

      if (data) {
        const formattedProjects = data.map((p: any) => ({
          ...p,
          gallery: p.project_images.map((img: any) => img.image_url)
        }));
        setProjects(formattedProjects);
      }
      setLoading(false);
    };

    fetchProjects();

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Global Portfolio"
        title={content.projects_hero_title || "Structural Excellence"}
        subtitle={content.projects_hero_subtitle || "Detailed with accuracy, engineered for reality. Explore our latest projects in an interactive schematic view."}
      />

      <section
        className="relative py-16 md:py-32 bg-white overflow-hidden min-h-screen flex flex-col items-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="blueprint-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-brand-red tracking-widest">Interactive Schematic</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-navy">Engineering Gallery</h2>
          </div>
          <div className="flex gap-4 text-[9px] md:text-[10px] font-bold text-navy/40 uppercase tracking-widest border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 w-full md:w-auto">
            <span>Ref: SEC-301</span>
            <span>•</span>
            <span>Model: 3D-LOD400</span>
          </div>
        </div>

        {loading ? (
          <div className="text-navy font-bold animate-pulse">Initializing Archive...</div>
        ) : (
          <motion.div
            style={!isMobile ? {
              perspective: "2000px",
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            } : {}}
            className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {projects.map((project, idx) => (
              <motion.div
                layoutId={`project-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedId(project.id)}
                onMouseEnter={() => !isMobile && setSelectedId(project.id)}
                onMouseLeave={() => !isMobile && !selectedId && setSelectedId(null)}
                className="relative aspect-[16/10] bg-slate-50 border border-slate-200 shadow-sm group cursor-pointer overflow-hidden transform-gpu transition-all duration-500 hover:shadow-2xl translate-z-0"
              >
                <div className="absolute inset-0 z-0 p-3 md:p-4">
                  <div className="relative w-full h-full overflow-hidden border border-slate-100">
                    <img
                      src={project.main_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="px-2 py-1 bg-navy text-white text-[8px] font-black uppercase tracking-tighter">
                    OBJ_{(idx + 1).toString().padStart(3, '0')}
                  </div>
                  <div className="px-2 py-1 bg-brand-red text-white text-[8px] font-black uppercase tracking-tighter">
                    {project.tag}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                      className="absolute inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:w-3/4 bg-white/95 backdrop-blur-md z-30 p-6 md:p-8 flex flex-col border-t-2 md:border-t-0 md:border-l-2 border-brand-red shadow-2xl h-auto md:h-full overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap size={14} className="text-brand-red" />
                            <span className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Detailed Analysis</span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} className="p-2 text-navy hover:text-brand-red transition-colors">
                            <X size={20} />
                          </button>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-navy uppercase leading-tight">{project.title}</h3>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">{project.details}</p>
                      </div>

                      {project.gallery && project.gallery.length > 0 && (
                        <div className="mt-8">
                          <span className="block text-[8px] md:text-[9px] uppercase font-bold text-slate-400 mb-4 tracking-[0.2em]">Sub Pictures / Gallery</span>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {project.gallery.map((img, i) => (
                              <div 
                                key={i} 
                                className="aspect-square bg-slate-100 overflow-hidden cursor-pointer border border-slate-200 hover:border-brand-red transition-colors"
                                onClick={() => setActiveGalleryImg(img)}
                              >
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4 md:space-y-6 mt-auto pt-8">
                        <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-slate-100">
                          <div>
                            <span className="block text-[8px] md:text-[9px] uppercase font-bold text-slate-400 mb-1">Location</span>
                            <span className="text-[10px] md:text-xs font-bold text-navy">{project.location}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] md:text-[9px] uppercase font-bold text-slate-400 mb-1">Lead</span>
                            <span className="text-[10px] md:text-xs font-bold text-navy">{project.engineer}</span>
                          </div>
                        </div>
                        <Link to="/contact" className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-navy text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-red transition-all">
                          Request Case Study <ExternalLink size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox for Gallery Images */}
        <AnimatePresence>
          {activeGalleryImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setActiveGalleryImg(null)}
            >
              <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={() => setActiveGalleryImg(null)}
              >
                <X size={32} />
              </button>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={activeGalleryImg} 
                className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 md:mt-24 text-center opacity-20 relative z-10 px-4">
          <div className="text-[12vw] md:text-[10vw] font-display font-black uppercase text-navy leading-none">Perspective</div>
          <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.5em] md:tracking-[1em] text-navy mt-4">Struzon Technical Archive</p>
        </div>
      </section>

      <section className="bg-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-display font-black uppercase tracking-tighter leading-[1.1] mb-8">Ready to Detail Your Vision?</h2>
          <p className="mt-4 text-sm md:text-base text-white/60 px-4">Partner with our engineers for high-precision 3D structural detailing and engineering services.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-brand-red px-8 md:px-10 py-3 md:py-4 font-display uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-brand-red-dark transition-all shadow-xl">
            Start a Project <Layers className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
