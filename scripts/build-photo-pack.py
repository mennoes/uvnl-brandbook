#!/usr/bin/env python3
"""Bouwt de Nederlandse en Vlaamse fotobanken als één geordende ZIP."""
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

De Nederlandse en Vlaamse merkfoto's uit het merkboek, op volledige resolutie.

Gebruik: in colleges, thumbnails, posters en social uitingen van
Universiteit van Nederland of Universiteit van Vlaanderen.

(c) Universiteiten van Nederland - beeldgebruik in overleg met de redactie.
"""


def main():
    files = []
    for folder, _, names in os.walk(SRC):
        for name in names:
            if name.lower().endswith(EXTS) and name not in EXCLUDE:
                files.append(os.path.join(folder, name))
    files.sort()
    os.makedirs(OUT, exist_ok=True)
    zip_path = os.path.join(OUT, "uvnl-foto-pack.zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("uvnl-foto-pack/LEES-MIJ.txt", README)
        for full in files:
            rel = os.path.relpath(full, SRC)
            parts = rel.split(os.sep)
            if parts[0] == "vlaanderen":
                arc = os.path.join("uvnl-foto-pack", "Vlaanderen", *parts[1:])
            else:
                arc = os.path.join("uvnl-foto-pack", "Nederland", *parts)
            z.write(full, arc)
    size_mb = os.path.getsize(zip_path) / 1e6
    print("Wrote %s (%d foto's, %.1f MB)" % (zip_path, len(files), size_mb))


if __name__ == "__main__":
    main()
