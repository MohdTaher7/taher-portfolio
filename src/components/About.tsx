import { motion } from "framer-motion";
import { about, highlights, profile } from "../data/resume";
import { Reveal, Section } from "./ui";

const tone = ["var(--bronze)", "var(--silver)", "var(--gold)", "var(--glow)"];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="I turn raw data into measurable business improvements.">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <Reveal className="min-w-0">
          <div className="glass relative h-full overflow-hidden rounded-[28px] p-7 sm:p-9">
            <p className="text-[17px] leading-relaxed text-mist sm:text-lg">{profile.summary}</p>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.value}
                  initial={{ opacity: 0.4, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.7 }}
                  className="min-w-0 border-t hairline pt-4"
                >
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-none tracking-tight tabular-nums" style={{ color: tone[i] }}>
                      {h.value}
                    </span>
                    <span className="mt-2 block text-[13.5px] leading-snug text-fog" aria-hidden="true">{h.label}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {about.map((a, i) => (
            <Reveal key={a.key} delay={0.08 * i} className="min-w-0">
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass group h-full rounded-[24px] p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ background: tone[i] }} />
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-mist">{a.heading}</h3>
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-mist/90">{a.body}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
