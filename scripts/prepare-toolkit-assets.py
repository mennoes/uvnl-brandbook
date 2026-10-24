#!/usr/bin/env python3
"""Prepare local previews and downloads from the supplied Drive asset inventory.

Usage: python scripts/prepare-toolkit-assets.py INVENTORY RAW_DIRECTORY
RAW_DIRECTORY contains the downloaded original files, named by Drive file ID.
Originals remain in Drive. No credentials or temporary download URLs are stored.
"""
import json, pathlib, re, shutil, sys, unicodedata, zipfile
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'vooruitblik'
source = pathlib.Path(sys.argv[2])
inventory = json.loads(pathlib.Path(sys.argv[1]).read_text())
out = ROOT / 'assets/toolkit'
out.mkdir(parents=True, exist_ok=True)
def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode().lower()).strip('-')
def image(f):
    path = source / f['id']
    if f['title'].lower().endswith('.arw'):
        import rawpy
        with rawpy.imread(str(path)) as raw:
            return Image.fromarray(raw.postprocess(use_camera_wb=True, half_size=True))
    return ImageOps.exif_transpose(Image.open(path)).copy()
def preview(im, name, size=(720,720)):
    im.thumbnail(size)
    if im.mode not in ('RGB','RGBA'): im=im.convert('RGBA')
    im.save(out / (name+'.webp'), quality=83)
    return 'assets/toolkit/'+name+'.webp'
def asset(f, name, kind):
    im=image(f)
    w,h=im.size
    prev=preview(im.copy(),name)
    if kind=='portrait':
        im.thumbnail((2400,2400))
        im.convert('RGB').save(out/(name+'.jpg'),quality=92,optimize=True)
        download='assets/toolkit/'+name+'.jpg'
    else:
        ext='.png' if f['mime_type']=='image/png' else '.jpg'
        shutil.copyfile(source/f['id'],out/(name+ext))
        download='assets/toolkit/'+name+ext
    return {'name':f['title'],'preview':prev,'download':download,'original':f['url'],'width':w,'height':h,'id':f['id']}
people=[]
for p in inventory['people']:
    name,uni=p['title'].strip().rsplit(' - ',1)
    name={'Ike Pikone':'Ike Picone','Marijn Hoijtinck':'Marijn Hoijtink'}.get(name,name)
    key=slug(name)
    photos=[asset(f,key+'-'+str(i+1),'portrait') for i,f in enumerate(sorted(p['files'],key=lambda f:f['title'])[:3])]
    with zipfile.ZipFile(out/(key+'.zip'),'w',zipfile.ZIP_DEFLATED) as z:
        for f in photos: z.write(ROOT/f['download'],pathlib.Path(f['download']).name)
    people.append({'name':name,'uni':uni,'slug':key,'topic':p['topic'],'folder':p['url'],'photos':photos,'zip':'assets/toolkit/'+key+'.zip'})
extras=[]
for f in inventory['extras']:
    name=slug(f['title'])+'-'+f['id'][-5:]
    if f['mime_type'].startswith('image/'):
        a=asset(f,name,'extra')
    else:
        shutil.copyfile(source/f['id'],out/(name+'.pdf'))
        a={'name':f['title'],'download':'assets/toolkit/'+name+'.pdf','original':f['url'],'id':f['id']}
    a['category']=f['category'];extras.append(a)
result={'updated':'2026-10-23','people':sorted(people,key=lambda p:p['name']),'extras':extras}
(ROOT/'data/toolkit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(f"Prepared {len(people)} people, {len(extras)} other assets")
