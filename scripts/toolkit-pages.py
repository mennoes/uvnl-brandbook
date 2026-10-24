"""Extra toolkit pages. Executed in build-vooruitblik.py's render context."""
import re

SOCIAL = '16g2mGf4QckbKXzg1DS2dgOMedpFGwWSD'
COVERS = '1MeqUnFsgEd81knu4x38hHM9mhbR6yvEr'
SIGNATURES = '1qgvdLtFj-cgKiqphdKkeM45hzuMq5ebc'
socials = {norm(pathlib.Path(a['name']).stem): a for a in TOOLKIT['extras'] if a['category']==SOCIAL}
socials[norm('Marijn Hoijtink')] = socials.pop(norm('Marijn Hoijtinck'))
# IKE.jpg is an alternate supplied visual, not a 47th speaker.


def download_tile(a, label, base='', portrait=False):
    return (f'<figure class="download-tile {"portrait-tile" if portrait else ""}">'
            f'<a class="download-preview" href="{base}{a["download"]}" target="_blank" rel="noopener" aria-label="Bekijk {E(label)}">'
            f'<img src="{base}{a["preview"]}" alt="{E(label)}" loading="lazy" width="{a["width"]}" height="{a["height"]}"></a>'
            f'<figcaption><span>{E(label)}</span><a href="{base}{a["download"]}" download aria-label="Download {E(label)}">Download ↓</a></figcaption></figure>')


def person_downloads(p):
    social=socials.get(norm(p['name']))
    photos=''.join(download_tile(a, f'Portret {i} · {p["name"]}',portrait=True) for i,a in enumerate(p['photos'],1))
    socialhtml=download_tile(social, f'Sociale visual · {p["name"]}') if social else ''
    return f'''<section class="person-downloads" id="{p['slug']}"><div class="person-download-head"><div><span class="eyebrow">{E(p['uni'])}</span><h3>{E(p['name'])}</h3></div><div class="download-actions"><a href="{p['zip']}" download>3 portretten als ZIP ↓</a><a href="{p['folder']}" target="_blank" rel="noopener">Originelen in Drive ↗</a></div></div><div class="person-media">{photos}{socialhtml}</div></section>'''


def topic_material(c):
    ps=[library_person(p) for p in speakers(c)]
    ps=[p for p in ps if p]
    names=' '.join(p['name'] for p in ps)
    unis='|'.join(sorted({p['uni'] for p in ps}))
    search=E((c['vraag']+' '+names+' '+c['thema']+' '+c['boek']['naam']).lower())
    return f'''<article class="topic-material" data-topic="{c['nr']}" data-unis="{E(unis)}" data-search="{search}"><div class="topic-heading"><div><span class="eyebrow">Onderwerp {c['nr']:02d}</span><h2>{E(c['vraag'])}</h2></div><a href="hoofdstuk/{c['slug']}.html">Over dit onderwerp →</a></div>{''.join(person_downloads(p) for p in ps)}</article>'''

foto = '''<section class="library-header"><div class="wrap"><span class="eyebrow">Toolkit · Beeldbank</span><h1>Foto’s en visuals</h1><p>Download portretten en kant-en-klare visuals voor je eigen kanalen. Zoek een wetenschapper of onderwerp en kies het materiaal dat je nodig hebt.</p><nav class="subnav" aria-label="Materiaal"><a href="#professoren">Professoren</a><a href="#algemeen">Algemeen materiaal</a><a href="vormgeving.html#partners">Partnerlogo’s</a></nav></div></section>'''
foto += f'''<section id="professoren" class="section section--tight"><div class="wrap"><form class="library-filters" role="search" onsubmit="return false"><div><label for="media-search">Zoek een naam of onderwerp</label><input type="search" id="media-search" placeholder="Bijvoorbeeld: Ann, water, Star Wars…"></div><div><label for="media-uni">Universiteit</label><select id="media-uni"><option value="">Alle universiteiten</option>{''.join(f'<option>{E(u)}</option>' for u in UNIS)}</select></div><div><label for="media-topic">Onderwerp</label><select id="media-topic"><option value="">Alle 23 onderwerpen</option>{''.join(f'<option value="{c["nr"]}">{c["nr"]:02d}. {E(c["vraag"])}</option>' for c in CH)}</select></div><button type="reset" class="btn btn--line">Wis filters</button></form><p id="media-count" aria-live="polite">23 onderwerpen · 46 sprekers</p><p class="library-help">Portretten: JPG, tot 2400 px. Sociale visuals: originele JPG. Voor de volledige resolutie en eventuele RAW-bestanden kies je ‘Originelen in Drive’.</p><div id="media-results">{''.join(topic_material(c) for c in CH)}</div><div id="media-empty" class="library-empty" hidden><h2>Geen materiaal gevonden</h2><p>Probeer een andere naam, zoekterm of universiteit.</p><button type="button" class="btn btn--green" id="media-reset">Toon alles</button></div></div></section>'''
cover_assets=[a for a in TOOLKIT['extras'] if a['category']==COVERS]
signature_assets=[a for a in TOOLKIT['extras'] if a['category']==SIGNATURES]
foto+=f'''<section class="section section--tight" id="algemeen"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Algemeen materiaal</span><h2>Boekcovers en banners</h2></div><p>Beelden voor communicatie over het hele project.</p></div><div class="general-grid">{''.join(download_tile(a,a['name']) for a in cover_assets if a.get('preview'))}</div><p class="download-line">{''.join(f'<a href="{a["download"]}" download>Volledige boekomslag · PDF ↓</a>' for a in cover_assets if not a.get('preview'))}</p><h3 class="library-subtitle">E-mailhandtekeningen</h3><p>Kies de tekst die past bij het moment waarop je communiceert.</p><div class="signature-grid">{''.join(download_tile(a,a['name'].removesuffix('.png').replace('E-mail Handtekening - ','')) for a in signature_assets)}</div><div class="material-note"><h3>Meer materiaal</h3><p>Algemene foto’s, verticale posts, promotievideo’s en advertenties zijn nog niet aangeleverd in de toolkit. Je vindt hier alleen bestanden die al beschikbaar zijn.</p><a href="https://drive.google.com/drive/folders/1rX7bUKnSCapJm47DHmx89FO_G0MZyKFS" target="_blank" rel="noopener">Bekijk de volledige toolkit in Drive ↗</a></div></div></section>'''
page('fotos-en-visuals.html','Foto’s en visuals','Download drie portretten per wetenschapper, sociale visuals en algemeen communicatiemateriaal voor De Vooruitblik 2027.',foto,current='fotos-en-visuals.html')

media = subhero('hero-purple','Projectinformatie','Lezen, kijken en luisteren','De Vooruitblik 2027 is een kennisproject van Universiteit van Vlaanderen, Radio 1 en Pelckmans. Wetenschappers geven context bij 23 vragen over het komende jaar.')
media += f'''<section class="section section--tight"><div class="wrap"><nav class="subnav" aria-label="Formats"><a href="#boek">Het boek</a><a href="#video">Videopodcast</a><a href="#radio">Radio 1</a><a href="#live">Live</a></nav><div class="format-overview"><article class="info-format" id="boek"><div class="info-image book-image"><img src="assets/img/boek-3d.webp" alt="De Vooruitblik 2027" loading="lazy"></div><div><span class="eyebrow">Lezen · 15 november 2026</span><h2>Het boek</h2><p>23 essays van wetenschappers van de vijf Vlaamse universiteiten. Elk hoofdstuk vertrekt van één vraag, met context, weetjes en een korte biografie van de auteur.</p><p><strong>€24,50</strong> · Uitgegeven door Pelckmans.</p><div class="stack"><a class="btn btn--green" href="boek.html">Meer over het boek →</a><a href="fotos-en-visuals.html#algemeen">Download de boekcovers</a></div></div></article><article class="info-format" id="video"><div class="info-image"><img src="{socials[norm('Stijn Joye')]['preview']}" alt="Sociale visual van Stijn Joye over Star Wars" loading="lazy"></div><div><span class="eyebrow">Kijken en luisteren · Vanaf november 2026</span><h2>De videopodcast</h2><p>Twee wetenschappers bekijken dezelfde vraag vanuit verschillende disciplines. Ongeveer drie afleveringen per week, op VRT MAX, YouTube, Spotify en de andere podcastkanalen.</p><a class="btn btn--green" href="videopodcast.html">Bekijk het publicatieschema →</a></div></article><article class="info-format" id="radio"><div class="info-image radio-image"><img src="assets/partners/radio1.png" alt="Radio 1" loading="lazy"></div><div><span class="eyebrow">Luisteren · Kerstvakantie</span><h2>De Vooruitblik op Radio 1</h2><p>Jacotte Brokken gaat in gesprek met de wetenschappers. Elke weekdag van <strong>12 tot 13 uur</strong>, van 21 december 2026 tot en met 1 januari 2027.</p><a class="btn btn--green" href="{URL['radio1']}">Luister via Radio 1 ↗</a></div></article><article class="info-format" id="live"><div class="info-image"><img src="assets/img/live-vlaanderen.webp" alt="Een live evenement van Universiteit van Vlaanderen" loading="lazy"></div><div><span class="eyebrow">Live</span><h2>In gesprek met de wetenschappers</h2><p><strong>15 november 2026 · Boektopia, Antwerp Expo.</strong><br>Gesprek van 12 tot 12.45 uur, signeersessie van 13 tot 14 uur.</p><p><strong>23 november 2026 · VRT.</strong><br>Lanceeravond voor genodigden, vanaf 18.30 uur.</p><p><strong>Voorjaar 2027 · Vijf universiteitssteden.</strong><br>Panelgesprekken met Kobe Ilsen. Data en locaties volgen.</p><a class="text-link" href="radio-en-live.html">Meer over radio en live →</a></div></article></div><aside class="material-note"><h2>Communiceren over De Vooruitblik</h2><p>Gebruik de portretten en visuals op je eigen kanalen. Vermeld de wetenschapper en universiteit, tag @universiteitvanvlaanderen en @pelckmans.be op Instagram en gebruik #DeVooruitblik2027 en #uvvl.</p><div class="stack"><a class="btn btn--green" href="fotos-en-visuals.html">Kies je materiaal →</a><a href="https://drive.google.com/file/d/1l3OGLS7e1JL65gn7iB9ZfekHzSFefUkA/view" target="_blank" rel="noopener">Volledige handleiding ↗</a></div></aside></div></section>'''
page('lezen-kijken-luisteren.html','Lezen, kijken en luisteren','Het boek, de videopodcasts, Radio 1 en live evenementen van De Vooruitblik 2027.',media,current='lezen-kijken-luisteren.html')

# Keep design foundations; replace all download sections with supplied current assets.
# Sections are delimited at their stable headings, without changing generated HTML afterward.
parts=re.split(r'(?=<section class="section section--tight">)',vg)
vg=''.join(part for part in parts if not any(t in part for t in ['<h2>Het boek</h2>','<h2>E-mailhandtekening</h2>']))
partners = {
 '1ag6gpHPCvS6eEFyUGEn-grYDmPMJ3EQ7':'Pelckmans Uitgeverij',
 '1qUrXDYe_wWyyRouqt7qwC_cw8A4eRlqm':'Jonge Academie',
 '19LropPOFkdwDCycJLxPM8mbdkIuR5FUl':'Vlaamse overheid',
 '1cs9-n_-E5Yco0RWapxn7-WcUORP_2u2Y':'VRT',
 '1Pz0QJm_hjV3p5C3YZyp8tasiHxXwSNzK':'Radio 1',
 '1QFiwJqh9TPadxLk7RyZKL9Ejg-jP2z_N':'Nationale Loterij',
 '1fiX5VkAsFNd-DLO_pI1SNDDSDp201u3F':'KU Leuven',
 '1jfOSw_ow50dMV6Ha259EAKB_KEIa6nKq':'VUB',
 '1_4Ox352GwDvZw1UWESTzXGFQTPUMw4pf':'UGent',
 '1vlJGjWkDV26Afah92YmXTIbj8B45Ud5y':'UHasselt',
 '1PNtC2WCq-3wBamDXjKbMjwiJjjkoUV0e':'UAntwerpen'}
logo_cards=''
for category,name in partners.items():
    files=[a for a in TOOLKIT['extras'] if a['category']==category]
    a=next((x for x in files if 'Zwart' in x['name']),files[0])
    downloads=''.join(f'<a href="{x["download"]}" download>{E(x["name"].removesuffix(".png"))} ↓</a>' for x in files)
    logo_cards+=f'<article class="partner-download"><div class="partner-preview {"partner-preview--dark" if name != "Pelckmans Uitgeverij" else ""}"><img src="{a["preview"]}" alt="{E(name)}" loading="lazy"></div><h3>{E(name)}</h3><details><summary>Download logo{ "’s" if len(files)>1 else ""}</summary><div class="logo-downloads">{downloads}</div></details></article>'
partner_section=f'<section class="section section--tight" id="partners"><div class="wrap">{sec_head("Partnerlogo’s", "De aangeleverde logo’s van de universiteiten, initiatiefnemers en partners. Gebruik de originele bestanden en verhoudingen.")}<div class="partner-grid">{logo_cards}</div></div></section>'
# Place partner logos immediately after project logos, before color/type foundations.
pos=vg.find('<section class="section section--tight">',vg.find('<section class="section section--tight">')+1)
vg=vg[:pos]+partner_section+vg[pos:]
vg+=f'<section class="section section--tight"><div class="wrap"><div class="material-note"><h2>Boekcovers en e-mailhandtekeningen</h2><p>Alle aangeleverde boekcovers, banners en sociale visuals staan samen in de beeldbank.</p><a class="btn btn--green" href="fotos-en-visuals.html#algemeen">Naar het algemene materiaal →</a></div></div></section>'
page('vormgeving.html','Vormgeving','Projectlogo’s, partnerlogo’s, kleuren en typografie voor De Vooruitblik 2027.',vg,current='vormgeving.html')
