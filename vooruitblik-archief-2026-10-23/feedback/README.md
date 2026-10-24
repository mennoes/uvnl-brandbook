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
