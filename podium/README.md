# Podiumbeelden (Universiteit van Nederland / Universiteit van Vlaanderen)

Achtergrondbeelden voor het middenscherm van een groot podium (16:9, donker).
Stijl: vlak, papieren cut-out (witte rand + schaduw), korrel/papiertextuur,
merkkleuren. Geen tekst, geen logo, zodat de professor ervoor kan staan.

- `uit/*.jpg` — 3840×2160 stills (JPG q92, ±2–4 MB), direct bruikbaar in PowerPoint
- `uit/loops/*.mp4` — 8 s naadloze loops (1920×1080, 30 fps): zet in PowerPoint op
  *Automatisch afspelen* + *Herhalen tot gestopt*
- `src/` — bronbestanden (SVG gebouwd in JavaScript), aanpasbaar
- `render.cjs` — rendert alles opnieuw

## Opnieuw renderen / eigen data

```sh
export NODE_PATH=/opt/node22/lib/node_modules   # waar playwright staat
node podium/render.cjs alles
node podium/render.cjs taart data.json taart.jpg "Titel (optioneel)"
node podium/render.cjs foto foto.jpg uit.jpg kwantum     # of: groen
```

`data.json` voor een taartdiagram: `[{"label":"Ja","value":62},{"label":"Nee","value":38}]`
(max. 6 plakken; percentages worden zelf berekend).
