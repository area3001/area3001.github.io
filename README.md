# Area3001 Home

Area3001 Home is the main website for Area3001, built as a retro CRT-style single page app with multiple routes.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Formspree (contact form submission)

## Features

- CRT-themed shell with toggleable effects (persisted in localStorage)
- Keyboard shortcuts for route navigation:
  - H: Home
  - P: Projects
  - A: About
  - C: Contact
- Route-based SEO metadata management (title, description, Open Graph, Twitter, canonical)
- Terminal-style contact page with a mini-game unlock flow
- Mobile responsive layout

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

The app will be available at the local Vite URL (usually http://localhost:5173).

## Scripts

```bash
npm run dev      # start development server
npm run build    # type-check + production build
npm run lint     # run eslint
npm run preview  # preview production build
```

## Project Structure

```text
src/
  App.tsx            # app shell, routes, CRT wrapper, navigation menu
  index.css          # global CRT styling and responsive behavior
  main.tsx           # React app entry point
  components/
    Button.tsx       # nav button with keyboard hotkeys
    Logo.tsx         # site logo
    Seo.tsx          # route-based SEO meta and canonical tags
  pages/
    Home.tsx
    Projects.tsx
    About.tsx
    Contact.tsx
```

## Deployment Notes

- SPA rewrites are configured in `vercel.json` so all routes resolve to `index.html`.
- Canonical URLs are managed at runtime in `src/components/Seo.tsx`.

## License

No license is currently specified in this repository.
