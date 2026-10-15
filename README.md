# UvNL partnermerkboek

Extern merkboek van Universiteit van Nederland voor partners.

De homepage en hoofdnavigatie hebben vijf directe ingangen: Het merk,
Huisstijl, Fotografie, Voorbeelden en Partnerkit. Huisstijl bevat
Logo's, Kleuren en Typografie (subnavigatie op die drie pagina's). Het merk wisselt automatisch
op basis van het IP-land naar Universiteit van Vlaanderen voor bezoekers uit
België; de NL/VL-schakelaar blijft beschikbaar als handmatige correctie.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Pagina's

- `index.html` — homepage: hero, ingangen, merk in één oogopslag, formats en partnerkit
- `pages/about.html` — merk, missie, persoonlijkheid en tone of voice
- `pages/logos.html` — Nederlandse en Vlaamse logo's
- `pages/colors.html` — kleuren (onderdeel van Huisstijl)
- `pages/typography.html` — typografie zonder fontdownloads (onderdeel van Huisstijl)
- `pages/photography.html` — aparte Nederlandse en Vlaamse beeldbanken
- `pages/examples.html` — toepassingen, voorbeelden en formats
- `assets/css/plus.css` — stijlen voor subnav, homepage-secties
- `pages/download.html` — partnerkit, logo's en fotografie per merk

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
