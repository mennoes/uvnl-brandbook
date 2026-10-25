#!/usr/bin/env python3
"""Maak de toolkit-downloads kleiner zonder zichtbaar kwaliteitsverlies.

- Portretten (JPG): opnieuw opgeslagen op kwaliteit 85, progressief en geoptimaliseerd.
- Sociale visuals en covers (JPG groter dan 300 KB): kwaliteit 88.
- De ZIP's per spreker worden daarna opnieuw samengesteld uit de drie portretten.
Afmetingen blijven gelijk. De volledige originelen staan in Drive. Een bestand wordt alleen vervangen als het kleiner wordt.
"""
import json, pathlib, zipfile
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'vooruitblik'
T = ROOT / 'assets/toolkit'
tk = json.loads((ROOT / 'data/toolkit.json').read_text())

def shrink(path, quality):
    before = path.stat().st_size
    im = Image.open(path)
    tmp = path.with_suffix('.tmp.jpg')
    im.convert('RGB').save(tmp, 'JPEG', quality=quality, optimize=True, progressive=True)
    if tmp.stat().st_size < before * 0.95:
        tmp.replace(path)
    else:
        tmp.unlink()
    return before, path.stat().st_size

portraits = {ROOT / a['download'] for p in tk['people'] for a in p['photos']}
tot_b = tot_a = 0
for f in sorted(T.glob('*.jpg')):
    if f in portraits:
        b, a = shrink(f, 85)
    elif f.stat().st_size > 300_000:
        b, a = shrink(f, 88)
    else:
        continue
    tot_b += b; tot_a += a
for p in tk['people']:
    with zipfile.ZipFile(ROOT / p['zip'], 'w', zipfile.ZIP_DEFLATED) as z:
        for a in p['photos']:
            z.write(ROOT / a['download'], pathlib.Path(a['download']).name)
print(f'JPG: {tot_b/1e6:.1f} MB -> {tot_a/1e6:.1f} MB; ZIPs opnieuw gebouwd')
