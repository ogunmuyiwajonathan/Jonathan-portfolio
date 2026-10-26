![Jonathan logo](public/images/logo.webp)

# Jonathan.

Personal portfolio of Jonathan Ogunmuyiwa — Full Stack Developer & UI Designer.

🚀 **Live:** https://jonworld.vercel.app/

I craft high-performance digital experiences that bridge the gap between technical excellence and intuitive design. This repo holds the source for my portfolio site — a React + Vite application with an earth-and-space hero, spotlight project cards, and smooth Framer Motion transitions.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D / WebGL | OGL (React Three Fiber adjacent) |
| Routing | React Router 7 |
| UI primitives | shadcn/ui, Radix UI, Lucide React |
| State / data | React Query patterns, custom hooks |
| Icons | react-icons, lucide-react |
| Fonts | Geist (via @fontsource-variable/geist) |
| Deploy | Vercel |

## 📂 Projects featured

| Project | Description | Tech | Live |
|---|---|---|---|
| **CampusCoin** | Full-stack student budget tracker with AI assistant (Rix), built for TechWiz 7 competition | React 19, Express 5, MongoDB, Tailwind v4 | https://campus-coin-nine.vercel.app/ |
| **Dr. Olatoye** | Professional landing page for an educational consultant serving schools across Nigeria and Ghana | React, Tailwind CSS, Framer Motion | https://dr-olatoye.vercel.app/ |
| **Solibu Stories** | Digital story-reading platform with 3D book animations | React, TypeScript, Convex, Three.js | https://solibu-stories.vercel.app/ |
| **LifeOS** | AI-powered life operating system and productivity dashboard | React, Supabase | https://life-o-system.vercel.app/ |
| **Belleville Dental Care (DEMO)** | Dental clinic platform with appointment scheduling | React, TypeScript | https://project-belleville-dental.vercel.app/ |
| **Tasty Crust (DEMO)** | Responsive bakery/restaurant web app with menu, booking, and cart | Tailwind CSS | https://tasty-crust.vercel.app/ |
| **Stalworld Tech (DEMO)** | Professional landing page and marketing site | React.js | https://stalworldtech.vercel.app/ |
| **Portfolio Website** | First website — pure HTML, CSS, JavaScript | HTML, CSS, JS | https://port-murex-tau.vercel.app/ |

CampusCoin gets a deeper treatment below — it's my most substantial full-stack build to date.

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

The app runs on `http://localhost:5173` by default.

## 📄 What's inside

- `src/pages/` — Home, About, Works, Contact, NotFound
- `src/components/` — SpotlightCard, ScrollReveal, Marquee, ProjectModal, and animated react-bits
- `src/hooks/` — usePageTitle
- `src/lib/` — utils
- `public/images/` — project screenshots (WebP, with 300w/600w/full srcSet variants)
- `public/Jonathan_Ogunmuyiwa_CV.pdf` — CV download

## 🎨 Design decisions

- **Earth & space hero** — animated WebGL background with OGL, moon orbit, particle field
- **Spotlight card layout** — glassmorphism cards with hover lift and gradient accents
- **Project cards** — responsive image grids with srcSet for 300w / 600w / full resolutions
- **Marquee ticker** — scrolling service tags across the hero section
- **Dark-first palette** — deep backgrounds with accent-blue highlights (`#38bdf8`)

## 📫 Contact

I'm currently accepting select freelance partnerships and collaborative ventures.

- GitHub: github.com/ogunmuyiwajoanathan
- LinkedIn: linkedin.com/in/ogunmuyiwajoanathan
- WhatsApp: available via the Connect page on the live site

---

Built with React, TypeScript, Tailwind, Framer Motion, and deployed on Vercel.