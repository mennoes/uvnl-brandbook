(function(){
const {C,rng,el,g,makeSvg,background,grainOverlay,floatAll,bolt,spark,blob,smooth}=UV;
const S={};
const q=new URLSearchParams(location.search);

S.brein=function(svg,{plaques=false}={}){
  background(svg,{tone:'green',seed:3});
  el('circle',{cx:960,cy:520,r:520,fill:'url(#glowG)',opacity:.7},svg);
  const wrap=g(svg,{transform:'translate(960 540) scale(1.32) translate(-500 -380)'});
  const fl=g(wrap,{class:'fl','data-amp':10,'data-rot':.8,'data-ph':0});
  UV.brain(fl,{plaques,seed:5});
  return {};
};
S['brein-plaques']=(svg)=>S.brein(svg,{plaques:true});


/* ---------- hart ---------- */
S.hart=function(svg){
  background(svg,{tone:'green',seed:8});
  const glow=el('circle',{cx:960,cy:540,r:470,fill:'url(#glowY)',opacity:0},svg); glow.setAttribute('fill','url(#glowR)');
  svg.querySelector('defs').insertAdjacentHTML('beforeend','<radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#EE5245" stop-opacity=".55"/><stop offset="1" stop-color="#EE5245" stop-opacity="0"/></radialGradient>');
  glow.setAttribute('opacity',.8);
  const fl=g(svg,{class:'fl','data-amp':8,'data-rot':.6,'data-ph':.1});
  const beat=g(fl,{id:'beat'});
  const wrap=g(beat,{transform:'translate(960 560) scale(1.12) translate(-400 -390)'});
  UV.heart(wrap);
  // zwevende hartslag-ringen
  const rings=g(svg,{id:'rings'});
  for(let i=0;i<3;i++) el('circle',{cx:960,cy:560,r:300,fill:'none',stroke:C.red,'stroke-width':4,opacity:0,class:'ring','data-i':i},rings);
  window.onTime=function(t){
    const T=8, ph=(t%T)/T; // 8 s = ~ 6 slagen
    const b=(x)=>Math.exp(-Math.pow((x%1-.0)*9,2));
    const x=t/T*6;
    const k=1+.055*(Math.exp(-Math.pow((x%1)*7,2))+.65*Math.exp(-Math.pow(((x%1)-.28)*8,2)));
    beat.setAttribute('transform',`translate(960 560) scale(${k.toFixed(4)}) translate(-960 -560)`);
    svg.querySelectorAll('.ring').forEach(r=>{
      const i=+r.dataset.i; const u=((x-i*.33)%1+1)%1;
      r.setAttribute('r',320+u*260); r.setAttribute('opacity',(1-u)*(i===0?.5:.3)*(Math.floor(x)%1===0?1:1));
    });
  };
  return {};
};


/* ---------- brein in vol bedrijf (flitsen) ---------- */
S['brein-activiteit']=function(svg){
  background(svg,{tone:'green',seed:21,dust:90});
  el('circle',{cx:960,cy:520,r:560,fill:'url(#glowG)',opacity:.55},svg);
  const wrap=g(svg,{transform:'translate(960 540) scale(1.32) translate(-500 -380)'});
  const fl=g(wrap,{class:'fl','data-amp':10,'data-rot':.8,'data-ph':0});
  UV.brain(fl,{seed:5});
  // flitsen: glans + vonk + bliksem, elk met eigen ritme
  const pts=[[360,180],[560,120],[700,210],[820,330],[470,300],[640,380],[300,330],[780,450],[430,520],[560,560],[250,420],[880,260]];
  const flashes=g(fl,{id:'flashes'}); const R=rng(9);
  const cols=[C.yellow,C.glow,C.purple,C.pink,C.yellow];
  pts.forEach(([x,y],i)=>{
    const f=g(flashes,{class:'flash','data-i':i,'data-per':[3,4,2,5,3,4,2,3,5,4,3,2][i]/1});
    const col=cols[i%cols.length];
    el('circle',{cx:x,cy:y,r:90,fill: col===C.yellow?'url(#glowY)':col===C.glow?'url(#glowG)':'url(#glowP)'},f);
    if(i%2) UV.bolt(f,x,y,.9+R()*.4,(R()-.5)*50,col); else UV.spark(f,x,y,34+R()*10,R()*40,col,4,.3);
    for(let k=0;k<3;k++){ const a=R()*6.28, d=46+R()*34; UV.spark(f,x+Math.cos(a)*d,y+Math.sin(a)*d,7+R()*5,0,col,4,.3); }
  });
  window.onTime=function(t){
    svg.querySelectorAll('.flash').forEach(f=>{
      const i=+f.dataset.i, per=+f.dataset.per; // 8 s lus: per deelt 8 niet altijd → gebruik gehele aantallen flitsen
      const n=[2,3,2,4,2,3,1,2,4,3,2,1][i]; const ph=(i*0.137)%1;
      const u=((t/8*n+ph)%1+1)%1;
      const v=Math.max(0,1-u*3.2); const k=v*v*(3-2*v);
      f.setAttribute('opacity',k.toFixed(3));
      f.setAttribute('transform',`translate(${pts[i][0]} ${pts[i][1]}) scale(${(.9+.25*k).toFixed(3)}) translate(${-pts[i][0]} ${-pts[i][1]})`);
    });
  };
  return {};
};

/* ---------- antibioticaresistentie ---------- */
function capsule(parent,x,y,len,w,rot,c1,c2,{filter='cutS'}={}){
  const gi=g(parent,{transform:`translate(${x} ${y}) rotate(${rot})`}); const f=g(gi,{filter:`url(#${filter})`}); const inner=g(f,{filter:'url(#paper)'});
  const id='cp'+Math.random().toString(36).slice(2,8);
  const cp=el('clipPath',{id},inner); el('rect',{x:-len/2,y:-w/2,width:len,height:w,rx:w/2},cp);
  const cg=g(inner,{'clip-path':`url(#${id})`});
  el('rect',{x:-len/2,y:-w/2,width:len/2,height:w,fill:c1},cg); el('rect',{x:0,y:-w/2,width:len/2,height:w,fill:c2},cg);
  el('rect',{x:-len/2+w*.18,y:-w/2+w*.16,width:len-w*.36,height:w*.16,rx:w*.08,fill:'#fff',opacity:.38},cg);
  return gi;
}
function bacterium(parent,{x,y,kind='rod',s=1,rot=0,col=C.glow,dark='#00805C',dots='#00BC85',seed=1,filter='cutS',flag=true}){
  const R=rng(seed); const gi=g(parent,{transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`}); const f=g(gi,{filter:`url(#${filter})`}); const inner=g(f,{filter:'url(#paper)'});
  if(flag){ const fg=g(gi,{fill:'none',stroke:dark==='#F4F0ED'?'#00805C':dark,'stroke-width':5,'stroke-linecap':'round'}); gi.insertBefore(fg,f);
    if(kind==='coccus'){ for(let i=0;i<14;i++){ const a=i/14*6.28+R()*.3; const x1=Math.cos(a)*62,y1=Math.sin(a)*62,x2=Math.cos(a)*(92+R()*12),y2=Math.sin(a)*(92+R()*12);
      el('path',{d:`M${x1} ${y1}Q${(x1+x2)/2+Math.sin(a)*10} ${(y1+y2)/2-Math.cos(a)*10} ${x2} ${y2}`},fg); el('circle',{cx:x2,cy:y2,r:5,fill:'#00805C',stroke:'none'},fg); } } }
  if(kind==='rod'){ el('rect',{x:-100,y:-44,width:200,height:88,rx:44,fill:col},inner); el('rect',{x:-100,y:-44,width:200,height:88,rx:44,fill:'none',stroke:dark,'stroke-width':8},inner);
    for(let i=0;i<7;i++) el('circle',{cx:-60+i*20+R()*8,cy:(R()-.5)*40,r:5+R()*5,fill:dots},inner); }
  else if(kind==='coccus'){ el('circle',{r:66,fill:col},inner); el('circle',{r:66,fill:'none',stroke:dark,'stroke-width':8},inner);
    for(let i=0;i<8;i++){ const a=R()*6.28,d=R()*38; el('circle',{cx:Math.cos(a)*d,cy:Math.sin(a)*d,r:5+R()*6,fill:dots},inner); } }
  else if(kind==='spiral'){ const d='M-120 0q30 -64 60 0t60 0t60 0t60 0'; el('path',{d,fill:'none',stroke:dark,'stroke-width':44,'stroke-linecap':'round'},inner); el('path',{d,fill:'none',stroke:col,'stroke-width':30,'stroke-linecap':'round'},inner); }
  return gi;
}
S.antibiotica=function(svg){
  background(svg,{tone:'green',seed:33,dust:60});
  el('circle',{cx:960,cy:540,r:520,fill:'url(#glowG)',opacity:.5},svg);
  const R=rng(17);
  // ver weg: gedimde bacteriën en capsules (diepte door toon, niet door blur)
  const far=g(svg,{opacity:.34});
  const kinds=['rod','coccus','spiral'];
  for(let i=0;i<14;i++){ const f=g(far,{class:'fl','data-amp':14+R()*14,'data-ph':R(),'data-rot':4});
    const k=kinds[i%3]; const x=100+R()*1720, y=80+R()*920; if(Math.hypot(x-960,y-540)<330){ continue; }
    bacterium(f,{x,y,kind:k,s:.5+R()*.35,rot:R()*360,col:i%2?C.glow:'#00805C',dark:'#004B36',dots:'#00BC85',seed:i+3,flag:false,filter:'cutS'});
  }
  for(let i=0;i<10;i++){ const f=g(far,{class:'fl','data-amp':14+R()*14,'data-ph':R(),'data-rot':6}); const x=80+R()*1760,y=60+R()*960; if(Math.hypot(x-960,y-540)<330) continue;
    capsule(f,x,y,120+R()*40,50,R()*360,i%2?C.red:C.purple,C.yellow); }
  // schild-ringen rond de resistente bacterie
  const hero=g(svg,{class:'fl','data-amp':7,'data-ph':.2,'data-rot':1});
  [[400,.12],[330,.22],[262,.4]].forEach(([r,o],i)=>el('circle',{cx:960,cy:540,r,fill:'none',stroke:C.purple,'stroke-width':i===2?10:5,'stroke-dasharray':i===0?'4 26':i===1?'40 22':'none','stroke-linecap':'round',opacity:i===2?.8:.55},hero));
  // resistente bacterie: groot, met 'pantser' (dikke rand + dopjes)
  bacterium(hero,{x:960,y:540,kind:'coccus',s:2.15,rot:0,col:C.glow,dark:C.paper,dots:'#00A879',seed:4,filter:'cut',flag:true});
  // pantserplaatjes
  const arm=g(hero,{filter:'url(#cutS)'});
  for(let i=0;i<10;i++){ const a=i/10*6.28+.3; el('rect',{x:-26,y:-12,width:52,height:24,rx:12,fill:C.purple,transform:`translate(${960+Math.cos(a)*172} ${540+Math.sin(a)*172}) rotate(${a*57.3+90})`},arm); }
  // capsules die afketsen
  const bounce=[[560,250,-30],[1380,300,24],[430,760,40],[1470,780,-36],[960,150,90],[980,940,-90]];
  bounce.forEach(([x,y,r],i)=>{ const f=g(svg,{class:'fl','data-amp':16,'data-ph':i*.17,'data-rot':5}); capsule(f,x,y,170,70,r,i%2?C.red:C.pink,C.yellow,{filter:'cut'}); });
  // stippellijntjes: afketsen
  const tr=g(svg,{fill:'none',stroke:C.paper,'stroke-width':5,'stroke-linecap':'round','stroke-dasharray':'2 16',opacity:.55});
  el('path',{d:'M640 300C740 340 810 380 840 430'},tr); el('path',{d:'M1300 330C1230 360 1180 400 1150 440'},tr);
  el('path',{d:'M520 720C600 700 690 690 760 660'},tr); el('path',{d:'M1390 740C1320 720 1250 700 1190 670'},tr);
  return {};
};

/* ---------- kwantum (achtergrond; foto komt er los bovenop) ---------- */
S.kwantum=function(svg,{}={}){
  background(svg,{tone:'purple',seed:41,dust:80});
  el('circle',{cx:960,cy:540,r:600,fill:'url(#glowP)',opacity:.35},svg);
  // golfpatroon: twee bronnen met concentrische ringen
  const wv=g(svg,{fill:'none',stroke:C.purple,'stroke-width':3,opacity:.3});
  for(let i=1;i<24;i++) el('circle',{cx:560,cy:540,r:i*54},wv);
  const wv2=g(svg,{fill:'none',stroke:C.glow,'stroke-width':3,opacity:.28});
  for(let i=1;i<24;i++) el('circle',{cx:1360,cy:540,r:i*54},wv2);
  // snijpunten als stippen (interferentie)
  const dots=g(svg,{});
  for(let i=1;i<24;i++) for(let j=1;j<24;j++){ const r1=i*54,r2=j*54, d=800; if(r1+r2<d||Math.abs(r1-r2)>d) continue;
    const a=(r1*r1-r2*r2+d*d)/(2*d), h2=r1*r1-a*a; if(h2<0) continue; const h=Math.sqrt(h2);
    for(const sg of [1,-1]){ const x=560+a, y=540+sg*h; if(x<20||x>1900||y<20||y>1060) continue; el('circle',{cx:x,cy:y,r:5,fill:(i+j)%3?C.paper:C.yellow,opacity:(i+j)%3?.35:.9},dots); } }
  return {};
};
S['kwantum-qubit']=function(svg){
  S.kwantum(svg);
  const c=g(svg,{class:'fl','data-amp':8,'data-ph':.4,'data-rot':1});
  const big=g(c,{filter:'url(#cut)'}); const inner=g(big,{filter:'url(#paper)'});
  el('circle',{cx:960,cy:540,r:230,fill:C.glow},inner); el('circle',{cx:960,cy:540,r:230,fill:'none',stroke:C.paper,'stroke-width':8},inner);
  el('path',{d:'M960 310a230 230 0 0 1 0 460a118 230 0 0 0 0-460',fill:'#00A879'},inner);
  el('ellipse',{cx:960,cy:540,rx:230,ry:70,fill:'none',stroke:C.paper,'stroke-width':8},inner);
  el('path',{d:'M960 540L1090 400',stroke:C.red,'stroke-width':12,'stroke-linecap':'round'},inner); el('circle',{cx:1090,cy:400,r:22,fill:C.red},inner);
  [[420,.5,C.yellow],[ -1,0,0]].forEach(()=>{});
  const orb=(rx,ry,rot,col,ang)=>{ const gi=g(c,{transform:`rotate(${rot} 960 540)`}); el('ellipse',{cx:960,cy:540,rx,ry,fill:'none',stroke:col,'stroke-width':6,opacity:.9},gi); const f=g(gi,{filter:'url(#cutS)'}); el('circle',{cx:960+rx*Math.cos(ang),cy:540+ry*Math.sin(ang),r:24,fill:col},f); };
  orb(420,130,-25,C.yellow,.9); orb(420,130,35,C.pink,3.6); orb(420,130,95,C.purple,5.4);
  return {};
};


/* ---------- taartdiagram (data via ?d=[{"label":"..","value":..}]) ---------- */
S.taart=function(svg){
  background(svg,{tone:'green',seed:52,dust:50});
  let data=null; try{ data=JSON.parse(q.get('d')||'null'); }catch(e){} if(!data) data=[{label:'Voorbeeld A',value:58},{label:'Voorbeeld B',value:27},{label:'Voorbeeld C',value:15}];
  const titel=q.get('titel')||'';
  const cols=[C.glow,C.purple,C.yellow,C.pink,C.blue,C.red];
  const tot=data.reduce((a,d)=>a+d.value,0); const cx=640,cy=560,r=360;
  el('circle',{cx,cy,r:r+170,fill:'url(#glowG)',opacity:.5},svg);
  const pie=g(svg,{class:'fl','data-amp':8,'data-ph':.3,'data-rot':.6}); let a0=-Math.PI/2;
  data.forEach((d,i)=>{
    const a1=a0+d.value/tot*Math.PI*2, am=(a0+a1)/2, ex=i===0?22:0; const ox=Math.cos(am)*ex, oy=Math.sin(am)*ex;
    const large=(a1-a0)>Math.PI?1:0; const p=(a,rr)=>`${(cx+ox+Math.cos(a)*rr).toFixed(1)} ${(cy+oy+Math.sin(a)*rr).toFixed(1)}`;
    const dd = data.length===1? `M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z` : `M${cx+ox} ${cy+oy}L${p(a0,r)}A${r} ${r} 0 ${large} 1 ${p(a1,r)}Z`;
    const f=g(pie,{filter:'url(#cut)'}); const inn=g(f,{filter:'url(#paper)'});
    el('path',{d:dd,fill:cols[i%cols.length],stroke:C.paper,'stroke-width':4,'stroke-linejoin':'round'},inn);
    a0=a1;
  });
  // legenda met grote cijfers
  const lx=1180, step=Math.min(210,720/data.length), y0=cy-(data.length-1)*step/2;
  if(titel) { const t=el('text',{x:lx,y:150,fill:C.paper,'font-family':'Tiempos Text, Georgia, serif','font-style':'italic','font-size':54},svg); t.textContent=titel; }
  data.forEach((d,i)=>{
    const y=y0+i*step; const pct=Math.round(d.value/tot*100);
    const f=g(svg,{filter:'url(#cutS)'}); el('rect',{x:lx-70,y:y-52,width:44,height:44,rx:10,fill:cols[i%cols.length]},f);
    const n=el('text',{x:lx,y:y+20,fill:cols[i%cols.length],'font-family':'Oldschool Grotesk Condensed, Barlow Condensed, sans-serif','font-weight':700,'font-size':170,'letter-spacing':'-2'},svg); n.textContent=pct+'%';
    const l=el('text',{x:lx+2,y:y+72,fill:C.paper,'font-family':'Oldschool Grotesk, Inter, sans-serif','font-weight':700,'font-size':46},svg); l.textContent=d.label;
  });
  return {};
};

/* ---------- foto op mooie achtergrond: ?img=<pad>&iw=<breedte>&ih=<hoogte>&bg=kwantum|groen ---------- */
S.foto=function(svg){
  const bgName=q.get('bg')||'kwantum';
  if(bgName==='groen'){ background(svg,{tone:'green',seed:61,dust:70}); el('circle',{cx:960,cy:540,r:560,fill:'url(#glowG)',opacity:.5},svg); } else S.kwantum(svg);
  const iw=+q.get('iw')||1600, ih=+q.get('ih')||1000; const maxW=1180,maxH=720; const k=Math.min(maxW/iw,maxH/ih); const w=iw*k,h=ih*k;
  const fr=g(svg,{class:'fl','data-amp':8,'data-rot':.7,'data-ph':.5});
  const rot=g(fr,{transform:`translate(960 540) rotate(-2.2)`});
  const f=g(rot,{filter:'url(#cut)'});
  const inn=g(f,{filter:'url(#paper)'}); el('rect',{x:-w/2-16,y:-h/2-16,width:w+32,height:h+32,rx:10,fill:C.paper},inn);
  const cp=el('clipPath',{id:'phc'},rot); el('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:4},cp);
  el('image',{href:q.get('img'),x:-w/2,y:-h/2,width:w,height:h,preserveAspectRatio:'xMidYMid slice','clip-path':'url(#phc)'},rot);
  // gele tape + vonk
  const tp=g(rot,{filter:'url(#cutS)',transform:`translate(${-w/2+20} ${-h/2-12}) rotate(-38)`}); el('rect',{x:-90,y:-26,width:180,height:52,fill:C.yellow,opacity:.95},tp);
  const tp2=g(rot,{filter:'url(#cutS)',transform:`translate(${w/2-20} ${h/2+10}) rotate(-38)`}); el('rect',{x:-90,y:-26,width:180,height:52,fill:C.yellow,opacity:.95},tp2);
  UV.spark(svg,1620,230,56,12,C.yellow,4,.28); UV.spark(svg,300,860,40,-8,C.pink,4,.28);
  return {};
};

window.SCENES=S;
const root=document.getElementById('root'); let svg;
window.renderScene=function(name,t=0){
  root.innerHTML=''; svg=makeSvg(root); (S[name])(svg); grainOverlay(svg,.55); floatAll(svg,t,8); if(window.onTime) window.onTime(t);
};
window.setTime=function(t){ floatAll(svg,t,8); if(window.onTime) window.onTime(t); };
if(q.get('s')) renderScene(q.get('s'), +q.get('t')||0);
})();
