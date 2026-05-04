import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { sendJobApplication } from "@/lib/email-actions";
import { Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/lib/ContentContext";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

interface Role {
  id: string;
  title: string;
  vacancies: number | "No Openings";
  hasDetails: boolean;
  skills?: string[];
}

function Careers() {
  const content = useContent();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [experienceType, setExperienceType] = useState<'fresher' | 'experienced' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      const { data, error } = await supabase.from('vacancies').select('*').order('created_at', { ascending: false });
      if (data && !error) {
        setRoles(data.map((v: any) => ({
          id: v.id,
          title: v.title,
          vacancies: v.status === 'Open' ? v.spots : "No Openings",
          hasDetails: v.status === 'Open',
          skills: [
            `Type: ${v.type}`,
            `Location: ${v.location}`,
            `Experience: ${v.experience}`
          ]
        })));
      }
    };
    fetchVacancies();
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="Join Our Team"
        title={content.careers_hero_title || "Build Your Future"}
        subtitle={content.careers_hero_subtitle || "Join a team of elite structural engineers and detailers. We don't just build structures; we build careers."}
      />
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.4em] text-brand-red font-black mb-4">Opportunities</div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-navy uppercase tracking-tightest leading-[0.8]">
                {content.careers_intro_title || 'Our Current'} <br />
                <span className="text-brand-red">{content.careers_intro_subtitle || 'Openings'}</span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-xs font-medium border-l-2 border-brand-red pl-6 py-2 whitespace-pre-line">
              {content.careers_intro_text || 'Join a team of elite engineers and detailers shaping the global infrastructure.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`group relative overflow-hidden flex flex-col items-center text-center p-10 transition-all duration-500 ${role.hasDetails
                    ? "bg-slate-50 hover:bg-navy border-slate-100"
                    : "bg-white border-slate-100 grayscale opacity-60"
                  } border-2`}
              >
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ${role.hasDetails ? "bg-white text-brand-red group-hover:scale-110 shadow-sm" : "bg-slate-50 text-slate-300"
                  }`}>
                  <Users className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-tight mb-4 transition-colors duration-500 ${role.hasDetails ? "text-navy group-hover:text-white" : "text-slate-400"
                  }`}>
                  {role.title}
                </h3>
                <div className={`text-[10px] mb-8 font-black uppercase tracking-widest transition-colors duration-500 ${role.hasDetails ? "text-brand-red group-hover:text-brand-red" : "text-slate-300"
                  }`}>
                  {typeof role.vacancies === 'number' ? `Vacancy — ${role.vacancies}` : role.vacancies}
                </div>
                {role.hasDetails && (
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="mt-auto px-6 py-2 bg-navy text-white text-[10px] uppercase tracking-widest font-bold group-hover:bg-brand-red transition-all duration-300 rounded-full"
                  >
                    View Details
                  </button>
                )}
                {role.hasDetails && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rotate-45 translate-x-12 -translate-y-12 transition-transform duration-500 group-hover:translate-x-10 -translate-y-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Details Modal */}
      {selectedRole && (
        <Dialog
          open={!!selectedRole}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRole(null);
              setSubmitted(false);
              setExperienceType(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-2xl bg-white border-navy/10 p-0 overflow-hidden rounded-none">
            <div className="flex flex-col">
              <div className="bg-navy p-10 text-white">
                <div className="text-brand-red text-[10px] uppercase tracking-[0.4em] font-black mb-4">Position Details</div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tightest leading-[0.8] mb-6">
                  {selectedRole.title}
                </h2>
                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                  <span className="bg-brand-red px-3 py-1">
                    {typeof selectedRole.vacancies === 'number' ? `Vacancies: ${selectedRole.vacancies}` : selectedRole.vacancies}
                  </span>
                  <span className="text-slate-400">Full-Time</span>
                </div>
              </div>

              <div className="p-10">
                {submitted ? (
                  <div className="mt-8 bg-white p-8 md:p-12 border-2 border-brand-red rounded-sm shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="flex justify-center mb-8">
                      <div className="h-20 w-20 rounded-full bg-brand-red/10 flex items-center justify-center">
                        <svg className="h-10 w-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-display font-black uppercase text-navy text-center mb-6 tracking-tight">Application Received</h3>
                    <div className="space-y-6 text-navy/80 font-medium">
                      <p className="text-center leading-relaxed">
                        Your application for the <span className="text-brand-red font-bold">{selectedRole.title}</span> position has been successfully recorded in our HR system.
                      </p>
                      <div className="bg-slate-50 p-6 border-l-4 border-brand-red space-y-3 text-left">
                        <div className="text-[10px] uppercase tracking-widest font-black text-brand-red">HR Process</div>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                            Initial screening by the talent acquisition team
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                            Technical assessment invitation (if shortlisted)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                            In-person or virtual interview schedule
                          </li>
                        </ul>
                      </div>
                      <p className="text-xs text-center text-muted-foreground pt-4 italic">
                        A confirmation email has been sent to your provided address. Please check your inbox for next steps.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSelectedRole(null); setSubmitted(false); setExperienceType(null); }}
                      className="mt-10 w-full border-2 border-navy py-4 text-xs font-black uppercase tracking-widest text-navy hover:bg-navy hover:text-white transition-all"
                    >
                      Return to Careers
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-navy font-display font-bold uppercase tracking-widest text-sm mb-4 pb-2 border-b-2 border-brand-red w-fit">Required Skills</h4>
                      <ul className="space-y-3">
                        {selectedRole.skills?.map((skill, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red flex-shrink-0" />
                            <span className="text-sm font-medium">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-navy font-display font-bold uppercase tracking-widest text-sm mb-4 pb-2 border-b-2 border-brand-red w-fit">Apply for this position</h4>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const data = Object.fromEntries(formData.entries());

                          const loadingToast = toast.loading("Submitting your application...");

                          try {
                            const attachments = [];
                            const resumeFile = formData.get('resume') as File;

                            if (resumeFile && resumeFile.size > 0) {
                              const { fileToBase64 } = await import("@/lib/email-actions");
                              const base64 = await fileToBase64(resumeFile);
                              attachments.push({
                                filename: resumeFile.name,
                                content: base64
                              });
                            }

                            // Omit the 'resume' File object from the JSON data
                            const { resume, ...submitData } = data as any;

                            await sendJobApplication({
                              ...submitData,
                              role: selectedRole.title,
                              attachments
                            } as any);
                            toast.success("Application recorded", { id: loadingToast });
                            setSubmitted(true);
                          } catch (error) {
                            toast.error("Submission failed", { id: loadingToast });
                            console.error(error);
                          }
                        }}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Full Name *</label>
                            <input name="name" required className="w-full bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mobile Number *</label>
                            <input name="phone" required type="tel" className="w-full bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all" />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address *</label>
                            <input name="email" required type="email" className="w-full bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">LinkedIn URL (Optional)</label>
                            <input name="linkedin" type="url" className="w-full bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all" />
                          </div>
                        </div>

                        <div className="space-y-4 pt-2">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Experience *</label>
                          <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="experienceType"
                                value="fresher"
                                checked={experienceType === 'fresher'}
                                onChange={() => setExperienceType('fresher')}
                                className="w-4 h-4 text-brand-red border-slate-300 focus:ring-brand-red transition-all cursor-pointer"
                                required
                              />
                              <span className="text-sm font-bold uppercase tracking-widest text-navy group-hover:text-brand-red transition-colors">Fresher</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="experienceType"
                                value="experienced"
                                checked={experienceType === 'experienced'}
                                onChange={() => setExperienceType('experienced')}
                                className="w-4 h-4 text-brand-red border-slate-300 focus:ring-brand-red transition-all cursor-pointer"
                                required
                              />
                              <span className="text-sm font-bold uppercase tracking-widest text-navy group-hover:text-brand-red transition-colors">Experienced</span>
                            </label>
                          </div>
                        </div>

                        {experienceType === 'experienced' && (
                          <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Years of Experience Range *</label>
                              <div className="flex items-center gap-2">
                                <select 
                                  name="yearsOfExperienceFrom" 
                                  required 
                                  className="flex-1 bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all appearance-none"
                                >
                                  {Array.from({length: 12}, (_, i) => i + 1).map(y => <option key={y} value={y}>{y} Years</option>)}
                                </select>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">To</span>
                                <select 
                                  name="yearsOfExperienceTo" 
                                  required 
                                  className="flex-1 bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all appearance-none"
                                >
                                  {Array.from({length: 12}, (_, i) => i + 1).map(y => <option key={y} value={y}>{y} Years</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Previous Company Name *</label>
                              <input name="previousCompany" required className="w-full bg-slate-50 border-0 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-red/20 transition-all" />
                            </div>
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Upload Resume (PDF/DOC) *</label>
                          <input name="resume" required type="file" className="w-full bg-slate-50 border-0 p-4 text-xs outline-none focus:ring-2 focus:ring-brand-red/20 transition-all cursor-pointer" />
                        </div>
                        <button type="submit" className="w-full bg-navy hover:bg-brand-red text-white py-4 font-display font-bold uppercase tracking-[0.2em] transition-all duration-300">Submit Application</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageShell>
  );
}

export default Careers;
