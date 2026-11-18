# Anand Wire Industries – Website

React (Vite) + Framer Motion website for Anand Wire Industries, Rajkot.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in /dist
```

## Edit content
All text, phone numbers, brands, stats and documents live in **`src/data/site.js`**.

- **Presence & Experience** numbers/states/milestones → `experience` (currently PLACEHOLDERS – replace with your real figures).
- **WhatsApp number** → `company.whatsapp` (`919925117519`).
- **Jaguar / On Point** catalogues → put the PDF in `public/docs/` and poster image in `public/images/`, then set `poster` and `catalogue` for that brand.

## Folders
- `public/docs/` – downloadable PDFs (catalogues, ZED certificate & report)
- `public/images/` – product, factory and certificate images
- `public/videos/` – showcase video + hero background loop (replace with real factory footage anytime, same file names)

## Deploy
Upload the `dist/` folder to any static host (Netlify, Vercel, Hostinger, GoDaddy cPanel, etc.).
