# Acceptance checklist

## Environment
- [ ] `npm install` completed
- [ ] `npm run db:generate` completed
- [ ] `npm run db:push` completed
- [ ] `npm run db:seed` completed
- [ ] `npm run build` completed
- [ ] `npm run check` completed
- [ ] API health returns `{ok:true}`

## Public flows
- [ ] All 7 regions show up
- [ ] Region detail links to heritage
- [ ] Heritage page shows history and map marker
- [ ] Search/filter returns appropriate records
- [ ] 3D scene loads, fallback works on unsupported devices
- [ ] Theme and KG/RU/EN switchers work
- [ ] Nature sound starts only after user interaction
- [ ] Audio remains stable across client-side navigation
- [ ] Product and experience can be added to cart
- [ ] Guest can register and log in
- [ ] Checkout persists demo order and booking
- [ ] Cart is cleared after successful checkout
- [ ] Favorite, review and saved trip work
- [ ] Admin can edit product and historical content
- [ ] Telegram notification sends if configured
- [ ] WhatsApp prefilled link opens if configured
- [ ] Mobile menu works at 360px

## Security / data
- [ ] No `.env` secrets in repository
- [ ] Non-admin cannot access `/admin` API
- [ ] No negative stock when buying concurrently
- [ ] Expired or invalid JWT rejected
- [ ] Broken image/network gracefully handled
- [ ] Historic facts and coordinates independently verified before real travel use
