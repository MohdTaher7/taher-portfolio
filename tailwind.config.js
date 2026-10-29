/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080a",
        coal: "#0e1014",
        line: "rgba(214,226,255,0.09)",
        fog: "#8b93a3",
        mist: "#c7cdd8",
        snow: "#eef1f6",
        glow: "#8fc8ff",
        bronze: "#c8875a",
        silver: "#c3cad6",
        gold: "#e2bd6a",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['Geist', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
