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
