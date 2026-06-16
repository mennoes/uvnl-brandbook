#!/usr/bin/env python3
"""Bouwt downloads/uvnl-foto-pack.zip uit assets/photos/*.

Verzamelt alle merkfoto's in een platte ZIP met een korte LEES-MIJ.
"""
import os, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "photos")
OUT = os.path.join(ROOT, "downloads")

EXTS = (".jpg", ".jpeg", ".png")
# Foto's die wel op de site staan maar niet mee mogen in de download (rechten).
EXCLUDE = {
    "poster-person1.png",
    "poster-person2.png",
    "event-u-r.jpg",
    "event-u-left.jpg",
    "artis-text.png",
}
README = """UvNL foto-pack
==============

Alle merkfoto's uit het merkboek, op volledige resolutie.

Gebruik: in colleges, thumbnails, posters en social uitingen van
Universiteit van Nederland. Crop strak, eventueel met een merkkleur-wash.

(c) Universiteiten van Nederland - beeldgebruik in overleg met de redactie.
"""


def main():
    files = sorted(f for f in os.listdir(SRC)
                   if f.lower().endswith(EXTS) and f not in EXCLUDE)
    os.makedirs(OUT, exist_ok=True)
    zip_path = os.path.join(OUT, "uvnl-foto-pack.zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("uvnl-foto-pack/LEES-MIJ.txt", README)
        for f in files:
            z.write(os.path.join(SRC, f), os.path.join("uvnl-foto-pack", f))
    size_mb = os.path.getsize(zip_path) / 1e6
    print("Wrote %s (%d foto's, %.1f MB)" % (zip_path, len(files), size_mb))


if __name__ == "__main__":
    main()
