import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "@/assets/struzon-logo.png";
import { useContent } from "@/lib/ContentContext";

export function SiteFooter() {
  const { content } = useContent();
  return (
    <footer className="bg-white text-navy border-t border-slate-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-32 md:grid-cols-4 md:text-left text-center">
        <div className="md:col-span-1 flex flex-col items-center md:items-start">
          <div className="bg-white inline-block mb-4">
            <img src={logo} alt="Struzon Technologies " className="h-10 sm:h-12 w-auto" />
          </div>
          <p className="text-lg leading-relaxed text-navy max-w-xs md:max-w-none">
            A trusted structural steel detailing and engineering service partner to the construction industry worldwide.
          </p>
          <div className="mt-8 flex gap-4">
            {[
              { Icon: FaFacebookF, href: "https://www.facebook.com/p/Struzon-Technologies-100057060415643/" },
              { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/struzon-technologies" },
              { Icon: FaInstagram, href: "https://www.instagram.com/struzontechnologies/" },
              { Icon: FaYoutube, href: "https://www.youtube.com/@struzontechnologiespvtltd3935" },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-navy hover:bg-brand-red hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
                <social.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-navy font-display font-bold uppercase tracking-widest text-xl mb-6 pb-2 border-b-2 border-brand-red w-fit">Quick Links</h4>
          <ul className="space-y-4 text-lg font-bold">
            <li><Link to="/about" className="text-brand-red hover:text-navy transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-brand-red hover:text-navy transition-colors">Services</Link></li>
            <li><Link to="/projects" className="text-brand-red hover:text-navy transition-colors">Projects</Link></li>
            <li><Link to="/careers" className="text-brand-red hover:text-navy transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-brand-red hover:text-navy transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-navy font-display font-bold uppercase tracking-widest text-xl mb-6 pb-2 border-b-2 border-brand-red w-fit">Services</h4>
          <ul className="space-y-3 text-lg font-medium">
            <li className="hover:text-brand-red transition-colors cursor-default">Structural Steel Detailing</li>
            <li className="hover:text-brand-red transition-colors cursor-default">Connection Design</li>
            <li className="hover:text-brand-red transition-colors cursor-default">Miscellaneous Detailing</li>
            <li className="hover:text-brand-red transition-colors cursor-default">BIM Services</li>
            <li className="hover:text-brand-red transition-colors cursor-default">Engineering & Stamping</li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-navy font-display font-bold uppercase tracking-widest text-xl mb-6 pb-2 border-b-2 border-brand-red w-fit">Contact</h4>
          <ul className="space-y-4 text-lg font-medium">
            <li className="flex items-start gap-3 hover:text-brand-red transition-colors group cursor-default justify-center md:justify-start">
              <MapPin className="h-5 w-5 mt-0.5 text-brand-red group-hover:scale-110 transition-transform" />
              Offices in USA & India
            </li>
            <li className="flex flex-col gap-3">
              <a href="tel:+16469923825" className="flex items-center gap-3 hover:text-brand-red transition-colors group cursor-pointer justify-center md:justify-start">
                <Phone className="h-5 w-5 text-brand-red group-hover:scale-110 transition-transform" />
                +1 (646) 992-3825
              </a>
              <a href="tel:+916385828777" className="flex items-center gap-3 hover:text-brand-red transition-colors group cursor-pointer justify-center md:justify-start">
                <Phone className="h-5 w-5 text-brand-red group-hover:scale-110 transition-transform" />
                +91 6385828777
              </a>
            </li>
            <li className="flex flex-col gap-3">
              <a href={`mailto:${content.contact_email || 'info@struzon.com'}`} className="flex items-center gap-3 hover:text-brand-red transition-colors group cursor-pointer justify-center md:justify-start">
                <Mail className="h-5 w-5 text-brand-red group-hover:scale-110 transition-transform" />
                {content.contact_email || 'info@struzon.com'}
              </a>
              <a href={`mailto:${content.contact_email_2 || 'anand@struzon.com'}`} className="flex items-center gap-3 hover:text-brand-red transition-colors group cursor-pointer justify-center md:justify-start">
                <Mail className="h-5 w-5 text-brand-red group-hover:scale-110 transition-transform" />
                {content.contact_email_2 || 'anand@struzon.com'}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs font-bold text-slate-400 uppercase tracking-widest md:flex-row">
          <p>© {new Date().getFullYear()} Struzon Technologies  All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-brand-red transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-red transition-colors cursor-pointer">Terms of Service</span>
          </div>
          <p className="text-brand-red">Stands For Trust</p>
        </div>
      </div>
    </footer>
  );
}
