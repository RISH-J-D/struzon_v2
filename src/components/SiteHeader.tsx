import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

// Import assets for reliable production URL resolution
import logoImg from "@/assets/struzon-logo.png";
import badge1Img from "@/assets/icons/badge1.png";
import badge2Img from "@/assets/icons/badge2.png";
import badge3Img from "@/assets/icons/badge3.png";

const logo = logoImg;
const badge1 = badge1Img;
const badge2 = badge2Img;
const badge3 = badge3Img;

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Our Team" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[1000] flex flex-col transition-all duration-500 bg-gradient-to-b from-navy/95 via-navy/60 to-white/5 backdrop-blur-2xl`}>

        {/* Top Bar Section — Merged and full width */}
        <div className={`w-full transition-all duration-500 overflow-hidden ${scrolled ? 'h-0' : 'h-10'}`}>


          <div className="flex w-full items-center justify-between px-4 md:px-8 lg:px-12 h-full">
            <div className="flex items-center gap-6 text-[10px] md:text-sm font-bold uppercase tracking-wider">
              <div className="flex flex-row items-center gap-6">
                <a href="tel:+16469923825" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors whitespace-nowrap">
                  <Phone size={12} className="text-brand-red" /> +1 (646) 992-3825
                </a>
                <a href="tel:+916385828777" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors whitespace-nowrap border-l border-white/10 pl-6 h-3 flex items-center">
                  <Phone size={12} className="text-brand-red" /> +91 6385828777
                </a>
              </div>
              <a href="mailto:info@struzon.com" className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail size={12} className="text-brand-red" /> info@struzon.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-white/60">
                <a href="https://www.facebook.com/p/Struzon-Technologies-100057060415643/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors"><FaFacebookF size={12} /></a>
                <a href="https://www.linkedin.com/company/struzon-technologies" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><FaLinkedinIn size={12} /></a>
                <a href="https://www.instagram.com/struzontechnologies/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram size={12} /></a>
                <a href="https://www.youtube.com/@struzontechnologiespvtltd3935" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors"><FaYoutube size={12} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav Section — Full width edge-to-edge */}
        <div className={`w-full`}>

          <div className="w-full h-16 md:h-20 lg:h-24 flex items-center justify-between px-4 md:px-8 lg:px-12">

            {/* 1. Branding & Badges (Left) - Fluidly Adaptive */}
            <div className="flex items-center gap-[clamp(4px,1vw,32px)] shrink min-w-0">
              <Link to="/" className="relative flex items-center shrink-0">
                <div className="absolute inset-[-60%] bg-white/20 blur-[60px] rounded-full pointer-events-none opacity-80"></div>
                <div className="absolute inset-[-20%] bg-white/30 blur-[30px] rounded-full pointer-events-none"></div>

                <img
                  src={logo}
                  alt="Struzon"
                  className="relative h-[clamp(24px,3.5vw,56px)] w-auto object-contain brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                />
              </Link>

              {/* Badges - Fluid scaling, always visible */}
              <div className="flex items-center gap-[clamp(2px,0.8vw,24px)] border-l border-white/20 pl-[clamp(4px,1.5vw,32px)] py-1 shrink min-w-0">
                <img src={badge1} alt="AISC" className="h-[clamp(18px,3.2vw,64px)] w-auto object-contain transition-transform hover:scale-110" />
                <img src={badge2} alt="NISD" className="h-[clamp(18px,3.2vw,64px)] w-auto object-contain transition-transform hover:scale-110" />
                <img src={badge3} alt="ISO" className="h-[clamp(16px,2.8vw,56px)] w-auto object-contain transition-transform hover:scale-110" />
              </div>
            </div>

            {/* 2. Navigation & Actions (Right) - Highly Adaptive */}
            <div className="flex items-center justify-end gap-[clamp(4px,1vw,32px)] shrink min-w-0">

              {/* Universal Fluid Nav */}
              <nav className="hidden min-[900px]:flex items-center gap-x-0 xl:gap-x-1">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-[clamp(2px,0.8vw,16px)] py-2 text-[clamp(8px,1vw,14px)] uppercase tracking-tighter xl:tracking-widest font-black text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all whitespace-nowrap"
                    activeProps={{ className: "text-white bg-white/10" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center shrink-0">
                <Link
                  to="/contact"
                  className="bg-brand-red px-[clamp(8px,1.5vw,32px)] py-[clamp(6px,1vw,16px)] rounded-full text-[clamp(8px,0.9vw,12px)] font-black uppercase tracking-widest text-white hover:bg-white hover:text-navy transition-all shadow-xl active:scale-95 whitespace-nowrap"
                >
                  Get a Quote
                </Link>
              </div>

              {/* Mobile menu button - Triggers at 900px */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-[900px]:hidden p-1 sm:p-2 text-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile nav drawer — Portaled to body for absolute stacking dominance */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-navy/98 backdrop-blur-md z-[5010]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-navy z-[5020] shadow-2xl border-l border-white/5 flex flex-col scrollbar-hide"
              >
                <div className="p-8 pb-4">
                  <img src={logo} alt="Struzon" className="h-8 w-auto" />
                </div>
                <nav className="flex flex-col p-8 gap-6 overflow-y-auto flex-1 scrollbar-hide">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl uppercase tracking-[0.2em] font-black text-white/90 hover:text-white transition-colors"
                      activeProps={{ className: "!text-brand-red" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-brand-red rounded-full text-center py-5 text-base font-black uppercase tracking-[0.2em] text-white shadow-xl"
                  >
                    Get a Quote
                  </Link>

                  <div className="mt-auto pt-10 grid grid-cols-2 gap-4 border-t border-white/5">
                    <div className="text-[10px] uppercase font-black tracking-widest text-white/30">Connect</div>
                    <div className="flex gap-4">
                      <FaFacebookF className="text-white/40 hover:text-brand-red" />
                      <FaLinkedinIn className="text-white/40 hover:text-brand-red" />
                      <FaInstagram className="text-white/40 hover:text-brand-red" />
                    </div>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
