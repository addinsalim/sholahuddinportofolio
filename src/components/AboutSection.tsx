import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";
import profileImg from "@/assets/profile-placeholder.jpg";

const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="container mx-auto max-w-5xl">
      <SectionTitle title="About Me" subtitle="Mengenal lebih dekat" />
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <ScrollReveal className="md:col-span-2 flex justify-center">
          <div className="relative w-64 h-72 rounded-lg overflow-hidden border border-border glow-gold">
            <img
              src={profileImg}
              alt="Sholahuddin Yusuf Al Ayubi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </ScrollReveal>
        <ScrollReveal className="md:col-span-3" delay={0.2}>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Saya adalah alumni <span className="text-primary font-medium">Pesantren Mafatih Purwakarta</span> (2017–2024) 
            dan saat ini merupakan mahasiswa aktif <span className="text-primary font-medium">STIKOM El Rahma Bogor</span> (2024–sekarang). 
            Saya memiliki minat dalam pengembangan web dan teknologi komputer serta berpengalaman dalam proyek 
            berbasis sistem informasi dan embedded system.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Web Development", "Embedded System", "Desain Grafis", "Teknisi Komputer"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary/80 bg-primary/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
