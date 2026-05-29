# UvNL Merkboek

Het merkboek van **Universiteiten van Nederland** — één plek waar redacteuren én
partners alle merkelementen makkelijk vinden, bekijken en downloaden.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Wat het doet

- **Zoeken-eerst.** Een prominente zoekbalk op de homepage doorzoekt live alle
  merkelementen. Typ "groen logo", "paars", "font" of "bliksem" en de resultaten
  verschijnen meteen, met thumbnails.
- **Download de hele kit** in één klik (ZIP), of blader per onderdeel.
- **Bladeren door alles** — elk los logo, elke kleur, elk lettertype, elk icoon
  en elke foto is afzonderlijk te bekijken en te downloaden.
- **Combineren.** Voeg items toe aan een *selectie* en download of kopieer ze in
  één keer — handig om een setje merkelementen samen te stellen.
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
  tone-of-voice.html    Schrijfstijl & wel/niet
  guidelines.html       Do's & don'ts (visueel)
tools/
  uvnl-quote.html       Quote-card generator
  uvnl-contrast.html    WCAG contrast-checker
assets/                 css, js, fonts, logos, icons, photos
downloads/              uvnl-brand-kit.zip · uvnl-logo-pack.zip · uvnl-font-pack.zip
```

Pure HTML/CSS/JS, geen build-stap, geen frameworks. Hostbaar via GitHub Pages.

## Hosting (GitHub Pages)

Zet Pages één keer aan: **Settings → Pages → Build and deployment → Deploy from a
branch → `main` / `(root)`**. De `.nojekyll` zorgt dat alle bestanden ongemoeid
geserveerd worden.

## Let op — logobestanden

De logo-SVG's zijn een *best-effort* reconstructie uit de huisstijl (de officiële
Figma had geen uitgewerkte vectorgeometrie voor woordmerk/beeldmerk). Vervang
`assets/logos/*.svg` door de officiële AI/SVG-bestanden zodra die er zijn; de rest
van het merkboek blijft werken.

---
© 2026 Universiteiten van Nederland · Vragen: merk@universiteitenvannederland.nl
