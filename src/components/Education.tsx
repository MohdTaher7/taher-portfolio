import { motion } from "framer-motion";
import { certifications, education } from "../data/resume";
import { Reveal, Section } from "./ui";

export default function Education() {
  return (
    <Section id="education" eyebrow="Education & certifications" title="Education">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        <div className="grid content-start gap-4">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.06}>
              <article className="glass flex items-start justify-between gap-4 rounded-[24px] p-6">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{e.degree}</h3>
                  <p className="mt-1 text-[15px] text-fog">{e.school}</p>
                </div>
                <p className="shrink-0 font-mono text-[12.5px] tabular-nums text-mist">{e.start} – {e.end}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="certifications" className="min-w-0 scroll-mt-28">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Certifications</h3>
          </Reveal>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0.35, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                whileHover={{ y: -3 }}
                className="glass flex min-h-[92px] flex-col justify-between gap-3 rounded-[20px] p-4"
              >
                <span className="text-[15px] leading-snug text-snow">{c.name}</span>
                {c.issuer && <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold/90">{c.issuer}</span>}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
