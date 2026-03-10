import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image_url: string;
}

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    supabase
      .from("certificates")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data) setCertificates(data);
      });
  }, []);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-6 bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Sertifikat"
          subtitle="Pencapaian dan sertifikasi yang telah diraih"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <ScrollReveal key={cert.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative rounded-lg overflow-hidden border border-border bg-card cursor-pointer transition-colors hover:border-primary/40"
                onClick={() => setSelected(cert)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs text-muted-foreground">{cert.year}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground leading-tight mb-1 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full rounded-lg overflow-hidden border border-primary/30 glow-gold"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full object-contain max-h-[70vh] bg-card"
              />

              <div className="p-5 bg-card border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{selected.year}</span>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                  {selected.title}
                </h3>
                <p className="text-sm text-muted-foreground">{selected.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
