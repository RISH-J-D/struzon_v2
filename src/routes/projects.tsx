import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import { ExternalLink, Layers, Zap, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/lib/ContentContext";
import { ImageAutoSlider } from "./image-auto-slider";

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
  gallery?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIMIZED IMAGE COMPONENT (Website Only)
// ─────────────────────────────────────────────────────────────────────────────
const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // If it's a Supabase URL, we could technically transform it here, 
  // but for now we'll focus on smooth rendering transitions.
  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        loading="lazy"
      />
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-300" />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MEMOIZED PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
const ProjectCard = memo(({ project, idx, isMobile, isSelected, onSelect, onImageSelect }: { project: Project; idx: number; isMobile: boolean; isSelected: boolean; onSelect: (id: string | null) => void; onImageSelect: (url: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onClick={() => isMobile ? onSelect(isSelected ? null : project.id) : undefined}
      onMouseEnter={() => !isMobile && onSelect(project.id)}
      onMouseLeave={() => !isMobile && onSelect(null)}
      className="relative aspect-square md:aspect-[4/3] bg-white border border-slate-200 shadow-sm group cursor-pointer overflow-hidden transform-gpu transition-all duration-300 hover:shadow-xl"
    >
      <div className="absolute inset-0 z-0 p-3 md:p-4">
        <OptimizedImage 
          src={project.main_image} 
          alt={project.title} 
          className="w-full h-full border border-slate-100"
        />
      </div>

      <div className="absolute top-4 left-4 z-20 flex gap-2 transition-opacity duration-300" style={{ opacity: isSelected ? 0 : 1 }}>
        <div className="px-2 py-1 bg-navy text-white text-[8px] font-black uppercase tracking-tighter shadow-sm">
          OBJ_{(idx + 1).toString().padStart(3, '0')}
        </div>
        <div className="px-2 py-1 bg-brand-red text-white text-[8px] font-black uppercase tracking-tighter shadow-sm">
          {project.tag}
        </div>
      </div>
      
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-30 bg-navy/95 backdrop-blur-md p-5 flex flex-col text-white"
          >
             <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-brand-red" />
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Technical View</span>
                  </div>
                  {isMobile && (
                    <button onClick={(e) => { e.stopPropagation(); onSelect(null); }} className="text-white/60 hover:text-white">
                      <X size={18} />
                    </button>
                  )}
                </div>
                
                <h3 className="text-lg md:text-xl font-display font-bold uppercase leading-tight mb-2">{project.title}</h3>
                <p className="text-[11px] md:text-xs text-white/80 leading-relaxed mb-4 font-sans">{project.details}</p>
                
                {(!project.gallery || project.gallery.length === 0) ? (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 animate-pulse uppercase tracking-widest mb-4">
                    <Layers size={14} /> Loading Assets...
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="block text-[9px] uppercase font-bold text-white/40 mb-2 tracking-widest">Gallery Assets</span>
                    <div className="grid grid-cols-3 gap-2">
                      {project.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-white/5 overflow-hidden cursor-pointer border border-white/10 hover:border-brand-red transition-all"
                          onClick={(e) => { e.stopPropagation(); onImageSelect(img); }}
                        >
                          <OptimizedImage src={img} alt="" className="w-full h-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>

             <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 shrink-0">
               <div>
                 <span className="block text-[8px] uppercase font-bold text-white/40 mb-1 tracking-wider">Project Site</span>
                 <span className="text-[10px] font-bold text-white leading-tight block">{project.location}</span>
               </div>
               <div>
                 <span className="block text-[8px] uppercase font-bold text-white/40 mb-1 tracking-wider">Engineering Lead</span>
                 <span className="text-[10px] font-bold text-white leading-tight block">{project.engineer}</span>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isSelected && (
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300 pointer-events-none z-10" />
      )}
    </motion.div>
  );
});

function ProjectsPage() {
  const { content } = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('id, title, tag, details, location, engineer, main_image')
      .order('created_at', { ascending: false });

    if (data) {
      setProjects(data.map(p => ({ ...p, gallery: [] })));
    }
    setLoading(false);
  };

  const fetchGallery = async (id: string) => {
    const { data } = await supabase
      .from('project_images')
      .select('image_url')
      .eq('project_id', id);
    
    if (data) {
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...p, gallery: data.map(img => img.image_url) } : p
      ));
    }
  };

  useEffect(() => {
    fetchProjects();
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (selectedId) {
      const p = projects.find(proj => proj.id === selectedId);
      if (p && (!p.gallery || p.gallery.length === 0)) {
        fetchGallery(selectedId);
      }
    }
  }, [selectedId]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

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
        onMouseLeave={() => { x.set(0); y.set(0); }}
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

        <div className="relative z-10 w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative aspect-[16/10] bg-slate-50 border border-slate-200 animate-pulse">
                  <div className="absolute inset-0 p-4">
                    <div className="w-full h-full bg-slate-200 rounded-sm" />
                  </div>
                </div>
              ))
            ) : (
              <motion.div
                style={!isMobile ? { perspective: "2000px", rotateX, rotateY, transformStyle: "preserve-3d", display: 'contents' } : { display: 'contents' }}
              >
                {projects.map((project, idx) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    idx={idx} 
                    isMobile={isMobile} 
                    isSelected={selectedId === project.id}
                    onSelect={setSelectedId}
                    onImageSelect={setActiveGalleryImg}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

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
              <button className="absolute top-8 right-8 text-white hover:text-brand-red transition-colors" onClick={() => setActiveGalleryImg(null)}>
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                src={activeGalleryImg}
                className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ImageAutoSlider />
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

export default ProjectsPage;
