import { createFileRoute } from "@tanstack/react-router";
import { useContent } from "@/lib/ContentContext";
import { PageShell, PageHero } from "@/components/PageShell";
import { ShieldCheck, Zap, Target, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Masonry from "@/components/OfficeGallery";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, useRef } from "react";

// ASSETS
import imgP1 from "@/assets/project-1.jpg";
import imgP2 from "@/assets/project-2.jpg";
import imgP3 from "@/assets/project-3.jpg";
import imgP4 from "@/assets/project-4.jpg";
import imgBlueprint from "@/assets/blueprint.jpg";
import imgHeroSteel from "@/assets/hero-steel.jpg";
import v1 from "@/assets/struzon selected/v1.jpg";
import v2 from "@/assets/struzon selected/v2.jpg";
import v3 from "@/assets/struzon selected/v3.jpg";

// OFFICE GALLERY ASSETS
import office1 from "@/assets/office_gallery/1.jpeg";
import office2 from "@/assets/office_gallery/2.jpeg";
import office3 from "@/assets/office_gallery/3.jpeg";
import office4 from "@/assets/office_gallery/4.jpeg";
import office5 from "@/assets/office_gallery/5.jpeg";
import office6 from "@/assets/office_gallery/6.jpeg";
import office7 from "@/assets/office_gallery/7.jpeg";
import office8 from "@/assets/office_gallery/8.jpeg";
import office9 from "@/assets/office_gallery/9.jpeg";
import office10 from "@/assets/office_gallery/10.jpeg";
import office11 from "@/assets/office_gallery/11.jpeg";
import office12 from "@/assets/office_gallery/12.jpeg";
import office13 from "@/assets/office_gallery/13.jpeg";
import office14 from "@/assets/office_gallery/14.jpeg";
import office15 from "@/assets/office_gallery/15.jpeg";
import office16 from "@/assets/office_gallery/16.jpeg";
import office17 from "@/assets/office_gallery/17.jpeg";
import office18 from "@/assets/office_gallery/18.jpeg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Struzon Technologies " },
      { name: "description", content: "Struzon is a trusted structural steel detailing partner — founded by experienced engineers, serving global construction." },
      { property: "og:title", content: "About Struzon" },
      { property: "og:description", content: "Pioneers of structural detailing and BIM, serving the construction industry worldwide." },
    ],
  }),
  component: About,
});

const timelineData = [
  { year: "2017", title: "Founded in 2017", desc: "Started with a team of 4 seasoned steel detailing engineers with a vision to script the success story of steel structures in North America", color: "#02224b" },
  { year: "2018", title: "Adapt to survive", desc: "4 members evolved into 4 teams", color: "#182247" },
  { year: "2019", title: "Embrace evolution", desc: "More workstations. More projects. More value for our partners", color: "#2e2243" },
  { year: "2020", title: "Change is inevitable", desc: "Survived Pandemic, services and quality unaffected", color: "#44213f" },
  { year: "2021", title: "Enable Excellence", desc: "Excellence emerged to balance the tight schedules", color: "#5a213b" },
  { year: "2022", title: "Bold Outcomes", desc: "Clients increased, quality uncompromised", color: "#702137" },
  { year: "2023", title: "Expertise with Integrity", desc: "Added SDS2 to tailor steel construction requirements", color: "#862133" },
  { year: "2024", title: "Growth by Quality", desc: "Production Capacity 4000T per month 100+ Engineers", color: "#9c202f" },
  { year: "2025", title: "Same Service, Own Premises", desc: "Production Capacity 5000T to 8000T per month 150+ Engineers", color: "#b2202a" },
  { year: "2026", title: "Transforming Visions into Reality", desc: "", color: "#c71f24" },
];

const officeGalleryItems = [
  { id: "1", img: office1, url: "#", height: 600 },
  { id: "2", img: office2, url: "#", height: 400 },
  { id: "3", img: office3, url: "#", height: 800 },
  { id: "4", img: office4, url: "#", height: 500 },
  { id: "5", img: office5, url: "#", height: 700 },
  { id: "6", img: office6, url: "#", height: 450 },
  { id: "7", img: office7, url: "#", height: 650 },
  { id: "8", img: office8, url: "#", height: 550 },
  { id: "9", img: office9, url: "#", height: 750 },
  { id: "10", img: office10, url: "#", height: 400 },
  { id: "11", img: office11, url: "#", height: 600 },
  { id: "12", img: office12, url: "#", height: 500 },
  { id: "13", img: office13, url: "#", height: 700 },
  { id: "14", img: office14, url: "#", height: 450 },
  { id: "15", img: office15, url: "#", height: 850 },
  { id: "16", img: office16, url: "#", height: 550 },
  { id: "17", img: office17, url: "#", height: 600 },
  { id: "18", img: office18, url: "#", height: 400 },
];

function SuccessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasCompletedFirstCycle, setHasCompletedFirstCycle] = useState(false);
  const totalItems = timelineData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === totalItems - 1) {
          setHasCompletedFirstCycle(true);
        }
        return (prev + 1) % totalItems;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [totalItems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto font-display flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full relative z-20"
      >
        {/* Central Path Background */}
        <div className="absolute top-[28px] bottom-[28px] left-1/2 -translate-x-1/2 w-1 bg-navy/10 z-0" />

        {/* Progress Growth Line */}
        <motion.div
          animate={{
            height: hasCompletedFirstCycle ? '100%' : `${(activeIndex / (totalItems - 1)) * 100}%`
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-1 bg-gradient-to-t from-navy via-brand-red to-brand-red z-10 origin-bottom"
        />

        {/* Traveling Glow Particle */}
        <motion.div
          animate={{
            bottom: `calc(${(activeIndex / (totalItems - 1)) * 100}% + 28px)`
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-red rounded-full shadow-[0_0_20px_rgba(199,31,36,1)] z-20 -mb-2"
        />

        {[...timelineData].reverse().map((item, i) => {
          // Since we reversed the data for display (2026 at top), 
          // we need to map the activeIndex (0=2017) to the reversed index.
          const actualDataIndex = (totalItems - 1) - i;
          const isRevealed = hasCompletedFirstCycle || activeIndex >= actualDataIndex;
          const isCurrentlyPopping = activeIndex === actualDataIndex;

          const isLeft = i % 2 !== 0;

          return (
            <div key={item.year} className="relative flex flex-col items-center w-full mb-20 md:mb-24 last:mb-0">
              {/* Year Block & Content Container */}
              <div className="relative w-full flex items-center justify-center min-h-[100px]">
                {/* Year Badge */}
                <motion.div
                  animate={{
                    scale: isCurrentlyPopping ? 1.15 : (isRevealed ? 1 : 0.9),
                    opacity: isRevealed ? 1 : 0.4,
                  }}
                  className="z-30 relative group cursor-pointer"
                >
                  <div
                    className="w-32 h-14 flex items-center justify-center text-white font-black text-2xl shadow-xl relative transition-colors duration-500"
                    style={{ backgroundColor: isRevealed ? item.color : '#e2e8f0' }}
                  >
                    {item.year}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[64px] border-r-[64px] border-t-[10px] border-l-transparent border-r-transparent z-40"
                      style={{ borderTopColor: isRevealed ? item.color : '#e2e8f0' }}
                    />
                  </div>
                </motion.div>

                {/* Description Content (Desktop) */}
                <div className={`absolute top-0 bottom-0 w-full flex items-center pointer-events-none ${isLeft ? 'justify-start md:justify-start' : 'justify-end md:justify-end'}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0,
                      scale: isCurrentlyPopping ? 1.1 : 1,
                      y: isCurrentlyPopping ? -5 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    className={`max-w-[180px] sm:max-w-[240px] md:max-w-[280px] pointer-events-auto px-4 
                      ${isLeft
                        ? 'text-right pr-32 md:pr-40 left-0 right-auto md:relative'
                        : 'text-left pl-32 md:pl-40 right-0 left-auto md:relative'
                      }
                      hidden md:block transition-all duration-300
                    `}
                  >
                    <h4 className={`font-black uppercase text-xs md:text-base leading-tight mb-1 transition-colors ${isCurrentlyPopping ? 'text-brand-red' : 'text-navy'}`}>
                      {item.title}
                    </h4>
                    {item.desc && (
                      <p className={`text-[10px] md:text-[11px] font-bold leading-relaxed uppercase tracking-tight transition-colors ${isCurrentlyPopping ? 'text-brand-red' : 'text-brand-red/60'}`}>
                        {item.desc}
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Mobile Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isCurrentlyPopping ? -5 : (isRevealed ? 0 : 10),
                  scale: isCurrentlyPopping ? 1.05 : 1
                }}
                className="md:hidden w-full px-6 py-4 text-center"
              >
                <h4 className={`font-black uppercase text-sm leading-tight mb-2 transition-colors ${isCurrentlyPopping ? 'text-brand-red' : 'text-navy'}`}>
                  {item.title}
                </h4>
                {item.desc && (
                  <p className={`text-[11px] font-bold leading-relaxed uppercase tracking-tight transition-colors ${isCurrentlyPopping ? 'text-brand-red' : 'text-brand-red/60'}`}>
                    {item.desc}
                  </p>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Decorative Glow Particle */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-red/10 blur-[100px] pointer-events-none"
      />
    </div>
  );
}

function About() {
  const { content } = useContent();
  const [galleryItems, setGalleryItems] = useState(officeGalleryItems);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from('galleries')
        .select('*')
        .eq('gallery_name', 'OfficeGallery')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const formatted = data.map(item => ({
          id: item.id,
          img: item.image_url,
          url: "#",
          height: [400, 500, 600, 700, 800][Math.floor(Math.random() * 5)]
        }));
        setGalleryItems(formatted);
      }
    };
    fetchGallery();
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title={content.about_hero_title || "We Build What You Envision"}
        subtitle={content.about_hero_subtitle || "A global leader in structural steel detailing, connection design, and engineering excellence."}
      />
      <section className="py-15 md:py-30 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-12">
              <div className="text-3xl md:text-[50px] uppercase tracking-[0.1em] text-brand-red font-black mb-6 md:mb-10">Who We Are</div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-navy uppercase tracking-tightest leading-[1.2] mb-8 md:mb-12 whitespace-pre-line">
                {content.about_who_title || 'Specialized Detailing\nExcellence'}
              </h2>
              <div className="grid lg:grid-cols-12 gap-x-16 gap-y-20 items-start">
                <div className="lg:col-span-7">
                  <div className="space-y-10 text-navy/70 text-lg md:text-2xl leading-relaxed font-medium mb-16 max-w-4xl">
                    <p className="whitespace-pre-line">
                      {content.about_who_text_1 || 'We are a team of highly qualified engineers and detailers specializing in Structural Steel Detailing, Connection Design, Piping Detailing, and Miscellaneous Steel Detailing, including stairs, ladders, and handrails. We also deliver expertise in specialty metal works such as aluminum and stainless steel, positioning us as a prominent service provider for clients across the US, Canada, and India.'}
                    </p>
                    <p>
                      We are driven by a commitment to excellence, consistently meeting and exceeding customer expectations. Our focus on delivering high-quality project outcomes, combined with fast turnaround times and exceptional accuracy, has made Struzon a trusted choice for fabricators and industry professionals.
                    </p>
                    <p>
                      Our strength lies in our ability to identify the core of any project challenge and provide practical, reliable solutions. We are committed to being a dependable partner in the construction industry by delivering accurate, timely, and cost-effective structural services. Simply put, we bring your steel structures to life—guided by our belief: <span className="text-navy font-extrabold italic">“We build what you envision.”</span>
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 border-t-4 border-brand-red shadow-xl rounded-sm">
                      <ShieldCheck className="h-8 w-8 text-brand-red mb-6" />
                      <h3 className="text-lg font-display font-black uppercase text-navy mb-4">Balanced Growth</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ethical foundation, positive thinking, and social responsibility guide our consistent precision.
                      </p>
                    </div>
                    <div className="bg-white p-6 border-t-4 border-navy shadow-xl rounded-sm">
                      <Target className="h-8 w-8 text-navy mb-6" />
                      <h3 className="text-lg font-display font-black uppercase text-navy mb-4">Standardized Practice</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Excellence through disciplined approach of thorough checking and counter-checking.
                      </p>
                    </div>
                    <div className="bg-white p-6 border-t-4 border-brand-red shadow-xl rounded-sm">
                      <TrendingUp className="h-8 w-8 text-brand-red mb-6" />
                      <h3 className="text-lg font-display font-black uppercase text-navy mb-4">Global Standards</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Well-versed in international standards including <span className="text-brand-red font-bold">OSHA, AISC, CISC, and Eurocodes.</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-12 p-10 bg-navy text-white rounded-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 z-10">
                      <h3 className="text-xl text-white font-display font-black uppercase mb-3 tracking-wider">Peace of Mind Partnership</h3>
                      <p className="text-white/70 text-lg leading-relaxed">
                        We eliminate communication barriers with round-the-clock support, ensuring seamless collaboration regardless of time zones.
                      </p>
                    </div>
                    <Zap className="h-12 w-12 text-brand-red relative z-10" />
                  </div>
                </div>
                <div className="lg:col-span-5 h-full relative">
                  <div className="sticky top-50">
                    <div className="absolute top-0 left-0 right-0 p-2 -translate-y-full opacity-60 text-center">
                      <p className="text-xs font-display font-black uppercase mb-3 tracking-wider text-navy">
                      </p>
                    </div>
                    <SuccessTimeline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-navy uppercase tracking-tighter">
              {content.about_success_title || 'Visualizing Success'}
            </h2>
            <div className="mt-6 h-2 w-32 bg-brand-red mx-auto shadow-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:h-[500px]">
            <div className="relative group overflow-hidden bg-background shadow-2xl h-64 md:h-full">
              <img src={content.about_v1 || v1} alt="Engineering" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="relative group overflow-hidden bg-background shadow-2xl h-64 md:h-full">
              <img src={content.about_v2 || v2} alt="Steel" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="relative group overflow-hidden bg-background shadow-2xl h-64 md:h-full">
              <img src={content.about_v3 || v3} alt="BIM" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-full px-6">
          <div className="flex flex-col items-center text-center gap-6 mb-16 max-w-4xl mx-auto">
            <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-black">Our Environment</div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-navy uppercase tracking-tightest leading-none">
              {content.about_gallery_title || 'Office Gallery'}
            </h2>
            <p className="mt-6 text-navy/60 text-lg font-medium leading-relaxed whitespace-pre-line">
              {content.about_gallery_subtitle || 'Step inside our precision-driven workspace where structural visions come to life through advanced technology and engineering excellence.'}
            </p>
          </div>

          <div className="relative w-full overflow-visible">
            <Masonry
              items={galleryItems}
              duration={0.8}
              scaleOnHover={true}
              hoverScale={0.97}
              blurToFocus={true}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
