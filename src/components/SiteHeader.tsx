import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
  const { scrollY } = useScroll();

  // Scroll animations
  const headerHeight = useTransform(scrollY, [0, 100], ["150px", "100px"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["50px", "25px"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        style={{ height: headerHeight }}
        className={`fixed top-0 left-0 right-0 z-[1000] flex flex-col transition-all duration-500 bg-white border-b ${scrolled ? 'border-navy/10 shadow-lg' : 'border-transparent'}`}
      >
        {/* Top Bar - Hidden on scroll */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div 
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-white border-b border-navy/5 overflow-hidden"
            >
              <div className="w-full min-h-[50px] flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-2 md:py-0 text-[11px] sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-navy gap-3 md:gap-0">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-10 items-center">
                  <a href="mailto:info@struzon.com" className="flex items-center gap-2 sm:gap-3 hover:text-brand-red transition-colors group">
                    <Mail size={14} className="text-brand-red md:w-4 md:h-4" />
                    <span>info@struzon.com</span>
                  </a>
                  <div className="hidden sm:block w-px h-4 bg-navy/10" />
                  <a href="tel:+16469923825" className="flex items-center gap-2 sm:gap-3 hover:text-brand-red transition-colors group">
                    <Phone size={14} className="text-brand-red md:w-4 md:h-4" />
                    <span className="whitespace-nowrap">+1 (646) 992-3825</span>
                  </a>
                  <div className="hidden lg:block w-px h-4 bg-navy/10" />
                  <a href="tel:+916385828777" className="flex items-center gap-2 sm:gap-3 hover:text-brand-red transition-colors group">
                    <Phone size={14} className="text-brand-red md:w-4 md:h-4" />
                    <span className="whitespace-nowrap">+91 6385828777</span>
                  </a>
                </div>
                <div className="flex gap-6 sm:gap-8 items-center">
                   <a href="https://www.facebook.com/people/Struzon-Technologies/100057060415643/" target="_blank" rel="noopener noreferrer" className="text-navy/40 hover:text-brand-red transition-colors"><FaFacebookF size={16} /></a>
                   <a href="https://www.linkedin.com/company/struzon-technologies/" target="_blank" rel="noopener noreferrer" className="text-navy/40 hover:text-brand-red transition-colors"><FaLinkedinIn size={16} /></a>
                   <a href="https://www.instagram.com/struzontechnologies?igsh=MWp0c2w1emdkbjQ3Mw==" target="_blank" rel="noopener noreferrer" className="text-navy/40 hover:text-brand-red transition-colors"><FaInstagram size={16} /></a>
                   <a href="https://www.youtube.com/@struzontechnologiespvtltd3935" target="_blank" rel="noopener noreferrer" className="text-navy/40 hover:text-brand-red transition-colors"><FaYoutube size={18} /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Nav Section */}
        <motion.div 
          style={{ paddingLeft: headerPadding, paddingRight: headerPadding }}
          className="flex-1 w-full flex items-center justify-between px-4 md:px-12 gap-4"
        >
          {/* Logo & Certifications */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-8 min-w-0">
            <Link to="/" className="shrink-0">
              <motion.img 
                style={{ scale: logoScale }}
                src={logo} 
                alt="Struzon" 
                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-5 border-l border-navy/10 pl-3 md:pl-8 py-1 md:py-2">
              <motion.img whileHover={{ y: -5 }} src={badge1} className="h-8 sm:h-10 md:h-16 w-auto transition-all cursor-pointer" title="AISC" />
              <motion.img whileHover={{ y: -5 }} src={badge2} className="h-8 sm:h-10 md:h-16 w-auto transition-all cursor-pointer" title="NISD" />
              <motion.img whileHover={{ y: -5 }} src={badge3} className="h-6 sm:h-8 md:h-12 w-auto transition-all cursor-pointer" title="ISO" />
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden min-[1250px]:flex items-center gap-2 relative mx-4 shrink-0">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-5 py-2 text-[14px] uppercase tracking-wider font-bold text-navy/70 group whitespace-nowrap"
                activeProps={{ className: "active-nav-link" }}
              >
                {({ isActive }) => (
                  <>
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-brand-red' : 'group-hover:text-navy'}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-navy/5 rounded-full z-0"
                      />
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-10">
            <Link 
              to="/contact" 
              className="hidden sm:flex group relative items-center gap-5 bg-navy text-white px-12 py-5 rounded-full overflow-hidden transition-all hover:pr-14"
            >
              <span className="absolute inset-0 bg-brand-red translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-[14px] font-black uppercase tracking-[0.2em]">Get a Quote</span>
              <ChevronRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="p-4 text-navy hover:bg-navy/5 rounded-full transition-colors lg:hidden"
            >
              <Menu size={32} />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-navy/40 backdrop-blur-xl z-[5010]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-white z-[5020] shadow-2xl flex flex-col"
              >
                <div className="p-8 flex items-center justify-between border-b border-navy/5">
                  <img src={logo} alt="Struzon" className="h-8 w-auto" />
                  <button onClick={() => setIsOpen(false)} className="p-2 text-navy hover:bg-navy/5 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <nav className="flex-1 px-8 py-12 flex flex-col gap-6 overflow-y-auto">
                  {links.map((link, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={link.to}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-black uppercase tracking-tighter text-navy/20 hover:text-navy transition-colors block"
                        activeProps={{ className: "!text-brand-red !opacity-100" }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="p-8 bg-navy text-white">
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-6">Ready to start?</p>
                  <Link 
                    to="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-red text-center py-5 rounded-sm font-black uppercase tracking-[0.2em] block shadow-lg active:scale-95 transition-transform"
                  >
                    Get a Free Quote
                  </Link>
                  <div className="mt-10 flex gap-6 text-white/40">
                    <a href="https://www.facebook.com/people/Struzon-Technologies/100057060415643/" target="_blank" rel="noopener noreferrer"><FaFacebookF size={20} className="hover:text-white transition-colors cursor-pointer" /></a>
                    <a href="https://www.linkedin.com/company/struzon-technologies/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={20} className="hover:text-white transition-colors cursor-pointer" /></a>
                    <a href="https://www.instagram.com/struzontechnologies?igsh=MWp0c2w1emdkbjQ3Mw==" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} className="hover:text-white transition-colors cursor-pointer" /></a>
                    <a href="https://www.youtube.com/@struzontechnologiespvtltd3935" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} className="hover:text-white transition-colors cursor-pointer" /></a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
