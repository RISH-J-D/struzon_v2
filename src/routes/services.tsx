import { createFileRoute, Link } from "@tanstack/react-router";
import { useContent } from "@/lib/ContentContext";
import { PageShell } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";
import ServiceCardStack from "@/components/ServiceCardStack";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Struzon Technologies " },
      { name: "description", content: "Structural steel detailing, connection design & stamping, miscellaneous detailing and BIM services." },
      { property: "og:title", content: "Struzon Services" },
      { property: "og:description", content: "Steel detailing, connection design, BIM and engineering services." },
    ],
  }),
  component: Services,
});

function Services() {
  const { content } = useContent();

  return (
    <PageShell>
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-48 md:pb-24 lg:pt-56">
        <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-[30s]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80)" }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(43, 65, 95, 0.64)' }} />
        <div className="relative mx-auto max-w-7xl px-8 w-full flex flex-col items-start text-left">
          <h1 className="mt-3 text-white text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl whitespace-pre-line">
            {content.services_hero_title || 'Our Services'}
          </h1>
          <div className="mt-8 max-w-3xl border-l-4 border-brand-red pl-8 animate-in fade-in slide-in-from-left duration-1000 delay-300">
            <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed tracking-tight whitespace-pre-line">
              {content.services_hero_subtitle || 'Providing the technical backbone for North America\'s most ambitious structures through precision-driven steel detailing and BIM integration.'}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 min-h-screen">
        <ServiceCardStack />
      </section>

      <section className="py-20 md:py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1600&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative mx-auto max-w-4xl px-8 text-center z-10">
          <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-red font-black mb-6">Contact Us</div>
          <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-display font-black uppercase tracking-tighter leading-[1.1] mb-8">
            {content.services_cta_title || 'Ready to start your next project?'}
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed whitespace-pre-line">
            {content.services_cta_subtitle || 'Send us your drawings — a senior engineer will respond within one business day with a comprehensive quote.'}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red px-10 py-5 rounded-full font-display font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95 text-xs">
              Get a Quote <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/projects" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white bg-white/5 backdrop-blur-sm px-10 py-5 rounded-full font-display font-black uppercase tracking-widest text-white hover:bg-white hover:text-navy transition-all active:scale-95 text-xs">
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
