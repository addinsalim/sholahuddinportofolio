import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const projects = [
  {
    emoji: "🛰",
    title: "Prototipe Pendeteksi Benda Padat dengan Sensor Ultrasonik HC-SR04 dan Arduino UNO",
    description:
      "Proyek berbasis mikrokontroler untuk mendeteksi objek menggunakan sensor ultrasonik dengan visualisasi data.",
    tech: ["Arduino", "C++", "Sensor HC-SR04"],
    links: [
      { label: "Detail", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    emoji: "💻",
    title: "Sistem Informasi Absensi Ibadah & Jadwal Piket Asrama",
    description:
      "Rancang Bangun Sistem Informasi Pengelolaan Absensi Ibadah dan Jadwal Piket Asrama STIKOM El Rahma Berbasis Web Menggunakan PHP 8.0 dan Bootstrap 4.",
    tech: ["PHP 8.0", "Bootstrap 4", "MySQL"],
    links: [
      { label: "Demo", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  // ===== TAMBAHKAN PROYEK BARU DI BAWAH INI =====
  // Copy template card berikut dan ubah isinya:
  // {
  //   emoji: "🔥",
  //   title: "Nama Proyek Baru",
  //   description: "Deskripsi proyek.",
  //   tech: ["Tech1", "Tech2"],
  //   links: [
  //     { label: "Demo", href: "https://..." },
  //     { label: "GitHub", href: "https://..." },
  //   ],
  // },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-6">
    <div className="container mx-auto max-w-5xl">
      <SectionTitle title="Projects" subtitle="Proyek unggulan yang telah saya kerjakan" />
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="group h-full bg-card rounded-lg border border-border p-6 hover:-translate-y-2 hover:glow-gold transition-all duration-500">
              <span className="text-3xl">{project.emoji}</span>
              <h3 className="mt-4 font-playfair text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs font-medium text-primary/80 hover:text-primary border border-primary/20 px-4 py-2 rounded-md hover:bg-primary/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
