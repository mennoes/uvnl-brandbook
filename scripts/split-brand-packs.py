#!/usr/bin/env python3
"""Maakt per merk een eigen partnerkit en logo pack uit de gecombineerde zips.

Bron:    downloads/uvnl-partner-kit.zip, downloads/uvnl-logo-pack.zip
Uitvoer: downloads/uvnl-partner-kit-{nederland,vlaanderen}.zip
         downloads/uvnl-logo-pack-{nederland,vlaanderen}.zip
         downloads/uvnl-foto-pack-{nederland,vlaanderen}.zip
Eerst scripts/build-partner-kit.py en scripts/build-logo-pack.py draaien.
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = os.path.join(ROOT, "downloads")

BRANDS = {
    "nederland": {"naam": "Universiteit van Nederland", "map": "Nederland", "logo": "uvnl-"},
    "vlaanderen": {"naam": "Universiteit van Vlaanderen", "map": "Vlaanderen", "logo": "uvvl-"},
}
SHARED_LOGOS = ("u-outline", "vaandel")  # beeldmerk-onderdelen voor beide merken

KIT_README = """{naam} — PARTNERKIT

Logo's (SVG) en fotografie van {naam}.

Gebruik het logo ongewijzigd en met voldoende vrije ruimte. De fotografie is
bedoeld voor redactionele aandacht. Stem campagnes of aangepaste merkuitingen
vooraf af via info@studioyoko.nl.
"""


def kit(brand, cfg):
    src = os.path.join(DL, "uvnl-partner-kit.zip")
    out = os.path.join(DL, f"uvnl-partner-kit-{brand}.zip")
    prefix = f"Partnerkit/{cfg['map']}/"
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        zout.writestr("Partnerkit/LEES-MIJ.txt", KIT_README.format(naam=cfg["naam"]))
        for info in zin.infolist():
            if info.filename.startswith(prefix) and not info.is_dir():
                zout.writestr(info, zin.read(info.filename))
    print("Wrote", out, os.path.getsize(out) // 1024, "KB")


def logos(brand, cfg):
    src = os.path.join(DL, "uvnl-logo-pack.zip")
    out = os.path.join(DL, f"uvnl-logo-pack-{brand}.zip")
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        for info in zin.infolist():
            if info.is_dir():
                continue
            base = os.path.basename(info.filename)
            if base == "LEES-MIJ.txt":
                text = zin.read(info.filename).decode("utf-8").replace("UvNL / UvVl logo pack", f"{cfg['naam']} — logo pack")
                zout.writestr(info, text)
            elif base.startswith(cfg["logo"]) or base.startswith(SHARED_LOGOS):
                zout.writestr(info, zin.read(info.filename))
    print("Wrote", out, os.path.getsize(out) // 1024, "KB")


def photos(brand, cfg):
    src = os.path.join(DL, "uvnl-foto-pack.zip")
    out = os.path.join(DL, f"uvnl-foto-pack-{brand}.zip")
    prefix = f"uvnl-foto-pack/{cfg['map']}/"
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        zout.writestr("uvnl-foto-pack/LEES-MIJ.txt", f"{cfg['naam']} — foto-pack\n\nDe merkfoto's van {cfg['naam']} op volledige resolutie.\nBeeldgebruik in overleg met de redactie.\n")
        for info in zin.infolist():
            if info.filename.startswith(prefix) and not info.is_dir():
                info.filename = "uvnl-foto-pack/" + info.filename[len(prefix):]
                zout.writestr(info, zin.read(info.orig_filename if hasattr(info, "orig_filename") else info.filename))
    print("Wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    for b, c in BRANDS.items():
        kit(b, c)
        logos(b, c)
        photos(b, c)
