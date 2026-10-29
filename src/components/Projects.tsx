import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useId, useState } from "react";
import { projects, type Project } from "../data/resume";
import { useCoarsePointer, useReducedMotion } from "../lib";
import { Reveal, Section } from "./ui";

const STAGE_TONES = ["#6f7a8f", "var(--bronze)", "var(--silver)", "var(--gold)", "var(--glow)"];

function FlowPreview({ flow }: { flow: Project["flow"] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border hairline bg-ink/60 px-4 pb-4 pt-5 sm:px-5" aria-label="Pipeline overview">
      <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative">
        {/* horizontal rail (tablet and up) */}
        <div aria-hidden="true" className="absolute left-[6px] right-[6px] top-[5px] hidden h-px bg-gradient-to-r from-white/10 via-white/25 to-white/10 sm:block">
          <span className="travel absolute -top-[2px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-snow shadow-[0_0_12px_2px_rgba(143,200,255,0.8)]" />
        </div>
        {/* vertical rail (phones) */}
        <div aria-hidden="true" className="absolute bottom-[6px] left-[5px] top-[6px] w-px bg-white/15 sm:hidden" />
        <ol
          className="relative grid gap-3 sm:gap-2 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ ["--cols" as string]: flow.length }}
        >
          {flow.map((f, i) => (
            <li key={f.stage} className="flex min-w-0 items-start gap-3 sm:block">
              <span className="mt-[3px] block h-[11px] w-[11px] shrink-0 rounded-full ring-[3px] ring-ink sm:mt-0" style={{ background: STAGE_TONES[i % STAGE_TONES.length] }} />
              <span className="min-w-0">
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-snow sm:mt-3 sm:truncate">{f.stage}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-fog sm:mt-1 sm:text-[11.5px]">{f.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ProjectCard({ p, wide }: { p: Project; wide: boolean }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const tilt = !reduced && !coarse;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3.5, -3.5]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4.5, 4.5]), { stiffness: 150, damping: 18 });
  const glow = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(520px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(143,200,255,0.10), transparent 45%)`
  );

  return (
    <div className="h-full" style={{ perspective: 1400 }}>
      <motion.article
        style={tilt ? { rotateX: rx, rotateY: ry } : undefined}
        onPointerMove={(e) => {
          if (!tilt) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
        className="glass group relative h-full overflow-hidden rounded-[30px] p-6 transition-[border-color] duration-500 hover:border-white/20 sm:p-8"
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className={`relative grid gap-7 ${wide ? "lg:grid-cols-[1fr_1.05fr] lg:gap-10" : ""}`}>
          <div className="min-w-0">
            <p className="eyebrow">{p.kicker}</p>
            <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.02em]">{p.name}</h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-mist/90">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
            </ul>
          </div>
          <div className="min-w-0 self-start">
            <FlowPreview flow={p.flow} />
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[13.5px] text-snow transition-colors hover:border-glow/50 hover:bg-white/[0.04]"
            >
              {open ? "Hide my contribution" : "Show my contribution"}
              <motion.svg animate={{ rotate: open ? 45 : 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </motion.svg>
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
            >
              <div className="mt-7 border-t hairline pt-6">
                <h4 className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-fog">My contribution</h4>
                <ul className={`mt-4 grid gap-3 ${wide ? "lg:grid-cols-2 lg:gap-x-10" : ""}`}>
                  {p.contribution.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-mist/90">
                      <span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                      <span className="min-w-0">{c}</span>
                    </li>
                  ))}
                </ul>
                {p.outcome && (
                  <p className="mt-6 rounded-2xl bg-gold/[0.07] px-4 py-3 text-[14.5px] text-snow ring-1 ring-gold/20">
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">Result</span>
                    {p.outcome}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      intro="Pipelines, lakehouses and reporting layers I've built. Open a card to see exactly what I did on it."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08} className={i < 2 ? "lg:col-span-2 min-w-0" : "min-w-0"}>
            <ProjectCard p={p} wide={i < 2} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
