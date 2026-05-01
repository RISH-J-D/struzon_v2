import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO TINT SETTINGS — easy to change
// Colour: rgb(2, 34, 75)  ← logo dark blue
// Opacity: 0.64           ← adjust between 0 (transparent) and 1 (solid)
// ─────────────────────────────────────────────────────────────────────────────
const HERO_TINT_COLOR = "2, 34, 75";   // R, G, B  ← change colour here
const HERO_TINT_OPACITY = 0.64;         // 0–1      ← change opacity here

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80)" }}
      />

      {/* Blue tint overlay — edit HERO_TINT_COLOR & HERO_TINT_OPACITY above */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(${HERO_TINT_COLOR}, ${HERO_TINT_OPACITY})` }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48 md:pb-28 w-full h-full flex flex-col justify-start">
        {eyebrow && <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-red font-bold drop-shadow">{eyebrow}</div>}
        <h1 className="mt-3 text-white text-3xl sm:text-4xl md:text-6xl uppercase font-display font-black tracking-tighter leading-tight drop-shadow-xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed font-medium drop-shadow">{subtitle}</p>}
      </div>

      {/* Decorative bottom triangle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0 w-0 border-l-[28px] border-r-[28px] border-t-[22px] border-l-transparent border-r-transparent border-t-slate-50" />
    </section>
  );
}
