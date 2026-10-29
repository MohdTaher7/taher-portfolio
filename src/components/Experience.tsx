import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/resume";
import { Reveal, Section } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol ref={ref} className="relative grid gap-10 pl-8 sm:gap-14 sm:pl-14">
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10 sm:left-[11px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-gold via-silver to-bronze sm:left-[11px]"
        />
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span aria-hidden="true" className="absolute -left-8 top-2 grid h-[15px] w-[15px] place-items-center sm:-left-14 sm:h-[23px] sm:w-[23px]">
              {job.current && <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />}
              <span className={`h-[9px] w-[9px] rounded-full ring-4 ring-ink sm:h-[11px] sm:w-[11px] ${job.current ? "bg-gold" : "bg-silver"}`} />
            </span>
            <Reveal delay={i * 0.05}>
              <article className="glass rounded-[28px] p-6 sm:p-9">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[28px]">{job.role}</h3>
                    <p className="mt-1 text-mist">{job.company}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12.5px] tabular-nums text-fog">
                    <time>{job.start}</time> – <time>{job.end}</time>
                    {job.current && <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-gold">current</span>}
                  </p>
                </header>
                <ul className="mt-6 grid gap-3">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15.5px] leading-relaxed text-mist/90">
                      <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-white/30" />
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2" aria-label="Tools and methods">
                  {job.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
