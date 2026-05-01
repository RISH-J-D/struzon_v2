import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgTekla from '@/assets/icons/tekla.png';
import imgSDS2 from '@/assets/icons/sds2.png';
import imgDraftSight from '@/assets/icons/draftsight-logo.png';
import imgBluebeam from '@/assets/icons/revu.png';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Tekla Structures', img: imgTekla },
  { name: 'SDS2 Modeling', img: imgSDS2 },
  { name: 'DraftSight', img: imgDraftSight },
  { name: 'Bluebeam Revu', img: imgBluebeam },
];

export default function LicensedPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-logo', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-8 pt-8 border-t border-navy/5 px-4 w-full">
      <div className="text-xl md:text-2xl uppercase tracking-[0.5em] text-brand-red font-black mb-8 text-center">Licensed Partners</div>

      <div className="flex flex-col md:flex-row flex-nowrap justify-center items-center gap-12 md:gap-16 lg:gap-24 overflow-x-hidden md:overflow-visible">
        {partners.map((p) => (
          <div key={p.name} className="partner-logo group flex flex-col items-center gap-4 flex-shrink-0">
            <div className="relative w-44 sm:w-52 lg:w-60 aspect-video flex items-center justify-center">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-contain transition-all duration-700 drop-shadow-xl group-hover:drop-shadow-2xl group-hover:scale-110"
              />
            </div>
            <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-navy/50 group-hover:text-brand-red transition-colors duration-500 text-center whitespace-nowrap">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
