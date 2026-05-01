import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { useContent } from "@/lib/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// ASSETS
import imgWorkplace from "@/assets/blueprint.jpg";
import imgRajadurai from "@/assets/rajadurai.png";
import imgBalasaravana from "@/assets/balasaravanan.png";
import imgSaravanan from "@/assets/saravanan.png";
import imgAnand from "@/assets/anand.png";
import imgAlan from "@/assets/alan.png";

const localImages: Record<string, string> = {
  "Rajadurai": imgRajadurai,
  "Balasaravana": imgBalasaravana,
  "Saravanan": imgSaravanan,
  "Anand": imgAnand,
  "Alan (P.E)": imgAlan
};

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Struzon Technologies " },
      { name: "description", content: "Meet the leadership team at Struzon — experienced structural engineers and industry leaders." },
    ],
  }),
  component: TeamPage,
});

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  image_url: string;
  bio: string[];
}

function TeamPage() {
  const { content } = useContent();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [notchPosition, setNotchPosition] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
      if (data) setMembers(data);
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (activeIndex !== null && cardRefs.current[activeIndex]) {
      const card = cardRefs.current[activeIndex];
      if (card) {
        const rect = card.getBoundingClientRect();
        const parentRect = card.parentElement?.getBoundingClientRect();
        if (parentRect) {
          setNotchPosition(rect.left - parentRect.left + rect.width / 2);
        }
      }
    }
  }, [activeIndex]);

  const handleInteraction = (idx: number | null) => {
    setActiveIndex(idx);
    if (idx !== null && window.innerWidth < 1024) {
      setTimeout(() => {
        cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const BioContent = ({ member, onClose }: { member: TeamMember, onClose?: () => void }) => (
    <div className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-8 md:w-12 bg-brand-red" />
          <h4 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
            {member.name} — {member.role}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            {member.bio.slice(0, Math.ceil(member.bio.length / 2)).map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-white/80 font-sans">
                {para}
              </p>
            ))}
          </div>
          <div className="space-y-4">
            {member.bio.slice(Math.ceil(member.bio.length / 2)).map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-white/80 font-sans md:border-l md:border-white/10 md:pl-6">
                {para}
              </p>
            ))}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-8 w-full py-3 border border-white/20 text-[10px] uppercase font-bold tracking-widest md:hidden"
          >
            Close Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Management"
        title={content.team_hero_title || "The Visionaries"}
        subtitle={content.team_hero_subtitle || "Meet the leadership team driving Struzon's global presence and engineering excellence."}
      />
      <section className="py-16 md:py-32 bg-white flex flex-col items-center overflow-hidden">
        <div
          className="mx-auto max-w-7xl px-6 w-full relative"
          onMouseLeave={() => window.innerWidth >= 1024 && setActiveIndex(null)}
        >
          <div className="flex lg:grid lg:grid-cols-5 gap-6 lg:gap-4 items-stretch relative z-10 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 scrollbar-hide snap-x snap-mandatory px-6 lg:px-0">
            {members.map((member, idx) => (
              <div
                key={member.name}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onMouseEnter={() => window.innerWidth >= 1024 && handleInteraction(idx)}
                onClick={() => handleInteraction(activeIndex === idx ? null : idx)}
                className={`flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-center flex flex-col bg-white border border-border/50 shadow-sm transition-all duration-300 overflow-hidden group cursor-pointer ${activeIndex === idx ? 'shadow-xl border-brand-red/30 -translate-y-1' : 'hover:shadow-lg hover:-translate-y-1'}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={member.image_url || localImages[member.name]}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (localImages[member.name]) {
                        target.src = localImages[member.name];
                      }
                    }}
                  />
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-brand-red transition-transform duration-300 ${activeIndex === idx ? 'scale-x-100' : 'scale-x-0'}`} />
                </div>
                <div className="p-5 bg-white text-center flex flex-col items-center flex-grow justify-between">
                  <div>
                    <h3 className={`font-display text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-navy leading-tight transition-colors ${activeIndex === idx ? 'text-brand-red' : 'group-hover:text-brand-red'}`}>
                      {member.name}
                    </h3>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-brand-red mt-1 mb-4">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-6 border-t border-border/50 pt-5 w-full text-navy/60">
                    <a href={`mailto:${member.email}`} className="hover:text-brand-red transition-all flex items-center gap-2 transform hover:scale-110" title="Email">
                      <Mail size={18} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-all flex items-center gap-2 transform hover:scale-110" title="LinkedIn">
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8 md:mt-12">
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="relative bg-navy text-white overflow-hidden shadow-2xl rounded-2xl md:rounded-[3rem]"
                >
                  <div className="hidden lg:block">
                    <motion.div
                      initial={false}
                      animate={{ left: notchPosition }}
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                      className="absolute -top-3 h-0 w-0 border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-navy -translate-x-1/2"
                    />
                  </div>
                  <BioContent member={members[activeIndex]} onClose={() => setActiveIndex(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
      <motion.section layout className="relative bg-navy text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale" style={{ backgroundImage: `url(${imgWorkplace})` }} />
        <div className="relative mx-auto max-w-4xl px-8 text-center z-10">
          <h2 className="text-white text-[clamp(1.5rem,6vw,4rem)] font-display font-black uppercase tracking-tighter leading-[1.1] mb-8">
            {content.team_cta_title || 'Want to work with our experts?'}
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto font-medium whitespace-pre-line">
            {content.team_cta_subtitle || "Our leadership team ensures every project meets Struzon's high standards of accuracy and efficiency."}
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-brand-red px-10 py-5 rounded-full font-display uppercase tracking-widest text-xs font-black hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95">
            Contact Us <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.section>
    </PageShell>
  );
}
