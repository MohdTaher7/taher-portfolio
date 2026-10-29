# Mohammed Taher — Portfolio

React + TypeScript + Vite + Tailwind CSS + React Three Fiber + Framer Motion.

## Run
```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/ (deploy to Vercel, Netlify, GitHub Pages…)
```

## Edit content
All text lives in `src/data/resume.ts`. Update that one file; the sections read from it.
The downloadable resume is `public/Mohammed_Taher_Data_Engineer_Resume.pdf` and the photo is `src/assets/taher.webp`.

## Structure
- `src/components/Scene.tsx` — WebGL medallion-flow scene (lazy-loaded, paused off-screen, fewer particles on mobile, static under reduced motion)
- `src/components/*` — Nav, Hero, About, Experience, Projects, Skills, Education (+ certifications), Contact
- `src/lib.ts` — media hooks, resume download, clipboard helper
"# portfolio" 
