# Toolkit onderhouden

## Actuele bron

De HTML-bestanden in deze map en `hoofdstuk/`, met de bijbehorende CSS, JavaScript en assets, zijn de actuele bron. Bewerk deze bestanden rechtstreeks in **mennoes/uvnl-brandbook**. De repository **mennoes/vooruitblik** is uitsluitend de gepubliceerde kopie voor het eigen domein.

Controleer met `python3 scripts/check-toolkit.py` en `python3 scripts/test-publish-toolkit.py`. De oude opdracht `python3 scripts/build-vooruitblik.py` doet nu alleen dezelfde inhoudscontrole en overschrijft geen pagina’s. De oude generator is in de Git-geschiedenis bewaard. De JSON in `data/` is historisch importmateriaal en niet de actuele redactionele bron; gebruik dit niet om de website of foto's opnieuw te genereren. Hetzelfde geldt voor de oude prepare/shrink-assets scripts.

Bij CSS- of JavaScript-wijzigingen: vernieuw de `?v=`-waarde in de verwijzingen om oude browsercaches te vermijden. Controleer desktop en mobiel en behoud de 3D-kaarten, hovercontrast, sluitbare vaste doelgroepbanner en grote zwevende boekcover.

## Herstel van 3 november 2026

Rechtstreekse wijzigingen van 27–29 oktober in de publicatierepository waren op 30 oktober overschreven door een automatische publicatie vanuit oudere bronbestanden. De publicatie gebruikte bovendien een force-push met steeds één commit.

Herstelde redactionele bron: `mennoes/vooruitblik` commit `489d14cf994224f40a028687bf41f6cf594be91f`, veilig bewaard als tag `herstelbron-toolkit-2026-10-29` in deze repository. Deze bevat onder andere 47 wetenschappers, goedgekeurde portretten, beide quoteformaten, publicatieschema, trailer, campagnebeelden en partner-pdf’s. Latere wijzigingen van 30 oktober zijn behouden, inclusief de vakgebieden van Annelien Smets, Stijn Joye, Tim De Meyer en Hannah Keppler. De toestand vóór herstel is bewaard op `backup/toolkit-voor-herstel-2026-11-03`.

## Publiceren

Na controles en samenvoegen naar main publiceert `.github/workflows/publiceer.yml` automatisch. De publicatie bewaart voortaan de Git-geschiedenis en gebruikt **geen force-push**. `.source-revision` in de doelrepo verwijst naar de broncommit. Voor iedere volgende publicatie vergelijkt het script de bestaande website met die bron. Rechtstreekse wijzigingen in de doelrepo blokkeren de publicatie vóór er bestanden worden overschreven: neem die wijzigingen eerst over en onderzoek het verschil.

De gecontroleerde eenmalige herstelbasis is doelcommit `22e737a0248576d84b1dbb6d8b401e71459a0e7a`. Ook wijzigingen na dit herstelpunt blokkeren de eerste herpublicatie.

## Back-up oorspronkelijke ontwerp

De versie van 23 oktober blijft beschikbaar op branch `backup/vooruitblik-2026-10-23` en tag `vooruitblik-archief-2026-10-23`. Zet het archief niet in de openbare website.
