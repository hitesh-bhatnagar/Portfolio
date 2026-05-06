# Hitesh Bhatnagar —  Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, Lenis smooth scrolling, and React Three Fiber. Designed to present projects, skills, research, and contact details in a polished, recruiter-friendly experience.

## Highlights

- Dark glassmorphism UI with modern visual depth
- JetBrains Mono-inspired typography
- Interactive WebGL 3D hero experience
- Mouse-reactive spotlight and 3D tilt cards
- Smooth scrolling with Lenis
- Project filtering and polished content sections
- Resume download
- Social/contact CTAs for GitHub, LinkedIn, email, and phone
- Free deployment support for Vercel, Netlify, and GitHub Pages

## Live Demo

View the deployed portfolio here:

**[Open Live Site](portfolio-pi-dusky-81.vercel.app)**


## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Important Windows note

If npm shows `Exit handler never called`, clean cache and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm cache verify
npm install
npm run dev
```

If npm still fails, use Node.js 20 LTS or pnpm:

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

## Free deployment

### Vercel

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` is already included.
