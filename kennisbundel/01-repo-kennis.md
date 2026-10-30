# Kennisbundel: Universiteit van Nederland (UvNL) en Universiteit van Vlaanderen (UvVL)

Doel: één bestand dat je aan een AI-assistent (bijv. ChatGPT) kunt geven als context over het merk,
de huisstijl, de keuzes en de projecten. Bron: de repository mennoes/uvnl-brandbook (stand 2026-10-30).
Taal van de inhoud: Nederlands. Opdrachtgever/ontwerper: Menno (Studio Yoko, menno@studioyoko.nl).

Inhoud:
1. Wat is het (kort)
2. Merkkennis UvNL (BRAND.md)
3. Tekst van de merkboek-pagina's (het merk, huisstijl, kleuren, typografie, fotografie, voorbeelden, download)
4. Ontwerpsysteem: kleur- en typetokens uit de code
5. De Vooruitblik 2027 (UvVL): doel, toolkit, 23 hoofdstukken, 46 sprekers, pagina's, vormgeving
6. Technische keuzes (bouw, beveiliging, feedback)
7. Besliskroniek: alle wijzigingen met de reden erbij (git-geschiedenis)


## 1. Wat is het
- **Universiteit van Nederland (UvNL)**: opgericht 2013 door Alexander Klöpping & Marten Blankesteijn; 14 Nederlandse universiteiten als partner; 800+ gratis colleges online; 40 mln+ views.
- **Universiteit van Vlaanderen (UvVL)**: Vlaamse tegenhanger, zelfde merkgrammatica, andere afzender. Het partnermerkboek wisselt automatisch naar UvVL voor bezoekers uit België (IP-land); NL/VL-schakelaar blijft als handmatige correctie.
- **Partnermerkboek** (https://mennoes.github.io/uvnl-brandbook/): extern merkboek voor partners. Vijf ingangen: Het merk, Huisstijl, Fotografie, Voorbeelden, Partnerkit. De oorspronkelijke interne versie staat op branch `backup/internal-brandbook-2026-09-30`.
- **De Vooruitblik 2027**: boek + videopodcast + Radio 1 + live, van Universiteit van Vlaanderen met vijf Vlaamse universiteiten (UAntwerpen, UHasselt, KU Leuven, UGent, VUB), uitgegeven door Pelckmans. Eigen site/partnertoolkit in `vooruitblik/` (adres: vooruitblik.universiteitvanvlaanderen.be), zelfstandig te verhuizen naar eigen repo.


## 2. Merkkennis UvNL (BRAND.md, letterlijk)

# Universiteit van Nederland — merkkennis

> Eén-bestands samenvatting van de huisstijl, bedoeld als kennisbron/context
> voor Claude (Claude Project, Claude Code of een andere AI-assistent).
> Live merkboek: https://mennoes.github.io/uvnl-brandbook/

## In één zin
Eerlijk, echt, een beetje rommelig. Kennis in wording, geen corporate
glanslaag.

## Tone of voice
- Taal: **Nederlands**. Nieuwsgierig, slim, toegankelijk — als een slimme
  vriend die iets uitlegt op een borrel, niet als een leerboek.
- **Vragen in titels.** Bijna elke video, post en thumbnail is een vraag.
  Vragen nodigen uit, statements beleren.
- **Plain Dutch, geen jargon.** Gebruikt een wetenschapper een term, leg 'm
  in de volgende zin uit.
- **Cijfers als cijfers** ("3 dingen die je niet wist over…"), niet voluit.
- **Geen corporate omhaal.** "Dit is wat we niet weten" verslaat "Dit is
  mogelijk onbekend".

**Wel ✅ / Niet ❌**
- ✅ "Echte mensen, eerlijk in beeld." — ❌ "Authentieke representatie van onze talenten."
- ✅ "Snap je het?" — ❌ "Heeft u dit kunnen volgen?"

## Kleuren (hex)
| Naam | Hex | Gebruik |
|---|---|---|
| Varsity Green | `#004B36` | Primair / standaard logokleur |
| Green bright | `#00805C` | Links, accenten |
| Green glow | `#00BC85` | Highlight |
| Electric Purple | `#D6ACFF` | Accent #1 |
| Ballpoint (purple deep) | `#1B0757` | Donker accent |
| Electric Red | `#EE5245` | Accent |
| Yellow | `#FBF07A` | Accent / tape |
| Blue | `#5BA5FE` | Accent |
| Pink | `#FFC9D7` | Accent |
| Paper | `#F4F0ED` | Lichte achtergrond / tekst op donker |

Principe: **Groen op Paper** als basis; per uiting **één** verzadigde
accentkleur. De herkenbaarste combinatie is **Electric Purple op Varsity Green**.

## Typografie
- **Display / koppen:** Oldschool Grotesk Condensed (uppercase, strak,
  `letter-spacing:-0.01em`). Fallbacks: Barlow Condensed, Oswald.
- **Sans / lopende tekst:** Oldschool Grotesk. Fallbacks: Inter, Helvetica Neue.
- **Serif (italic):** Tiempos Text — alleen voor ondertitels/citaten, nooit
  hele alinea's.
- **Mono:** JetBrains Mono — voor code/labels.

## Logo
- Het beeldmerk is de **U**; daarnaast wordt de **vaandel** (schuine pennant)
  rechtsboven als hoek-overlay gebruikt.
- Standaardkleur is **Varsity Green**; witte variant op donkere
  achtergronden/foto's; zwart alleen voor eenkleurig drukwerk.
- Bron-SVG's gebruiken `fill="currentColor"` (inline op web); downloadbare
  bestanden hebben de kleur ingebakken.

## Fotografie
Echte foto's, strak gecropt, eventueel met een merkkleur-wash (multiply).
Redactioneel en eerlijk — geen gladde SaaS-stockbeelden.

## Iconen & ornamenten
**Geen emoji in het merk.** Gebruik de merkiconen (bliksem, pijl, pijn, snaps,
spark) als emotionele grammatica — herkleurbare ornamenten, 8–20° gedraaid.
Geen Unicode-emoji.

---
© 2026 Universiteit van Nederland · Vragen: info@studioyoko.nl


### README van de repo

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


## 3. Tekst van de merkboek-pagina's (uit de HTML gehaald)


### Pagina: Het merk (about) (pages/about.html)

Bekijk het manifest · video 
 Missie 
 De Universiteit van Nederland maakt wetenschap toegankelijk voor iedereen. Samen met de Nederlandse universiteiten laten we topwetenschappers elke week gratis online college geven — zodat iedereen kan blijven leren van de beste docenten van het land.
 Wat we doen
 Elke week verschijnen er nieuwe, gratis colleges van topwetenschappers — online voor iedereen te bekijken. Daarnaast maken we een podcast en organiseren we live events.
 Voor wie
 Voor iedereen die nieuwsgierig is — van scholier tot professor. Je hebt geen voorkennis of inschrijving nodig: de colleges zijn gratis en voor iedereen toegankelijk.
 Meer voorbeelden →
 In het kort
 2013 Opgericht door Alexander Klöpping & Marten Blankesteijn 
 14 Nederlandse universiteiten als partner 
 800+ Gratis colleges online 
 40 mln+ Views op de colleges 
 Persoonlijkheid
 Gedurfd, academisch en toegankelijk. Met echte wetenschappers, heldere vragen en een speelse, redactionele beeldtaal.
 Echt
 Altijd echte mensen, nooit stock.
 Nieuwsgierig
 Bijna alles is een vraag — we prikkelen nieuwsgierigheid in plaats van te beleren.
 Toegankelijk
 Plain Dutch, geen jargon. Jij/je, nooit u.
 Een beetje rommelig
 Tape, scribbles, ruwe randen — met opzet.
 Tone of voice
 We schrijven in het Nederlands — nieuwsgierig, slim en toegankelijk, als een slimme vriend die iets uitlegt op een borrel. Altijd je / jij , nooit u .
 Wel Niet 
 Vriendelijk, enthousiast, inspirerend Hyperactief, hip of populair 
 Uitleggend, open en begrijpelijk Oubollig en ouderwets 
 Jong, humoristisch en scherp Simpel of kinderachtig 
 Af en toe een grapje of gifje Te gemaakt grappig of lollig 
 Jij boven ik
 Spreek de kijker direct aan.
 Vragen in titels
 Vragen nodigen uit, statements beleren.
 Plain Dutch
 Leg wetenschappelijke termen uit.
 Geen corporate verhaal
 Merkgebruik & contact
 Vragen over merkgebruik of goedkeuring nodig voor een partnertoepassing? Mail info@studioyoko.nl
.
 Download partnerkit


### Pagina: Kleuren (pages/colors.html)

Primary colors
 Secondary colors
 Base tones


### Pagina: Typografie (pages/typography.html)

Oldschool Grotesk Condensed — Bold 
 Display · hoofdletters · tracking strak 
 Wat weet jij
over stress?
 ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
 Oldschool Grotesk — Regular & Bold 
 Koppen, body, UI-labels 
 Eerlijk, echt, een beetje rommelig.
 We nemen complexe wetenschap en maken er een verhaal van dat je wél begrijpt. Kennis in wording, geen corporate glanslaag — zoals een slimme vriend die iets uitlegt op een borrel.
 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
 Tiempos Text — Italic 
 Citaten, pull-outs, signaturen 
 "Er is niets beters dan begrijpen hoe de wereld werkt — en dat met anderen delen."
 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
 Hiërarchie & gebruik
 Niveau Font Stijl 
 Display / poster OSG Condensed Bold HOOFDLETTERS · 60–180px · tracking strak 
 Kop Oldschool Grotesk Bold Zinsstijl of caps · 32–90px 
 Body Oldschool Grotesk Regular Zinsstijl · 16px · regelhoogte 1.5 
 Citaat / caption Tiempos Text Italic Cursief · nooit hele alinea's


### Pagina: Logo's (pages/logos.html)

Nederland
 Kies een kleurcombinatie en download als SVG, PNG of JPG.
 Vlaanderen
 De Vlaamse variant. Zelfde bouw, ander woordmerk. Niet door elkaar gebruiken met de Nederlandse set.
 Algemene logo’s
 Het beeldmerk, vaandel en de U-outline voor beide merken.
 U Studio
 De originele U Studio-logo’s in lila en antraciet. Varianten zonder achtergrond download je als PNG of SVG; varianten op een kleurvlak standaard als JPG.
 Kleuren
 Klik op een kleur om de code te kopiëren.
 Varsity Green #004B36 Basiskleur, logo en tekst op licht 
 Electric Purple #D6ACFF Logo en kopjes op donker 
 Ballpoint #1B0757 Donker accent 
 Electric Blue #585FF1 Accent 
 Paper #F4F0ED Lichte achtergrond 
 Pink #FFC9D7 Accent 
 Electric Yellow #FBF07A Accent, tape en driehoeken 
 Electric Red #EE5245 Accent 
 Printer Ink #2B2B2B Lopende tekst 
 Electric Green #00A879 Felgroene kaarten op de website 
 Wel Paars op groen 
 Wel Groen op licht 
 Niet Groen op rood 
 Niet Groen op geel 
 Kies per uiting één verzadigde accentkleur. Rood of geel combineer je met paars in plaats van met groen.
 Lettertypes
 Drie lettertypes, elk met een eigen rol.
 Koppen en cijfers Oldschool Grotesk Condensed
 Wat weet jij over stress?
 Tekst Oldschool Grotesk
 Eerlijk, echt, een beetje rommelig. Kennis in wording, geen corporate glanslaag.
 Accenten Tiempos Text Italic
 Alleen voor korte regels en citaten.
 De lettertypes zijn gelicentieerd en hier niet te downloaden.
 De huisstijl in beeld
 Scroll omlaag om door de huisstijl te bladeren. Omhoog scrollen brengt je direct terug door de pagina. Je kunt ook de pijlen gebruiken of opzij swipen. Klik een slide om groot te bekijken.
 ← Vorige
 Volgende →


### Pagina: Fotografie (pages/photography.html)

Kies een album om de volledige beeldbank te zien.
 Wel & niet
 Wel: echte wetenschappers en studenten, tight gecropt, lichte korrel, nooit ontkleurd.
 Wel: sommige foto's duo-toned met één merkkleur-wash (multiply) voor thumbs en reels.
 Niet: geen stockfoto's, geen "divers-team-wijst-naar-laptop", geen product-op-grijs.
 Niet: niet ontkleuren tot grijswaarden, geen overdreven filters of vignetten.


### Pagina: Voorbeelden (pages/examples.html)

Ons merk in beweging
 Van een korte introductie tot een compilatie: zo brengen we Universiteit van Nederland in beeld. Ons logo, onze kleuren en onze beeldtaal zorgen voor herkenning.
 Pauzeer previews
 Universiteit van Nederland-trailer
 Een kijkje in onze verhalen
 Wetenschap uitgelegd
 We maken wetenschap begrijpelijk met animatie, illustratie en heldere grafiek. Deze voorbeelden laten zien hoe we processen zichtbaar maken en ingewikkelde onderwerpen stap voor stap uitleggen.
 ↗ 
 Visuele kaart van het menselijk brein
 Wetenschappelijke verhalen in animatie
 ↗ 
 Grafische uitleg bij het skelet van een Supersaurus
 ↗ 
 Grafische uitleg over CO2
 Waarom doen muggen wat ze doen?
 ↗ 
 Visuele uitleg over rolroeren van een vliegtuig
 ↗ 
 Animatie van een haarzakje
 ↗ 
 Grafische uitleg over de Bacolor Crater
 ↗ 
 Grafische uitleg over woningkosten
 ↗ 
 Visuele toepassing binnen de Universiteit van Nederland-huisstijl
 ↗ 
 Grafische uitleg over de luchtzakken en longen van een dinosaurus
 Een eigen vorm voor ieder verhaal
 Onze colleges en formats, waaronder HEY U, hebben elk een eigen karakter. De gedeelde beeldtaal verbindt ze met Universiteit van Nederland. Bekijk hoe we die toepassen in video en op sociale kanalen.
 ↗ 
 HEY U-format in beweging
 Wetenschap van dichtbij
 Een herkenbare stijl voor verschillende verhalen
 Onze formats in beeld
 Onze colleges in beeld
 ↗ 
 Het HEY U-format in beeld
 Wetenschap live
 We brengen wetenschap naar het podium, het festival en het planetarium. Van Carré tot Lowlands: zo komt onze identiteit terug in de aankleding, de schermen en de ontmoeting met het publiek.
 ↗ 
 Universiteit van Nederland Live met publiek
 ↗ 
 Wetenschapper op het podium bij Universiteit van Nederland Live
 ↗ 
 Wetenschapper op het podium tijdens Universiteit van Nederland Live
 ↗ 
 Paars Universiteit van Nederland-beeldmerk tijdens een evenement in ARTIS
 ↗ 
 Live event in Carré
 ↗ 
 Live event in Carré
 ↗ 
 Live event in ARTIS — Planetarium
 ↗ 
 Live event in ARTIS
 ↗ 
 Live event in ARTIS
 ↗ 
 Live event op Lowlands
 Podcasts en publicaties
 Ook buiten video blijft ons merk herkenbaar. Hier zie je hoe beeld, kleur en typografie samenkomen rond de podcast Rare Jongens en in Quest Magazine.
 ↗ 
 Cover voor Quest Magazine en de podcast Rare Jongens
 ↗ 
 De Quest-cover in het magazine
 Sluiten ×


### Pagina: Download / Partnerkit (pages/download.html)

Voor welk merk?
 Beide
 Partnerkit Alles 
 Alles in één: de logo’s én de foto’s van Universiteit van Nederland.
 Download ↓
 Logo pack
 Alleen de logo’s van Universiteit van Nederland, als SVG en PNG in groen, wit en zwart.
 Download ↓
 Foto-pack
 Alleen de foto’s van Universiteit van Nederland, op volledige resolutie.
 Download ↓
 Partnerkit Alles 
 Alles in één: de logo’s én de foto’s van Universiteit van Vlaanderen.
 Download ↓
 Logo pack
 Alleen de logo’s van Universiteit van Vlaanderen, als SVG en PNG in groen, wit en zwart.
 Download ↓
 Foto-pack
 Alleen de foto’s van Universiteit van Vlaanderen, op volledige resolutie.
 Download ↓
 Partnerkit Alles 
 Alles in één: de logo’s én de foto’s van beide merken, in aparte mappen.
 Download ↓
 Logo pack
 Alleen de logo’s van UvNL en UvVL, als SVG en PNG.
 Download ↓
 Foto-pack
 Alleen de foto’s van beide merken, op volledige resolutie.
 Download ↓
 Vragen over merkgebruik? info@studioyoko.nl


## 4. Ontwerpsysteem (tokens uit assets/css/uvnl.css)

```css
:root {
  /* Brand */
  --uvnl-green:           #004B36;
  --uvnl-green-bright:    #00805C;
  --uvnl-green-glow:      #00BC85;
  --uvnl-purple:          #D6ACFF;
  --uvnl-purple-deep:     #1B0757;
  --uvnl-yellow:          #FBF07A;
  --uvnl-blue:            #5BA5FE;
  --uvnl-red:             #EE5245;
  --uvnl-pink:            #FFC9D7;
  --uvnl-paper:           #F4F0ED;

  /* Dark surfaces — warm near-black, faint green tint */
  --bg:                   #0A0E0C;     /* page */
  --bg-1:                 #0F1512;     /* sidebar / nav */
  --bg-2:                 #141B17;     /* card */
  --bg-3:                 #1B231E;     /* card hover, raised */
  --bg-4:                 #232C26;     /* well, input */

  --line:                 #1E2823;
  --line-strong:          #2B3830;
  --line-faint:           #182019;

  /* Foreground */
  --fg:                   #F4F0ED;     /* primary text */
  --fg-dim:               #B6BDB8;     /* secondary text */
  --fg-mute:              #6F7872;     /* tertiary / meta */
  --fg-faint:             #4A524D;     /* dividers, hint */

  /* Roles */
  --accent:               #D6ACFF;
  --accent-soft:          #2A1E3D;
  --primary:              #004B36;
  --primary-hover:        #00614A;
  --on-primary:           #F4F0ED;

  /* Type */
  --font-display:         "Oldschool Grotesk Condensed", "Barlow Condensed", "Oswald", sans-serif;
  --font-sans:            "Oldschool Grotesk", "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-serif:           "Tiempos Text", Georgia, serif;
  --font-mono:            "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;

  /* Radii */
  --r-1: 4px;
  --r-2: 8px;
  --r-3: 12px;
  --r-4: 16px;
  --r-pill: 999px;

  /* Shadow */
  --shadow-soft: 0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 32px rgba(0,0,0,0.4);

  /* Motion */
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur: 180ms;
}
```

Lichte modus: achtergrond Paper #F4F0ED, tekst Varsity Green #004B36, accent paars/groen; donkere modus: warm bijna-zwart #0A0E0C met groene tint, tekst Paper. Fonts: Oldschool Grotesk (Condensed voor koppen, uppercase), Tiempos Text (serif italic voor ondertitels/citaten), JetBrains Mono (labels/code). Tiempos is meegeleverd als .otf in assets/fonts/.


## 5. De Vooruitblik 2027

# De Vooruitblik — partnertoolkit

Gebaseerd op Feedback Toolkit Menno en de communicatieleidraad uit de aangeleverde Drive-map. De toolkit bevat 46 sprekers, 138 portretten (JPG en previews), 46 ZIP-pakketten, social visuals, boekcovers, banners en partnerlogo’s.

## Opnieuw bouwen

Voer `python3 scripts/build-vooruitblik.py` uit vanaf de repositoryroot. Daarna `python3 scripts/check-toolkit.py`. De builder gebruikt `vooruitblik/data/toolkit.json` en roept `scripts/toolkit-pages.py` aan. Foto’s zijn vooraf verwerkt met `scripts/prepare-toolkit-assets.py`; het manifest bevat de oorspronkelijke Drive-verwijzingen.

## Bewaarde oorspronkelijke versie

De oorspronkelijke site (van vóór de toolkit) staat niet meer in de publieke map. Ze blijft bewaard op de Git-branch `backup/vooruitblik-2026-10-23` en de tag `vooruitblik-archief-2026-10-23` (uitgangscommit `693d39db5f355bcc2b700e4b282edac55494991a`). `scripts/check-toolkit.py` controleert dat die branch bestaat.

## Publiceren

De publieke basis-URL staat in `SITE_URL` in `scripts/build-vooruitblik.py`. Pas die aan zodra de site op een eigen (sub)domein staat en bouw opnieuw: canonical, `og:url` en `og:image` volgen automatisch. De GitHub Action `Controle toolkit` bouwt de site bij elke pull request, controleert of het resultaat is gecommit en draait `check-toolkit.py`.

## Nog aan te leveren

De eigen webshop-URL is nog niet bekend. Zolang `URL["webshop"]` leeg is, toont de site geen bestelknop. Externe verkopers zijn conform feedback verwijderd.

De aangeleverde mappen voor verticale visuals, generieke beelden, collages, advertenties en video bevatten nog geen bestanden. De website meldt dit zonder lege downloadknoppen. Alle aangeleverde extra portretten blijven via de links naar de originele Drive-mappen beschikbaar.


### De 23 hoofdstukken (data/hoofdstukken.json)


**Hoofdstuk 1: Langer en gezonder leven in Limburg?**
- Thema: gezondheid · kleur: red
- Boekschrijver: Bert Op ’t Eijnde (sportfysioloog, UHasselt)
- Videopodcast-gast: Tim De Meyer (bio-informaticus, UGent)
- Videopodcast: aflevering 23, 2026-12-31
- Kort: Sardinië, Okinawa, Ikaria, Costa Rica en… Limburg? Al enkele jaren proberen wetenschappers Limburgers langer en gezonder te doen leven. En wie weet maken ze van Limburg vanaf 2027 één van de blue zones, plaatsen in de wereld waar mensen gezonder oud worden.
- Meer: In blue zones worden mensen gezonder oud. Het geheim van langer en beter leven zit ’m in een combinatie van een gezondere levensstijl en een betere leefomgeving: gemodereerd en verstandig bewegen en eten, zingeving, verbondenheid. Ook België kan – mits een duurzaam en gestructureerd beleid – blue zones creëren. Wetenschappers weten wat daarvoor nodig is, maar slagen ze er, samen met beleidsmakers, dit jaar in om mensen, dorpen en hele regio’s zo aan te passen dat het blue zones worden?


**Hoofdstuk 2: Nog maar één app op je smartphone?**
- Thema: informatie · kleur: purple
- Boekschrijver: Brahim Zarouali (communicatiewetenschapper, KU Leuven)
- Videopodcast-gast: Roel Gevaers (e-commerce, UAntwerpen)
- Videopodcast: aflevering 11, 2026-11-24
- Kort: Tien jaar geleden had je misschien vijf apps op je telefoon. En vandaag? Vijftig, honderd, of zelfs meer. Goed nieuws voor wie door de bomen het bos niet meer ziet: met een beetje geluk zet je dit jaar één superapp op je gsm en heb je de rest niet meer nodig.
- Meer: Eén enkele app waar je alles mee kan doen: van berichten tot bankieren, van taxi’s tot je belastingaangifte. In China gebruiken ze al WeChat, zo’n superapp. Superhandig. En toch… misschien willen we hem hier liever niet zien?


**Hoofdstuk 3: Nog meer internet-brol door (stiekeme) advertenties op ChatGPT?**
- Thema: taal-communicatie · kleur: yellow
- Boekschrijver: Ruben Verborgh (computerwetenschapper, UGent)
- Videopodcast-gast: Ike Picone (fake news, VUB)
- Videopodcast: aflevering 8, 2026-11-17
- Kort: Als je in 2027 een vraag stelt aan ChatGPT, Claude of Copilot, dan is de kans groot dat er in het antwoord ook reclame is verwerkt. Nóg minder betrouwbaar dus. Maar moeten we dat problematisch vinden?
- Meer: 


**Hoofdstuk 4: Een stap vooruit: Birkenstocks gemaakt met elektriciteit, niet meer met gas?**
- Thema: techniek · kleur: blue
- Boekschrijver: Annemie Bogaerts (chemicus, UAntwerpen)
- Videopodcast-gast: Bart Vermang (fysicus, UHasselt)
- Videopodcast: aflevering 10, 2026-11-22
- Kort: Terwijl mensen thuis massaal zonnepanelen leggen en meer en meer elektrisch rijden, draait de chemische industrie nog grotendeels op fossiele brandstoffen. Dat betekent dat zowat alles wat we dragen, eten of bouwen nog geen rekening houdt met de klimaatverandering.
- Meer: Maar er is nu een technologie die dat mee kan veranderen: plasma, de vierde toestand van materie, opgewekt met elektriciteit. Er zijn al een aantal bedrijven die het doen, maar in 2027 wordt het hopelijk serieuze industrie.


**Hoofdstuk 5: Komt er in 2027 nog drinkbaar water uit de kraan?**
- Thema: aarde-milieu · kleur: mint
- Boekschrijver: Ann Van Griensven (bio-ingenieur, VUB)
- Videopodcast-gast: Tim Soens (milieuhistoricus, UAntwerpen)
- Videopodcast: aflevering 9, 2026-11-19
- Kort: Droogtes worden intenser, duren langer en treffen grotere gebieden tegelijk. Vlaanderen is nu al structureel afhankelijk van water uit Wallonië.
- Meer: Die afhankelijkheid stoot op fysieke grenzen, zoals de verzilting van het Albertkanaal en de vraag hoe de Maas straks tussen Nederland en België verdeeld wordt. Het systeem schuurt nu al tegen zijn grenzen aan. In 2027 zal de droogtestress alleen maar toenemen.


**Hoofdstuk 6: Homoseksualiteit wegknippen uit je DNA?**
- Thema: gezondheid · kleur: red
- Boekschrijver: Piet Hoebeke (uroloog, UGent)
- Videopodcast-gast: Wim Pinxten (medische ethiek, UHasselt)
- Videopodcast: aflevering 15, 2026-12-10
- Kort: De CRISPR-Cas9-technologie waarmee je in het DNA van mensen kan knippen en plakken, werd 15 jaar geleden bedacht. Sindsdien worden er elk jaar nieuwe genetische verbanden ontdekt en kunnen bepaalde ziektes via gentherapie behandeld worden.
- Meer: Maar wat als wetenschappers dit jaar bijvoorbeeld één gen voor homoseksualiteit zouden ontdekken? Willen we dat dan ook wegknippen? Is dit het begin van het einde van mensen die net wat anders zijn dan de meeste mensen?


**Hoofdstuk 7: Wordt een botox-afspraak dit jaar even normaal als een tandartscontrole?**
- Thema: gedrag-maatschappij · kleur: purple
- Boekschrijver: Giselinde Kuipers (socioloog, KU Leuven)
- Videopodcast-gast: Philip Blondeel (plastische heelkunde, UGent)
- Videopodcast: aflevering 21, 2026-12-27
- Kort: Botox is meer dan een trend. Elke individuele keuze om er fris uit te blijven zien, duwt de collectieve lat weer wat hoger. Wat vandaag nog een uitzondering is, is over vijf jaar misschien de standaard.
- Meer: In 2027 voelen we die versnelling extra scherp: schoonheidsbehandelingen worden goedkoper en toegankelijker, sociale media doen ons constant vergelijken met anderen en de zorgsector wordt steeds meer een markt die om klanttevredenheid draait. Hoe langer we wachten om het over de stijgende schoonheidsdruk te hebben, hoe meer de keuze om die afweging bewust te maken verdwijnt.


**Hoofdstuk 8: Verleren we in 2027 om toevalligheden op te merken?**
- Thema: informatie · kleur: yellow
- Boekschrijver: Annelien Smets (media-econoom, VUB)
- Videopodcast-gast: Len Feremans (, UHasselt)
- Videopodcast: aflevering 22, 2026-12-29
- Kort: 2027 wordt het jaar waarin meer dan de helft van de mensen een AI-chatbot zal gebruiken om iets te zoeken op het internet, in plaats van eerst zelf te zoeken. Die nieuwe manier van zoeken heeft onverwachte en verregaande gevolgen voor elk van ons.
- Meer: Want zoeken, doorklikken en af en toe verdwalen is precies waar we onze scherpzinnigheid trainen, de vaardigheid om toeval op te merken en er iets mee te doen. We verliezen daardoor ons vermogen om iets onverwachts op te merken. Zo komen niet alleen kleine, leuke ontdekkingen in het gedrang, maar ook de creativiteit en de innovatie die daaruit voortkomen.


**Hoofdstuk 9: Kan de NAVO Rusland aan?**
- Thema: recht-bestuur · kleur: blue
- Boekschrijver: Alexander Mattelaer (defensie-expert, VUB)
- Videopodcast-gast: Marijn Hoijtink (politicoloog, UAntwerpen)
- Videopodcast: aflevering 12, 2026-11-26
- Kort: Durft, zal of wil Rusland een NAVO-staat aanvallen? En kan de NAVO Rusland dan aan? Op papier is de som van het aantal mensen, het grondgebied en de legers van alle NAVO-lidstaten groter dan die van Rusland.
- Meer: Maar zijn ze ook sterk genoeg om de Russische oorlogsmachine te weerstaan? Zullen ze verenigd optreden mocht Rusland een NAVO-lidstaat aanvallen? En is Rusland daar ook van overtuigd, zodat het er niet aan zal beginnen?


**Hoofdstuk 10: Eindelijk verkeersregels voor e-steps, maar toch niet veiliger?**
- Thema: techniek · kleur: mint
- Boekschrijver: Evelien Polders (verkeersveiligheidsexpert, UHasselt)
- Videopodcast-gast: Renaat Coopman (MKA-chirurg, UGent)
- Videopodcast: aflevering 5, 2026-11-10
- Kort: In 2027 krijgt de e-step voor het eerst een duidelijke plek in de wegcode. En dat is dringend nodig. Want de voorbije jaren was er een wildgroei aan nieuwe vervoermiddelen en niemand wist echt wat kon of mocht.
- Meer: Voortaan gelden voor e-steppers grotendeels dezelfde regels als voor fietsers. In Brussel zijn deelsteps vanaf 2027 verboden. En toch zal dit nog niet meteen het aantal ongevallen met e-steps verminderen.


**Hoofdstuk 11: Vanaf nu ziektes opsporen met stoelgangtesten in plaats van bloedtesten?**
- Thema: gezondheid · kleur: red
- Boekschrijver: Werend Boesmans (biomedicus, UHasselt)
- Videopodcast-gast: Lukas Van Oudenhove (psychiater, KU Leuven)
- Videopodcast: aflevering 19, 2026-12-20
- Kort: Een stoelgangtest voor darmkanker-opsporing is al ingeburgerd, maar we kunnen nog veel meer vaststellen via onze darmen. Er is een duidelijke link tussen wat er in de buik gebeurt en wat er in de hersenen gebeurt: de hersen-darm-as.
- Meer: Bij mensen met Parkinson, bijvoorbeeld, blijkt het zenuwstelsel van het maag-darmkanaal vaak al jaren voor de diagnose aangetast, nog voor de eerste symptomen in de hersenen opduiken. De darmen zijn dus een belangrijke bron van informatie, even belangrijk als het bloed voor het maken van diagnoses.


**Hoofdstuk 12: Dit jaar een triatlon lopen om erbij te horen?**
- Thema: gedrag-maatschappij · kleur: purple
- Boekschrijver: Jeroen Scheerder (sportsocioloog, KU Leuven)
- Videopodcast-gast: Ignace Glorieux (socioloog, VUB)
- Videopodcast: aflevering 2, 2026-11-03
- Kort: 
- Meer: 


**Hoofdstuk 13: Geen spuitjes meer voor mensen met diabetes?**
- Thema: gezondheid · kleur: yellow
- Boekschrijver: Chantal Mathieu (endocrinoloog, KU Leuven)
- Videopodcast-gast: Luk Buyse (sportarts, VUB)
- Videopodcast: aflevering 6, 2026-11-12
- Kort: Mensen met diabetes kunnen uitkijken naar het moment dat ze geen spuitjes meer moeten zetten. Slimme pompjes voor diabetes type 1 worden nog slimmer: dankzij artificiële intelligentie leren ze mee met de gewoontes van de gebruiker.
- Meer: Daarnaast komt er weldra een krachtige nieuwe pil op de markt die Ozempic-achtige injecties voor mensen met diabetes type 2 overbodig kan maken.


**Hoofdstuk 14: Hoe gewoon mag onze toekomstige koningin Elisabeth zijn?**
- Thema: recht-bestuur · kleur: blue
- Boekschrijver: Luc Duerloo (historicus, UAntwerpen)
- Videopodcast-gast: Jan Theunis (, UHasselt)
- Videopodcast: aflevering 7, 2026-11-15
- Kort: In 2027 neemt prinses Elisabeth, na haar sabbatjaar, effectief haar koninklijke taken op. Ze is de eerste vrouw ooit die de Belgische troon zal bestijgen, en ze doet dat als product van een koningshuis dat al decennialang “gewoner” wordt.
- Meer: Transparanter, opener, met minder privileges en minder afgeschermd van het publiek. Of die vermenselijking het instituut sterker maakt of net kwetsbaarder, zal zich nu voor het eerst ten volle tonen bij een troonopvolger die opgroeide in het tijdperk van sociale media.


**Hoofdstuk 15: Passeert er binnenkort een wolf in jouw stadstuin?**
- Thema: aarde-milieu · kleur: mint
- Boekschrijver: Raoul Van Damme (bioloog, UAntwerpen)
- Videopodcast-gast: Hendrik Schoukens (expert omgevingsrecht, UGent)
- Videopodcast: aflevering 16, 2026-12-13
- Kort: Mensen zien steeds meer “wilde” dieren in Vlaanderen. En niet alleen op het platteland. Ook, of zelfs vooral, in steden. Een vos, een steenmarter of een buizerd zijn geen uitzonderingen meer.
- Meer: Dat is mooi, maar het is cruciaal dat er de komende jaren ook blijvend wordt ingezet op natuurherstel, want ondertussen zijn er ook dieren aan het verdwijnen zonder dat we het zien. 2027 wordt een scharnierjaar: Vlaanderen moet tonen hoe het de eerste, bindende doelstellingen van de Natuurherstelverordening zal halen.


**Hoofdstuk 16: Zullen mensen hun hoorapparaat in 2027 écht graag dragen?**
- Thema: gezondheid · kleur: red
- Boekschrijver: Hannah Keppler (revalidatiewetenschapper, UGent)
- Videopodcast-gast: Laure Jacquemin (audioloog, UAntwerpen)
- Videopodcast: aflevering 20, 2026-12-22
- Kort: Zestigplussers met gehoorverlies vormen een steeds groeiende groep. Maar we verwachten ook van mensen dat ze tot hun zevenenzestigste professioneel actief blijven. Toch wachten mensen veel te lang tussen de eerste klachten en de aankoop van een hoortoestel.
- Meer: Uit schaamte, geldzorgen of onwetendheid. Een kleine 10% van de zestigplussers vindt van zichzelf dat ze gehoorproblemen ervaren, maar slechts 41% daarvan draagt één of twee hoortoestellen. Terwijl elke maand uitstel de mentale vermoeidheid en het isolement vergroot. Hoortoestellen zijn geen wondermiddelen, maar goede hulpmiddelen. Waar je ook aan moet wennen.


**Hoofdstuk 17: Hoe heeft Star Wars de hele filmindustrie veranderd?**
- Thema: kunst-cultuur · kleur: purple
- Boekschrijver: Stijn Joye (communicatiewetenschapper, UGent)
- Videopodcast-gast: Stef Aupers (cultuursocioloog, KU Leuven)
- Videopodcast: aflevering 1, 2026-11-01
- Kort: 50 jaar geleden verscheen Star Wars in de cinema. De film was een succes en… de filmwereld is sindsdien voorgoed veranderd. Want een halve eeuw later volgt elke grote studio nog altijd dezelfde succesformule.
- Meer: Marvel, Jurassic World of de aankomende nieuwe Harry Potter-reeks: allemaal zijn ze schatplichtig aan het businessmodel dat George Lucas ooit uit pure angst voor een flop uit de grond heeft gestampt. In 2027 draait Hollywood meer dan ooit op intellectueel eigendom, franchises en universums. En wie begrijpt hoe dat begon, snapt meteen ook waarom zo weinig studio’s nog een origineel verhaal durven te vertellen.


**Hoofdstuk 18: In 2027 geen adoptiekinderen meer uit het buitenland?**
- Thema: gedrag-maatschappij · kleur: yellow
- Boekschrijver: Chiara Candaele (historica, UAntwerpen)
- Videopodcast-gast: Heidi Mertes (ethicus, UGent)
- Videopodcast: aflevering 18, 2026-12-17
- Kort: 
- Meer: 


**Hoofdstuk 19: Wat neemt Rafaël Liégeois mee naar het ISS?**
- Thema: zon · kleur: blue
- Boekschrijver: Jaroslav Hruby (fysicus, UHasselt)
- Videopodcast-gast: Jan Wouters (expert ruimterecht, KU Leuven)
- Videopodcast: aflevering 14, 2026-12-08
- Kort: 
- Meer: 


**Hoofdstuk 20: Wie wordt de opvolger van Trump?**
- Thema: recht-bestuur · kleur: mint
- Boekschrijver: Peter Van Aelst (politicoloog, UAntwerpen)
- Videopodcast-gast: Bart Kerremans (politicoloog, KU Leuven)
- Videopodcast: aflevering 3, 2026-11-05
- Kort: In 2027 zijn er geen presidentsverkiezingen, geen inauguratie en geen stembusgang die de wereldpers wekenlang op scherp zet. En toch is 2027 ontzettend belangrijk voor de Amerikaanse politiek.
- Meer: Want de twee grote politieke partijen, jarenlang bestuurd door twee bejaarde, extreem herkenbare mannen, moeten op zoek naar hun volgende presidentskandidaten. De koers die ze dit jaar inslaan, bepaalt niet alleen wie er in 2028 op het stembiljet staat, maar ook hoe radicaal of geloofwaardig beide partijen de komende jaren overkomen.


**Hoofdstuk 21: Geraak je alleen nog via Tinder aan een lief?**
- Thema: gedrag-maatschappij · kleur: red
- Boekschrijver: Laura Sels (psycholoog, UGent)
- Videopodcast-gast: Laura Vandenbosch (communicatiewetenschapper, KU Leuven)
- Videopodcast: aflevering 17, 2026-12-15
- Kort: Vijftien jaar geleden werd Tinder gelanceerd. Sindsdien zoeken meer mensen dan ooit hun partner via een scherm. Volgens een recent Belgisch onderzoek gebruikt 88 procent van de singles die een partner zoeken een datingapp. Maar heeft dat wel het gewenste resultaat?
- Meer: Via een online profiel evalueer je iemand nog voor er ooit een blik, een lach of een reactie is uitgewisseld, terwijl net dat soort interacties bepalen of we elkaar echt aantrekkelijk vinden. Hierdoor lopen we online vaak potentiële partners mis. Wie begrijpt dat aantrekking niet draait om de perfecte match op papier, maar om het gevoel dat je krijgt bij de ander, gaat zowel op apps als daarbuiten met andere verwachtingen aan tafel zitten.


**Hoofdstuk 22: Kan een mens een non-stop vlucht van 22 uur aan?**
- Thema: gezondheid · kleur: purple
- Boekschrijver: Nathalie Pattyn (spoedarts, VUB)
- Videopodcast-gast: Britt Weyts (, UAntwerpen)
- Videopodcast: aflevering 13, 2026-12-06
- Kort: 
- Meer: 


**Hoofdstuk 23: Waarom komen Nobelprijswinnaars in oktober graag naar Brussel?**
- Thema: techniek · kleur: yellow
- Boekschrijver: Jan Danckaert (fysicus en rector, VUB)
- Videopodcast-gast: Vincent Ginis (fysicus, VUB)
- Videopodcast: aflevering 4, 2026-11-08
- Kort: 100 jaar geleden kwamen Albert Einstein, Marie Curie, Niels Bohr en nog tientallen andere wetenschappers in Brussel samen tijdens de vijfde Solvay-conferentie. Die ging over kwantumfysica.
- Meer: Hoewel ze het inhoudelijk niet eens waren, was deze conferentie een gigantische stap in het kwantumfysica-onderzoek. 17 van de 29 aanwezigen waren (of zouden het nog worden) Nobelprijswinnaars. In 2027 zal “de op één na slimste foto” gemaakt worden.


### Sprekers in de toolkit (46)

- Alexander Mattelaer (VUB), onderwerp: 16. NAVO, 3 portretten

- Ann van Griensven (VUB), onderwerp: 05. Drinkbaar water, 3 portretten

- Annelien Smets (VUB), onderwerp: 13. Serendipiteit, 3 portretten

- Annemie Bogaerts (UAntwerpen), onderwerp: 11. Groene fabrieken, 3 portretten

- Bart Kerremans (KU Leuven), onderwerp: 22. Opvolger van Trump, 3 portretten

- Bart Vermang (UHasselt), onderwerp: 11. Groene fabrieken, 3 portretten

- Bert Op 't Eijnde (UHasselt), onderwerp: 01. Blue zones, 3 portretten

- Brahim Zarouali (KU Leuven), onderwerp: 10. Superapp, 3 portretten

- Britt Weyts (UAntwerpen), onderwerp: 21. 22u-vlucht, 3 portretten

- Chantal Mathieu (KU Leuven), onderwerp: 08. Diabetes, 3 portretten

- Chiara Candaele (UAntwerpen), onderwerp: 15. Interlandelijke adoptie, 3 portretten

- Evelien Polders (UHasselt), onderwerp: 03. E-steps, 3 portretten

- Giselinde Kuipers (KU Leuven), onderwerp: 06. Botox, 3 portretten

- Hannah Keppler (UGent), onderwerp: 14. Hoorapparaten, 3 portretten

- Heidi Mertes (UGent), onderwerp: 15. Interlandelijke adoptie, 3 portretten

- Hendrik Schoukens (UGent), onderwerp: 19. Wolf in de tuin, 3 portretten

- Ignace Glorieux (VUB), onderwerp: 18. Strava-isering, 3 portretten

- Ike Picone (VUB), onderwerp: 09. Internet-brol door AI, 3 portretten

- Jan Danckaert (VUB), onderwerp: 02. Solvay, 3 portretten

- Jan Theunis (UHasselt), onderwerp: 04. Royalty, 3 portretten

- Jan Wouters (KU Leuven), onderwerp: 20. Liègeois, 3 portretten

- Jaroslav Hruby (UHasselt), onderwerp: 20. Liègeois, 3 portretten

- Jelle Habay (VUB), onderwerp: 21. 22u-vlucht, 3 portretten

- Jeroen Scheerder (KU Leuven), onderwerp: 18. Strava-isering, 3 portretten

- Laura Sels (UGent), onderwerp: 23. Tinder, 3 portretten

- Laura Vandenbosch (KU Leuven), onderwerp: 23. Tinder, 3 portretten

- Laure Jacquemin (UAntwerpen), onderwerp: 14. Hoorapparaten, 3 portretten

- Len Feremans (UHasselt), onderwerp: 13. Serendipiteit, 3 portretten

- Luc Duerloo (UAntwerpen), onderwerp: 04. Royalty, 3 portretten

- Luk Buyse (VUB), onderwerp: 08. Diabetes, 3 portretten

- Lukas Van Oudenhove (KU Leuven), onderwerp: 17. Stoelgangtesten, 3 portretten

- Marijn Hoijtink (UAntwerpen), onderwerp: 16. NAVO, 3 portretten

- Peter Van Aelst (UAntwerpen), onderwerp: 22. Opvolger van Trump, 3 portretten

- Philip Blondeel (UGent), onderwerp: 06. Botox, 3 portretten

- Piet Hoebeke (UGent), onderwerp: 12. DNA, 3 portretten

- Raoul Van Damme (UAntwerpen), onderwerp: 19. Wolf in de tuin, 3 portretten

- Renaat Coopman (UGent), onderwerp: 03. E-steps, 3 portretten

- Roel Gevaers (UAntwerpen), onderwerp: 10. Superapp, 3 portretten

- Ruben Verborgh (UGent), onderwerp: 09. Internet-brol door AI, 3 portretten

- Stef Aupers (KU Leuven), onderwerp: 07. Star Wars, 3 portretten

- Stijn Joye (UGent), onderwerp: 07. Star Wars, 3 portretten

- Tim De Meyer (UGent), onderwerp: 01. Blue zones, 3 portretten

- Tim Soens (UAntwerpen), onderwerp: 05. Drinkbaar water, 3 portretten

- Vincent Ginis (VUB), onderwerp: 02. Solvay, 3 portretten

- Werend Boesmans (UHasselt), onderwerp: 17. Stoelgangtesten, 3 portretten

- Wim Pinxten (UHasselt), onderwerp: 12. DNA, 3 portretten


### Extra's (logo's, covers, handtekeningen e.d.): 71 bestanden, o.a.: Alexander Mattelaer.jpg, Ann van Griensven.jpg, Annelien Smets.jpg, Annemie Bogaerts.jpg, Bart Kerremans.jpg, Bart Vermang.jpg, Bert Op 't Eijnde.jpg, Brahim Zarouali.jpg, Britt Weyts.jpg, Chantal Mathieu.jpg, Chiara Candaele.jpg, Evelien Polders.jpg, Giselinde Kuipers.jpg, Hannah Keppler.jpg, Heidi Mertes.jpg, Hendrik Schoukens.jpg, Ignace Glorieux.jpg, Ike Picone.jpg, IKE.jpg, Jan Danckaert.jpg, Jan Theunis.jpg, Jan Wouters.jpg, Jaroslav Hruby.jpg, Jelle Habay.jpg, Jeroen Scheerder.jpg


### Pagina-teksten van de Vooruitblik-site


#### vooruitblik/index.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 Toolkit voor partners · Editie 2027 
 De Vooruitblik 2027 DE V O O RUIT BLIK 
 Alles om De Vooruitblik te delen.
 Portretten, visuals en logo’s voor je eigen communicatie.
 Boek, video, radio →
 Foto’s en visuals
 → 
 Logo’s en vormgeving
 → 
 23 vragen 46 sprekers 5 universiteiten Handleiding voor partners ↗
 Eén vraag per hoofdstuk De vragen
 Klik door naar de professoren.
 Hoofdstuk 1 
 Langer en gezonder leven in Limburg?
 Bert Op ’t Eijnde · UHasselt 
 Hoofdstuk 2 
 Waarom komen Nobelprijswinnaars in oktober graag naar Brussel?
 Jan Danckaert · VUB 
 Hoofdstuk 3 
 Eindelijk verkeersregels voor e-steps, maar toch niet veiliger?
 Evelien Polders · UHasselt 
 Hoofdstuk 4 
 Hoe gewoon mag onze toekomstige koningin Elisabeth zijn?
 Luc Duerloo · UAntwerpen 
 Hoofdstuk 5 
 Komt er in 2027 nog drinkbaar water uit de kraan?
 Ann Van Griensven · VUB 
 Hoofdstuk 6 
 Wordt een botox-afspraak dit jaar even normaal als een tandartscontrole?
 Giselinde Kuipers · KU Leuven 
 Hoofdstuk 7 
 Hoe heeft Star Wars de hele filmindustrie veranderd?
 Stijn Joye · UGent 
 Hoofdstuk 8 
 Geen spuitjes meer voor mensen met diabetes?
 Chantal Mathieu · KU Leuven 
 Hoofdstuk 9 
 Nog meer internet-brol door (stiekeme) advertenties op ChatGPT?
 Ruben Verborgh · UGent 
 Hoofdstuk 10 
 Nog maar één app op je smartphone?
 Brahim Zarouali · KU Leuven 
 Hoofdstuk 11 
 Een stap vooruit: Birkenstocks gemaakt met elektriciteit, niet meer met gas?
 Annemie Bogaerts · UAntwerpen 
 Hoofdstuk 12 
 Homoseksualiteit wegknippen uit je DNA?
 Piet Hoebeke · UGent 
 Hoofdstuk 13 
 Verleren we in 2027 om toevalligheden op te merken?
 Annelien Smets · VUB 
 Hoofdstuk 14 
 Zullen mensen hun hoorapparaat in 2027 écht graag dragen?
 Hannah Keppler · UGent 
 Hoofdstuk 15 
 In 2027 geen adoptiekinderen meer uit het buitenland?
 Chiara Candaele · UAntwerpen 
 Hoofdstuk 16 
 Kan de NAVO Rusland aan?
 Alexander Mattelaer · VUB 
 Hoofdstuk 17 
 Vanaf nu ziektes opsporen met stoelgangtesten in plaats van bloedtesten?
 Werend Boesmans · UHasselt 
 Hoofdstuk 18 
 Dit jaar een triatlon lopen om erbij te horen?
 Jeroen Scheerder · KU Leuven 
 Hoofdstuk 19 
 Passeert er binnenkort een wolf in jouw stadstuin?
 Raoul Van Damme · UAntwerpen 
 Hoofdstuk 20 
 Wat neemt Rafaël Liégeois mee naar het ISS?
 Jaroslav Hruby · UHasselt 
 Hoofdstuk 21 
 Kan een mens een non-stop vlucht van 22 uur aan?
 Nathalie Pattyn · VUB 
 Hoofdstuk 22 
 Wie wordt de opvolger van Trump?
 Peter Van Aelst · UAntwerpen 
 Hoofdstuk 23 
 Geraak je alleen nog via Tinder aan een lief?
 Laura Sels · UGent 
 Schud de kaarten ↻ 
 Bekijk alle 23 vragen →


#### vooruitblik/vragen.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 De Vooruitblik 2027 in 23 vragen 
 Eén professor schrijft, een tweede expert schuift aan in de videopodcast.
 Alle
 UAntwerpen
 UHasselt
 KU Leuven
 UGent
 VUB
 Zoek in de vragen 
 23 vragen
 Hoofdstuk 1 
 Langer en gezonder leven in Limburg?
 Bert Op ’t Eijnde · UHasselt 
 Hoofdstuk 2 
 Waarom komen Nobelprijswinnaars in oktober graag naar Brussel?
 Jan Danckaert · VUB 
 Hoofdstuk 3 
 Eindelijk verkeersregels voor e-steps, maar toch niet veiliger?
 Evelien Polders · UHasselt 
 Hoofdstuk 4 
 Hoe gewoon mag onze toekomstige koningin Elisabeth zijn?
 Luc Duerloo · UAntwerpen 
 Hoofdstuk 5 
 Komt er in 2027 nog drinkbaar water uit de kraan?
 Ann Van Griensven · VUB 
 Hoofdstuk 6 
 Wordt een botox-afspraak dit jaar even normaal als een tandartscontrole?
 Giselinde Kuipers · KU Leuven 
 Hoofdstuk 7 
 Hoe heeft Star Wars de hele filmindustrie veranderd?
 Stijn Joye · UGent 
 Hoofdstuk 8 
 Geen spuitjes meer voor mensen met diabetes?
 Chantal Mathieu · KU Leuven 
 Hoofdstuk 9 
 Nog meer internet-brol door (stiekeme) advertenties op ChatGPT?
 Ruben Verborgh · UGent 
 Hoofdstuk 10 
 Nog maar één app op je smartphone?
 Brahim Zarouali · KU Leuven 
 Hoofdstuk 11 
 Een stap vooruit: Birkenstocks gemaakt met elektriciteit, niet meer met gas?
 Annemie Bogaerts · UAntwerpen 
 Hoofdstuk 12 
 Homoseksualiteit wegknippen uit je DNA?
 Piet Hoebeke · UGent 
 Hoofdstuk 13 
 Verleren we in 2027 om toevalligheden op te merken?
 Annelien Smets · VUB 
 Hoofdstuk 14 
 Zullen mensen hun hoorapparaat in 2027 écht graag dragen?
 Hannah Keppler · UGent 
 Hoofdstuk 15 
 In 2027 geen adoptiekinderen meer uit het buitenland?
 Chiara Candaele · UAntwerpen 
 Hoofdstuk 16 
 Kan de NAVO Rusland aan?
 Alexander Mattelaer · VUB 
 Hoofdstuk 17 
 Vanaf nu ziektes opsporen met stoelgangtesten in plaats van bloedtesten?
 Werend Boesmans · UHasselt 
 Hoofdstuk 18 
 Dit jaar een triatlon lopen om erbij te horen?
 Jeroen Scheerder · KU Leuven 
 Hoofdstuk 19 
 Passeert er binnenkort een wolf in jouw stadstuin?
 Raoul Van Damme · UAntwerpen 
 Hoofdstuk 20 
 Wat neemt Rafaël Liégeois mee naar het ISS?
 Jaroslav Hruby · UHasselt 
 Hoofdstuk 21 
 Kan een mens een non-stop vlucht van 22 uur aan?
 Nathalie Pattyn · VUB 
 Hoofdstuk 22 
 Wie wordt de opvolger van Trump?
 Peter Van Aelst · UAntwerpen 
 Hoofdstuk 23 
 Geraak je alleen nog via Tinder aan een lief?
 Laura Sels · UGent 
 Niets gevonden. Probeer een andere zoekterm of universiteit.


#### vooruitblik/boek.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 23 essays, één jaar vooruit
 23 academici leggen uit wat je moet weten over 2027.
 Verschijnt 15 november 2026
 €24,50
 Lancering op 15 november, Boektopia, Antwerp Expo.
 23 essays van 23 academici 
 5 Vlaamse universiteiten 
 +1 extraatje per hoofdstuk 
 Zo is elk hoofdstuk opgebouwd
 Per hoofdstuk: een essay, een extraatje (weetje, anekdote of filmtip) en een korte biografie.
 Alle hoofdstukken
 Alle vragen met hun professor staan bij De 23 vragen.
 Naar De 23 vragen →


#### vooruitblik/videopodcast.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 Kijken en luisteren 
 Twee wetenschappers per vraag. Vanaf begin november 2026 ongeveer drie afleveringen per week.
 Waar vind je de afleveringen?
 Video’s van ongeveer 10 minuten op VRT MAX en YouTube, ook als podcast.
 VRT MAX · video ↗
 YouTube ↗
 Spotify ↗
 VRT MAX · podcast ↗
 Publicatieschema
 Geplande data van de 23 afleveringen, met sprekers en materiaal.
 november 2026
 zo 1 nov 
 Aflevering 01
 Star Wars heeft jouw leven veranderd (ook als je het niet kent)!
 Met Stijn Joye en Stef Aupers
 Boek: Hoe heeft Star Wars de hele filmindustrie veranderd?
 di 3 nov 
 Aflevering 02
 Extreme sportprestaties: het nieuwe statussymbool
 Met Jeroen Scheerder en Ignace Glorieux
 Boek: Dit jaar een triatlon lopen om erbij te horen?
 do 5 nov 
 Aflevering 03
 Wie volgt Trump op?
 Met Peter Van Aelst en Bart Kerremans
 Boek: Wie wordt de opvolger van Trump?
 zo 8 nov 
 Aflevering 04
 Deze discussie van 100 jaar geleden heeft de wereld veranderd
 Met Jan Danckaert en Vincent Ginis
 Boek: Waarom komen Nobelprijswinnaars in oktober graag naar Brussel?
 di 10 nov 
 Aflevering 05
 Waarom maken de nieuwe regels voor e-steps het niet veiliger?
 Met Evelien Polders en Renaat Coopman
 Boek: Eindelijk verkeersregels voor e-steps, maar toch niet veiliger?
 do 12 nov 
 Aflevering 06
 Genezen van diabetes?
 Met Chantal Mathieu en Luk Buyse
 Boek: Geen spuitjes meer voor mensen met diabetes?
 zo 15 nov 
 Aflevering 07
 Waarom hebben we nog een monarchie nodig?
 Met Luc Duerloo en Jan Theunis
 Boek: Hoe gewoon mag onze toekomstige koningin Elisabeth zijn?
 di 17 nov 
 Aflevering 08
 Heeft school nog zin nu AI bestaat?
 Met Ruben Verborgh en Ike Picone
 Boek: Nog meer internet-brol door (stiekeme) advertenties op ChatGPT?
 do 19 nov 
 Aflevering 09
 Komt er volgend jaar nog water uit je kraan?
 Met Ann Van Griensven en Tim Soens
 Boek: Komt er in 2027 nog drinkbaar water uit de kraan?
 zo 22 nov 
 Aflevering 10
 De fabriek van de toekomst
 Met Annemie Bogaerts en Bart Vermang
 Boek: Een stap vooruit: Birkenstocks gemaakt met elektriciteit, niet meer met gas?
 di 24 nov 
 Aflevering 11
 Beslist een app hoeveel je betaalt bij de dokter?
 Met Brahim Zarouali en Roel Gevaers
 Boek: Nog maar één app op je smartphone?
 do 26 nov 
 Aflevering 12
 Kan de NAVO Rusland aan?
 Met Alexander Mattelaer en Marijn Hoijtink
 Boek: Kan de NAVO Rusland aan?
 december 2026
 zo 6 dec 
 Aflevering 13
 Hoe lang houdt een mens een vliegreis vol?
 Met Jelle Habay en Britt Weyts
 Boek: Kan een mens een non-stop vlucht van 22 uur aan?
 di 8 dec 
 Aflevering 14
 Wie bepaalt straks wat er wel en niet mag in de ruimte?
 Met Jaroslav Hruby en Jan Wouters
 Boek: Wat neemt Rafaël Liégeois mee naar het ISS?
 do 10 dec 
 Aflevering 15
 Homoseksualiteit wegknippen uit ons DNA?
 Met Piet Hoebeke en Wim Pinxten
 Boek: Homoseksualiteit wegknippen uit je DNA?
 zo 13 dec 
 Aflevering 16
 Passeert er binnenkort een wolf in jouw tuin?
 Met Raoul Van Damme en Hendrik Schoukens
 Boek: Passeert er binnenkort een wolf in jouw stadstuin?
 di 15 dec 
 Aflevering 17
 Vind je je lief nog wel op Tinder? Of vind je je lief weer op café?
 Met Laura Sels en Laura Vandenbosch
 Boek: Geraak je alleen nog via Tinder aan een lief?
 do 17 dec 
 Aflevering 18
 Waarom je geen kinderen uit het buitenland meer kan adopteren
 Met Chiara Candaele en Heidi Mertes
 Boek: In 2027 geen adoptiekinderen meer uit het buitenland?
 zo 20 dec 
 Aflevering 19
 Kan je in kaka zien of je autisme hebt?
 Met Werend Boesmans en Lukas Van Oudenhove
 Boek: Vanaf nu ziektes opsporen met stoelgangtesten in plaats van bloedtesten?
 di 22 dec 
 Aflevering 20
 Zo besef je wanneer je niet meer goed hoort
 Met Hannah Keppler en Laure Jacquemin
 Boek: Zullen mensen hun hoorapparaat in 2027 écht graag dragen?
 zo 27 dec 
 Aflevering 21
 Wordt een spuitje botox net zo normaal als naar de kapper gaan?
 Met Giselinde Kuipers en Philip Blondeel
 Boek: Wordt een botox-afspraak dit jaar even normaal als een tandartscontrole?
 di 29 dec 
 Aflevering 22
 Maken algoritmes onze levens saaier?
 Met Annelien Smets en Len Feremans
 Boek: Verleren we in 2027 om toevalligheden op te merken?
 do 31 dec 
 Aflevering 23
 Langer en gezonder leven in Limburg?
 Met Bert Op ’t Eijnde en Tim De Meyer
 Boek: Langer en gezonder leven in Limburg?


#### vooruitblik/radio-en-live.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 Radio en live 
 Radio 1 en live in gesprek met de professoren.
 Radio 1 Twee weken vooruitblikken
 Radio 1 maakt in de kerstvakantie een programma rond De Vooruitblik.
 12–13u elke weekdag op Radio 1 
 21–25 dec maandag tot vrijdag 
 28 dec – 1 jan maandag tot vrijdag 
 Het programma
 Jacotte Brokken praat met de wetenschappers over de thema’s uit het boek.
 Luister live of terug
 Radio 1 vind je live en on demand via VRT MAX.
 Naar Radio 1 → 
 Live Stel je vraag aan de prof
 Het publiek praat rechtstreeks met de professoren.
 15 november
 Boektopia, Antwerp Expo
 Officiële voorstelling op Dag van de Wetenschap. Drie professoren praten met een moderator over onderwerpen uit het boek.
 12u – 12u45 gesprek in de Red Room
 13u – 14u signeersessie
 Voorjaar 2027
 Panelgesprekken op vijf locaties
 Telkens vier academici in gesprek met elkaar en het publiek. Kobe Ilsen modereert, met een muzikaal intermezzo en een voorwoord van Peter Saerens (Pelckmans Uitgevers).
 Locaties en data volgen.


#### vooruitblik/lezen-kijken-luisteren.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 Lezen, kijken en luisteren 
 Een kennisproject van Universiteit van Vlaanderen, Radio 1 en Pelckmans: wetenschappers geven context bij 23 vragen over 2027.
 Lezen · 15 november 2026 Het boek
 23 essays van wetenschappers van de vijf Vlaamse universiteiten, elk vanuit één vraag.
 €24,50 · Uitgegeven door Pelckmans.
 Meer over het boek →
 Download de boekcovers
 Kijken en luisteren · Vanaf november 2026 De videopodcast
 Twee wetenschappers, één vraag. Ongeveer drie afleveringen per week op VRT MAX, YouTube, Spotify en andere podcastkanalen.
 Bekijk het publicatieschema →
 Luisteren · Kerstvakantie De Vooruitblik op Radio 1
 Jacotte Brokken in gesprek met de wetenschappers. Elke weekdag van 12 tot 13 uur , 21 december 2026 tot en met 1 januari 2027.
 Luister via Radio 1 ↗
 Live In gesprek met de wetenschappers
 15 november 2026 · Boektopia, Antwerp Expo. 
Gesprek van 12 tot 12.45 uur, signeersessie van 13 tot 14 uur.
 23 november 2026 · VRT. 
Lanceeravond voor genodigden, vanaf 18.30 uur.
 Voorjaar 2027 · Vijf universiteitssteden. 
Panelgesprekken met Kobe Ilsen. Data en locaties volgen.
 Meer over radio en live →
 Communiceren over De Vooruitblik
 Vermeld wetenschapper en universiteit, tag @universiteitvanvlaanderen en @pelckmans.be op Instagram en gebruik #DeVooruitblik2027 en #uvvl.
 Kies je materiaal →
 Volledige handleiding ↗


#### vooruitblik/vormgeving.html

Naar de inhoud
 Enkel voor betrokken medewerkers en partners Deel deze websitelink niet met het grote publiek. ×
 Vormgeving 
 Logo’s, kleuren en lettertypes van De Vooruitblik.
 Logo Logo’s
 Stel je logo samen en download het.
 Logo en achtergrond hebben dezelfde kleur. Kies een andere combinatie.
 Logo 
 De Vooruitblik 
 Universiteit van Vlaanderen 
 Vierkant 
 Woordmerk 
 Kleur van het logo 
 Achtergrond 
 Formaat 
 PNG 
 SVG 
 Van De Vooruitblik bestaat alleen een PNG.
 Download logo ↓ 
 Logo in Electric Purple op Varsity Green, Ballpoint of Electric Blue.
 Partnerlogo’s
 Logo’s van universiteiten, initiatiefnemers en partners. Gebruik de originele bestanden.
 Pelckmans Uitgeverij
 Download logo’s Logo en merkbeeld 3 · zwart ↓
 Logo en merkbeeld 3 · wit ↓
 Logo en merkbeeld 2 · zwart ↓
 Logo en merkbeeld 2 · wit ↓
 Logo en merkbeeld 1 · zwart ↓
 Logo en merkbeeld 1 · wit ↓
 Jonge Academie
 Download logo Logo · PNG ↓
 Vlaamse overheid
 Download logo Logo · PNG ↓
 VRT
 Download logo Logo · PNG ↓
 Radio 1
 Download logo Logo · PNG ↓
 Nationale Loterij
 Download logo Logo · PNG ↓
 KU Leuven
 Download logo Logo · PNG ↓
 VUB
 Download logo Logo · PNG ↓
 UGent
 Download logo Logo · PNG ↓
 UHasselt
 Download logo Logo · PNG ↓
 UAntwerpen
 Download logo’s UA-hor-1-nl-white.svg ↓
 UA-hor-1-nl-white ↓
 Kleuren
 Klik op een kleur om de code te kopiëren.
 Varsity Green #004B36 Basiskleur, logo en tekst op licht 
 Electric Purple #D6ACFF Logo en kopjes op donker 
 Ballpoint #1B0757 Donker accent 
 Electric Blue #585FF1 Accent 
 Paper #F4F0ED Lichte achtergrond 
 Pink #FFC9D7 Accent 
 Electric Yellow #FBF07A Accent 
 Electric Red #EE5245 Accent 
 Printer Ink #2B2B2B Lopende tekst 
 Electric Green #00A879 Accent 
 Wel Paars op groen 
 Wel Groen op licht 
 Niet Groen op rood 
 Niet Groen op geel 
 Eén verzadigde accentkleur per uiting. Rood of geel met paars, niet met groen.
 Lettertypes
 Drie lettertypes met elk een eigen rol. Gelicentieerd, niet te downloaden.
 Koppen en cijfers Oldschool Grotesk Condensed
 Tekst Oldschool Grotesk
 Accenten Tiempos Text Italic
 Boekcovers en e-mailhandtekeningen
 Boekcovers, banners en sociale visuals staan in de beeldbank.
 Naar het algemene materiaal →


## 6. Technische keuzes

# Beveiliging

De Vooruitblik is een statische site (geen server, formulieren of database). De live versie wordt automatisch
gepubliceerd vanuit `main` naar `mennoes/vooruitblik` en bediend op vooruitblik.universiteitvanvlaanderen.be.
Wie naar `main` kan schrijven, bepaalt dus wat live staat.

## Maatregelen in de code
- Content Security Policy (meta) en referrer-beleid op elke pagina; geen inline of externe scripts, geen
  externe stijlen of lettertypes. Alleen `youtube-nocookie.com` is toegestaan voor video's.
- `scripts/check-toolkit.py` en de GitHub Action `Controle toolkit` keuren inline/externe scripts, een ontbrekende CSP
  en `target="_blank"` zonder `noopener` af.
- GitHub Actions zijn vastgezet op commit-hashes, met minimale rechten (`contents: read`).
- Het publiceren gebruikt een deploy-sleutel die alleen naar `mennoes/vooruitblik` kan schrijven (geheim
  `DEPLOY_KEY_VOORUITBLIK`). Secret scanning en push protection staan aan.

## Handmatig te regelen
- Tweestapsverificatie (liefst passkey) op het GitHub-account en herstelcodes veilig bewaren.
- Domein verifiëren bij GitHub (TXT-record) zodat niemand het subdomein kan overnemen.
- Toegang van externe apps (zoals ChatGPT/Codex) beperken tot de nodige repo's en regelmatig nalopen
  via github.com/settings/installations.
- Drive-mappen met originelen alleen delen als "Viewer" (niet "Editor").
- Branch protection op `main` (pull request en de check "controle" verplicht) zodra niemand meer rechtstreeks
  hoeft te pushen.

## Een probleem melden
Stuur een bericht naar de beheerder van de site (zie de contactgegevens van Universiteit van Vlaanderen).


### Redactiefeedback-functie

# Feedback & reacties (voor de redactie)

De feedbackfunctie is bedoeld voor de **redactie**, om opmerkingen te verzamelen en daarna wijzigingen door te voeren.
Gewone bezoekers zien de knop niet.

- **Aanzetten voor jezelf:** open de site één keer met `?redactie` achter de URL, bijvoorbeeld
  `…/vooruitblik/?redactie`. Je browser onthoudt dit. Met `?redactie=uit` (of de knop *Redactiemodus uitzetten*
  in het paneel) zet je het weer uit. Deel deze link met de redactie.
- **Verwerkt:** markeer een reactie of pin als *verwerkt* zodra de wijziging is doorgevoerd. Verwerkte items
  verdwijnen uit de lijst (vinkje *Verwerkt* toont ze weer).
- **Kopieer open feedback:** zet alle openstaande feedback als lijst op je klembord (pagina, plek, tekst
  erbij en opmerking), handig om door te geven voor de volgende ronde wijzigingen.
- **Bij livegang:** zet `enabled: false` in `assets/js/feedback-config.js`.

Dit is geen beveiliging: wie de link kent kan de redactiemodus aanzetten. Zet er geen vertrouwelijke
informatie in.

Rechtsonder op elke pagina staat een knop **Feedback**. Bezoekers kunnen:
- een **pin** plaatsen op een exacte plek (zoals comments in Figma): knop *Pin plaatsen*, klikken op de
  plek, opmerking typen. Anderen kunnen op de pin **antwoorden**;
- een **algemene opmerking** over de pagina achterlaten (naam is optioneel);
- via **Alle pagina's** alle feedback van de hele site doorlezen, en via een reactie naar de pin springen.

Een pin hangt aan het element waarop is geklikt (met de positie daarbinnen), met de paginapositie als
reserve. Daardoor blijft hij op de juiste plek bij een ander schermformaat. Verander je later de
opbouw van een pagina sterk, dan kan een pin naar zijn reserve-positie terugvallen.

## Voorbeeldmodus (nu)
Zonder koppeling werkt de knop al, maar reacties blijven **alleen in de eigen browser** staan.
Handig om te proberen; nog niet om met anderen te delen.

## Delen met iedereen: Supabase koppelen (gratis, ± 5 minuten)
1. Maak een gratis project op https://supabase.com.
2. Open **SQL Editor** en voer `feedback/supabase.sql` uit (tabel + rechten).
3. Ga naar **Project Settings → API** en kopieer de **Project URL** en de **anon / publishable key**.
4. Plak ze in `assets/js/feedback-config.js`:
   ```js
   supabaseUrl: 'https://JOUWPROJECT.supabase.co',
   supabaseKey: 'JOUW-ANON-KEY',
   ```
5. Commit en push. Klaar: reacties zijn nu voor iedereen zichtbaar.

De anon-key is bedoeld om openbaar te staan. Wat bezoekers mogen, staat in de Row Level
Security in `supabase.sql`: alleen **lezen en toevoegen**, met lengtelimieten.

## Beheren
- Reacties bekijken, bewerken of verwijderen: Supabase → **Table Editor → comments**.
- Iedereen met de link kan een reactie plaatsen (er is geen inlog). Basisbeveiliging tegen spam:
  verborgen veld voor bots en een wachttijd van 8 seconden tussen reacties. Voor meer bescherming
  kun je later een captcha of inlog toevoegen.
- Reacties zijn openbaar leesbaar. Laat bezoekers dus geen persoonsgegevens achterlaten.

## Uitzetten
Zet in `assets/js/feedback-config.js` `enabled: false` (bijvoorbeeld wanneer de site officieel live gaat).


Bouw: pure HTML/CSS/JS, GitHub Pages; scripts in scripts/ (build-vooruitblik.py, check-toolkit.py, split-brand-packs.py, build-logo-pack.py, build-photo-pack.py, prepare/shrink-toolkit-assets.py). Pagina's van de Vooruitblik worden gegenereerd uit JSON; bewaarde oorspronkelijke versie: branch backup/vooruitblik-2026-10-23, tag vooruitblik-archief-2026-10-23.


## 7. Besliskroniek (git-geschiedenis, oud naar nieuw)

Elke regel is een wijziging; de tekst eronder geeft de reden of het besluit.

### 2026-10-16 Download: groene Partnerkit-balk bovenaan weg (#64)

### 2026-10-16 Waaier: AI-foto bij Echt vervangen door echte opname uit het lab (#65)

### 2026-10-16 Het merk: Wat we doen en Voor wie zonder balken, CC-tekst eruit, mozaïek met werk uit de UvNL-case (#67)

### 2026-10-16 In het kort: compacte pillen met getal naast tekst, geen geel/lichtgroen (#68)

### 2026-10-16 Vooruitblik: grotere universiteitslogo's en geen stapelwissels bij de portretten (#66)
De vijf universiteitslogo's staan in twee kolommen en zijn groter. De portretten in de kaart
"proffen" hebben een vaste stapelvolgorde (z-index) en springen niet meer naar voren bij hover.

### 2026-10-16 Tone of voice-regels als waaier van fotokaarten; 'Geen corporate verhaal' (#69)

### 2026-10-16 Download: overal drie packs (Partnerkit = alles, Logo pack, Foto-pack); foto-packs per merk (#70)

### 2026-10-16 Partnerkit: andere foto bij Foto-pack voor "Beide" (#71)
Bij de keuze "Beide" toonde het Foto-pack rechts de onderzoeker in gesprek. Dat is nu een spreker met de
paarse U. Alleen het voorbeeldbeeld is gewijzigd, niet de inhoud van de zip.

### 2026-10-16 Voorbeelden: sectieknoppen weg; Huisstijl: Algemene logo's op wit i.p.v. geel (#75)

### 2026-10-16 Huisstijl: ruimte en kop 'Combinaties' tussen kleuren en combi's; brandmark hernoemd naar beeldmerk (#76)

### 2026-10-16 Vooruitblik: Vormgeving opgeschoond, logo's in twee kolommen (#72)
* Vooruitblik: logo's op Vormgeving in twee duidelijk gescheiden kolommen

Links "Het project" met het logo van De Vooruitblik, rechts "De afzender" met het logo van Universiteit
van Vlaanderen. Elke kolom heeft een kop met label en korte uitleg, een gekleurde streep, een label op elke
tegel en de eigen downloads eronder. Een dunne lijn scheidt de twee kolommen.


* Vooruitblik: Beeld weg op Vormgeving, kleuren en lettertypes klein naast elkaar

De sectie met patroon en tunnel-U is verwijderd, samen met de drie afbeeldingen: dat is inspiratie voor de
algehele branding en geen downloadmateriaal. Kleuren en lettertypes staan nu klein en naast elkaar op
één rij onderaan de pagina.


---------

### 2026-10-16 Vooruitblik: rustigere afleveringenlijst met prof-iconen en nieuwe Kijk mee (#73)
De afleveringsrijen zijn wit met een datumtegel in de tunnelkleuren (lavendel, blauw, indigo) in plaats van
felle vlakken, en tonen kleine portretten van de twee sprekers (of een silhouet zolang er geen foto is). In
Kijk mee staat links de tekst met de laatste aflevering en rechts de speler van de laatste aflevering met
daaronder een trailer, voorlopig met video's van het kanaal van Universiteit van Vlaanderen.

### 2026-10-16 Vooruitblik: Boek zonder hero, groene blok bovenaan (#74)
* Vooruitblik: logo's op Vormgeving in twee duidelijk gescheiden kolommen

Links "Het project" met het logo van De Vooruitblik, rechts "De afzender" met het logo van Universiteit
van Vlaanderen. Elke kolom heeft een kop met label en korte uitleg, een gekleurde streep, een label op elke
tegel en de eigen downloads eronder. Een dunne lijn scheidt de twee kolommen.


* Vooruitblik: Beeld weg op Vormgeving, kleuren en lettertypes klein naast elkaar

De sectie met patroon en tunnel-U is verwijderd, samen met de drie afbeeldingen: dat is inspiratie voor de
algehele branding en geen downloadmateriaal. Kleuren en lettertypes staan nu klein en naast elkaar op
één rij onderaan de pagina.


* Vooruitblik: Boek zonder aparte hero, groene blok bovenaan

De paarse hero met boekafbeelding op de Boek-pagina is weggehaald omdat het boek al in het groene blok
staat. De kop en intro staan nu in dat blok, dat naar boven is verschoven.


---------

### 2026-10-16 Vooruitblik: Videopodcast met trailer in de hero en geen dubbele kop (#77)
De foto van de professor in de hero is vervangen door de trailer. De kop "Twee professoren, één vraag" is
weg; "Kijk mee" is nu de koptekst van de pagina, met de uitleg eronder. Daaronder staat de laatste
aflevering met speler, titel en sprekers.

### 2026-10-16 Vooruitblik: Vlaamse eventfoto bij Evenementen en Radio en live (#78)
De foto van een Nederlandse spreker is vervangen door een foto uit de Vlaamse beeldbank van het merkboek
(vl-spreker-met-u.jpg), op de homepagekaart Evenementen en in de hero van Radio en live.

### 2026-10-18 Vooruitblik: beeldvullend menu en groter boek in de hero op mobiel (#79)

### 2026-10-24 Maak De Vooruitblik een partnertoolkit met beeldbank en bewaar origineel

### 2026-10-24 Fix Vooruitblik mobile menu and portrait framing

### 2026-10-24 Compact photo library with expandable topics and smaller downloads

### 2026-10-24 Keep mobile media category buttons on one row

### 2026-10-24 Make question cards slightly more compact on mobile

### 2026-10-24 Use compact horizontal question cards on mobile

### 2026-10-24 Remove arbitrary portrait selection from homepage library block

### 2026-10-24 Show two question cards per row on mobile

### 2026-10-24 Remove search and filter form from photo library

### 2026-10-24 Make desktop library visual and split homepage materials into concise bars

### 2026-10-24 Fit book inside questions banner and show five cards on desktop

### 2026-10-25 Vooruitblik: tekstcontrole en opschoning na de toolkit-aanpassingen (#81)
Onjuiste of dubbele tekst eruit, vulling weg en bestandsnamen uit Drive leesbaar gemaakt.
- Hoofdstukpagina: "een filmtip per hoofdstuk" klopte niet (een extraatje: weetje, anekdote of filmtip).
- Boek: "Zo is elk hoofdstuk opgebouwd" ingekort; webshop-placeholder neutraal geformuleerd.
- Radio en live: zin over "belangrijke aanvulling" geschrapt.
- Vormgeving: kortere inleiding; "tape en driehoeken" en "felgroene kaarten" bij de kleuren vervangen
  door "Accent" (de bewegende linten bestaan niet meer); partnerlogo's krijgen leesbare labels in plaats
  van Drive-bestandsnamen ("Logo en merkbeeld 3 · zwart", "Logo · PNG").
- Beeldbank: kortere uitleg, e-mailhandtekeningen met hoofdletter.

### 2026-10-25 Vooruitblik: groter boek achter de bars en visuals in de bars op brede desktop (#82)
Vanaf 1101 px staat het boek groot (tot 440 px hoog), schuin en deels achter de twee bars. De bar
"Foto's en visuals" toont drie portretten en "Logo's en vormgeving" het logo van De Vooruitblik en het
vierkante logo van Universiteit van Vlaanderen. Op kleinere schermen blijft de bestaande opzet.

### 2026-10-25 Vooruitblik: lanceringsvoorbereiding (metadata, 404, archief uit de publieke map, controle) (#83)
- Alle pagina's krijgen een absolute og:image, og:url, canonical, twitter:card en nl_BE-locale; de basis-URL staat
  in SITE_URL in de builder en volgt automatisch een eigen domein.
- Een 404-pagina in de root van de repo (noindex, absolute links).
- Het archief van de oude site staat niet meer in de publieke map. Het blijft bewaard op branch
  backup/vooruitblik-2026-10-23 en tag vooruitblik-archief-2026-10-23.
- Zonder webshop-URL toont de Boek-pagina geen tijdelijke tekst meer.
- check-toolkit.py controleert nu ook canonical en absolute og:image en het bestaan van de bewaarde versie;
  een GitHub Action bouwt en controleert elke pull request.

### 2026-10-26 Vooruitblik: toolkit-bestanden kleiner en ongebruikte beelden weg (#84)
Portretten en grote sociale visuals zijn opnieuw opgeslagen (kwaliteit 85 en 88, progressief, zelfde afmetingen),
de ZIP's per spreker zijn opnieuw gebouwd en ongebruikte beelden (oude boekcovers, banners, 3D-beelden, losse
elementen) zijn verwijderd. De map vooruitblik/ gaat van ruim 170 MB naar ongeveer 119 MB. scripts/shrink-toolkit-assets.py
maakt dit herhaalbaar.

### 2026-10-26 Vooruitblik: homepage-tegels op mobiel compact, visueel en met minder tekst (#85)

### 2026-10-26 Vooruitblik: compactere teksten over de site en compacte cijferrij op mobiel (#86)

### 2026-10-26 Vooruitblik: logo-sectie op Vormgeving per afzender gegroepeerd, compact op mobiel (#87)

### 2026-10-26 Vooruitblik: Vormgeving, elk logo met zijn eigen download eronder (#88)

### 2026-10-26 Vooruitblik: logo-configurator met één downloadknop en compacte sprekerkaarten op mobiel (#89)

### 2026-10-26 Vooruitblik: partnerlogo's op mobiel twee naast elkaar en compacter (#90)

### 2026-10-27 Vooruitblik: adres naar vooruitblik.universiteitvanvlaanderen.be en automatisch publiceren (#91)
SITE_URL wijst naar het eigen subdomein, dus canonical, og:url en og:image bevatten geen GitHub-adres meer.
Een workflow zet de gebouwde site (zonder data, feedback en TOOLKIT.md) na elke wijziging als één commit op
mennoes/vooruitblik, dat op het subdomein wordt bediend.

Niet mergen voordat mennoes/vooruitblik, de deploy-sleutel en het geheim DEPLOY_KEY_VOORUITBLIK bestaan.

### 2026-10-27 Beeldbank: onderwerp opent in een venster, geen verspringende lijst (#92)
* Beeldbank: onderwerp opent in een venster in plaats van de lijst te laten verspringen

Een klik op een onderwerpkaart opende de kaart over de volle breedte en schoof alle kaarten door elkaar.
Nu opent het onderwerp in een venster (dialog) met sluitknop, Esc en klik naast het venster; de lijst
verandert niet van plek en het scrollen van de pagina wordt vergrendeld zolang het venster open is. Op
mobiel is het een venster dat van onderen opkomt. De directe links ?onderwerp=N (vanaf de hoofdstukpagina's,
werkte eerder niet) en #naam-van-spreker openen het juiste venster.


* Testbestand verwijderd


---------

### 2026-10-27 Beveiliging: CSP, vastgezette Actions, minimale rechten en extra controles (#93)
- Content Security Policy (meta) en referrer-beleid op elke pagina (niet op de 404); geen inline of externe scripts.
- GitHub Actions vastgezet op commit-hashes met permissions: contents: read; Dependabot houdt ze maandelijks actueel.
- check-toolkit.py keurt inline/externe scripts, ontbrekende CSP, event-handlers en target=_blank zonder noopener af.
- SECURITY.md beschrijft de maatregelen en de handmatige acties.

### 2026-10-28 Add new UvNL photography images

### 2026-10-30 Verduidelijk toolkitdoelgroep en corrigeer logo en vakgebieden

### 2026-10-30 Maak homepagebalken compact zonder subtekst

### 2026-10-30 Maak doelgroepbanner sluitbaar per bezoek

### 2026-10-30 Houd tekst wit bij hover op donkere hoofdstukkaarten

### 2026-10-30 Houd toolkitbanner zichtbaar tijdens scrollen

### 2026-10-30 Maak materiaalbalken smaller en houd boekcover vrij

### 2026-10-30 Vergroot boekcover en voeg rustige zweefanimatie toe

### 2026-10-30 Herstel compacte hoogte van groene homepagevlak

### 2026-10-30 Houd bovenkant zwevende cover vrij van navigatie

### 2026-10-30 Corrigeer vakgebied Tim De Meyer naar bio-informaticus

