import { createFileRoute, Link } from "@tanstack/react-router";
import { useContent } from "@/lib/ContentContext";
import { PageShell } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AdvantageCarousel from "@/components/AdvantageCarousel";
import LicensedPartners from "@/components/LicensedPartners";
import CyberMap from "@/components/CyberMap";

// ASSETS
import heroImg from "@/assets/hero-image.png";
import homeVdo from "@/assets/home-vdo.mp4";
import p1Img from "@/assets/project-1.jpg";
import p2Img from "@/assets/project-2.jpg";
import p3Img from "@/assets/project-3.jpg";
import selP1 from "@/assets/struzon selected/p1.jpg";
import selP2 from "@/assets/struzon selected/p2.jpg";
import selP3 from "@/assets/struzon selected/p3.jpg";
import p4Img from "@/assets/project-4.jpg";
import p5Img from "@/assets/hero-steel.jpg";
import p6Img from "@/assets/blueprint.jpg";
import globalBgImage from "@/assets/Steel-Detailing-Standards-Across-The-Globe.jpg";

const imgHero = heroImg;
const vdoHome = homeVdo;
const imgP1 = p1Img;
const imgP2 = p2Img;
const imgP3 = p3Img;
const imgP4 = p4Img;
const imgP5 = p5Img;
const imgP6 = p6Img;

const highlightsGallery = [
  { text: "Precision Detailing", desc: "Engineered accuracy for complex structures.", image: imgP1 },
  { text: "BIM Coordination", desc: "Seamless collaboration across all major disciplines.", image: imgP2 },
  { text: "Rapid Turnaround", desc: "Meeting aggressive construction schedules worldwide.", image: imgP3 },
  { text: "Global Standards", desc: "Certified workflows for AISC, BS, IS, and Eurocodes.", image: imgP4 },
  { text: "Quality Assurance", desc: "Multi-stage automated and manual QC paradigms.", image: imgP5 },
  { text: "Innovation First", desc: "Pioneering the next era of steel fabrication data.", image: imgP6 }
];

const selectedProjects = [
  { name: "LEGACY HISTORY DOME", location: "CALIFORNIA", img: selP1 },
  { name: "CANADIAN TIRE EMERALD HILLS", location: "ALBERTA", img: selP2 },
  { name: "AVALON BREA PLACE", location: "CALIFORNIA", img: selP3 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Struzon Technologies  — Structural Steel Detailing & Engineering" },
      { name: "description", content: "World-class structural steel detailing, connection design, and BIM services for global fabricators and engineers." },
    ],
  }),
  component: Home,
});

function Home() {
  const { content } = useContent();

  return (
    <PageShell>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy/10 pt-20 md:pt-32 lg:pt-40">
        <video
          src={vdoHome}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-fill"
        />
        <div className="absolute inset-0 bg-navy/5" />

        <div className="relative mx-auto max-w-[1800px] px-6 w-full py-12 md:py-32 lg:py-40 z-10 flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-lg md:text-xl lg:text-[clamp(1rem,6vw,3rem)] uppercase tracking-tightest text-brand-red font-black mb-2 [text-shadow:0_0_15px_rgba(255,255,255,1)]">Struzon Technologies </div>
            <h1 className="text-white text-[clamp(2.2rem,6vw,4.5rem)] font-display font-black shadow-white uppercase tracking-tightest leading-[0.9] mb-6 whitespace-pre-line">
              {content.hero_title || 'Your Productivity Partner'}
            </h1>

            <p className="mt-4 md:mt-8 text-white text-base md:text-xl max-w-2xl leading-relaxed font-medium mb-8 md:mb-12 whitespace-pre-line">
              {content.hero_subtitle || 'A trusted partner to the construction industry — pioneers of structural detailing, engineering, design and research, delivering complex, time-sensitive projects worldwide.'}
            </p>

            <div className="flex flex-wrap justify-start gap-6 pt-4">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-red text-white px-10 py-5 font-display font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95 text-base">
                Get a Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 font-display font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95 text-base">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0 w-0 border-l-[28px] border-r-[28px] border-t-[22px] border-l-transparent border-r-transparent border-t-background z-20" />
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-8 grid gap-8 md:grid-cols-2 items-start">
          {/* LEFT COLUMN: QUALITY POLICY */}
          <div className="border-l-4 border-brand-red pl-6 hover:bg-slate-50 transition-colors p-8 rounded-r-lg group h-full">
            <h2 className="text-2xl md:text-3xl uppercase group-hover:text-brand-red font-black transition-colors mb-6">QUALITY POLICY</h2>
            <p className="text-navy/70 text-lg md:text-2xl leading-relaxed font-medium">
              Struzon is committed to delivering integrated engineering and structural solutions that meet applicable requirements with excellence in quality and innovation. We ensure on-time project delivery through effective planning, the provision of engineered solutions for complex projects, and customised project management. We enhance customer satisfaction by building strong partnerships grounded in trust and transparency, developing empowered personnel, and promoting ethical practices. We remain dedicated to the continual improvement of our Quality Management System and overall business performance.
            </p>
          </div>

          {/* RIGHT COLUMN: VISION & MISSION */}
          <div className="flex flex-col gap-8">
            <div className="border-l-4 border-brand-red pl-6 hover:bg-slate-50 transition-colors p-8 rounded-r-lg group">
              <h2 className="text-2xl md:text-3xl uppercase group-hover:text-brand-red font-black transition-colors mb-6">VISION</h2>
              <p className="text-navy/70 text-lg md:text-xl leading-relaxed font-medium">
                To be recognized as a pioneer in delivering integrated engineering and structural excellence through innovative design and transformative solutions that redefine industry standards, enhance global infrastructure, and build a sustainable, resilient future for generations to come.
              </p>
            </div>
            <div className="border-l-4 border-brand-red pl-6 hover:bg-slate-50 transition-colors p-8 rounded-r-lg group">
              <h2 className="text-2xl md:text-3xl uppercase group-hover:text-brand-red font-black transition-colors mb-6">MISSION</h2>
              <p className="text-navy/70 text-lg md:text-xl leading-relaxed font-medium">
                To deliver integrated engineering and construction solutions by leveraging advanced digital technologies with excellence in quality and innovation. We ensure projects are delivered on time, driven by empowered teams, strong client partnerships, and a commitment to sustainability, integrity, and continual technological advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-black mb-2">Struzon Technologies </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-navy uppercase tracking-tightest leading-none mb-8 whitespace-pre-line">
            {content.home_about_title || 'Who We Are'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 border-t border-navy/10 pt-8">
            <div className="space-y-6">
              <p className="text-navy text-lg md:text-xl leading-relaxed font-bold uppercase tracking-tight whitespace-pre-line">
                {content.home_about_text_1 || 'Struzon, a trusted structural steel detailing/engineering service partner to the construction industry — market pioneers of engineering, design, and research.'}
              </p>
              <p className="text-navy/70 text-base md:text-xl leading-relaxed font-medium whitespace-pre-line">
                {content.home_about_text_2 || 'Our work integrates with steel detailing, connection design/stamping for structural, miscellaneous detailing, and BIM (Building Information Modeling) services. We help with the structure, expansion, alteration, and revamp of new and existing constructions.'}
              </p>
              <p className="text-navy/70 text-base md:text-xl leading-relaxed font-medium whitespace-pre-line">
                {content.home_about_text_3 || 'Our team of fully qualified engineers has a wealth of experience in all aspects of structural design, detailing, and steelwork fabrication requirements. With an ongoing commitment to invest in our staff, we are well positioned to detail every project.'}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-navy/70 text-base md:text-xl leading-relaxed font-medium whitespace-pre-line">
                {content.home_about_text_4 || 'With our strong international presence in key sectors, Struzon drives the evolution of digital information modeling. Our brand is recognized as a global leader within the structural steel detailing industry.'}
              </p>
              <p className="text-navy/70 text-base md:text-xl leading-relaxed font-medium whitespace-pre-line">
                {content.home_about_text_5 || 'A diverse company with an outstanding reputation for detailing complex, time-sensitive projects while delivering superior quality and a cost-effective solution.'}
              </p>
              <p className="text-navy/70 text-base md:text-xl leading-relaxed font-medium whitespace-pre-line">
                {content.home_about_text_6 || 'We have been increasing current standards in the matter of transmission of impeccable building structures. Our simple, and very solid administrations have figured out how to win numerous hearts.'}
              </p>
            </div>
          </div>

          <LicensedPartners />
        </div>
      </section>

      <section className="py-16 bg-muted overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-black mb-3">Precision First</div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-navy uppercase tracking-tighter">
              {content.home_why_choose_title || 'Why Choose Struzon'}
            </h2>
          </div>
          <div className="relative w-full">
            <AdvantageCarousel items={highlightsGallery} />
          </div>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      <CyberMap />

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-black">Portfolio</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display font-black uppercase text-navy tracking-tight">Selected Work</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-display uppercase text-xs tracking-widest hover:bg-brand-red transition-all">
              Explore All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((project, i) => (
              <Link key={i} to="/projects" className="group block overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow rounded-sm transition-all hover:-translate-y-2 duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.img} alt={project.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] uppercase tracking-widest text-brand-red font-black mb-2">Structural Case Study</div>
                  <h3 className="text-xl font-display font-black uppercase text-navy group-hover:text-brand-red transition-colors leading-tight">{project.name}</h3>
                  <div className="text-sm font-bold uppercase tracking-widest text-navy/60 mt-2">{project.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale bg-cover bg-[75%_center] bg-no-repeat scale-110" style={{ backgroundImage: `url(${globalBgImage})` }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-brand-red font-black mb-6">Ready to Build?</div>
          <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-display font-black uppercase tracking-tighter leading-[1.1] mb-8 whitespace-pre-line">
            {content.footer_cta_title || 'Seeking a better\ndetailing solution?'}
          </h2>
          <p className="mt-4 text-sm md:text-lg text-white/70 max-w-xl mx-auto font-medium whitespace-pre-line">
            {content.footer_cta_subtitle || 'Contact the experts at Struzon to explore how we can help you deliver your next project on schedule, with quality and absolute efficiency.'}
          </p>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-2 bg-brand-red px-10 lg:px-12 py-5 lg:py-6 rounded-full text-white font-display font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95 text-xs sm:text-sm lg:text-base">
            Let's Talk <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
