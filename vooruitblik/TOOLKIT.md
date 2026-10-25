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
