#!/usr/bin/env python3
"""Bouwt downloads/uvnl-logo-pack.zip uit assets/logos/*.svg.

De bron-SVG's gebruiken fill="currentColor" zodat ze op de site via CSS
ingekleurd worden. Standalone (los gedownload) valt currentColor terug op
zwart. Deze build bakt daarom echte kleuren in: Varsity Green als standaard,
plus witte en zwarte varianten, en levert ook kant-en-klare PNG's.
"""
import os, re, shutil, zipfile, cairosvg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "logos")
OUT = os.path.join(ROOT, "downloads")
BUILD = os.path.join(ROOT, ".build-logo-pack")

COLORS = {
    "groen": "#004B36",  # Varsity Green - standaard
    "wit":   "#FFFFFF",  # voor donkere achtergronden
    "zwart": "#000000",  # eenkleurig / drukwerk
}
PNG_COLORS = ["groen", "wit"]  # PNG's alleen waar ze zinvol zijn
PNG_WIDTH = 1600

README = """UvNL / UvVl logo pack
=====================

De logo's staan hier in drie kleuren, met de kleur al ingebakken:

  svg/groen/   Varsity Green (#004B36) - de standaardkleur
  svg/wit/     wit (#FFFFFF) - voor op donkere achtergronden/foto's
  svg/zwart/   zwart (#000000) - eenkleurig gebruik / drukwerk

  png/groen/   PNG, groen op transparant (1600px breed)
  png/wit/     PNG, wit op transparant (1600px breed)

Gebruik SVG waar het kan (schaalt oneindig scherp). PNG is handig voor
office-programma's en snelle previews.

Let op: gebruik de witte variant niet op een lichte achtergrond - je ziet
hem dan niet. Voor inline gebruik op het web staan de bron-SVG's met
currentColor in de huisstijl-website zelf.

(c) Universiteiten van Nederland
"""


def recolor(svg_text, hex_color):
    return svg_text.replace("currentColor", hex_color)


def main():
    if os.path.isdir(BUILD):
        shutil.rmtree(BUILD)
    os.makedirs(BUILD)

    sources = sorted(f for f in os.listdir(SRC) if f.endswith(".svg"))
    for name in COLORS:
        os.makedirs(os.path.join(BUILD, "svg", name), exist_ok=True)
    for name in PNG_COLORS:
        os.makedirs(os.path.join(BUILD, "png", name), exist_ok=True)

    for fn in sources:
        with open(os.path.join(SRC, fn), encoding="utf-8") as fh:
            raw = fh.read()
        for cname, hexv in COLORS.items():
            colored = recolor(raw, hexv)
            with open(os.path.join(BUILD, "svg", cname, fn), "w", encoding="utf-8") as out:
                out.write(colored)
            if cname in PNG_COLORS:
                png_path = os.path.join(BUILD, "png", cname, fn[:-4] + ".png")
                cairosvg.svg2png(bytestring=colored.encode("utf-8"),
                                 write_to=png_path, output_width=PNG_WIDTH)

    with open(os.path.join(BUILD, "LEES-MIJ.txt"), "w", encoding="utf-8") as fh:
        fh.write(README)

    os.makedirs(OUT, exist_ok=True)
    zip_path = os.path.join(OUT, "uvnl-logo-pack.zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for folder, _, files in os.walk(BUILD):
            for f in sorted(files):
                full = os.path.join(folder, f)
                arc = os.path.join("uvnl-logo-pack", os.path.relpath(full, BUILD))
                z.write(full, arc)

    shutil.rmtree(BUILD)
    print("Wrote", zip_path)


if __name__ == "__main__":
    main()
