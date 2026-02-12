import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const skills = [
  { name: "HTML", level: 90 },
  { name: "PHP", level: 85 },
  { name: "Teknisi Komputer", level: 88 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 75 },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-5">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-primary">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-gold-hover"
      />
    </div>
  </div>
);

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6 bg-secondary/30">
    <div className="container mx-auto max-w-3xl">
      <SectionTitle title="Skills" subtitle="Keahlian teknis yang saya kuasai" />
      <ScrollReveal>
        <div className="bg-card rounded-lg border border-border p-8">
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SkillsSection;
