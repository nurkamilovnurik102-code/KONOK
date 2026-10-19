# KONOK KG — Heritage Tourism Platform

**Educational full-stack project / ОКУРМЕН.** Discover Kyrgyzstan's historical places, demo excursions and local crafts.

## What is included
- React 18 + Vite + TypeScript, responsive cinematic interface, day/night, KG/RU/EN, 3D mountain atmosphere with graceful fallback, Leaflet/OpenStreetMap map.
- Node/Express REST API, PostgreSQL/Prisma, bcrypt/JWT, admin content editor, favorites, reviews, journeys, products, demo booking and checkout.
- Nature sound player controlled by a small header icon; admin may set an **existing HTTPS audio URL** (direct upload is NOT implemented).
- WhatsApp prefilled contact link after order; Telegram server-side admin notifications if configured.
- Seed: 7 regions, 12 **illustrative** places, 12 demo experiences and 18 demo products. **Historical descriptions and coordinates are draft educational data, not travel advice.** Photos are generic illustrative images, not verified depictions of the named sites.

## Requirements
Node.js 20+; PostgreSQL 15+; npm. Network access to install packages and load map/photo tiles.

## First launch (Mac / VS Code)
1. Open the `KONOK-KG` folder in VS Code.
2. Create PostgreSQL database named `konok` (local PostgreSQL or hosted database).
3. Copy `apps/api/.env.example` to `apps/api/.env` and set `DATABASE_URL`, a strong `JWT_SECRET` (24+ chars), `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD` (10+ chars).
4. Copy `apps/web/.env.example` to `apps/web/.env`.
5. From repository root: `npm install`
6. `npm run db:generate`
7. `npm run db:push`
8. `npm run db:seed`
9. Open two terminals: `npm run dev:api` and `npm run dev`.
10. Open http://localhost:5173. API health: http://localhost:4000/api/v1/health.
11. Sign in using the admin credentials set in `.env`; visit `/admin`.

## Demo walkthrough
- Explore 7 regions, open a historical site, view its map pin and related demo excursion.
- Register a user, add a craft and excursion (choose a schedule) to cart, confirm a demo order.
- Sign in as admin, inspect orders and booking statuses, edit content and atmosphere settings.
- Configure WhatsApp in Admin → Settings; add Telegram secrets in API `.env` if desired.

## Deployment
- Deploy `apps/web` to Vercel (build: `npm run build`, output: `dist`). Set `VITE_API_URL=https://YOUR-API/api/v1`.
- Deploy `apps/api` to a persistent Node server (e.g. Render/Railway/Fly). Set `DATABASE_URL`, `JWT_SECRET`, `WEB_ORIGIN=https://YOUR-VERCEL-DOMAIN` and optional Telegram variables.
- Use hosted PostgreSQL and run `prisma db push` + seed **once**. For production, use migrations, proper auditing and review authentication/security.
- Never commit `.env` or real credentials.

## Known limitations / honest status
- No live Stripe/MBank/Post.kg payment; `paymentStatus=DEMO`.
- No actual WhatsApp message sending; user clicks a prefilled `wa.me` link.
- Telegram notifications require bot token and chat ID; no customer-facing Telegram bot conversation.
- No AI chatbot (deliberately deferred).
- Audio URL settings work; direct upload/Cloudinary audio pipeline is deferred.
- OAuth, refresh tokens, partner self-service, realtime updates and dedicated media upload are not implemented in this starter.
- Admin edits use a JSON form rather than a fully polished field-by-field CMS.
- Booking uses serializable transactions, but under high concurrency retry handling and additional constraints are needed.
- Seed historical data and photos are illustrative and must be editorially verified before real publication.
- No npm dependencies were installed or browser E2E tests run in the file-generation environment if package registry access is unavailable; see `docs/TESTING.md`.

## Project anatomy
`apps/web/src/pages/Public.tsx`: visitor flows; `Account.tsx`: auth/cart/checkout/profile; `Admin.tsx`: dashboard and content; `components/Nature.tsx`: 3D; `components/Map.tsx`: map; `lib/state.tsx`: cart/session/audio; `lib/api.ts`: HTTP; `apps/api/src/index.js`: API routes; `apps/api/prisma/schema.prisma`: data models; `apps/api/prisma/seed.js`: demo data.
