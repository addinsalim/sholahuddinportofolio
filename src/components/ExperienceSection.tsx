import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6 bg-secondary/30">
    <div className="container mx-auto max-w-3xl">
      <SectionTitle title="Experience" subtitle="Pengalaman profesional" />
      <ScrollReveal>
        <div className="group bg-card rounded-lg border border-border p-8 hover:-translate-y-1 hover:glow-gold transition-all duration-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-lg">🎨</span>
            </div>
            <div>
              <h3 className="font-playfair text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Desainer
              </h3>
              <p className="text-primary/70 text-sm mt-1">
                Sujok Terapi Tangan & Kaki · 1,5 bulan
              </p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Bertanggung jawab dalam pembuatan desain visual untuk kebutuhan branding dan 
                media promosi di klinik Sujok Terapi Tangan & Kaki. Mengembangkan materi 
                grafis yang profesional dan menarik untuk meningkatkan citra bisnis.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ExperienceSection;
