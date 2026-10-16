/* Gedeelde bouwstenen voor de podiumbeelden (UvNL / UvVL) — flat, cut-out, korrel. */
const NS = 'http://www.w3.org/2000/svg';
const C = { green:'#004B36', greenBright:'#00805C', glow:'#00BC85', purple:'#D6ACFF', ballpoint:'#1B0757',
  red:'#EE5245', yellow:'#FBF07A', blue:'#5BA5FE', blue2:'#585FF1', pink:'#FFC9D7', paper:'#F4F0ED', ink:'#2B2B2B' };

function rng(seed){ let a = seed>>>0; return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function el(tag, attrs={}, parent){ const e=document.createElementNS(NS,tag); for(const k in attrs) e.setAttribute(k, attrs[k]); if(parent) parent.appendChild(e); return e; }
function g(parent, attrs={}){ return el('g', attrs, parent); }

/* Catmull-Rom → vloeiend pad */
function smooth(pts, closed=false, t=0.5){
  const n=pts.length; if(n<2) return '';
  const P=i=> closed ? pts[(i+n)%n] : pts[Math.max(0,Math.min(n-1,i))];
  let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  const last = closed ? n : n-1;
  for(let i=0;i<last;i++){
    const p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2);
    const c1=[p1[0]+(p2[0]-p0[0])*t/3*2*0.5*1.0, p1[1]+(p2[1]-p0[1])*t/3*2*0.5*1.0];
    const c2=[p2[0]-(p3[0]-p1[0])*t/3*2*0.5*1.0, p2[1]-(p3[1]-p1[1])*t/3*2*0.5*1.0];
    d+=` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return closed? d+'Z' : d;
}
/* onregelmatige ster/blob voor plaques, bacteriën, korrels */
function blob(cx,cy,r,{n=14,jit=.25,spike=0,seed=1,rot=0}={}){
  const R=rng(seed), pts=[];
  for(let i=0;i<n;i++){
    const a=rot+i/n*Math.PI*2;
    const rr=r*(1+(R()*2-1)*jit + (spike && i%2? spike : 0));
    pts.push([cx+Math.cos(a)*rr, cy+Math.sin(a)*rr]);
  }
  return smooth(pts,true,.9);
}

function defs(svg){
  const d=el('defs',{},svg);
  d.innerHTML=`
  <radialGradient id="bgGreen" cx="50%" cy="46%" r="75%"><stop offset="0" stop-color="#00432F"/><stop offset=".55" stop-color="#002E21"/><stop offset="1" stop-color="#001A13"/></radialGradient>
  <radialGradient id="bgPurple" cx="50%" cy="46%" r="75%"><stop offset="0" stop-color="#2A0F7A"/><stop offset=".55" stop-color="#1B0757"/><stop offset="1" stop-color="#0E0333"/></radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#00BC85" stop-opacity=".55"/><stop offset="1" stop-color="#00BC85" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowP" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#D6ACFF" stop-opacity=".55"/><stop offset="1" stop-color="#D6ACFF" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowY" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FBF07A" stop-opacity=".9"/><stop offset="1" stop-color="#FBF07A" stop-opacity="0"/></radialGradient>
  <!-- papieren cut-out: witte rand + zachte schaduw -->
  <filter id="cut" x="-8%" y="-8%" width="116%" height="124%" color-interpolation-filters="sRGB">
    <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d"/>
    <feFlood flood-color="#F4F0ED"/><feComposite in2="d" operator="in" result="edge"/>
    <feGaussianBlur in="d" stdDeviation="9" result="sb"/><feOffset in="sb" dx="0" dy="14" result="so"/>
    <feFlood flood-color="#000" flood-opacity=".42"/><feComposite in2="so" operator="in" result="sh"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="cutS" x="-12%" y="-12%" width="124%" height="130%" color-interpolation-filters="sRGB">
    <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="d"/>
    <feFlood flood-color="#F4F0ED"/><feComposite in2="d" operator="in" result="edge"/>
    <feGaussianBlur in="d" stdDeviation="5" result="sb"/><feOffset in="sb" dy="7" result="so"/>
    <feFlood flood-color="#000" flood-opacity=".38"/><feComposite in2="so" operator="in" result="sh"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <!-- papiertextuur: fijne vezels binnen de vorm -->
  <filter id="paper" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.25" result="sp"/>
    <feComposite in="sp" in2="SourceAlpha" operator="in" result="spk"/>
    <feComponentTransfer in="spk" result="spk2"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
    <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="4" result="m"/>
    <feColorMatrix in="m" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.4 .85" result="mm"/>
    <feComposite in="mm" in2="SourceAlpha" operator="in" result="mm2"/>
    <feComponentTransfer in="mm2" result="mm3"><feFuncA type="linear" slope=".10"/></feComponentTransfer>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="mm3"/><feMergeNode in="spk2"/></feMerge>
  </filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="11"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 -.25"/>
  </filter>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="soft2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>`;
  return d;
}

/* Achtergrond: donkere verloop, verspreide merkvormpjes (poëtisch, laag contrast), korrel */
function background(svg, {tone='green', seed=3, dust=70}={}){
  const R=rng(seed); const bg=g(svg,{id:'bg'});
  el('rect',{width:1920,height:1080,fill:`url(#${tone==='purple'?'bgPurple':'bgGreen'})`},bg);
  const ring = tone==='purple' ? '#D6ACFF' : '#00BC85';
  // grote, dove cirkels
  for(let i=0;i<5;i++){
    const r=160+R()*320, x=R()*1920, y=R()*1080;
    el('circle',{cx:x,cy:y,r:r,fill:'none',stroke:ring,'stroke-opacity':.07+R()*.05,'stroke-width':3},bg);
  }
  // stofdeeltjes
  const dg=g(bg,{id:'dust'});
  for(let i=0;i<dust;i++){
    const x=R()*1920,y=R()*1080,r=1.2+R()*R()*6; const kind=R();
    const col = kind<.6? C.paper : kind<.8? ring : C.purple;
    const gi=g(dg,{class:'fl','data-amp':8+R()*18,'data-ph':R(),'data-sp':1+Math.floor(R()*2)});
    el('circle',{cx:x,cy:y,r:r,fill:col,opacity:.12+R()*.4},gi);
  }
  return bg;
}
function grainOverlay(svg, opacity=.5){
  const o=el('rect',{width:1920,height:1080,filter:'url(#grain)',opacity:opacity,style:'mix-blend-mode:soft-light'},svg);
  const v=el('rect',{width:1920,height:1080,fill:'url(#vig)',opacity:1},svg);
  return o;
}

function makeSvg(root){
  const svg=el('svg',{xmlns:NS,viewBox:'0 0 1920 1080',width:1920,height:1080});
  defs(svg);
  svg.querySelector('defs').insertAdjacentHTML('beforeend','<radialGradient id="vig" cx="50%" cy="50%" r="72%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>');
  root.appendChild(svg); return svg;
}

/* zwevend: alle .fl elementen krijgen een rustige op-en-neer + lichte draaiing (periodiek in T seconden) */
function floatAll(svg, t, T=8){
  svg.querySelectorAll('.fl').forEach(e=>{
    const amp=+e.dataset.amp||12, ph=+e.dataset.ph||0, sp=+e.dataset.sp||1, rot=+e.dataset.rot||0;
    const a=(t/T*sp+ph)*Math.PI*2;
    e.setAttribute('transform',`translate(${(Math.cos(a*1)*amp*.35).toFixed(2)} ${(Math.sin(a)*amp).toFixed(2)}) rotate(${(Math.sin(a)*rot).toFixed(2)})`);
  });
}

/* merkvonkjes / bliksem als vorm (eigen pad, herkleurbaar) */
function bolt(parent,x,y,s,rot,fill){
  return el('path',{d:'M0 -60 L-26 6 L-4 6 L-14 60 L26 -12 L2 -12 Z',transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`,fill, 'stroke-linejoin':'round'},parent);
}
function spark(parent,x,y,r,rot,fill,pts=4,inner=.28){
  let d=''; for(let i=0;i<pts*2;i++){ const a=i/(pts*2)*Math.PI*2 - Math.PI/2; const rr=i%2? r*inner : r; d+=(i?'L':'M')+(Math.cos(a)*rr).toFixed(1)+' '+(Math.sin(a)*rr).toFixed(1); }
  return el('path',{d:d+'Z',transform:`translate(${x} ${y}) rotate(${rot})`,fill},parent);
}
window.UV={C,rng,el,g,smooth,blob,makeSvg,background,grainOverlay,floatAll,bolt,spark,defs};
