# Feedback & reacties

Rechtsonder op elke pagina staat een knop **Feedback**. Bezoekers laten daar een reactie achter
(naam is optioneel), zien de reacties op de pagina waar ze zijn, en kunnen via **Alle pagina's**
alle feedback van de hele site doorlezen.

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
