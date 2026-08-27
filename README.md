# UvNL Merkboek

Het gedeelde digitale merkboek van **Universiteit van Nederland** en
**Universiteit van Vlaanderen**. Het helpt redacteuren, ontwerpers, animatoren
en partners om eerst de juiste merkbeslissing te nemen en daarna het juiste
bestand te gebruiken.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Wat het doet

- **Beslissen vóór downloaden.** Merkprincipes, visuele uitleg, compositie,
  motion, formats en templates geven context bij ieder middel.
- **Expliciete NL/VL-keuze.** Geen IP-detectie of automatische woordvervanging;
  landspecifieke content en assets kiezen bewust in op de geselecteerde variant.
- **Regel, richtlijn en voorbeeld.** De interface maakt duidelijk wat vaststaat
  en waar ruimte voor interpretatie zit.
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
  photography.html      Fotografie-richtlijnen + art direction
  composition.html      Hiërarchie, uitsnede, ruimte en formaten
  motion.html           Motiontaken, timing en toegankelijk bewegen
  visual-storytelling.html  Wetenschappelijke uitleg in beeld
  formats.html          Formats & submerken (Wetensnap, Collegenacht, …) + partners
  templates.html        Wat per toepassing vaststaat en vrij is
  accessibility.html    Contrast, ondertiteling, motion en interactie
  governance.html       Eigenaarschap, versies, rechten en goedkeuring
  tone-of-voice.html    Schrijftaken, stemregels en voorbeelden
tools/
  uvnl-quote.html       Quote-card generator
  uvnl-contrast.html    WCAG contrast-checker
assets/                 css, js, fonts, logos, icons, photos, formats, partners
downloads/              uvnl-brand-kit.zip · uvnl-logo-pack.zip · uvnl-font-pack.zip
```

Pure HTML/CSS/JS, geen build-stap, geen frameworks. Hostbaar via GitHub Pages.

## Publicatiecheck

Bevestig vóór publieke publicatie het officiële merkcontact en controleer welke
fontbestanden, fotografie en campagne-assets volgens hun licentie publiek mogen
worden gedownload. Deze aandachtspunten staan ook op de pagina Merkbeheer.

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
