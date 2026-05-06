# Hitesh Bhatnagar — Premium WebGL Portfolio

A premium recruiter-facing portfolio built with React, Vite, Tailwind CSS, Framer Motion, Lenis smooth scroll, and React Three Fiber WebGL.

## Features

- Premium dark glassmorphism interface
- JetBrains Mono typography
- Interactive WebGL 3D hero scene
- Mouse-reactive spotlight and 3D tilt cards
- Smooth scrolling with Lenis
- Project filtering
- Resume download
- GitHub, LinkedIn, email, and phone CTA links
- Vercel, Netlify, and GitHub Pages deployment config

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
