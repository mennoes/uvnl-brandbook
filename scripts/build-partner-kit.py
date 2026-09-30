#!/usr/bin/env python3
"""Bouwt de externe partnerkit met duidelijk gescheiden merkbestanden."""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGOS = os.path.join(ROOT, "assets", "logos")
PHOTOS = os.path.join(ROOT, "assets", "photos")
OUT = os.path.join(ROOT, "downloads", "uvnl-partner-kit.zip")

NL_LOGOS = ["uvnl-brandmark.svg", "uvnl-logo.svg", "uvnl-logo-square.svg", "uvnl-wordmark.svg"]
VL_LOGOS = ["uvvl-logo.svg", "uvvl-logo-square.svg", "uvvl-wordmark.svg"]
EXCLUDE = {"poster-person1.png", "poster-person2.png", "event-u-r.jpg", "event-u-left.jpg", "artis-text.png"}
EXTS = (".jpg", ".jpeg", ".png")

README = """UNIVERSITEIT VAN NEDERLAND & VLAANDEREN — PARTNERKIT

De logo's en fotografie zijn per merk gescheiden. Gebruik de Nederlandse en
Vlaamse bestanden niet door elkaar.

Gebruik het logo ongewijzigd en met voldoende vrije ruimte. De fotografie is
bedoeld voor redactionele aandacht. Stem campagnes of aangepaste merkuitingen
vooraf af via info@studioyoko.nl.
"""


def main():
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("Partnerkit/LEES-MIJ.txt", README)
        for name in NL_LOGOS:
            archive.write(os.path.join(LOGOS, name), os.path.join("Partnerkit", "Nederland", "Logo's", name))
        for name in VL_LOGOS:
            archive.write(os.path.join(LOGOS, name), os.path.join("Partnerkit", "Vlaanderen", "Logo's", name))
        for folder, _, names in os.walk(PHOTOS):
            for name in sorted(names):
                if not name.lower().endswith(EXTS) or name in EXCLUDE:
                    continue
                full = os.path.join(folder, name)
                rel = os.path.relpath(full, PHOTOS).split(os.sep)
                if rel[0] == "vlaanderen":
                    arc = os.path.join("Partnerkit", "Vlaanderen", "Fotografie", *rel[1:])
                else:
                    arc = os.path.join("Partnerkit", "Nederland", "Fotografie", *rel)
                archive.write(full, arc)
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
