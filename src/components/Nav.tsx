import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ResumeButton } from "./ui";

const LINKS = ["home", "about", "experience", "projects", "skills", "education", "contact"] as const;

export default function Nav() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="gutter fixed inset-x-0 z-50"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
    >
      <nav
        aria-label="Primary"
        className={`shell glass flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-shadow duration-500 ${scrolled ? "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]" : ""}`}
      >
        <a href="#home" className="font-display text-[17px] font-semibold tracking-tight text-snow" aria-label="Mohammed Taher, back to top">
          MT<span className="text-gold">.</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors ${active === id ? "text-snow" : "text-fog hover:text-mist"}`}
              >
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {id}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block"><ResumeButton variant="nav" label="Resume" /></span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-snow hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="shell glass mt-2 rounded-3xl p-3 lg:hidden"
          >
            <ul className="grid">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] ${active === id ? "bg-white/[0.06] text-snow" : "text-mist"}`}
                  >
                    {id}
                    {active === id && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-2 pb-2 pt-3 sm:hidden"><ResumeButton variant="solid" /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
