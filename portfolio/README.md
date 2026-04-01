# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend-focused Portfolio Enhancements (April 2026)

This project now includes a backend-first portfolio section:

- polished personal brand copy for Backend Developer (device reliability + metrics)
- live GitHub metrics with API projects, PR count, top languages, and followers
- API health check card (`https://httpstat.us/200?sleep=100`)
- architecture deep dive in `ProjectDetailModal` (ERD + flow diagram via Mermaid)
- streamlined project case studies (challenge → solution → result)
- CI/CD-ready automation pipeline badges and status sections
- operational dashboard (`OperationalReadiness`) with real-time KPI trend, SLO, and runbook
- runbook export: copy to clipboard & download markdown

## Deployment (Vercel)

Recommended production deployment for this portfolio:

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Log in:

```bash
vercel login
```

3. Deploy:

```bash
cd c:\\Users\\Berlin Sugiyanto\\Portfolio\\portfolio
vercel --prod
```

4. Build is configured by `vercel.json`:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`

5. Optional: update Vercel project settings for environment variables (if future backend API keys needed).

## Local Preview

```bash
npm run preview
# open http://localhost:4173
```

