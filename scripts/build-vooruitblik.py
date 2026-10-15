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
    "standaard": "https://www.standaardboekhandel.be/p/de-vooruitblik-editie-2027-9789465306490",
    "pelckmans": "https://www.pelckmansuitgevers.be/de-vooruitblik-editie-2027.html",
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
CH = []
for i, slug in enumerate(ORDER, 1):
    c = chapters.pop(slug)
    c["nr"] = i
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
    return (f'<div class="person"><div class="avatar" aria-hidden="true">{E(initials(p["naam"]))}</div>'
            f'<div><div class="role">{E(role)}</div><div class="name">{E(p["naam"])}</div>'
            f'<div class="meta">{E(meta)}</div></div></div>')


def card(c, base):
    return (f'<a class="card c-{c["kleur"]}" href="{base}hoofdstuk/{c["slug"]}.html" '
            f'data-uni="{E(c["boek"]["uni"] + " " + c["gast"]["uni"])}" '
            f'data-zoek="{E((c["vraag"] + " " + c["boek"]["naam"] + " " + c["gast"]["naam"] + " " + c["boek"]["vak"]).lower())}">'
            f'<span class="nr">Hoofdstuk {c["nr"]:02d}</span>'
            f'<img src="{base}assets/3d/{c["thema"]}.png" alt="" loading="lazy" style="--r:{(c["nr"] * 7) % 20 - 8}deg">'
            f'<h3>{E(c["vraag"])}</h3>'
            f'<div class="who">{E(c["boek"]["naam"])} <span>· {E(c["boek"]["uni"])}</span></div></a>')


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
    a, b, c = HERO_SHAPES.get(cls.split()[0], HERO_SHAPES["hero-paper"])
    return shapes([("circle", a, "66%", "6%", "clamp(26px,4vw,60px)", 0, 0), ("hex", a, "91%", "8%", "clamp(26px,3.6vw,54px)", 1, 8),
                   ("tri", b, "80%", "27%", "clamp(30px,4.4vw,66px)", 2, 12), ("ring", c, "94%", "50%", "clamp(34px,5vw,76px)", 4, 0)])


TILES = [("green", "purple"), ("pink", "green"), ("ink", "purple"), ("paper", "green"), ("ballpoint", "purple"), ("purple", "green"), ("blue", "purple"), ("grey", "green")]
EYEWALL = '<div class="eyewall" aria-hidden="true">' + "".join(
    f'<span class="ew ew-{bg} ew-r-{ring}"><i class="ew-eye"><b></b></i></span>' for bg, ring in TILES) + "</div>"

NAV = [("vragen.html", "De 23 vragen"), ("boek.html", "Boek"), ("videopodcast.html", "Videopodcast"),
       ("radio.html", "Radio 1"), ("live.html", "Live"), ("partners.html", "Partners")]


def page(path, title, desc, body, base="", current="", hero_class="", og_img="assets/img/boek-cover.jpg"):
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
<link rel="stylesheet" href="{base}assets/css/vooruitblik.css">
<link rel="stylesheet" href="{base}assets/css/feedback.css">
<link rel="stylesheet" href="{base}assets/css/playful.css">
<script defer src="{base}assets/js/vooruitblik.js"></script>
<script defer src="{base}assets/js/feedback-config.js"></script>
<script defer src="{base}assets/js/feedback.js"></script>
<script defer src="{base}assets/js/playful.js"></script>
</head>
<body>
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
{EYEWALL}
<footer class="site-foot">
  <div class="wrap">
    <span class="brand brand--foot" role="img" aria-label="Universiteit van Vlaanderen"></span>
    <div class="foot-grid">
      <div>
        <h2>De Vooruitblik 2027</h2>
        <p>Een kennisproject van Universiteit van Vlaanderen, Radio 1 en Pelckmans Uitgevers, met de vijf Vlaamse universiteiten.</p>
        <a class="btn btn--purple" href="{base}boek.html">Het boek <span class="arr">→</span></a>
      </div>
      <div>
        <h2>Ontdek</h2>
        <ul>{"".join(f'<li><a href="{base}{h}">{t}</a></li>' for h, t in NAV)}</ul>
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
    return f'<div class="sec-head reveal"><div>{eb}<h2>{h2}</h2><span class="squig" aria-hidden="true"></span></div>{f"<p>{p}</p>" if p else ""}{btn}</div>'


def subhero(cls, kicker, h1, sub="", orn=None, q=False):
    o = (f'<img class="orn" src="assets/{orn if "/" in orn else "3d/" + orn + ".png"}" alt="">') if orn else ""
    return (f'<section class="page-hero {cls}{" q" if q else ""}"><div class="wrap">'
            f'{hero_shapes(cls)}<div class="crumbs"><a href="index.html">De Vooruitblik</a> / {kicker}</div><h1 class="q">{hl(h1)}</h1>'
            f'{f"<p class=sub>{sub}</p>" if sub else ""}</div>{o}</section>')


# ───────────────────────── HOME ─────────────────────────
SPARK = '<img src="assets/icons/spark1.png" alt="" class="tape-ic">'
SPARK2 = '<img src="assets/icons/spark2.png" alt="" class="tape-ic">'
tape1 = "".join(f"<span>{t}</span>{SPARK}" for t in ["23 proffen", "23 vragen", "2027", "geen glazen bol", "wel wetenschap"])
tape2 = "".join(f'<a href="hoofdstuk/{c["slug"]}.html">{E(c["vraag"])}</a>{SPARK}' for c in CH)
tape2_copy = tape2.replace("<a ", '<a tabindex="-1" aria-hidden="true" ')
tapes = (f'<div class="tapes"><div class="tape tape--purple" aria-hidden="true"><div class="tape-track">{tape1 * 3}{tape1 * 3}</div></div>'
         f'<div class="tape tape--green rev" aria-label="Alle 23 vragen"><div class="tape-track">{tape2}{tape2_copy}</div></div></div>')
home = f"""
<section class="hero">
  {shapes([("tri","blue","62%","24%","clamp(30px,4vw,62px)",2,-10),("ring","pink","8%","62%","clamp(44px,6vw,92px)",1,0),("hex","purple","56%","74%","clamp(26px,3.4vw,52px)",3,8)])}
  <span class="orn orn--book" data-speed="-0.05"><img src="assets/img/boek-3d.webp" alt="Het boek De Vooruitblik 2027" width="753" height="1290" style="--rot:6deg"></span><span class="orn orn--b" data-speed="0.06"><img src="assets/3d/techniek.png" alt="" style="--rot:-8deg"></span>
  <a class="burst" href="boek.html" aria-label="Het boek verschijnt op 15 november"><span class="burst-star"></span><span class="burst-txt">15<br>nov</span></a>
  <div class="wrap">
    <p class="kicker">Universiteit van Vlaanderen · Radio 1 · Pelckmans</p>
    <h1 class="vb-title"><span class="sr">De Vooruitblik 2027</span>
      <span class="l1" aria-hidden="true">DE</span><span class="l2" aria-hidden="true">V<span class="o">O</span><span class="o">O</span>RUIT<img class="pow" src="assets/icons/snaps1.png" alt=""></span><span class="l3" aria-hidden="true">BLIK<img class="spk" src="assets/icons/spark2.png" alt=""></span></h1>
    <div class="hero-grid" style="margin-top:clamp(22px,3vw,40px)">
      <div class="hero-side"><p>23 proffen over wat ons te wachten staat in 2027. Geen glazen bol, wel wetenschap die uitlegt wat eraan komt.</p></div>
      <div class="hero-cta"><a class="btn btn--purple" href="vragen.html">Bekijk de 23 vragen <span class="arr">→</span></a><a class="btn btn--line" href="boek.html" style="color:var(--paper)">Het boek</a></div>
    </div>
  </div>
</section>

{tapes}

<section class="section">
  <div class="wrap">
    <div class="statement reveal">
      <img class="st-obj" src="assets/3d/zon.png" alt="" data-speed="-0.05">
      <h2 class="st-h">Geen glazen bol</h2>
      <p class="st-sub">Geen voorspellingen. Wel context, inzichten en kennis om 2027 beter te begrijpen.</p>
      <p class="st-cta"><em>Benieuwd hoe het boek werkt?</em> <a class="btn btn--line" href="boek.html">Over het boek <span class="arr">→</span></a></p>
    </div>
    <div class="cascade">
      <div class="cas cas-elec reveal"><div class="cas-t"><b class="cas-n"><span data-count="23">23</span> vragen</b><p>Van ruimtevaart tot relaties, van gezondheid tot mobiliteit: elk hoofdstuk vertrekt vanuit een concrete vraag die laat zien hoe wetenschap helpt begrijpen wat er in 2027 op ons afkomt.</p></div>
        <div class="inset"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="assets/3d/informatie.png" alt="" loading="lazy"></div></div>
      <div class="cas cas-blue reveal"><div class="cas-t"><b class="cas-n"><span data-count="46">46</span> proffen</b><p>Per hoofdstuk schrijft een professor een toegankelijk essay. In de videopodcast schuift een tweede expert aan die het onderwerp vanuit een andere invalshoek bekijkt.</p></div>
        <div class="inset"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="assets/3d/techniek.png" alt="" loading="lazy"></div></div>
      <div class="cas cas-red reveal"><div class="cas-t"><b class="cas-n"><span data-count="5">5</span> universiteiten</b><p>UAntwerpen, UHasselt, KU Leuven, UGent en de VUB leveren de experten en dragen bij aan de wetenschappelijke kwaliteit.</p></div>
        <div class="inset"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="assets/3d/recht-bestuur.png" alt="" loading="lazy"></div></div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    {sec_head("De vragen", "Elk hoofdstuk begint met één concrete vraag. Klik door voor de professoren erachter.", btn='<a class="btn btn--green" href="vragen.html">Alle 23 <span class="arr">→</span></a>', eyebrow="Eén vraag per hoofdstuk")}
    <div class="grid reveal">{"".join(card(c, "") for c in CH[:6])}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    {sec_head("Vier manieren om mee te kijken")}
    <div class="formats reveal">
      <a class="format c-purple has-book" href="boek.html"><span class="go">→</span><span class="big" data-count="23">23</span><img class="fbook" src="assets/img/boek-3d.webp" alt="" loading="lazy"><h3>Het boek</h3><p>Drieëntwintig essays van drieëntwintig academici. Verschijnt op 15 november.</p></a>
      <a class="format c-yellow" href="videopodcast.html"><span class="go">→</span><span class="big">3/wk</span><h3>Videopodcast</h3><p>Twee professoren per vraag. Vanaf begin november elke week drie afleveringen.</p></a>
      <a class="format c-pink" href="radio.html"><span class="go">→</span><span class="big">12u</span><h3>Radio 1</h3><p>Jacotte Brokken blikt twee weken lang vooruit, elke weekdag in de kerstvakantie.</p></a>
      <a class="format c-blue" href="live.html"><span class="go" style="color:var(--blue)">→</span><span class="big">Live</span><h3>Evenementen</h3><p>Stel je vraag rechtstreeks aan de professoren, op Boektopia en in het voorjaar.</p></a>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="dark" style="padding:clamp(26px,5vw,64px)">
      <div class="sec-head reveal" style="margin-bottom:24px"><h2>Wanneer</h2></div>
      <ul class="agenda reveal">
        <li><div class="when">1 november</div><div><h3>Eerste videopodcast</h3><p>Aflevering 1 verschijnt op zondag 1 november. Daarna komen er elke week ongeveer drie nieuwe bij, op VRT MAX, YouTube, Spotify en onze socials, tot en met 31 december.</p></div></li>
        <li><div class="when">15 november</div><div><h3>Het boek verschijnt op Boektopia</h3><p>Dag van de Wetenschap. Drie professoren gaan in gesprek in de Red Room van Antwerp Expo, tussen 12u en 12u45. Daarna is er een signeersessie.</p></div></li>
        <li><div class="when">21 dec – 1 jan</div><div><h3>Radio 1-programma</h3><p>Elke weekdag van 12 tot 13 uur, met Jacotte Brokken.</p></div></li>
        <li><div class="when">Voorjaar 2027</div><div><h3>Panelgesprekken in Vlaanderen</h3><p>Vijf locaties, telkens vier academici in gesprek met het publiek. Data en locaties volgen.</p></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    {sec_head("Samen gemaakt", "De Vooruitblik is een gezamenlijk project van universiteiten, uitgever, omroep en overheid.", '<a class="btn btn--green" href="partners.html">Alle partners <span class="arr">→</span></a>')}
    <div class="partners reveal">
      {"".join(f'<div class="partner"><img src="assets/partners/{f}.png" alt="{E(n)}" loading="lazy"></div>' for f, n in [("antwerpen","Universiteit Antwerpen"),("hasselt","Universiteit Hasselt"),("kuleuven","KU Leuven"),("gent","Universiteit Gent"),("vub-brussel","Vrije Universiteit Brussel"),("radio1","Radio 1"),("vrt","VRT"),("jonge-academie","Jonge Academie"),("vlaamse-overheid","Vlaamse overheid"),("nationale-loterij","Nationale Loterij")])}
    </div>
  </div>
</section>
"""
page("index.html", "De Vooruitblik 2027",
     "23 professoren over wat ons te wachten staat in 2027: een boek, videopodcasts, een Radio 1-programma en live evenementen van Universiteit van Vlaanderen.",
     home)

# ───────────────────────── VRAGEN ─────────────────────────
chips = '<button class="chip" data-uni="alle" aria-pressed="true">Alle</button>' + "".join(
    f'<button class="chip" data-uni="{u}" aria-pressed="false">{u}</button>' for u in UNIS)
vragen = subhero("hero-yellow", "De 23 vragen", "23 vragen over 2027",
                 "Eén vraag per hoofdstuk, beantwoord door een professor in het boek en besproken met een tweede expert in de videopodcast.", "informatie") + f"""
<section class="section section--tight"><div class="wrap">
  <div class="filters" role="group" aria-label="Filter op universiteit">{chips}<label class="sr" for="zoek">Zoek in de vragen</label><input id="zoek" class="search" type="search" placeholder="Zoek op vraag of professor…"></div>
  <p aria-live="polite" style="font-weight:700;color:var(--green)" id="telling">23 vragen</p>
  <div class="grid" id="vragen-grid">{"".join(card(c, "") for c in CH)}</div>
  <div class="empty" id="leeg"><b>Niets gevonden.</b> Probeer een andere zoekterm of universiteit.</div>
</div></section>
"""
page("vragen.html", "De 23 vragen", "Alle 23 vragen uit De Vooruitblik 2027, met de professoren van de vijf Vlaamse universiteiten.", vragen, current="vragen.html")

# ───────────────────────── HOOFDSTUKKEN ─────────────────────────
for i, c in enumerate(CH):
    prev_c, next_c = CH[i - 1] if i > 0 else None, CH[i + 1] if i < len(CH) - 1 else None
    hero_cls = {"purple": "hero-purple", "yellow": "hero-yellow", "pink": "hero-pink", "blue": "hero-blue", "paper": "hero-paper"}[c["kleur"]]
    hero = (f'<section class="page-hero q {hero_cls}"><div class="wrap">'
            f'<div class="crumbs"><a href="../index.html">De Vooruitblik</a> / <a href="../vragen.html">De 23 vragen</a> / Hoofdstuk {c["nr"]:02d}</div>'
            f'{hero_shapes(hero_cls)}<h1 class="q">{hl(c["vraag"])}</h1>'
            f'<p class="sub">{E(c["boek"]["naam"])} ({E(c["boek"]["uni"])}) schrijft het hoofdstuk, {E(c["gast"]["naam"])} ({E(c["gast"]["uni"])}) schuift aan in de videopodcast.</p></div>'
            f'<img class="orn" src="../assets/3d/{c["thema"]}.png" alt=""></section>')
    kort = f'<p><strong>{E(c["kort"])}</strong></p>' if c["kort"] else ""
    meer = "".join(f"<p>{E(p)}</p>" for p in c["meer"].split("\n") if p) if c["meer"] else ""
    v = c["video"]
    spk = "".join(person(sp, f"Spreker {i}") for i, sp in enumerate(speakers(c), 1))
    if not c["kort"] and not c["meer"]:
        kort = '<div class="todo"><strong>Tekst volgt binnenkort.</strong>De samenvatting van dit hoofdstuk wordt nog aangeleverd.</div>'
    body = hero + f"""
<section class="section section--tight"><div class="wrap">
  <div class="two">
    <article class="panel panel--purple reveal"><span class="tag">In het boek</span><h2 style="margin-top:14px">Het hoofdstuk</h2>
      <div class="prose">{kort}{meer}</div>
      <div class="people" style="margin-top:24px">{person(c["boek"], "Auteur van het hoofdstuk")}</div>
    </article>
    <article class="panel panel--green reveal"><span class="tag">Videopodcast</span><h2 style="margin-top:14px">Twee blikken</h2>
      <div class="video" style="margin-bottom:18px"><div><div class="play"></div><p>Verschijnt {lang(v["datum"])}</p></div></div>
      <p class="ep-line"><b>Aflevering {v["afl"]:02d}</b><br>{E(v["titel"])}</p>
      <div class="people">{spk}</div>
    </article>
  </div>
</div></section>
<section class="section section--tight"><div class="wrap">
  <div class="panel panel--paper reveal"><h3 style="margin-top:0">Over de professoren</h3>
    <div class="todo"><strong>Biografieën volgen.</strong>De korte biografie van de auteur staat in het boek. Op deze pagina komen ze binnenkort ook online.</div></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  <div class="elec"><div class="buy">
    <div class="buy-t"><p class="serif-lead">Lees het volledige essay</p><h2>Dit hoofdstuk zit in het boek</h2><p>Drieëntwintig essays, weetjes, anekdotes en een filmtip per hoofdstuk. Verschijnt op 15 november 2026.</p>
    <p class="cta-row"><em>Wil je meer lezen?</em> <a class="btn btn--white" href="../boek.html">Over het boek <span class="arr">→</span></a></p></div>
    <div class="inset inset--book"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="../assets/img/boek-3d.webp" alt="Het boek De Vooruitblik 2027, uitgegeven door Pelckmans" width="753" height="1290" loading="lazy"></div>
  </div></div>
</div></section>
<section class="section section--tight"><div class="wrap"><nav class="pager" aria-label="Andere hoofdstukken">
  {f'<a href="{prev_c["slug"]}.html"><small>← Vorige vraag</small><b>{E(prev_c["vraag"])}</b></a>' if prev_c else '<span></span>'}
  {f'<a class="next" href="{next_c["slug"]}.html"><small>Volgende vraag →</small><b>{E(next_c["vraag"])}</b></a>' if next_c else '<span></span>'}
</nav></div></section>
"""
    desc = c["kort"] or f'{c["vraag"]} Een hoofdstuk van {c["boek"]["naam"]} ({c["boek"]["uni"]}) in De Vooruitblik 2027.'
    page(f"hoofdstuk/{c['slug']}.html", c["vraag"], desc[:200], body, base="../", current="vragen.html")

# ───────────────────────── BOEK ─────────────────────────
rows = "".join(f'<li style="border-top:1.5px solid rgba(0,75,54,.25);padding:14px 0;font-size:18px"><a href="hoofdstuk/{c["slug"]}.html" style="color:var(--green);text-decoration:none"><b>{c["nr"]:02d}</b>&nbsp; {E(c["vraag"])} <span style="opacity:.75">· {E(c["boek"]["naam"])}, {E(c["boek"]["uni"])}</span></a></li>' for c in CH)
boek = subhero("hero-purple", "Het boek", "23 essays, één jaar vooruit",
               "Drieëntwintig academici van de Vlaamse universiteiten vertellen wat je moet weten om 2027 beter te begrijpen.", "img/boek-3d.webp") + f"""
<section class="section section--tight"><div class="wrap">
  <div class="elec"><div class="buy">
    <div class="buy-t"><p class="serif-lead">Verschijnt 15 november 2026</p><div class="price">€24,50</div>
      <p>Officiële lancering op Dag van de Wetenschap, 15 november, op Boektopia in Antwerp Expo.</p>
      <div class="stack"><a class="btn btn--white" href="{URL["standaard"]}" rel="noopener">Bestel bij Standaard Boekhandel <span class="arr">→</span></a><a class="btn btn--line-w" href="{URL["pelckmans"]}" rel="noopener">Bij Pelckmans</a></div></div>
    <div class="inset inset--book"><i class="snap s1"></i><i class="snap s2"></i><i class="snap s3"></i><img src="assets/img/boek-3d.webp" alt="Het boek De Vooruitblik 2027, uitgegeven door Pelckmans" width="753" height="1290" loading="lazy"></div>
  </div></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  <ul class="facts reveal"><li><b data-count="23">23</b><span>essays van 23 academici</span></li><li><b data-count="5">5</b><span>Vlaamse universiteiten</span></li><li><b>+1</b><span>extraatje per hoofdstuk: een weetje, anekdote of filmtip</span></li></ul>
</div></section>
<section class="section section--tight"><div class="wrap two">
  <div class="panel panel--paper reveal"><h2>Zo is elk hoofdstuk opgebouwd</h2><div class="prose"><p>Elk hoofdstuk bevat een toegankelijk essay, weetjes, anekdotes of een extraatje zoals een filmtip, en een korte biografie van de auteur.</p><p>De hoofdstukken kan je afzonderlijk lezen, maar samen vormen ze een rijk overzicht van de thema’s die ons begrip van 2027 bepalen.</p></div></div>
  <div class="panel panel--yellow reveal" style="background:var(--yellow)"><h2>Geen glazen bol</h2><div class="prose"><p>Het boek doet geen voorspellingen. Het geeft inzichten, context en kennis, zodat je de actualiteit van het komende jaar beter begrijpt.</p></div></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  {sec_head("Alle hoofdstukken")}
  <ol style="list-style:none;margin:0;padding:0" class="reveal">{rows}</ol>
</div></section>
"""
page("boek.html", "Het boek", "Het boek De Vooruitblik 2027: 23 essays van 23 academici. Verschijnt op 15 november 2026, uitgegeven door Pelckmans.", boek, current="boek.html")

# ───────────────────────── VIDEOPODCAST ─────────────────────────
def ep_row(c):
    v = c["video"]
    return (f'<a class="ep c-{c["kleur"]}" href="hoofdstuk/{c["slug"]}.html" data-date="{v["datum"]}">'
            f'<div class="ep-date"><span>{DAGEN[dt(v["datum"]).weekday()][:2]}</span><b>{dt(v["datum"]).day}</b><span>{MAANDEN[dt(v["datum"]).month - 1][:3]}</span></div>'
            f'<div class="ep-body"><div class="ep-nr">Aflevering {v["afl"]:02d}</div><h3>{E(v["titel"])}</h3>'
            f'<p>Met {E(" en ".join(sp["naam"] for sp in speakers(c)))}</p>'
            f'<p class="ep-book">In het boek: {E(c["vraag"])}</p></div>'
            f'<span class="ep-status tag"></span></a>')


by_ep = sorted(CH, key=lambda c: c["video"]["datum"])
eps = ""
for ym in sorted({c["video"]["datum"][:7] for c in by_ep}):
    jaar, maand = int(ym[:4]), int(ym[5:])
    eps += f'<h2 class="group-title">{MAANDEN[maand - 1]} {jaar}</h2><div class="sched">' + "".join(ep_row(c) for c in by_ep if c["video"]["datum"].startswith(ym)) + "</div>"
vp = subhero("hero-yellow", "Videopodcast", "Twee professoren, één vraag",
             "Bij elk hoofdstuk hoort een videopodcast: de auteur en een tweede expert bekijken het onderwerp vanuit een andere invalshoek.", "taal-communicatie") + f"""
<section class="section section--tight"><div class="wrap two">
  <div class="panel reveal"><h2>Hoe werkt het?</h2><div class="prose"><p>Je ziet twee sprekers: de auteur van het hoofdstuk en een tweede expert uit het veld. Zo krijg je extra perspectieven, standpunten en reflecties bovenop het essay uit het boek.</p><p>Video en boek versterken elkaar, zonder elkaars inhoud te herhalen. Je hoort extra academische stemmen van verschillende universiteiten.</p></div></div>
  <div class="panel panel--green reveal"><h2>Waar kijk of luister je?</h2><ul style="margin:0;padding-left:1.1em;line-height:1.9"><li>Van <b>1 november</b> tot en met <b>31 december</b>, ongeveer drie afleveringen per week</li><li><a href="{URL["vrtmax_vid"]}" rel="noopener">VRT MAX (video)</a> en <a href="{URL["vrtmax_pod"]}" rel="noopener">VRT MAX (podcast)</a></li><li><a href="{URL["youtube"]}" rel="noopener">YouTube</a></li><li><a href="{URL["spotify"]}" rel="noopener">Spotify</a> en alle andere podcastkanalen</li><li>De shortforms op onze sociale media</li></ul><p style="margin-top:14px">De longform is ongeveer 10 minuten.</p></div>
</div></section>
<section class="section section--tight"><div class="wrap">
  {sec_head("Alle afleveringen", "Het schema van de 23 afleveringen. Klik door naar het hoofdstuk bij de aflevering.")}
  <div class="reveal">{eps}</div>
</div></section>
"""
page("videopodcast.html", "Videopodcast", "De videopodcasts bij De Vooruitblik 2027: telkens twee professoren over één vraag. Van 1 november tot 31 december verschijnen 23 afleveringen, ongeveer drie per week.", vp, current="videopodcast.html")

# ───────────────────────── RADIO ─────────────────────────
radio = subhero("hero-pink", "Radio 1", "Twee weken vooruitblikken",
                "Radio 1 maakt opnieuw een programma rond De Vooruitblik, in de kerstvakantie.", "taal-communicatie") + f"""
<section class="section section--tight"><div class="wrap">
  <ul class="facts reveal"><li><b>12–13u</b><span>elke weekdag op Radio 1</span></li><li><b>21–25 dec</b><span>maandag tot vrijdag</span></li><li><b>28 dec – 1 jan</b><span>maandag tot vrijdag</span></li></ul>
</div></section>
<section class="section section--tight"><div class="wrap two">
  <div class="panel reveal"><h2>Het programma</h2><div class="prose"><p>Radiohost Jacotte Brokken gaat in gesprek met de wetenschappers van De Vooruitblik over de thema’s uit het boek en de maatschappelijke ontwikkelingen die ons begrip van 2027 helpen verdiepen.</p><p>Zo vormt het programma een belangrijke aanvulling op zowel het boek als de videopodcasts.</p></div></div>
  <div class="panel panel--green reveal"><h2>Luister live of terug</h2><p>Radio 1 vind je live en on demand via VRT MAX.</p><a class="btn btn--purple" href="{URL["radio1"]}" rel="noopener">Naar Radio 1 <span class="arr">→</span></a></div>
</div></section>
"""
page("radio.html", "Radio 1", "Het Radio 1-programma bij De Vooruitblik 2027, met Jacotte Brokken: elke weekdag van 12 tot 13 uur van 21 december tot 1 januari.", radio, current="radio.html")

# ───────────────────────── LIVE ─────────────────────────
live = subhero("hero-blue", "Live", "Stel je vraag aan de prof",
               "Op de live evenementen praat het publiek rechtstreeks met de professoren.", "recht-bestuur") + """
<section class="section section--tight"><div class="wrap">
  <div class="dark" style="padding:clamp(26px,5vw,64px)"><ul class="agenda">
    <li><div class="when">15 november</div><div><h3>Boektopia, Antwerp Expo</h3><p>De Vooruitblik 2027 wordt officieel voorgesteld op Dag van de Wetenschap. Onder begeleiding van een moderator praten drie professoren over een selectie onderwerpen uit het boek.</p><p style="margin-top:10px"><b>12u – 12u45</b> gesprek in de Red Room<br><b>13u – 14u</b> signeersessie</p></div></li>
    <li><div class="when">Voorjaar 2027</div><div><h3>Panelgesprekken op vijf locaties</h3><p>Telkens vier academici gaan met elkaar en met het publiek in gesprek over thema’s uit het boek. Kobe Ilsen modereert, aangevuld met een muzikaal intermezzo. Peter Saerens van Pelckmans Uitgevers brengt een voorwoord.</p><p style="margin-top:10px">De locaties en data zijn nog in voorbereiding en komen hier zodra ze vastliggen.</p></div></li>
  </ul></div>
</div></section>
"""
page("live.html", "Live", "De live evenementen bij De Vooruitblik 2027: Boektopia op 15 november en panelgesprekken in het voorjaar van 2027.", live, current="live.html")

# ───────────────────────── PARTNERS ─────────────────────────
def pl(items):
    return '<div class="partners">' + "".join(
        f'<div class="partner">' + (f'<img src="assets/partners/{f}.png" alt="{E(n)}" loading="lazy">' if f else f'<b style="font-family:var(--font-display);font-size:26px;text-transform:uppercase;color:var(--purple)">{E(n)}</b>') + '</div>'
        for f, n in items) + "</div>"

partners = subhero("hero-paper", "Partners", "Samen gemaakt",
                   "Een gezamenlijk project waarin auteurs, universiteiten, partners en mediaorganisaties samenwerken.", "techniek") + f"""
<section class="section section--tight"><div class="wrap">
  <h2 class="group-title">Initiatiefnemers</h2>
  <div class="three">
    <div class="panel panel--green reveal"><span class="logo-mask" role="img" aria-label="Universiteit van Vlaanderen"></span><p>Maakt wetenschappelijke kennis toegankelijk voor een breed publiek, via video’s, podcasts, evenementen en publicaties.</p></div>
    <div class="panel panel--green reveal"><img class="init-logo" src="assets/partners/radio1.png" alt="Radio 1"><p>De actualiteitszender van de VRT, met betrouwbare informatie, verdieping en duiding.</p></div>
    <div class="panel panel--green reveal"><img class="init-logo" src="assets/partners/pelckmans.png" alt="Pelckmans Uitgevers"><p>Belgische uitgeverij met een sterke traditie in educatieve, algemene en wetenschappelijk geïnspireerde publicaties.</p></div>
  </div>
  <h2 class="group-title">De vijf Vlaamse universiteiten</h2>
  <p style="max-width:60ch">Zij leveren experten, ondersteunen de communicatie en dragen bij aan de wetenschappelijke kwaliteit.</p>
  {pl([("antwerpen","Universiteit Antwerpen"),("hasselt","Universiteit Hasselt"),("kuleuven","KU Leuven"),("gent","Universiteit Gent"),("vub-brussel","Vrije Universiteit Brussel")])}
  <h2 class="group-title">Met steun van</h2>
  {pl([("jonge-academie","Jonge Academie"),("vrt","VRT"),("vlaamse-overheid","Vlaamse overheid (WEWIS)"),("nationale-loterij","Nationale Loterij")])}
  <h2 class="group-title">Deel De Vooruitblik</h2>
  <p style="max-width:60ch">Zet het boek in je e-mailhandtekening. Download een banner en voeg hem toe.</p>
  <div class="banners">{"".join(f'<a class="banner reveal" href="assets/img/banner-{f}.png" download><img src="assets/img/banner-{f}.png" alt="{E(n)}" loading="lazy"><span>{E(n)} <span>Download ↓</span></span></a>' for f, n in [("vanaf-15-november","Vanaf 15 november in de boekhandel"),("nu-in-de-boekhandel","Nu in de boekhandel"),("lees-er-alles-over","Lees er nu alles over")])}</div>
</div></section>
"""
page("partners.html", "Partners", "De initiatiefnemers en partners van De Vooruitblik 2027: Universiteit van Vlaanderen, Radio 1, Pelckmans, de vijf Vlaamse universiteiten en meer.", partners, current="partners.html")

print(f"{len(CH)} hoofdstukken + 7 pagina's gebouwd in {ROOT}")
