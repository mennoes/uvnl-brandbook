/* Brein (zijaanzicht, kijkt naar links) als gelaagd papieren cut-out. Lokale coördinaten ±1000×760. */
(function(){
const {C,rng,el,g,smooth,blob,bolt,spark}=UV;

const CEREBRUM='M92 392C66 262 170 112 346 72C500 34 706 40 826 122C934 198 962 332 904 432C880 476 840 504 790 508C700 516 560 506 456 480C384 462 320 446 262 470C192 494 112 452 92 392Z';
const TEMPORAL='M296 452C376 424 520 466 640 500C746 522 766 566 704 590C622 620 470 620 380 578C306 546 262 488 296 452Z';
const CEREBELLUM='M640 520C690 486 790 480 850 508C900 534 880 590 800 618C720 640 650 620 628 580C620 556 624 536 640 520Z';
const STEM='M586 560L664 566L640 720Q634 742 610 742Q584 742 586 716Z';

function inside(pathEl, x,y){ const s=pathEl.ownerSVGElement; const p=s.createSVGPoint(); p.x=x; p.y=y; return pathEl.isPointInFill(p); }

/* gyri: rustige, parallel meanderende banden die vanaf de Sylvische groeve naar boven vloeien */
function wiggle(parent, shapeEl, x,y, ang, opt){ const {w=12,col,amp=15,lam=150,margin=30,maxLen=330,R}=opt;
  const dx=Math.cos(ang), dy=Math.sin(ang), nx=-dy, ny=dx, ph=(opt&&opt.ph!=null)?opt.ph:R()*6.28, A=amp, L=lam;
  const segs=[]; let cur=[]; let s=0, stopped=false;
  const gap0 = R()<.5 ? 40+R()*80 : -1;
  while(s<maxLen){
    const o=A*Math.sin(s/L*6.283+ph);
    const px=x+dx*s+nx*o, py=y+dy*s+ny*o;
    const ok=inside(shapeEl,px,py) && inside(shapeEl,px+dx*margin,py+dy*margin) && inside(shapeEl,px+nx*margin*.6,py+ny*margin*.6) && inside(shapeEl,px-nx*margin*.6,py-ny*margin*.6);
    if(!ok){ if(cur.length>2) segs.push(cur); cur=[]; if(s>60) break; }
    else cur.push([px,py]);
    s+=14;
  }
  if(cur.length>2) segs.push(cur);
  const out=[];
  segs.forEach(pts=>{ out.push(el('path',{d:smooth(pts,false,.9)},parent)); });
  return out;
}
function interp(tab,x){ for(let i=0;i<tab.length-1;i++){ const [a,ya]=tab[i],[b,yb]=tab[i+1]; if(x>=a&&x<=b) return ya+(yb-ya)*(x-a)/(b-a);} return tab[tab.length-1][1]; }
const SYLV=[[100,430],[200,470],[262,470],[360,452],[470,476],[560,490],[650,496],[800,480],[900,440]];

function gyri(parent, shapeEl, seed, {col=C.pink,w=32}={}){
  const R=rng(seed), grp=g(parent,{fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
  let i=0;
  for(let x=128;x<=870;x+=45,i++){
    const y=interp(SYLV,x)-30;
    const ang=-Math.PI/2 + (x-520)/600*.95;
    const paths=wiggle(grp,shapeEl,x,y,ang,{R,maxLen:560,ph:i*.55,amp:20,lam:150,margin:34});
    paths.forEach((pe,k)=>{ pe.setAttribute('stroke-dasharray','165 54'); pe.setAttribute('stroke-dashoffset',String(-(i%4)*52)); });
  }
  return grp;
}
function gyriTemporal(parent, shapeEl, seed, {col='#F7A5BE',w=30}={}){
  const R=rng(seed), grp=g(parent,{fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
  let i=0;
  for(let y=470;y<=640;y+=43,i++){
    const ps=wiggle(grp,shapeEl,280+(i%2)*25,y,0.11,{R,maxLen:520,ph:i*.8,amp:12,lam:120,margin:30});
    ps.forEach(pe=>{pe.setAttribute('stroke-dasharray','80 54'); pe.setAttribute('stroke-dashoffset',String(-(i%3)*34));});
  }
  return grp;
}

/* opts: plaques:boolean */
UV.brain=function(parent,{plaques=false,seed=5,pink=C.pink,deep='#E5819F'}={}){
  const root=g(parent,{id:'brain'});
  const defsEl=el('defs',{},root);
  const cClip=el('clipPath',{id:'cClip'},defsEl); el('path',{d:CEREBRUM},cClip);
  const tClip=el('clipPath',{id:'tClip'},defsEl); el('path',{d:TEMPORAL},tClip);
  const bClip=el('clipPath',{id:'bClip'},defsEl); el('path',{d:CEREBELLUM},bClip);
  const body=g(root,{filter:'url(#cut)'}); const inner=g(body,{filter:'url(#paper)'});
  // achterste lagen: hersenstam en kleine hersenen
  el('path',{d:STEM,fill:'#B98BF0',stroke:C.paper,'stroke-width':5,'stroke-linejoin':'round'},inner);
  el('path',{d:CEREBELLUM,fill:C.purple,stroke:C.paper,'stroke-width':5,'stroke-linejoin':'round'},inner);
  const cbl=g(inner,{'clip-path':'url(#bClip)',fill:'none',stroke:'#B98BF0','stroke-width':8,'stroke-linecap':'round'});
  for(let i=0;i<9;i++) el('path',{d:`M610 ${506+i*15} Q760 ${490+i*15} 910 ${512+i*15}`},cbl);
  // grote hersenen: donker basisblad + lichter blad iets verschoven (vlakke diepte)
  el('path',{d:CEREBRUM,fill:'#E27A9A',stroke:C.paper,'stroke-width':5,'stroke-linejoin':'round'},inner);
  const lt=g(inner,{'clip-path':'url(#cClip)'});
  el('path',{d:CEREBRUM,fill:'none',stroke:pink,'stroke-width':44},lt);
  const gC=g(inner,{'clip-path':'url(#cClip)'});
  const ref1=el('path',{d:CEREBRUM,fill:'none'},root);
  gyri(gC,ref1,seed,{col:pink});
  // temporaal blad
  el('path',{d:TEMPORAL,fill:'#D96B8E',stroke:C.paper,'stroke-width':5,'stroke-linejoin':'round'},inner);
  const lt2=g(inner,{'clip-path':'url(#tClip)'});
  el('path',{d:TEMPORAL,fill:'none',stroke:'#F7A5BE','stroke-width':40},lt2);
  const gT=g(inner,{'clip-path':'url(#tClip)'});
  const ref2=el('path',{d:TEMPORAL,fill:'none'},root);
  gyriTemporal(gT,ref2,seed+9);
  if(plaques) UV.plaques(inner,seed);
  return root;
};

/* plaques: gele, onregelmatige klontjes met rode kern — vlak en vriendelijk */
UV.plaques=function(root,seed){
  const R=rng(seed+40); const grp=g(root,{id:'plaques'});
  const spots=[[330,214,40],[640,176,48],[520,300,30],[760,320,36],[420,130,22],[230,350,24],[700,440,26],[560,150,16],[350,540,28],[880,420,16],[480,560,20]];
  spots.forEach(([x,y,r],i)=>{
    const gi=g(grp,{class:'pq'}); const f=g(gi,{filter:'url(#cutS)'});
    el('path',{d:blob(x,y,r*1.3,{n:10,jit:.2,spike:.1,seed:seed+i*3,rot:R()*3}),fill:C.yellow},f);
    // satelliet-klontjes
    for(let k=0;k<2;k++){ const a=R()*6.28; el('circle',{cx:x+Math.cos(a)*r*1.55,cy:y+Math.sin(a)*r*1.55,r:r*(.16+R()*.1),fill:C.yellow},f); }
    // korrels binnenin
    for(let k=0;k<3;k++){ const a=R()*6.28, d=R()*r*.6; el('circle',{cx:x+Math.cos(a)*d,cy:y+Math.sin(a)*d,r:r*(.12+R()*.08),fill:'#E3B93B'},f); }
  });
  return grp;
};
})();
