import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/lib/ContentContext';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

// ── Data ────────────────────────────────────────────────────────────────────
// Geographic Coordinates [Longitude, Latitude]
const LOCATIONS = [
  { id: 'us', name: 'United States', coords: [-95.7129, 37.0902] as [number, number] },
  { id: 'canada', name: 'Canada', coords: [-106.3468, 56.1304] as [number, number] },
  { id: 'india', name: 'India', coords: [78.9629, 20.5937] as [number, number] },
  { id: 'australia', name: 'Australia', coords: [133.7751, -25.2744] as [number, number] },
];

// ── SVG dimensions (fixed ratio 2 : 1) ──────────────────────────────────────
const W = 1000;
const H = 500;

const CyberMap: React.FC = () => {
  const { content } = useContent();
  const [geographies, setGeographies] = useState<any[]>([]);
  const [mapError, setMapError] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);   // -1 = idle (not started)
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Projection (memoised, never changes) ───────────────────────────────────
  const { projection, pathGenerator } = useMemo(() => {
    const proj = d3
      .geoEqualEarth()
      .scale(155)
      .translate([W / 2, H / 2.1]);
    return { projection: proj, pathGenerator: d3.geoPath().projection(proj) };
  }, []);

  // ── Fetch world map once — with error handling ─────────────────────────────
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const countries = (feature(data, data.objects.countries) as any).features;
        setGeographies(countries);
      })
      .catch(() => {
        setMapError(true);
      });
  }, []);

  // ── Intersection Observer — restart animation every time map enters view ───
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset then start from step 0
          if (timerRef.current) clearTimeout(timerRef.current);
          setActiveStep(-1);
          timerRef.current = setTimeout(() => setActiveStep(0), 200);
        }
      },
      { threshold: 0.3 }   // fire when 30 % of the section is visible
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Step-by-step animation ticker ─────────────────────────────────────────
  useEffect(() => {
    if (activeStep < 0 || activeStep >= LOCATIONS.length - 1) return;
    const t = setTimeout(() => setActiveStep((p) => p + 1), 2000);
    return () => clearTimeout(t);
  }, [activeStep]);

  // ── Projected pixel positions (stable per render) ──────────────────────────
  const projected = useMemo(
    () => LOCATIONS.map((l) => projection(l.coords)!),
    [projection]
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#010810] overflow-hidden"
    >
      {/* ── Cyber grid background ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Context text block ── */}
      <div className="relative z-10 text-center px-4 xs:px-6 pt-10 md:pt-14 pb-6">
        {/* eyebrow */}
        <p
          className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] mb-3"
          style={{ color: '#00d4ff' }}
        >
          Global Reach
        </p>

        {/* headline */}
        <h2 className="text-2xl xs:text-3xl md:text-[2.6rem] font-bold text-white leading-tight mb-4">
          {content.worldclock_hero_title || 'Detailing Across'}{' '}
          <span style={{ color: '#00d4ff', textShadow: '0 0 18px rgba(0,212,255,0.55)' }}>
            {content.worldclock_hero_subtitle || 'The Globe'}
          </span>
        </h2>

        {/* descriptor
        <p className="text-white/55 max-w-2xl mx-auto text-xs md:text-base leading-relaxed px-2 md:px-0">
          Struzon's structural detailing teams operate from five strategic hubs —
          the <span className="text-white/80 font-medium">United States</span>,{' '}
          <span className="text-white/80 font-medium">Canada</span>,{' '}
          <span className="text-white/80 font-medium">United Kingdom</span>,{' '}
          <span className="text-white/80 font-medium">Central Europe</span>, and{' '}
          <span className="text-white/80 font-medium">India</span> — providing
          24 / 7 precision detailing, BIM coordination, and engineering support
          to clients worldwide.
        </p> */}

        {/* stat pills */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8">
          {[
            { value: '2', label: 'Global Offices' },
            { value: '50+', label: 'Clients Served' },
            { value: '1,500+', label: 'Projects Delivered' },
          ].map((s) => (
            <div key={s.label} className="text-center min-w-[100px] md:min-w-0">
              <div
                className="text-xl md:text-2xl font-bold font-mono"
                style={{ color: '#00d4ff' }}
              >
                {s.value}
              </div>
              <div className="text-white/40 text-[8px] md:text-xs uppercase tracking-widest mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map SVG — viewBox keeps 2:1 ratio, width fills container ── */}
      <div className="relative z-10 w-full px-2 pb-10">
        {mapError && (
          <div className="w-full h-64 flex flex-col items-center justify-center gap-4 text-center opacity-60">
            <div className="flex gap-8 flex-wrap justify-center">
              {LOCATIONS.map((l) => (
                <span key={l.id} className="text-xs font-mono uppercase tracking-widest" style={{ color: '#00d4ff' }}>⬡ {l.name}</span>
              ))}
            </div>
            <p className="text-white/30 text-xs">Map data unavailable — Connect to load interactive globe</p>
          </div>
        )}
        {!mapError && <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 14px rgba(0,212,255,0.35))' }}
        >
          {/* World countries */}
          <g>
            {geographies.map((d, i) => (
              <path
                key={`c-${i}`}
                d={pathGenerator(d) || ''}
                fill="#051622"
                stroke="#00d4ff"
                strokeWidth="0.4"
                opacity="0.9"
              />
            ))}
          </g>

          {/* Animated connection arcs */}
          {LOCATIONS.map((loc, i) => {
            if (i === 0 || i > activeStep || activeStep < 0) return null;
            const [sx, sy] = projected[i - 1];
            const [ex, ey] = projected[i];
            const mx = (sx + ex) / 2;
            const my = Math.min(sy, ey) - 55;

            return (
              <motion.path
                key={`arc-${i}`}
                d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
                fill="none"
                stroke="#a00e1a"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 8px #a00e1aff)' }}
              />
            );
          })}

          {/* Pins + labels */}
          {LOCATIONS.map((loc, i) => {
            if (activeStep < 0 || i > activeStep) return null;
            const [px, py] = projected[i];
            const isCurrent = i === activeStep;

            return (
              <AnimatePresence key={loc.id}>
                <g>
                  {/* Pulse ring on active pin */}
                  {isCurrent && (
                    <motion.circle
                      cx={px}
                      cy={py}
                      r={8}
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                      initial={{ r: 6, opacity: 0.9 }}
                      animate={{ r: 22, opacity: 0 }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {/* Pin dot */}
                  <motion.circle
                    cx={px}
                    cy={py}
                    r={isCurrent ? 5 : 4}
                    fill={isCurrent ? '#00d4ff' : '#ff3333'}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    style={{
                      filter: isCurrent
                        ? 'drop-shadow(0 0 7px #00d4ff)'
                        : 'drop-shadow(0 0 5px #ff3333)',
                    }}
                  />

                  {/* Country label */}
                  <motion.text
                    x={px}
                    y={py + (py > H / 2 ? -10 : 18)}
                    textAnchor="middle"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="700"
                    fontSize={isCurrent ? '14' : '11'}
                    fill={isCurrent ? '#00d4ff' : '#ffffff'}
                    pointerEvents="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      textShadow: isCurrent ? '0 0 12px #00d4ff' : 'none',
                    }}
                  >
                    {loc.name}
                  </motion.text>
                </g>
              </AnimatePresence>
            );
          })}
        </svg>}
      </div>

      {/* ── Live status badge ── */}
      <div className="relative z-10 pb-10 text-center">
        <span
          className="inline-block font-mono text-xs tracking-widest uppercase border-l-2 border-red-500 pl-3"
          style={{ color: '#00d4ff99' }}
        >
          {activeStep >= 0
            ? `Tracing: ${LOCATIONS[Math.min(activeStep, LOCATIONS.length - 1)].name}`
            : 'Initialising...'}
        </span>
      </div>
    </section>
  );
};

export default CyberMap;
