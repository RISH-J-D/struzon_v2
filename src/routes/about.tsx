import { createFileRoute } from "@tanstack/react-router";
import { useContent } from "@/lib/ContentContext";
import { PageShell, PageHero } from "@/components/PageShell";
import { ShieldCheck, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Masonry from "@/components/OfficeGallery";

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
  return (
    <div className="relative w-full max-w-lg mx-auto py-20 font-display">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 z-10 flex flex-col items-center">
        <motion.div
          animate={{ top: ["100%", "-20%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-40 bg-white/30 blur-2xl z-40"
        />
        <motion.div
          animate={{ boxShadow: ["0 0 0px rgba(199,31,36,0)", "0 0 20px rgba(199,31,36,0.4)", "0 0 0px rgba(199,31,36,0)"] }}
          whileHover={{ scale: 1.15, boxShadow: "0 0 40px rgba(199,31,36,0.6)", zIndex: 100 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: "#c71f24" }}
          className="relative w-28 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-2xl z-50 mb-0 -ml-1 cursor-pointer transition-shadow"
        >
          2026
        </motion.div>
        <div className="flex flex-col flex-1 w-full mt-[2px]">
          {[...timelineData].reverse().slice(1).map((item, i) => (
            <div key={item.year} className="relative flex-1 min-h-[120px] w-full flex flex-col items-center">
              <div
                className="w-full flex-1"
                style={{
                  background: `linear-gradient(to bottom, ${timelineData[timelineData.length - 1 - i].color}, ${item.color})`,
                  clipPath: 'polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                  marginTop: '-12px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-20 flex flex-col-reverse w-full">
        {timelineData.map((item, i) => {
          if (item.year === "2026") return null;
          const isLeft = i % 2 !== 0;

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{
                scale: 1.08,
                x: isLeft ? -15 : 15,
                zIndex: 50,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`flex items-center w-full min-h-[120px] cursor-pointer ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-1/2 flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                    filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: i * 0.3
                  }}
                  className={`flex items-center px-1 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className="w-4 h-8 -mx-0.5 shadow-2xl"
                    style={{
                      backgroundColor: item.color,
                      opacity: 0.9,
                      clipPath: isLeft ? 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)' : 'polygon(100% 0, 0 20%, 0 80%, 100% 100%)'
                    }}
                  />
                  <div
                    className="px-6 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-30 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-white font-black text-2xl tracking-tighter">{item.year}</span>
                  </div>
                  <div className={`px-4 max-w-[200px] md:max-w-[220px] ${isLeft ? 'md:text-right text-left' : 'text-left'}`}>
                    <h4 className="font-black text-navy uppercase text-xs md:text-sm leading-tight mb-1 group-hover:text-brand-red transition-colors">{item.title}</h4>
                    {item.desc && (
                      <p className="text-[10px] font-bold text-brand-red opacity-90 leading-tight">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function About() {
  const { content } = useContent();

  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title={content.about_hero_title || "We Build What You Envision"}
        subtitle={content.about_hero_subtitle || "A global leader in structural steel detailing, connection design, and engineering excellence."}
      />
      <section className="py-20 md:py-32 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-12">
              <div className="text-[50px] uppercase tracking-[0.1em] text-brand-red font-black mb-10">Who We Are</div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-navy uppercase tracking-tightest leading-[1.2] mb-12 whitespace-pre-line">
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
                        Transforming Visions into Reality
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
              items={officeGalleryItems}
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
