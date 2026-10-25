#!/usr/bin/env python3
"""Bouwt de statische site De Vooruitblik 2027 (Universiteit van Vlaanderen).

Gebruik:  python3 scripts/build-vooruitblik.py
Bron:     vooruitblik/data/hoofdstukken.json  (alle inhoud van de 23 hoofdstukken)
Uitvoer:  vooruitblik/*.html en vooruitblik/hoofdstuk/*.html
"""
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "vooruitblik"
E = html.escape

# Volgorde zoals in de handleiding van 29 september 2026.
ORDER = [
    "langer-en-gezonder-leven-in-limburg", "nobelprijswinnaars-in-brussel", "verkeersregels-voor-e-steps",
    "hoe-gewoon-mag-koningin-elisabeth-zijn", "drinkbaar-water-uit-de-kraan", "botox-even-normaal-als-een-tandartscontrole",
    "hoe-heeft-star-wars-de-filmindustrie-veranderd", "geen-spuitjes-meer-voor-mensen-met-diabetes",
    "internet-brol-door-advertenties-op-chatgpt", "nog-maar-een-app-op-je-smartphone",
    "birkenstocks-met-elektriciteit-in-plaats-van-gas", "homoseksualiteit-wegknippen-uit-je-dna",
    "verleren-we-toevalligheden-op-te-merken", "hoorapparaat-graag-dragen", "geen-adoptiekinderen-meer-uit-het-buitenland",
    "kan-de-navo-rusland-aan", "ziektes-opsporen-met-stoelgangtesten", "triatlon-lopen-om-erbij-te-horen",
    "wolf-in-jouw-stadstuin", "wat-neemt-rafael-liegeois-mee-naar-het-iss", "non-stop-vlucht-van-22-uur",
    "wie-wordt-de-opvolger-van-trump", "geraak-je-alleen-nog-via-tinder-aan-een-lief",
]
UNIS = ["UAntwerpen", "UHasselt", "KU Leuven", "UGent", "VUB"]
URL = {
    "webshop": "",
    "uvvl": "https://www.universiteitvanvlaanderen.be/",
    "vrtmax_pod": "https://www.vrt.be/vrtmax/podcasts/radio-1/u/universiteit-van-vlaanderen/",
    "vrtmax_vid": "https://www.vrt.be/vrtmax/a-z/universiteit-van-vlaanderen/",
    "spotify": "https://open.spotify.com/show/3ELSgsbfTyeXTemObHGLp9",
    "radio1": "https://www.vrt.be/vrtmax/kanalen/radio-1/",
    "youtube": "https://www.youtube.com/@UniversiteitvanVlaanderen",
    "instagram": "https://www.instagram.com/universiteitvanvlaanderen/",
    "tiktok": "https://www.tiktok.com/@universiteitvl",
}

chapters = {c["slug"]: c for c in json.loads((ROOT / "data" / "hoofdstukken.json").read_text(encoding="utf-8"))}
KLEUREN = ["red", "purple", "yellow", "blue", "mint"]
CH = []
for i, slug in enumerate(ORDER, 1):
    c = chapters.pop(slug)
    c["nr"] = i
    c["kleur"] = KLEUREN[(i - 1) % len(KLEUREN)]   # kleur volgt de volgorde op de site, zodat buren altijd verschillen
    CH.append(c)
assert not chapters, f"hoofdstukken zonder plek in ORDER: {list(chapters)}"


import datetime
DAGEN = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]


def dt(iso):
    return datetime.date.fromisoformat(iso)


def lang(iso):
    x = dt(iso)
    return f"{DAGEN[x.weekday()]} {x.day} {MAANDEN[x.month - 1]}"


def speakers(c):
    """Sprekers in de videopodcast: standaard auteur + tweede expert."""
    return c.get("podcast") or [c["boek"], c["gast"]]


def initials(name):
    w = [p for p in name.replace("’", "'").split() if p[0].isalpha()]
    return (w[0][0] + w[-1][0]).upper()


def person(p, role):
    meta = " · ".join(x for x in (p["vak"], p["uni"]) if x)
    if p.get("foto"):
        avatar = f'<div class="avatar avatar--foto"><img src="../assets/foto/{p["foto"]}" alt="{E(p["naam"])}" width="64" height="64" loading="lazy"></div>'
    else:
        avatar = f'<div class="avatar" aria-hidden="true">{E(initials(p["naam"]))}</div>'
    return (f'<div class="person">{avatar}'
            f'<div><div class="role">{E(role)}</div><div class="name">{E(p["naam"])}</div>'
            f'<div class="meta">{E(meta)}</div></div></div>')


SILHOUETTEN = 8   # assets/foto/silhouet-1..8.webp: uitgeknipte contouren van echte portretten met een cursief vraagteken


def card_foto(c):
    """Eerste persoon van het hoofdstuk met een portret (auteur, dan gast)."""
    for p in (c["boek"], c["gast"]):
        if p.get("foto"):
            return p
    return None


def card(c, base):
    f = card_foto(c)
    if f:
        fig = (f'<div class="card-fig"><img class="f" src="{base}assets/foto/{f["foto"]}" alt="{E(f["naam"])}" '
               f'width="450" height="540" loading="lazy"></div>')
    else:
        fig = (f'<div class="card-fig card-fig--sil"><img class="f" src="{base}assets/foto/silhouet-{c["nr"] % SILHOUETTEN + 1}.webp" alt="" '
               f'width="450" height="563" loading="lazy"></div>')
    return (f'<div class="card-wrap"><span class="card-nr">Hoofdstuk {c["nr"]}</span>'
            f'<a class="card c-{c["kleur"]}" href="{base}hoofdstuk/{c["slug"]}.html" '
            f'data-uni="{E(c["boek"]["uni"] + " " + c["gast"]["uni"])}" '
            f'data-zoek="{E((c["vraag"] + " " + c["boek"]["naam"] + " " + c["gast"]["naam"] + " " + c["boek"]["vak"] + " " + " ".join(p["naam"] for p in speakers(c))).lower())}">'
            f'{fig}<h3>{E(c["vraag"])}</h3>'
            f'<div class="who">{E(c["boek"]["naam"])} <span>· {E(c["boek"]["uni"])}</span></div></a></div>')


def hero_portret(c):
    """Portret van de auteur rechts in de hero; zonder portret het silhouet van de placeholder."""
    f = card_foto(c)
    if f:
        return (f'<img class="orn orn--foto" src="../assets/foto/{f["foto"]}" alt="{E(f["naam"])}" width="450" height="563">')
    return (f'<img class="orn orn--foto orn--sil" src="../assets/foto/silhouet-{c["nr"] % SILHOUETTEN + 1}.webp" alt="" width="450" height="563">')


def hl(text):
    """Elk woord op een eigen kleurblok (zoals de thumbs in de huisstijl); het vraagteken wiebelt."""
    out = []
    for i, w in enumerate(text.split(" ")):
        inner = (E(w[:-1]) + '<span class="qm">?</span>') if w.endswith("?") else E(w)
        out.append(f'<span class="w" style="--i:{i}"><span>{inner}</span></span>')
    return " ".join(out)


def shapes(items):
    """Zwevende basisvormen uit de huisstijl: (soort, kleur, links, boven, grootte, vertraging, rotatie)."""
    return '<div class="shapes" aria-hidden="true">' + "".join(
        f'<span class="sh sh-{k}" style="--c:var(--{c});left:{l};top:{t};--s:{sz};--d:{d}s;--r:{r}deg"></span>'
        for k, c, l, t, sz, d, r in items) + "</div>"


HERO_SHAPES = {"hero-purple": ("green", "blue", "paper"), "hero-yellow": ("green", "blue", "pink"),
               "hero-pink": ("green", "blue", "purple"), "hero-blue": ("paper", "purple", "green"),
               "hero-paper": ("green", "blue", "purple"), "hero-green": ("purple", "blue", "pink")}


def hero_shapes(cls):
    return ""   # bewust leeg: rustiger, meer zoals de huisstijl-site
    a, b, c = HERO_SHAPES.get(cls.split()[0], HERO_SHAPES["hero-paper"])
    return shapes([("circle", a, "66%", "6%", "clamp(26px,4vw,60px)", 0, 0), ("hex", a, "91%", "8%", "clamp(26px,3.6vw,54px)", 1, 8),
                   ("tri", b, "80%", "27%", "clamp(30px,4.4vw,66px)", 2, 12), ("ring", c, "94%", "50%", "clamp(34px,5vw,76px)", 4, 0)])


TILES = [("paper", "green"), ("paper", "green")]
EYEWALL = '<div class="eyewall" aria-hidden="true">' + "".join(
    f'<span class="ew ew-{bg} ew-r-{ring}"><i class="ew-eye"><b></b></i></span>' for bg, ring in TILES) + "</div>"

NAV = [("index.html", "De Vooruitblik"), ("fotos-en-visuals.html", "Foto’s en visuals"), ("vragen.html", "De 23 vragen"), ("lezen-kijken-luisteren.html", "Lezen, kijken en luisteren"), ("vormgeving.html", "Vormgeving")]
FOOT_NAV = NAV[1:]


import hashlib as _h
def ver(rel):
    return _h.md5((ROOT / rel).read_bytes()).hexdigest()[:8]


def page(path, title, desc, body, base="", current="", hero_class="", og_img="assets/img/boek-cover.jpg"):
    current = "lezen-kijken-luisteren.html" if current in ("boek.html", "videopodcast.html", "radio-en-live.html") else current
    nav = "".join(f'<a href="{base}{h}"{" aria-current=page" if h == current else ""}>{t}</a>' for h, t in NAV)
    full_title = f"{title} · De Vooruitblik 2027" if title != "De Vooruitblik 2027" else "De Vooruitblik 2027 · Universiteit van Vlaanderen"
    out = f"""<!doctype html>
<html lang="nl-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(full_title)}</title>
<meta name="description" content="{E(desc)}">
<meta property="og:title" content="{E(full_title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="{base}{og_img}">
<meta name="theme-color" content="#004B36">
<link rel="icon" href="{base}assets/logos/uvvl-logo-square.svg" type="image/svg+xml">
<link rel="preload" href="{base}assets/fonts/OldschoolGrotesk-Bold.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="{base}assets/css/vooruitblik.css?v={ver('assets/css/vooruitblik.css')}">
<link rel="stylesheet" href="{base}assets/css/feedback.css?v={ver('assets/css/feedback.css')}">
<link rel="stylesheet" href="{base}assets/css/playful.css?v={ver('assets/css/playful.css')}">
<script defer src="{base}assets/js/vooruitblik.js?v={ver('assets/js/vooruitblik.js')}"></script>

<script defer src="{base}assets/js/playful.js?v={ver('assets/js/playful.js')}"></script>
<link rel="stylesheet" href="{base}assets/css/toolkit.css?v={ver('assets/css/toolkit.css')}">
<script defer src="{base}assets/js/toolkit.js?v={ver('assets/js/toolkit.js')}"></script>
</head>
<body class="toolkit">
<a class="skip" href="#main">Naar de inhoud</a>
<header class="site-head">
  <div class="wrap">
    <a href="{base}index.html" aria-label="Universiteit van Vlaanderen — De Vooruitblik, naar de homepage"><span class="brand"></span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Hoofdmenu">{nav}</nav>
  </div>
</header>
<main id="main">
{body}
</main>

<footer class="site-foot">
  <div class="wrap">
    <span class="brand brand--foot" role="img" aria-label="Universiteit van Vlaanderen"></span>
    <div class="foot-grid">
      <div>
        <h2>De Vooruitblik 2027</h2>
        <p>Communicatiemateriaal voor wetenschappers, universiteiten en partners van De Vooruitblik 2027.</p>
        <a class="btn btn--purple" href="{base}fotos-en-visuals.html">Naar de beeldbank <span class="arr">→</span></a>
      </div>
      <div>
        <h2>Ontdek</h2>
        <ul>{"".join(f'<li><a href="{base}{h}">{t}</a></li>' for h, t in FOOT_NAV)}</ul>
      </div>
      <div>
        <h2>Volg ons</h2>
        <ul>
          <li><a href="{URL["uvvl"]}" rel="noopener">universiteitvanvlaanderen.be</a></li>
          <li><a href="{URL["instagram"]}" rel="noopener">Instagram @universiteitvanvlaanderen</a></li>
          <li><a href="{URL["tiktok"]}" rel="noopener">TikTok @universiteitvl</a></li>
          <li><a href="{URL["youtube"]}" rel="noopener">YouTube @UniversiteitvanVlaanderen</a></li>
        </ul>
        <div class="hashtags" style="margin-top:14px"><span>#DeVooruitblik2027</span><span>#DV2027</span><span>#uvvl</span></div>
      </div>
    </div>
    <div class="fine"><span>© 2026 Universiteit van Vlaanderen</span><span>Vormgeving en website: Studio Yoko</span></div>
  </div>
</footer>
</body>
</html>
"""
    dest = ROOT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding="utf-8")


def sec_head(h2, p="", btn="", eyebrow=""):
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ""
    return f'<div class="sec-head reveal"><div>{eb}<h2>{h2}</h2></div>{f"<p>{p}</p>" if p else ""}{btn}</div>'


def subhero(cls, kicker, h1, sub="", orn=None, q=False):
    foto = bool(orn) and orn.startswith(("foto/", "img/live"))
    o = (f'<img class="orn{" orn--foto" if foto else ""}" src="assets/{orn if "/" in orn else "3d/" + orn + ".png"}" alt="">') if orn else ""
    return (f'<section class="page-hero {cls}{" q" if q else ""}"><div class="wrap">'
            f'{hero_shapes(cls)}<h1 class="q">{hl(h1)}</h1>'
            f'{f"<p class=sub>{sub}</p>" if sub else ""}</div>{o}</section>')


def inset_vragen():
    kies = ["wie-wordt-de-opvolger-van-trump", "drinkbaar-water-uit-de-kraan", "non-stop-vlucht-van-22-uur"]
    vr = {c["slug"]: c["vraag"] for c in CH}
    return '<div class="inset inset--vragen" data-react>' + "".join(f'<span class="qv qv{i}" style="--d:{[1.0, 1.6, 1.2][i - 1]}">{E(vr[k])}</span>' for i, k in enumerate(kies, 1)) + '</div>'


def inset_proffen():
    # naam, links %, boven %, breedte %, rotatie graden, diepte (voor de muisbeweging)
    plek = [("ann-van-griensven", 4, 6, 26, -8, 1.0, 2), ("britt-weyts", 30, 3, 30, 5, 1.4, 4), ("giselinde-kuipers", 62, 8, 25, -5, 0.8, 3),
            ("jelle-habay", 5, 44, 27, 7, 1.2, 3), ("laura-sels", 30, 36, 33, -4, 1.8, 6), ("ike-picone", 67, 38, 26, 8, 1.0, 5),
            ("philip-blondeel", 14, 68, 22, -9, 0.7, 7), ("tim-soens", 48, 64, 27, 5, 1.5, 8)]
    return '<div class="inset inset--proffen" data-react>' + "".join(
        f'<img src="assets/foto/{n}.webp" alt="" width="450" height="563" loading="lazy" '
        f'style="--x:{x};--y:{y};--w:{w};--r:{r}deg;--d:{d};--dl:{i * -0.55:.2f}s;--z:{z}">' for i, (n, x, y, w, r, d, z) in enumerate(plek)) + '</div>'


def inset_unis():
    logos = [("antwerpen", "Universiteit Antwerpen"), ("hasselt", "Universiteit Hasselt"), ("kuleuven", "KU Leuven"), ("gent", "Universiteit Gent"), ("vub-brussel", "Vrije Universiteit Brussel")]
    return '<div class="inset inset--unis">' + "".join(f'<img src="assets/partners/{f}.png" alt="{E(n)}" loading="lazy">' for f, n in logos) + '</div>'



# The inventory contains only verified Drive files and local optimized previews.
TOOLKIT = json.loads((ROOT / "data/toolkit.json").read_text())
import unicodedata, re
def norm(name):
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower())
PEOPLE = {norm(p["name"]): p for p in TOOLKIT["people"]}
def library_person(p):
    return PEOPLE.get(norm(p["naam"]))
def home_photos():
    names = ["Ann van Griensven", "Bert Op 't Eijnde", "Giselinde Kuipers"]
    return "".join(f'<img src="{PEOPLE[norm(n)]["photos"][0]["preview"]}" alt="{E(n)}" width="240" height="300">' for n in names)
for c in CH:
    for p in [c["boek"],c["gast"],*c.get("podcast",[])]:
        item = library_person(p)
        if item:
            p["toolkit_foto"] = item["photos"][0]["preview"]
            # Keep existing cutouts; replace all placeholder silhouettes with real portraits.
            if not p.get("foto"):
                p["foto"] = "../toolkit/" + pathlib.Path(item["photos"][0]["preview"]).name

# ───────────────────────── HOME ─────────────────────────
SPARK = '<img src="assets/icons/spark1.png" alt="" class="tape-ic">'
SPARK2 = '<img src="assets/icons/spark2.png" alt="" class="tape-ic">'
tape1 = "".join(f"<span>{t}</span>{SPARK}" for t in ["23 proffen", "23 vragen", "2027", "geen glazen bol", "wel wetenschap"])
def tape_av(c):
    f = card_foto(c)
    src = f'assets/foto/{f["foto"]}' if f else f'assets/foto/silhouet-{c["nr"] % SILHOUETTEN + 1}.webp'
    return f'<span class="tape-av"><img src="{src}" alt="" width="52" height="65" loading="lazy"></span>'


tape2 = "".join(f'<a href="hoofdstuk/{c["slug"]}.html">{tape_av(c)}{E(c["vraag"])}</a>{SPARK}' for c in CH)
tape2_copy = tape2.replace("<a ", '<a tabindex="-1" aria-hidden="true" ')
tapes = (f'<div class="tapes"><div class="tape tape--purple" aria-hidden="true"><div class="tape-track">{tape1 * 3}{tape1 * 3}</div></div>'
         f'<div class="tape tape--green rev" aria-label="Alle 23 vragen"><div class="tape-track">{tape2}{tape2_copy}</div></div></div>')
home = f"""
<section class="toolkit-home"><div class="wrap home-layout">
  <div class="home-intro">
    <span class="eyebrow">Toolkit voor partners · Editie 2027</span>
    <div class="home-brand"><h1 class="vb-title"><span class="sr">De Vooruitblik 2027</span><span class="l1" aria-hidden="true">DE</span><span class="l2" aria-hidden="true">V<span class="o">O</span><span class="o">O</span>RUIT</span><span class="l3" aria-hidden="true">BLIK</span></h1><img class="home-book" src="assets/img/boek-3d.webp" alt="De Vooruitblik 2027" width="753" height="1290"></div>
    <p class="home-lead">Alles om De Vooruitblik te delen.</p><p>Portretten, visuals en logo’s voor je eigen communicatie.</p>
    <a class="text-link" href="lezen-kijken-luisteren.html">Over het boek, de videopodcasts en Radio 1 →</a>
  </div>
  <aside class="home-materials" aria-label="Communicatiemateriaal"><a class="home-material-link" href="fotos-en-visuals.html"><h2>Foto’s en visuals</h2><p>Portretten en sociale visuals.</p><span class="arr" aria-hidden="true">→</span></a><a class="home-material-link" href="vormgeving.html"><h2>Logo’s en vormgeving</h2><p>Logo’s, boekcovers en huisstijl.</p><span class="arr" aria-hidden="true">→</span></a></aside>
</div></section>
<div class="wrap toolkit-summary"><span><b>23</b> vragen</span><span><b>46</b> sprekers</span><span><b>5</b> universiteiten</span><a href="https://drive.google.com/file/d/1l3OGLS7e1JL65gn7iB9ZfekHzSFefUkA/view" target="_blank" rel="noopener">Handleiding voor partners ↗</a></div>
<section class="section section--tight">
  <div class="wrap">
    {sec_head("De vragen", "Elk hoofdstuk begint met één concrete vraag. Klik door voor de professoren erachter.", eyebrow="Eén vraag per hoofdstuk")}
    <div class="fan" id="fan">
      <div class="fan-stage">{"".join(f'<div class="fan-slot"{" hidden" if i >= 4 else ""}>{card(c, "")}</div>' for i, c in enumerate(CH))}</div>
      <div class="fan-actions">
        <button class="btn btn--line fan-shuffle" type="button" id="fan-shuffle" hidden>Schud de kaarten <span class="arr">↻</span></button>
        <a class="btn btn--green btn--lg" href="vragen.html">Bekijk alle 23 vragen <span class="arr">→</span></a>
      </div>
    </div>
  </div>
</section>

"""
page("index.html", "De Vooruitblik 2027", "Toolkit voor partners: foto’s, visuals, logo’s en informatie over De Vooruitblik 2027.", home, current="index.html")

# ───────────────────────── VRAGEN ─────────────────────────
chips = '<button class="chip" data-uni="alle" aria-pressed="true">Alle</button>' + "".join(
    f'<button class="chip" data-uni="{u}" aria-pressed="false">{u}</button>' for u in UNIS)
vragen = subhero("hero-yellow questions-hero", "De 23 vragen", "De Vooruitblik 2027 in 23 vragen",
                 "Eén vraag per hoofdstuk, beantwoord door een professor in het boek en besproken met een tweede expert in de videopodcast.", "img/boek-3d.webp") + f"""
<section class="section section--tight"><div class="wrap">
  <div class="filters" role="group" aria-label="Filter op universiteit">{chips}<label class="sr" for="zoek">Zoek in de vragen</label><input id="zoek" class="search" type="search" placeholder="Zoek op vraag of professor…"></div>
  <p aria-live="polite" style="font-weight:700;color:var(--green)" id="telling">23 vragen</p>
  <div class="grid" id="vragen-grid">{"".join(card(c, "") for c in CH)}</div>
  <div class="empty" id="leeg"><b>Niets gevonden.</b> Probeer een andere zoekterm of universiteit.</div>
</div></section>
"""
page("vragen.html", "De 23 vragen", "Alle 23 vragen uit De Vooruitblik 2027, met de professoren van de vijf Vlaamse universiteiten.", vragen, current="vragen.html")

YT_TRAILER = "jnG-dNSbQ4I"   # voorlopige trailer
YT_VOORBEELD = "E70O2_dd97M"   # voorlopige video van het kanaal van Universiteit van Vlaanderen; vervang per hoofdstuk via "youtube" in hoofdstukken.json


def yt_embed(vid, titel):
    return (f'<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/{vid}" title="{E(titel)}" loading="lazy" '
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '
            'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>')


def order_button():
    if URL["webshop"]:
        return f'<a class="btn btn--white" href="{URL["webshop"]}">Bestel in onze webshop →</a>'
    return '<p class="order-pending">Bestellen kan straks via onze eigen webshop.</p>'

def chapter_material(c):
    people = [library_person(p) for p in speakers(c)]
    pics = "".join(f'<img src="../{p["photos"][0]["preview"]}" alt="{E(p["name"])}" loading="lazy">' for p in people if p)
    return f'<div class="chapter-pics">{pics}</div><p>Foto’s en visuals voor je communicatie over dit onderwerp.</p><a class="btn btn--purple" href="../fotos-en-visuals.html?onderwerp={c["nr"]}">Download het materiaal →</a>'

# ───────────────────────── HOOFDSTUKKEN ─────────────────────────
for i, c in enumerate(CH):
    prev_c, next_c = CH[i - 1] if i > 0 else None, CH[i + 1] if i < len(CH) - 1 else None
    hero_cls = {"purple": "hero-purple", "yellow": "hero-yellow", "pink": "hero-pink", "blue": "hero-blue", "paper": "hero-paper", "red": "hero-red", "mint": "hero-mint"}[c["kleur"]]
    hero = (f'<section class="page-hero q {hero_cls}"><div class="wrap">'
            f'{hero_shapes(hero_cls)}<div class="hero-meta"><a class="btn btn--line btn--sm" href="../vragen.html">← Alle hoofdstukken</a>'
            f'<span class="tag">Hoofdstuk {c["nr"]}/{len(CH)}</span></div>'
            f'<h1 class="q">{hl(c["vraag"])}</h1>'
            f'<p class="sub">{E(c["boek"]["naam"])} ({E(c["boek"]["uni"])}) schrijft het hoofdstuk, {E(c["gast"]["naam"])} ({E(c["gast"]["uni"])}) schuift aan in de videopodcast.</p></div>'
            f'{hero_portret(c)}</section>')
    kort = f'<p><strong>{E(c["kort"])}</strong></p>' if c["kort"] else ""
    meer = "".join(f"<p>{E(p)}</p>" for p in c["meer"].split("\n") if p) if c["meer"] else ""
    v = c["video"]
    yt_id = v.get("youtube", "")
    spk = "".join(person(sp, f"Spreker {i}") for i, sp in enumerate(speakers(c), 1))
    if not c["kort"] and not c["meer"]:
        kort = f'<p>{E(c["boek"]["naam"])} behandelt deze vraag in het boek De Vooruitblik 2027. In de videopodcast gaan {E(" en ".join(p["naam"] for p in speakers(c)))} erover in gesprek.</p>'
    body = hero + f"""
<section class="section section--tight"><div class="wrap">
  <article class="panel panel--green panel--calm reveal"><h2>De videopodcast</h2>
    <div class="vid-panel">
      <div>{yt_embed(yt_id, c["vraag"]) if yt_id else chapter_material(c)}</div>
      <div><p class="ep-line"><b>Aflevering {v["afl"]:02d}</b><br>{E(v["titel"])}</p>
      <div class="people">{spk}</div></div>
    </div>
  </article>
</div></section>
<section class="section section--tight"><div class="wrap">
  <article class="panel panel--purple reveal"><h2>Het hoofdstuk</h2>
    <div class="prose">{kort}{meer}</div>
    <div class="people" style="margin-top:24px">{person(c["boek"], "Auteur van het hoofdstuk")}</div>
  </article>
</div></section>
<section class="section section--tight"><div class="wrap">
  <div class="elec"><div class="buy">
    <div class="buy-t"><p class="serif-lead">In het boek</p><h2>Lees het volledige essay</h2><p>Dit hoofdstuk staat in De Vooruitblik 2027: 23 essays, elk met een extraatje en een korte biografie van de auteur. Verschijnt op 15 november 2026.</p>
    <p class="cta-row"><em>Het boek</em> <a class="btn btn--white" href="../boek.html">Over het boek <span class="arr">→</span></a></p></div>
    <div class="inset inset--book"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="../assets/img/boek-3d.webp" alt="Het boek De Vooruitblik 2027, uitgegeven door Pelckmans" width="753" height="1290" loading="lazy"></div>
  </div></div>
</div></section>
<section class="section section--tight"><div class="wrap"><nav class="pager" aria-label="Andere hoofdstukken">
  {f'<a href="{prev_c["slug"]}.html"><small>← Vorige vraag · Hoofdstuk {prev_c["nr"]}</small><b>{E(prev_c["vraag"])}</b></a>' if prev_c else '<span></span>'}
  {f'<a class="next" href="{next_c["slug"]}.html"><small>Hoofdstuk {next_c["nr"]} · Volgende vraag →</small><b>{E(next_c["vraag"])}</b></a>' if next_c else '<span></span>'}
</nav>
  <p class="pager-all"><a class="btn btn--green" href="../vragen.html">Alle hoofdstukken <span class="arr">→</span></a></p></div></section>
"""
    desc = c["kort"] or f'{c["vraag"]} Een hoofdstuk van {c["boek"]["naam"]} ({c["boek"]["uni"]}) in De Vooruitblik 2027.'
    page(f"hoofdstuk/{c['slug']}.html", c["vraag"], desc[:200], body, base="../", current="vragen.html")

# ───────────────────────── BOEK ─────────────────────────
boek = f"""
<section class="section section--tight boek-top"><div class="wrap">
  <div class="elec"><div class="buy">
    <div class="buy-t"><h1 class="boek-h">23 essays, één jaar vooruit</h1>
      <p class="boek-intro">Drieëntwintig academici van de Vlaamse universiteiten vertellen wat je moet weten om 2027 beter te begrijpen.</p>
      <p class="serif-lead">Verschijnt 15 november 2026</p><div class="price">€24,50</div>
      <p>Officiële lancering op Dag van de Wetenschap, 15 november, op Boektopia in Antwerp Expo.</p>
      <div class="stack">{order_button()}</div></div>
    <div class="inset inset--book"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="assets/img/boek-3d.webp" alt="Het boek De Vooruitblik 2027, uitgegeven door Pelckmans" width="753" height="1290" loading="lazy"></div>
  </div></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  <ul class="facts reveal"><li><b data-count="23">23</b><span>essays van 23 academici</span></li><li><b data-count="5">5</b><span>Vlaamse universiteiten</span></li><li><b>+1</b><span>extraatje per hoofdstuk: een weetje, anekdote of filmtip</span></li></ul>
</div></section>
<section class="section section--tight"><div class="wrap">
  <div class="panel panel--paper reveal"><h2>Zo is elk hoofdstuk opgebouwd</h2><div class="prose"><p>Elk hoofdstuk heeft een essay, een extraatje (een weetje, anekdote of filmtip) en een korte biografie van de auteur. Je kunt ze los van elkaar lezen.</p></div></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  {sec_head("Alle hoofdstukken", "Elk hoofdstuk begint met een vraag. Je vindt ze allemaal met hun professor bij De 23 vragen.", '<a class="btn btn--green" href="vragen.html">Naar De 23 vragen <span class="arr">→</span></a>')}
</div></section>
"""
page("boek.html", "Het boek", "Het boek De Vooruitblik 2027: 23 essays van 23 academici. Verschijnt op 15 november 2026, uitgegeven door Pelckmans.", boek, current="boek.html")

# ───────────────────────── VIDEOPODCAST ─────────────────────────
EP_KLEUR = ["lav", "blauw", "indigo"]   # tunnelkleuren, rustig afwisselend


def sp_icons(c):
    out = ""
    for k, sp in enumerate(speakers(c)):
        if sp.get("foto"):
            out += f'<img class="ep-av" src="assets/foto/{sp["foto"]}" alt="{E(sp["naam"])}" width="52" height="52" loading="lazy">'
        else:
            out += f'<img class="ep-av ep-av--sil" src="assets/foto/silhouet-{(c["nr"] + k * 3) % SILHOUETTEN + 1}.webp" alt="" width="52" height="52" loading="lazy">'
    return f'<span class="ep-avs">{out}</span>'


def ep_row(c, i=0):
    v = c["video"]
    return (f'<a class="ep ep--{EP_KLEUR[i % 3]}" href="hoofdstuk/{c["slug"]}.html" data-date="{v["datum"]}">'
            f'<div class="ep-date"><span>{DAGEN[dt(v["datum"]).weekday()][:2]}</span><b>{dt(v["datum"]).day}</b><span>{MAANDEN[dt(v["datum"]).month - 1][:3]}</span></div>'
            f'<div class="ep-body"><div class="ep-nr">Aflevering {v["afl"]:02d}</div><h3>{E(v["titel"])}</h3>'
            f'<p>Met {E(" en ".join(sp["naam"] for sp in speakers(c)))}</p>'
            f'<p class="ep-book">In het boek: {E(c["vraag"])}</p></div>'
            f'{sp_icons(c)}<span class="ep-status tag"></span></a>')


by_ep = sorted(CH, key=lambda c: c["video"]["datum"])
eps = ""
for ym in sorted({c["video"]["datum"][:7] for c in by_ep}):
    jaar, maand = int(ym[:4]), int(ym[5:])
    eps += f'<h2 class="group-title">{MAANDEN[maand - 1]} {jaar}</h2><div class="sched">' + "".join(ep_row(c, by_ep.index(c)) for c in by_ep if c["video"]["datum"].startswith(ym)) + "</div>"
vp = subhero("hero-yellow", "Videopodcast", "Kijken en luisteren", "Bij elke vraag gaan twee wetenschappers in gesprek. Vanaf begin november 2026 verschijnen ongeveer drie afleveringen per week.") + f"""
<section class="section section--tight"><div class="wrap"><nav class="subnav" aria-label="Lezen, kijken en luisteren"><a href="boek.html">Het boek</a><a href="videopodcast.html" aria-current="page">Videopodcast</a><a href="radio-en-live.html">Radio en live</a></nav>
<div class="panel panel--paper"><h2>Waar vind je de afleveringen?</h2><p>Video’s van ongeveer 10 minuten op VRT MAX en YouTube. De gesprekken zijn ook te beluisteren als podcast.</p><div class="stack"><a class="btn btn--green" href="{URL['vrtmax_vid']}">VRT MAX · video ↗</a><a class="btn btn--line" href="{URL['youtube']}">YouTube ↗</a><a class="btn btn--line" href="{URL['spotify']}">Spotify ↗</a><a class="btn btn--line" href="{URL['vrtmax_pod']}">VRT MAX · podcast ↗</a></div></div>
{sec_head("Publicatieschema", "Geplande data van de 23 afleveringen. Bij elk onderwerp vind je de sprekers en het communicatiemateriaal.")}{eps}
</div></section>"""
page("videopodcast.html", "Videopodcast", "De videopodcasts bij De Vooruitblik 2027: telkens twee professoren over één vraag. Van 1 november tot 31 december verschijnen 23 afleveringen, ongeveer drie per week.", vp, current="videopodcast.html")

# ───────────────────────── RADIO EN LIVE ─────────────────────────
radio_live = subhero("hero-blue", "Radio en live", "Radio en live",
                     "Twee weken vooruitblikken op Radio 1, en live in gesprek met de professoren.", "img/live-vlaanderen.webp") + f"""
<section class="section section--tight" id="radio"><div class="wrap">
  {sec_head("Twee weken vooruitblikken", "Radio 1 maakt opnieuw een programma rond De Vooruitblik, in de kerstvakantie.", eyebrow="Radio 1")}
  <ul class="facts reveal"><li><b>12–13u</b><span>elke weekdag op Radio 1</span></li><li><b>21–25 dec</b><span>maandag tot vrijdag</span></li><li><b>28 dec – 1 jan</b><span>maandag tot vrijdag</span></li></ul>
</div></section>
<section class="section section--tight"><div class="wrap two">
  <div class="panel reveal"><h2>Het programma</h2><div class="prose"><p>Radiohost Jacotte Brokken praat met de wetenschappers van De Vooruitblik over de thema’s uit het boek.</p></div></div>
  <div class="panel panel--green reveal"><h2>Luister live of terug</h2><p>Radio 1 vind je live en on demand via VRT MAX.</p><a class="btn btn--purple" href="{URL["radio1"]}" rel="noopener">Naar Radio 1 <span class="arr">→</span></a></div>
</div></section>
<section class="section section--tight" id="live"><div class="wrap">
  {sec_head("Stel je vraag aan de prof", "Op de live evenementen praat het publiek rechtstreeks met de professoren.", eyebrow="Live")}
  <div class="dark" style="padding:clamp(26px,5vw,64px)"><ul class="agenda">
    <li><div class="when">15 november</div><div><h3>Boektopia, Antwerp Expo</h3><p>De Vooruitblik 2027 wordt officieel voorgesteld op Dag van de Wetenschap. Onder begeleiding van een moderator praten drie professoren over een selectie onderwerpen uit het boek.</p><p style="margin-top:10px"><b>12u – 12u45</b> gesprek in de Red Room<br><b>13u – 14u</b> signeersessie</p></div></li>
    <li><div class="when">Voorjaar 2027</div><div><h3>Panelgesprekken op vijf locaties</h3><p>Telkens vier academici gaan met elkaar en met het publiek in gesprek over thema’s uit het boek. Kobe Ilsen modereert, aangevuld met een muzikaal intermezzo. Peter Saerens van Pelckmans Uitgevers brengt een voorwoord.</p><p style="margin-top:10px">De locaties en data zijn nog in voorbereiding en komen hier zodra ze vastliggen.</p></div></li>
  </ul></div>
</div></section>
"""
page("radio-en-live.html", "Radio en live", "Radio 1 en live bij De Vooruitblik 2027: elke weekdag van 12 tot 13 uur van 21 december tot 1 januari, Boektopia op 15 november en panelgesprekken in het voorjaar van 2027.", radio_live, current="radio-en-live.html")

def vis_card(cls, h, p, tag):
    return f'<div class="panel {cls} reveal"><h2>{h}</h2><p>{p}</p><p style="margin-top:14px"><span class="tag">{tag}</span></p></div>'


# ───────────────────────── VORMGEVING ─────────────────────────
def lum(hexc):
    r, g, b = (int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= .03928 else ((c + .055) / 1.055) ** 2.4
    return .2126 * f(r) + .7152 * f(g) + .0722 * f(b)


SWATCHES = [("Varsity Green", "#004B36", "Basiskleur, logo en tekst op licht"), ("Electric Purple", "#D6ACFF", "Logo en kopjes op donker"),
            ("Ballpoint", "#1B0757", "Donker accent"), ("Electric Blue", "#585FF1", "Accent"),
            ("Paper", "#F4F0ED", "Lichte achtergrond"), ("Pink", "#FFC9D7", "Accent"),
            ("Electric Yellow", "#FBF07A", "Accent"), ("Electric Red", "#EE5245", "Accent"),
            ("Printer Ink", "#2B2B2B", "Lopende tekst"), ("Electric Green", "#00A879", "Accent")]
sw = "".join(f'<button class="sw" type="button" data-hex="{h}" style="background:{h};color:{"#fff" if lum(h) < .3 else "#004B36"}"><b>{E(n)}</b><span>{h}</span><small>{E(d)}</small></button>' for n, h, d in SWATCHES)


def asset(src, title, text, dl, cls=""):
    return (f'<figure class="asset {cls} reveal"><a class="asset-img" href="{src}" download aria-label="Download {E(title)}"><img src="{src}" alt="{E(title)}" loading="lazy"></a>'
            f'<figcaption><h3>{E(title)}</h3><p>{E(text)}</p><a class="btn btn--green" href="{dl or src}" download>Download <span class="arr">↓</span></a></figcaption></figure>')


def el_card(src, title, bg):
    return (f'<figure class="elc elc--{bg} reveal"><img src="assets/elementen/{src}.png" alt="{E(title)}" loading="lazy">'
            f'<figcaption><b>{E(title)}</b><a class="btn btn--white" href="assets/elementen/{src}.png" download>PNG <span class="arr">↓</span></a></figcaption></figure>')


vg = subhero("hero-green", "Vormgeving", "Vormgeving",
             "Logo’s, kleuren en lettertypes van De Vooruitblik, om herkenbaar te communiceren.", "vormgeving/uvvl-logo-vierkant-paars.svg") + f"""
<section class="section section--tight"><div class="wrap">
  {sec_head("De logo’s", "De Vooruitblik is het project, Universiteit van Vlaanderen de afzender.", eyebrow="Logo")}
  <div class="pair">
    <div class="pair-head pair-head--vb"><span class="pair-kicker">Het project</span><h3>De Vooruitblik</h3><p>Het logo van het boek, de videopodcast, Radio 1 en de evenementen.</p></div>
    <div class="pair-head pair-head--uv"><span class="pair-kicker">De afzender</span><h3>Universiteit van Vlaanderen</h3><p>Het logo van de organisatie achter het project.</p></div>
    <figure class="pair-tile pair-tile--blauw reveal"><img src="assets/vormgeving/logo-vooruitblik-getrimd.png" alt="Het logo De Vooruitblik in Electric Purple op Electric Blue" width="1506" height="322"><figcaption class="pair-cap">Op Electric Blue</figcaption></figure>
    <figure class="pair-tile pair-tile--wit reveal"><img src="assets/vormgeving/uvvl-logo-groen.svg" alt="Logo Universiteit van Vlaanderen in Varsity Green" width="674" height="140"><figcaption class="pair-cap">Groen op wit</figcaption></figure>
    <figure class="pair-tile pair-tile--groen reveal"><img src="assets/vormgeving/logo-vooruitblik-getrimd.png" alt="Het logo De Vooruitblik in Electric Purple op Varsity Green" width="1506" height="322"><figcaption class="pair-cap">Op Varsity Green</figcaption></figure>
    <figure class="pair-tile pair-tile--groen reveal"><img src="assets/vormgeving/uvvl-logo-paars.svg" alt="Logo Universiteit van Vlaanderen in Electric Purple op Varsity Green" width="674" height="140"><figcaption class="pair-cap">Paars op Varsity Green</figcaption></figure>
    <div class="stack"><a class="btn btn--green" href="assets/vormgeving/logo-transparant.png" download>Logo transparant (PNG) <span class="arr">↓</span></a><a class="btn btn--line" href="assets/vormgeving/logo-op-blauw.png" download style="color:var(--green)">Logo op blauw (PNG) <span class="arr">↓</span></a></div>
    <div class="stack">
      <a class="btn btn--green" href="assets/vormgeving/uvvl-logo-groen.svg" download>Logo groen (SVG) <span class="arr">↓</span></a>
      <a class="btn btn--line" href="assets/vormgeving/uvvl-logo-paars.svg" download style="color:var(--green)">Logo paars (SVG) <span class="arr">↓</span></a>
      <a class="btn btn--line" href="assets/vormgeving/uvvl-logo-vierkant-groen.svg" download style="color:var(--green)">Vierkant groen (SVG) <span class="arr">↓</span></a>
      <a class="btn btn--line" href="assets/vormgeving/uvvl-logo-vierkant-paars.svg" download style="color:var(--green)">Vierkant paars (SVG) <span class="arr">↓</span></a>
      <a class="btn btn--line" href="assets/vormgeving/uvvl-wordmark-groen.svg" download style="color:var(--green)">Woordmerk groen (SVG) <span class="arr">↓</span></a>
      <a class="btn btn--line" href="assets/vormgeving/uvvl-wordmark-paars.svg" download style="color:var(--green)">Woordmerk paars (SVG) <span class="arr">↓</span></a>
    </div>
  </div>
  <p class="note">Gebruik het logo van De Vooruitblik in Electric Purple op een donkere ondergrond: Varsity Green, Ballpoint of Electric Blue.</p>
</div></section>

<section class="section section--tight"><div class="wrap">
  {sec_head("Het boek", "De cover van De Vooruitblik 2027, uitgegeven door Pelckmans.", eyebrow="Cover")}
  <div class="assets assets--two">
    {asset("assets/vormgeving/boek-2d-voorkant.jpg", "Voorkant", "Platte voorkant van het boek.", "", "asset--tall")}
    {asset("assets/vormgeving/boek-3d.jpg", "Voor- en zijkant (3D)", "Het boek in perspectief.", "", "asset--tall")}
  </div>
</div></section>

<section class="section section--tight"><div class="wrap">
  {sec_head("E-mailhandtekening", "Drie banners om onder je e-mails te zetten.", eyebrow="Banners")}
  <div class="banners">{"".join(f'<a class="banner reveal" href="assets/vormgeving/banner-{f}.png" download><img src="assets/vormgeving/banner-{f}.png" alt="{E(n)}" loading="lazy"><span>{E(n)} <span>Download ↓</span></span></a>' for f, n in [("vanaf-15-november", "Vanaf 15 november in de boekhandel"), ("nu-in-de-boekhandel", "Nu in de boekhandel"), ("lees-er-alles-over", "Lees er nu alles over")])}</div>
</div></section>

<section class="section section--tight"><div class="wrap">
  <div class="mini-two">
    <div>
      <h2 class="mini-h">Kleuren</h2><p class="mini-p">Klik op een kleur om de code te kopiëren.</p>
      <div class="swatches swatches--mini reveal">{sw}</div>
      <div class="rules rules--mini reveal">
        <div class="rule rule--ok" style="background:var(--green);color:var(--purple)"><span class="tag">Wel</span><b>Paars op groen</b></div>
        <div class="rule rule--ok" style="background:var(--paper-mid);color:var(--green)"><span class="tag">Wel</span><b>Groen op licht</b></div>
        <div class="rule rule--no" style="background:var(--red);color:var(--green)"><span class="tag">Niet</span><b>Groen op rood</b></div>
        <div class="rule rule--no" style="background:var(--yellow);color:var(--green)"><span class="tag">Niet</span><b>Groen op geel</b></div>
      </div>
      <p class="note">Kies per uiting één verzadigde accentkleur. Rood of geel combineer je met paars in plaats van met groen.</p>
    </div>
    <div>
      <h2 class="mini-h">Lettertypes</h2><p class="mini-p">Drie lettertypes, elk met een eigen rol. Gelicentieerd, dus hier niet te downloaden.</p>
      <div class="type type--mini reveal">
        <div class="type-c"><small>Koppen en cijfers</small><p class="t1">Oldschool Grotesk Condensed</p></div>
        <div class="type-c"><small>Tekst</small><p class="t2">Oldschool Grotesk</p></div>
        <div class="type-c"><small>Accenten</small><p class="t3">Tiempos Text Italic</p></div>
      </div>
    </div>
  </div>
</div></section>
"""
page("vormgeving.html", "Vormgeving", "Logo’s, banners, kleuren en lettertypes van De Vooruitblik 2027, met downloads.", vg, current="vormgeving.html")

exec((pathlib.Path(__file__).parent / "toolkit-pages.py").read_text(), globals())
print(f"{len(CH)} hoofdstukken + toolkitpagina's gebouwd in {ROOT}")
