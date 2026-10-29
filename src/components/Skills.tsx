import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects, skillAliases, skills, experience } from "../data/resume";
import { Reveal, Section } from "./ui";

const GROUP_TONE: Record<string, string> = {
  Languages: "var(--glow)",
  "Data Tools": "var(--gold)",
  Platforms: "var(--silver)",
  "Version Control": "var(--bronze)",
  Concepts: "var(--glow)",
  Expertise: "var(--gold)",
};

function whereUsed(skill: string) {
  const terms = (skillAliases[skill] ?? [skill]).map((t) => t.toLowerCase());
  const hit = (text: string) => terms.some((t) => new RegExp(`(^|[^a-z])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "i").test(text));
  const inProjects = projects
    .filter((p) => hit([p.summary, ...p.tech, ...p.contribution, ...p.flow.map((f) => f.detail)].join(" · ")))
    .map((p) => p.name);
  const inRoles = experience
    .filter((j) => hit([...j.points, ...j.tools].join(" · ")))
    .map((j) => `${j.role}, ${j.company}`);
  return { inProjects, inRoles };
}

export default function Skills() {
  const [focus, setFocus] = useState<string | null>(null);
  const usage = useMemo(() => (focus ? whereUsed(focus) : null), [focus]);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Toolkit"
      intro="Grouped as on my resume. Hover or tab to a skill to see where I've used it."
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <div className="grid items-start gap-5 sm:grid-cols-2">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.05} className={`min-w-0 ${g.group === "Concepts" || g.group === "Expertise" ? "sm:col-span-2" : ""}`}>
              <div className="glass h-full rounded-[24px] p-5 sm:p-6">
                <h3 className="flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-fog">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GROUP_TONE[g.group] }} />
                  {g.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s, i) => {
                    const on = focus === s;
                    return (
                      <motion.li
                        key={s}
                        animate={{ y: [0, -2.5, 0] }}
                        transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setFocus(s)}
                          onFocus={() => setFocus(s)}
                          onClick={() => setFocus(s)}
                          aria-pressed={on}
                          className={`rounded-full border px-3.5 py-2 text-left text-[13.5px] transition-all duration-300 ${
                            on ? "border-transparent bg-snow text-ink shadow-[0_0_28px_-6px_rgba(143,200,255,0.7)]" : "border-white/10 bg-white/[0.03] text-mist hover:border-white/25"
                          }`}
                        >
                          {s}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="min-w-0">
          <aside className="glass sticky top-28 rounded-[28px] p-6 sm:p-8" aria-live="polite">
            <p className="eyebrow">Where I've used it</p>
            <AnimatePresence mode="wait">
              {focus && usage ? (
                <motion.div key={focus} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <h3 className="mt-4 font-display text-[28px] font-semibold leading-tight tracking-tight">{focus}</h3>
                  {usage.inRoles.length + usage.inProjects.length === 0 ? (
                    <p className="mt-4 text-[15px] text-fog">Listed in my skills on the resume.</p>
                  ) : (
                    <div className="mt-5 grid gap-5">
                      {usage.inRoles.length > 0 && (
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog">Roles</p>
                          <ul className="mt-2 grid gap-1.5">{usage.inRoles.map((r) => <li key={r} className="text-[15px] text-snow">{r}</li>)}</ul>
                        </div>
                      )}
                      {usage.inProjects.length > 0 && (
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog">Projects</p>
                          <ul className="mt-2 grid gap-1.5">
                            {usage.inProjects.map((r) => (
                              <li key={r}><a href="#projects" className="text-[15px] text-snow underline decoration-white/20 underline-offset-4 hover:decoration-gold">{r}</a></li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 text-[15px] leading-relaxed text-fog">
                  Pick any skill on the left. This panel lists the roles and projects on my resume where it appears.
                </motion.p>
              )}
            </AnimatePresence>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
