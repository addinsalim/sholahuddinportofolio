import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const CVSection = () => (
  <section id="cv" className="py-24 px-6">
    <div className="container mx-auto max-w-3xl text-center">
      <SectionTitle title="Curriculum Vitae" subtitle="Unduh CV saya untuk informasi lengkap" />
      <ScrollReveal>
        <a
          href="/cv-sholahuddin.pdf"
          download
          className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-gold-hover transition-all duration-300 glow-gold hover:glow-gold-strong animate-glow-pulse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
      </ScrollReveal>
    </div>
  </section>
);

export default CVSection;
