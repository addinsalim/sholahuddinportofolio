import ScrollReveal from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <ScrollReveal className="text-center mb-16">
    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gradient-gold mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-sm max-w-md mx-auto">{subtitle}</p>
    )}
    <div className="mt-4 mx-auto w-16 h-0.5 bg-primary/40 rounded-full" />
  </ScrollReveal>
);

export default SectionTitle;
