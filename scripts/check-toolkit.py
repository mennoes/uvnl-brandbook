#!/usr/bin/env python3
"""Validate generated navigation, real assets, per-speaker downloads and backup fidelity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, zipfile, subprocess, re
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
# Validate the actual published downloads, not the retired 46-person import manifest.
zip_paths = { (path.parent / unquote(urlsplit(link).path)).resolve()
              for path, page in pages.items() for link in page.links
              if not urlsplit(link).scheme and urlsplit(link).path.endswith('.zip') }
for path in zip_paths:
    if path.is_file():
        with zipfile.ZipFile(path) as z:
            if not z.namelist() or z.testzip() is not None:
                errors.append(f'{path.name}: invalid ZIP')
# Regression checks for the editorial content recovered on 2026-11-03.
questions=(SITE/'vragen.html').read_text()
if len(re.findall(r'class="card [^"]*scientist-card', questions)) != 47:
    errors.append('vragen.html: expected 47 scientist cards')
for path in pages:
    if path.name != '404.html' and 'videopodcast.html#publicatieschema' not in path.read_text():
        errors.append(f'{path.name}: publication schedule navigation missing')
home=(SITE/'index.html').read_text()
for filename in ('handleiding-vooruitblik-2027.pdf', 'persbericht-vooruitblik-2027.pdf'):
    if filename not in home: errors.append(f'index.html: missing {filename}')
for path in pages:
    if re.search(r'^(<<<<<<<|=======|>>>>>>>)', path.read_text(), re.M):
        errors.append(f'{path.name}: unresolved merge conflict')
# De oorspronkelijke site staat niet meer in de publieke map, maar blijft bewaard op een branch en een tag.
base='backup/vooruitblik-2026-10-23'
def has_ref(ref):
    return subprocess.run(['git','rev-parse','--verify','-q',ref],cwd=ROOT,capture_output=True).returncode==0
if not (has_ref(base) or has_ref('origin/'+base)):errors.append(f'Bewaarde versie ontbreekt: branch {base}')
if (ROOT/'vooruitblik-archief-2026-10-23').exists():errors.append('Het archief hoort niet meer in de publieke map')
# Metadata voor delen en zoekmachines: absoluut, met canonical.
for path,p in pages.items():
    h=path.read_text()
    if not re.search(r'<link rel="canonical" href="https://[^"]+">',h):errors.append(f'{path.name}: canonical ontbreekt')
    if not re.search(r'og:image" content="https://',h):errors.append(f'{path.name}: og:image niet absoluut')
# Beveiliging: geen inline of externe scripts, CSP aanwezig, nieuwe vensters met noopener.
for path,p in pages.items():
    h=path.read_text()
    for m in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',h,re.S):
        if m.group(1).strip():errors.append(f'{path.name}: inline script')
    if re.search(r'<script[^>]*src="https?://',h):errors.append(f'{path.name}: extern script')
    if 'http-equiv="Content-Security-Policy"' not in h:errors.append(f'{path.name}: CSP ontbreekt')
    for tag in re.findall(r'<a [^>]*target="_blank"[^>]*>',h):
        if 'noopener' not in tag:errors.append(f'{path.name}: target=_blank zonder noopener')
    if re.search(r'\son[a-z]+="',h):errors.append(f'{path.name}: inline event-handler')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'PASS: {len(pages)} pages, 47 scientist cards, {len(zip_paths)} ZIPs, links, partner PDFs, schedule, security and backup.')
