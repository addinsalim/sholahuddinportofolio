import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email tidak valid";
    if (!form.message.trim()) e.message = "Pesan wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle title="Contact" subtitle="Mari terhubung dan berkolaborasi" />
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-5">
            <div>
              <input
                type="text"
                placeholder="Nama"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                placeholder="Pesan"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-gold-hover transition-all duration-300 glow-gold hover:glow-gold-strong"
            >
              {sent ? "✓ Pesan Terkirim!" : "Kirim Pesan"}
            </button>
          </form>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-6 mt-10">
            {[
              { label: "GitHub", href: "#", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
              { label: "LinkedIn", href: "#", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
              { label: "Email", href: "mailto:email@placeholder.com", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
