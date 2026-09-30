# UvNL Merkboek

Het externe merkboek van **Universiteiten van Nederland** — één plek waar
partners de merkprincipes, richtlijnen en goedgekeurde logo-assets vinden.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Wat het doet

- **Partnergericht.** De inhoud legt merk, toon, visuele stijl en toepassingen uit
  zonder interne productietools beschikbaar te maken.
- **Goedgekeurde logo-assets.** Partners kunnen alleen het officiële logopakket
  downloaden. Fonts en productie-assets worden niet los verstrekt.
- **Productie via het merkteam.** Nieuwe uitingen en maatwerk lopen via
  info@studioyoko.nl.
- **Light/dark toggle** (linksonder), voorkeur wordt onthouden.

## Structuur

```
index.html              Homepage — hero, live search, index, download-banner
pages/
  about.html            Wie we zijn / missie / persoonlijkheid
  logos.html            Alle logo's + do's & don'ts
  colors.html           Volledig kleurenpalet (kopieer HEX/RGB/HSL)
  typography.html       Lettertypes + specimens + hiërarchie
  icons.html            Alle merkiconen (PNG)
  photography.html      Fotografie-richtlijnen + voorbeelden
  formats.html          Formats & submerken (Wetensnap, Collegenacht, …) + partners
  tone-of-voice.html    Schrijfstijl & wel/niet
  guidelines.html       Do's & don'ts (visueel)
assets/                 css, js, fonts, logos, icons, photos, formats, partners
downloads/              uvnl-logo-pack.zip
```

Pure HTML/CSS/JS, geen build-stap, geen frameworks. Hostbaar via GitHub Pages.

## Hosting (GitHub Pages)

Zet Pages één keer aan: **Settings → Pages → Build and deployment → Deploy from a
branch → `main` / `(root)`**. De `.nojekyll` zorgt dat alle bestanden ongemoeid
geserveerd worden.

## Logobestanden

De `assets/logos/*.svg` zijn de **officiële vectoren uit de
[Figma-huisstijl](https://www.figma.com/design/ADqwKZfUgT3jGZ16bGFoom/)** —
rechtstreeks geëxporteerd, geen font-reconstructies meer. Het beeldmerk, de
wordmark (uitgelijnde letter­contouren), het staande logo, het vierkante lockup,
de U-outline en het vaandel zijn echte paden. Ze gebruiken `fill="currentColor"`,
zodat het merkboek ze on-the-fly groen, paper of wit kan kleuren (zie de
SVG-inliner in `assets/js/brandbook.js`).

De **formats/submerken** (Wetensnap, Collegenacht, De Werkplaats, …) en de
**U-lockups** op `pages/formats.html` zijn nu de officiële format-artwork uit de
Figma-huisstijl (transparante PNG's in `assets/formats/`). De **partnerlogo's**
(`assets/partners/`, wit) staan in dezelfde huisstijl en vullen de partnermuur.

---
© 2026 Universiteiten van Nederland · Vragen: info@studioyoko.nl
