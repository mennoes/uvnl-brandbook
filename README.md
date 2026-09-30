# UvNL partnergids

De externe partnerwebsite van **Universiteit van Nederland**. De site brengt het
merkverhaal, de belangrijkste visuele principes, voorbeelden uit de UvNL-case en
de samenwerkingsroute samen in een compacte site voor partners.

**Live:** https://mennoes.github.io/uvnl-brandbook/

## Voor partners

- Het officiële logopakket is beschikbaar voor eenvoudige partnervermeldingen en
  goedgekeurde co-branding.
- Campagnes, social content, presentaties, video-assets en events worden samen met
  het merkteam gemaakt of beoordeeld.
- Fonts, templates, generators, fotografie en losse campagne-assets zijn geen
  zelfbedieningsdownloads.
- Productie en merkchecks lopen via info@studioyoko.nl.

## Techniek

De site bestaat uit pure HTML, CSS en JavaScript en heeft geen buildstap.

```text
index.html                  Homepage en fotografische carrousel
pages/merk.html             Merkverhaal, waarden en tone of voice
pages/huisstijl.html        Logo, kleur, typografie en fotografie
pages/voorbeelden.html      UvNL-case en toepassingen
pages/samenwerken.html      Partnerroutes, proces en contact
assets/css/partner.css      Vormgeving en responsive layout
assets/js/partner.js        Navigatie, carrousel en reveal-animaties
assets/applications/        UvNL-casebeelden en toepassingen
downloads/uvnl-logo-pack.zip
```

Lokaal starten:

```bash
python3 -m http.server 4173
```

Open daarna http://localhost:4173/.

De oorspronkelijke interne variant is bewaard op de branch
`backup/internal-brandbook-2026-09-30`.

---
© 2026 Universiteiten van Nederland · Vragen: info@studioyoko.nl
