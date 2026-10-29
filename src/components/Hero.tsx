import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import portrait from "../assets/taher.webp";
import { profile } from "../data/resume";
import { useMedia, useReducedMotion } from "../lib";
import { ArrowIcon, PrimaryLink, ResumeButton } from "./ui";

const Scene = lazy(() => import("./Scene"));

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (d: number) => ({
  initial: { opacity: 0, y: 26, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay: d, ease },
});

const LAYERS = [
  { name: "raw", color: "#6f7a8f" },
  { name: "bronze", color: "var(--bronze)" },
  { name: "silver", color: "var(--silver)" },
  { name: "gold", color: "var(--gold)" },
];

export default function Hero() {
  const mobile = useMedia("(max-width: 767px)");
  const reduced = useReducedMotion();
  const [gl, setGl] = useState(false);
  useEffect(() => setGl(canWebGL()), []);

  // portrait tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 18 });
  const shine = useTransform(mx, [-1, 1], ["20%", "80%"]);
  const shineBg = useTransform(shine, (s) => `radial-gradient(circle at ${s} 20%, rgba(255,255,255,0.35), transparent 55%)`);

  return (
    <section id="home" aria-label="Introduction" className="grain relative isolate overflow-hidden">
      {/* ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60%_55%_at_70%_40%,rgba(80,130,220,0.20),transparent_70%),radial-gradient(40%_40%_at_15%_85%,rgba(226,189,106,0.07),transparent_70%)]" />
      <div className="absolute inset-0 -z-10">
        {gl && (
          <Suspense fallback={null}>
            <Scene mobile={mobile} reduced={reduced} />
          </Suspense>
        )}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="gutter">
        <div className="shell grid min-h-[min(100svh,980px)] items-center gap-12 pb-20 pt-32 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:pt-36">
          <div className="order-2 md:order-1">
            <motion.p {...rise(0.15)} className="eyebrow flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              {profile.title} · Softpredict Technologies
            </motion.p>
            <motion.h1
              {...rise(0.28)}
              className="mt-6 font-display text-[clamp(3.1rem,9vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
            >
              Mohammed
              <br />
              <span className="bg-gradient-to-r from-snow via-silver to-gold bg-clip-text text-transparent">Taher</span>
            </motion.h1>
            <motion.p {...rise(0.42)} className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-mist sm:text-lg">
              {profile.intro}
            </motion.p>
            <motion.div {...rise(0.56)} className="mt-10 flex flex-wrap items-center gap-3">
              <PrimaryLink href="#projects">
                View My Work <ArrowIcon />
              </PrimaryLink>
              <ResumeButton />
            </motion.div>
            <motion.div {...rise(0.75)} className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
              {LAYERS.map((l, i) => (
                <span key={l.name} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
                  {l.name}
                  {i < LAYERS.length - 1 && <span className="px-1 text-white/20">→</span>}
                </span>
              ))}
              <span className="ml-2 normal-case tracking-normal text-fog/80">the medallion layers I build</span>
            </motion.div>
          </div>

          <motion.div
            className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] md:order-2 md:max-w-[420px]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.1, ease }}
            style={{ perspective: 1000 }}
          >
            <motion.figure
              className="relative"
              style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
                my.set(((e.clientY - r.top) / r.height) * 2 - 1);
              }}
              onPointerLeave={() => { mx.set(0); my.set(0); }}
            >
              <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(143,200,255,0.28),transparent)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] p-[1px] [background:linear-gradient(150deg,rgba(255,255,255,0.35),rgba(255,255,255,0.04)_40%,rgba(226,189,106,0.35))]">
                <div className="relative overflow-hidden rounded-[27px] bg-coal">
                  <img
                    src={portrait}
                    alt="Portrait of Mohammed Taher"
                    width={640}
                    height={658}
                    fetchPriority="high"
                    className="block aspect-[640/658] w-full object-cover"
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{ background: shineBg }}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
                </div>
              </div>
              <figcaption
                className="glass absolute -bottom-5 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:left-6 sm:right-auto"
                style={{ transform: reduced ? undefined : "translateZ(40px)" }}
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-fog">Currently</span>
                  <span className="block truncate text-[14px] text-snow">Data Engineer · since Jun 2024</span>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
