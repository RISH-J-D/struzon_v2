import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { useState } from "react";
import { Mail, Phone, MapPin, Upload } from "lucide-react";
import { toast } from "sonner";
import { sendProjectEnquiry } from "@/lib/email-actions";
import { useContent } from "@/lib/ContentContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Struzon Technologies " },
      { name: "description", content: "Get in touch with Struzon for structural steel detailing and BIM project enquiries. Offices in USA, UK, India, and Canada." },
      { property: "og:title", content: "Contact Struzon" },
      { property: "og:description", content: "Give us a call or fill in the form — we'll contact you." },
    ],
  }),
  component: Contact,
});

const offices = [
  {
    c: "USA",
    flag: "🇺🇸",
    name: "Struzon Technologies INC ",
    address: "98, Cuttermill Road, Suite 466 S, Great Neck, NY 11021",
    phones: ["+1 (646) 992-3825", "+1 (404) 902-6781"]
  },
  {
    c: "INDIA",
    flag: "🇮🇳",
    name: "STRUZON TECHNOLOGIES PVT LTD.",
    address: "2/370/A3, Muthuram Garden, Krishna Gounder Nagar, Irugur Nagar, Irugur Road, Chinniampalayam, Coimbatore- 641062.",
    phones: ["0422 2307777", "0422 2367777", "+91 6385828777"]
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const { content } = useContent();

  const isDriveLink = (url: string) => {
    const driveRegex = /https?:\/\/(?:drive|docs)\.google\.com\/(?:folderview\?id=|open\?id=|drive\/folders\/|file\/d\/)([a-zA-Z0-9_-]+)/;
    return driveRegex.test(url);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Let's Talk"
        title={content.contact_hero_title || "Let's get in touch."}
        subtitle={content.contact_hero_subtitle || "Every enquiry is an opportunity to create value, and at Struzon, we approach it with the attention it deserves."}
      />
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-brand-red font-semibold mb-6">Reach Our Team</div>
            <div className="prose prose-slate max-w-none text-navy/80 space-y-6 text-lg leading-relaxed mb-12">
              <p className="whitespace-pre-line">
                {content.contact_intro_text_1 || 'Every enquiry is an opportunity to create value, and at Struzon, we approach it with the attention it deserves. Our team carefully evaluates each requirement to provide well-structured, competitive quotations that align with your project goals. We strongly believe that "a competitive quote will make our customer competitive among others."'}
              </p>
              <p className="whitespace-pre-line">
                {content.contact_intro_text_2 || 'Whether you are planning a new project, require detailing support, or are exploring our range of services, we are here to assist you at every step. Simply share your requirements through the contact form, and our team will respond with clarity, precision, and promptness.'}
              </p>
              <p className="whitespace-pre-line">
                {content.contact_intro_text_3 || 'For immediate assistance, feel free to connect with us directly. At Struzon, we are always ready to support your needs and build lasting partnerships through reliable service and professional excellence.'}
              </p>
            </div>
            <div className="space-y-10">
              {offices.map((o) => (
                <div key={o.c} className="border-l-4 border-brand-red pl-6 py-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{o.flag}</span>
                    <div className="text-xl uppercase font-display font-black text-navy tracking-tight">{o.c}</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-bold text-navy uppercase mb-1">{o.name}</div>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                        <span className="text-base leading-snug">{o.address}</span>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {o.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 text-base text-navy font-semibold hover:text-brand-red transition-colors group">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-brand-red/10">
                            <Phone className="h-4 w-4 text-brand-red" />
                          </div>
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-navy/10">
                <a href={`mailto:${content.contact_email || 'info@struzon.com'}`} className="flex items-center gap-4 group w-fit">
                  <div className="h-12 w-12 rounded-full bg-navy flex items-center justify-center group-hover:bg-brand-red transition-all shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email Address</div>
                    <div className="text-xl font-display font-bold text-navy group-hover:text-brand-red transition-colors">{content.contact_email || 'info@struzon.com'}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="bg-muted p-8 md:p-12 border-t-8 border-brand-red shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 -m-4 rounded-full blur-3xl" />
            <h2 className="text-3xl font-display font-black uppercase text-navy border-b-2 border-brand-red pb-4 mb-8">Project Enquiry</h2>
            {sent ? (
              <div className="mt-8 bg-white p-8 md:p-12 border-2 border-brand-red rounded-sm shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-8">
                  <div className="h-20 w-20 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <svg className="h-10 w-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-display font-black uppercase text-navy text-center mb-6 tracking-tight">Request Received</h3>
                <div className="space-y-6 text-navy/80 font-medium">
                  <p className="text-center leading-relaxed">
                    Thank you for reaching out to <span className="text-brand-red font-bold">Struzon Technologies</span>. Your project requirements have been successfully transmitted to our estimation department.
                  </p>
                  <div className="bg-slate-50 p-6 border-l-4 border-brand-red space-y-3 text-left">
                    <div className="text-[10px] uppercase tracking-widest font-black text-brand-red">Next Steps</div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                        Technical review of your project documents
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                        Estimated quote generation within 24–48 hours
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                        Personal consultation with a project manager
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-center text-muted-foreground pt-4 italic">
                    A confirmation email has been sent to your provided address. Please check your inbox for further instructions.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="mt-10 w-full border-2 border-navy py-4 text-xs font-black uppercase tracking-widest text-navy hover:bg-navy hover:text-white transition-all"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData.entries());

                  // Drive link validation
                  if (data.drive_link && !isDriveLink(data.drive_link as string)) {
                    toast.error("Please provide a valid Google Drive link.");
                    return;
                  }

                  const loadingToast = toast.loading("Sending your quote request...");

                  try {
                    await sendProjectEnquiry({
                      ...(data as any)
                    });
                    toast.success("Quote request sent successfully!", { id: loadingToast });
                    setSent(true);
                  } catch (error) {
                    toast.error("Failed to send quote request. Please try again later.", { id: loadingToast });
                    console.error(error);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { n: "name", l: "Name", t: "text" },
                    { n: "email", l: "Email", t: "email" },
                    { n: "company", l: "Company", t: "text" },
                    { n: "phone", l: "Phone Number", t: "tel" },
                  ].map((f) => (
                    <div key={f.n}>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-black mb-2 block">{f.l} *</label>
                      <input required type={f.t} name={f.n} className="w-full border-b-2 border-navy/10 bg-transparent px-0 py-3 outline-none transition-all focus:border-brand-red focus:bg-white/50" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-black mb-2 block">Tell us about your project *</label>
                  <textarea required name="project" rows={5} className="w-full resize-none border-b-2 border-navy/10 bg-transparent px-0 py-3 outline-none transition-all focus:border-brand-red focus:bg-white/50" />
                </div>

                <div className="space-y-4">
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-black mb-2 block">Project Files (Google Drive Link) *</label>
                    <div className="relative group/file">
                      <input
                        required
                        type="url"
                        name="drive_link"
                        placeholder="https://drive.google.com/..."
                        className="w-full border-b-2 border-navy/10 bg-transparent px-0 py-3 outline-none transition-all focus:border-brand-red focus:bg-white/50 pr-10"
                      />
                      <div className="absolute right-0 bottom-3">
                        <MapPin className="h-5 w-5 text-navy/20 group-focus-within:text-brand-red transition-colors" />
                      </div>
                    </div>
                    <p className="mt-2 text-[9px] text-navy/40 uppercase font-bold tracking-widest leading-loose">
                      Please upload your drawings/folders to Google Drive and paste the shareable link here. <br />
                      Ensures we can access projects of any size (MBs to GBs).
                    </p>
                  </div>
                </div>

                <button type="submit" className="w-full bg-brand-red py-5 px-8 font-display uppercase tracking-widest text-white font-black text-sm hover:bg-brand-red-dark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0">
                  Submit Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default Contact;
