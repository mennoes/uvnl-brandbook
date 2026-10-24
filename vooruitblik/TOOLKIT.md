# De Vooruitblik — partnertoolkit

Gebaseerd op Feedback Toolkit Menno en de communicatieleidraad uit de aangeleverde Drive-map. De toolkit bevat 46 sprekers, 138 portretten (JPG en previews), 46 ZIP-pakketten, social visuals, boekcovers, banners en partnerlogo’s.

## Opnieuw bouwen

Voer `python3 scripts/build-vooruitblik.py` uit vanaf de repositoryroot. Daarna `python3 scripts/check-toolkit.py`. De builder gebruikt `vooruitblik/data/toolkit.json` en roept `scripts/toolkit-pages.py` aan. Foto’s zijn vooraf verwerkt met `scripts/prepare-toolkit-assets.py`; het manifest bevat de oorspronkelijke Drive-verwijzingen.

## Bewaarde oorspronkelijke versie

`vooruitblik-archief-2026-10-23/` bevat de volledige oorspronkelijke site, ongewijzigd. Ook beschikbaar op Git-branch `backup/vooruitblik-2026-10-23`, uitgangscommit `693d39db5f355bcc2b700e4b282edac55494991a`. De controle vergelijkt elk archiefbestand byte voor byte met deze versie. 3D-hoverkaarten en shuffle blijven ook in de nieuwe toolkit aanwezig.

## Nog aan te leveren

De eigen webshop-URL stond niet in de bestaande site of feedback. Externe verkopers zijn conform feedback verwijderd. Vul `URL["webshop"]` in de builder in zodra de juiste link bekend is en bouw opnieuw.

De aangeleverde mappen voor verticale visuals, generieke beelden, collages, advertenties en video bevatten nog geen bestanden. De website meldt dit zonder lege downloadknoppen. Alle aangeleverde extra portretten blijven via de links naar de originele Drive-mappen beschikbaar.
