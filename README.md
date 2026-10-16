# UvNL partnermerkboek

Extern merkboek van Universiteit van Nederland voor partners.

De homepage en hoofdnavigatie hebben vijf directe ingangen: Het merk,
Huisstijl, Fotografie, Voorbeelden en Partnerkit. Het merk wisselt automatisch
op basis van het IP-land naar Universiteit van Vlaanderen voor bezoekers uit
België; de NL/VL-schakelaar blijft beschikbaar als handmatige correctie.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Pagina's

- `index.html` — originele homepage met cover en fotocarrousel
- `pages/about.html` — merk, missie, persoonlijkheid en tone of voice
- `pages/logos.html` — Nederlandse en Vlaamse logo's
- `pages/colors.html` — kleuren
- `pages/typography.html` — typografie zonder fontdownloads
- `pages/photography.html` — aparte Nederlandse en Vlaamse beeldbanken
- `pages/examples.html` — toepassingen, voorbeelden en formats
- `pages/download.html` — eerst een merk kiezen (UvNL, UvVL of beide), daaronder de passende packs; per merk drie packs (partnerkit = alles, logo pack, foto-pack) uit `scripts/split-brand-packs.py`

## De Vooruitblik 2027 (Universiteit van Vlaanderen)

Aparte site in `vooruitblik/` (home, 23 hoofdstukken, boek, videopodcast, Radio 1,
live, partners, vormgeving met downloads van logo, beeld, 3D-elementen en banners). Alle inhoud staat in `vooruitblik/data/hoofdstukken.json`; de
pagina's worden gegenereerd met `python3 scripts/build-vooruitblik.py`. De map is
zelfstandig (eigen assets) en kan zo naar een eigen repo.

De website is pure HTML/CSS/JS en wordt via GitHub Pages gepubliceerd. De
oorspronkelijke interne versie blijft bewaard op branch
`backup/internal-brandbook-2026-09-30`.

---
© 2026 Universiteit van Nederland · Vragen: info@studioyoko.nl
