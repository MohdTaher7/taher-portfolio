import { useEffect, useState } from "react";
import { RESUME_FILE } from "./data/resume";

export const resumeUrl = () => new URL(RESUME_FILE, document.baseURI).href;

export function useMedia(query: string) {
  const [match, setMatch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useCoarsePointer = () => useMedia("(pointer: coarse)");

type DownloadOutcome = "saved" | "declined" | "opened" | "failed";

/**
 * Download the original PDF resume.
 * Inside a Claude artifact the page must ask the viewer through the `downloads`
 * capability; on a normal host a plain <a download> does the job.
 */
export async function downloadResume(): Promise<DownloadOutcome> {
  const url = resumeUrl();
  const claude = (window as unknown as { claude?: { use?: (n: string) => Promise<any> } }).claude;
  if (claude?.use) {
    try {
      const downloads = await claude.use("downloads");
      if (downloads) {
        const blob = await fetch(url).then((r) => {
          if (!r.ok) throw new Error("fetch failed");
          return r.blob();
        });
        await downloads.save({ filename: RESUME_FILE, data: blob });
        return "saved";
      }
    } catch (e) {
      if ((e as { code?: string })?.code === "declined") return "declined";
    }
    window.open(url, "_blank", "noopener");
    return "opened";
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = RESUME_FILE;
  document.body.appendChild(a);
  a.click();
  a.remove();
  return "saved";
}

export async function copyText(text: string, fallbackEl?: HTMLElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const range = document.createRange();
      range.selectNodeContents(fallbackEl);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    return false;
  }
}
