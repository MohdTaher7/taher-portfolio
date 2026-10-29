import { useRef, useState } from "react";
import { profile } from "../data/resume";
import { copyText } from "../lib";
import { Magnetic, Reveal, ResumeButton } from "./ui";

function CopyRow({ label, value, href }: { label: string; value: string; href: string }) {
  const [done, setDone] = useState<string | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  return (
    <div className="glass flex flex-col gap-4 rounded-[24px] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">{label}</p>
        <a href={href} className="mt-1 block text-[clamp(1.05rem,2.6vw,1.45rem)] text-snow [overflow-wrap:anywhere] hover:text-white">
          <span ref={textRef}>{value}</span>
        </a>
      </div>
      <Magnetic strength={0.2}>
        <button
          type="button"
          onClick={async () => {
            const ok = await copyText(value, textRef.current);
            setDone(ok ? "Copied" : "Selected, press Ctrl+C");
            window.setTimeout(() => setDone(null), 2000);
          }}
          className="shrink-0 rounded-full border border-white/12 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-mist transition-colors hover:border-glow/50 hover:text-snow"
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          <span aria-live="polite">{done ?? "Copy"}</span>
        </button>
      </Magnetic>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="gutter relative scroll-mt-24 overflow-hidden pb-16 pt-24 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[820px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(226,189,106,0.11),transparent)]" />
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,7.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-bronze via-gold to-silver bg-clip-text text-transparent">meaningful.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal className="min-w-0"><CopyRow label="Email" value={profile.email} href={`mailto:${profile.email}`} /></Reveal>
          <Reveal className="min-w-0" delay={0.06}><CopyRow label="Phone" value={profile.phone} href={`tel:${profile.phoneHref}`} /></Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10"><ResumeButton variant="solid" /></div>
        </Reveal>
        <footer className="mt-24 flex flex-col gap-2 border-t hairline pt-6 font-mono text-[11.5px] text-fog sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Mohammed Taher</span>
          <a href="#home" className="hover:text-snow">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
