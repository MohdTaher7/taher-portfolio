import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { downloadResume, useCoarsePointer, useReducedMotion } from "../lib";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.35, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id, eyebrow, title, intro, children,
}: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="gutter relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 id={`${id}-title`} className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[60ch] text-fog">{intro}</p>}
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

/** Button that leans toward the cursor. Off for touch and reduced motion. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const off = reduced || coarse;
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (off || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

const btnBase =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300";

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Magnetic>
      <a href={href} className={`${btnBase} bg-snow text-ink hover:bg-white shadow-[0_0_40px_-8px_rgba(143,200,255,0.55)]`}>
        {children}
      </a>
    </Magnetic>
  );
}

export function ResumeButton({ variant = "ghost", label = "Download Resume" }: { variant?: "ghost" | "solid" | "nav"; label?: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const run = async () => {
    setStatus("Preparing…");
    const r = await downloadResume();
    setStatus(r === "declined" ? "Download cancelled" : r === "opened" ? "Opened in a new tab" : r === "failed" ? "Couldn't download" : "Resume downloaded");
    window.setTimeout(() => setStatus(null), 2600);
  };
  const cls =
    variant === "nav"
      ? "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-snow hover:border-glow/60 hover:bg-white/5 transition-colors"
      : variant === "solid"
      ? `${btnBase} bg-snow text-ink hover:bg-white`
      : `${btnBase} glass text-snow hover:border-glow/50`;
  const btn = (
    <button type="button" onClick={run} className={cls} aria-describedby={status ? "resume-status" : undefined}>
      <DownloadIcon />
      {label}
    </button>
  );
  return (
    <span className="relative inline-block">
      {variant === "nav" ? btn : <Magnetic>{btn}</Magnetic>}
      <span id="resume-status" role="status" aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coal/95 px-3 py-1 font-mono text-[11px] text-mist ring-1 ring-white/10 transition-opacity ${status ? "opacity-100" : "opacity-0"}`}>
        {status ?? ""}
      </span>
    </span>
  );
}

export const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
