#!/usr/bin/env python3
"""Validate generated navigation, real assets, per-speaker downloads and backup fidelity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, zipfile, subprocess
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'vooruitblik'
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__(); self.links=[];self.ids=[];self.h1=0;self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        for k in ('href','src'):
            if a.get(k): self.links.append(a[k])
errors=[]
pages={p:Page(p.read_text()) for p in SITE.rglob('*.html')}
for path,p in pages.items():
    if p.h1!=1:errors.append(f'{path.name}: {p.h1} h1 elements')
    if len(p.ids)!=len(set(p.ids)):errors.append(f'{path.name}: duplicate IDs')
    for link in p.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        dest=(path.parent/unquote(u.path)).resolve() if u.path else path
        if not dest.exists(): errors.append(f'{path.name}: missing {link}')
        elif u.fragment and dest.suffix=='.html':
            target=pages.get(dest) or Page(dest.read_text())
            if u.fragment not in target.ids:errors.append(f'{path.name}: missing anchor {link}')
    if 'standaardboekhandel.be' in path.read_text() or 'pelckmansuitgevers.be/de-vooruitblik' in path.read_text():errors.append(f'{path.name}: retailer order link')
    if 'Voorlopige video' in path.read_text():errors.append(f'{path.name}: unrelated video placeholder')
manifest=json.loads((SITE/'data/toolkit.json').read_text())
assert len(manifest['people'])==46
for person in manifest['people']:
    assert len(person['photos'])==3,person['name']
    for a in person['photos']:
        assert (SITE/a['preview']).is_file()
        assert (SITE/a['download']).is_file()
    with zipfile.ZipFile(SITE/person['zip']) as z:
        assert len(z.namelist())==3 and z.testzip() is None,person['name']
# The archived site is byte-for-byte the baseline, including JS/CSS and hover effects.
base='backup/vooruitblik-2026-10-23'
files=subprocess.check_output(['git','ls-tree','-r','--name-only',base,'vooruitblik'],cwd=ROOT,text=True).splitlines()
for rel in files:
    original=subprocess.check_output(['git','show',f'{base}:{rel}'],cwd=ROOT)
    archived=ROOT/rel.replace('vooruitblik/','vooruitblik-archief-2026-10-23/',1)
    if archived.read_bytes()!=original:errors.append(f'Backup changed: {rel}')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'PASS: {len(pages)} pages, local links/anchors, 46 speakers, 138 photos, 46 ZIPs, and {len(files)} unchanged archive files.')
