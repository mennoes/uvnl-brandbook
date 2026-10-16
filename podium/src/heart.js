/* Hart: vlak, gelaagd, anatomisch genoeg om als hart te lezen. Lokale coördinaten ±800×800. */
(function(){
const {C,rng,el,g,smooth}=UV;
const BODY='M402 712C250 612 112 474 112 334C112 226 196 152 292 168C346 178 384 206 408 244C440 202 500 172 566 184C660 200 706 278 686 378C662 510 540 622 402 712Z';
UV.heart=function(parent,{}={}){
  const root=g(parent,{id:'heart'});
  const defsEl=el('defs',{},root);
  const hClip=el('clipPath',{id:'hClip'},defsEl); el('path',{d:BODY},hClip);
  const body=g(root,{filter:'url(#cut)'}); const inner=g(body,{filter:'url(#paper)'});
  // vaten (achter het hart): aorta rood, longslagader blauw, holle ader paars-blauw
  const tube=(d,w,col,dark)=>{ el('path',{d,fill:'none',stroke:C.paper,'stroke-width':w+10,'stroke-linecap':'round','stroke-linejoin':'round'},inner); el('path',{d,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},inner); if(dark) el('path',{d,fill:'none',stroke:dark,'stroke-width':w*.28,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.55,transform:'translate(-6 0)'},inner); };
  tube('M452 252C440 150 480 70 566 66C640 62 664 120 656 190',72,'#D6382C','#8F1D16');
  tube('M352 214C366 150 352 96 290 70',60,C.blue,C.blue2);
  tube('M262 198C232 168 190 156 150 172',46,C.blue2,'#2D32B8');
  tube('M556 214C590 190 640 190 676 206',40,C.blue,C.blue2);
  // hartspier
  el('path',{d:BODY,fill:'#D6382C',stroke:C.paper,'stroke-width':6,'stroke-linejoin':'round'},inner);
  const hl=g(inner,{'clip-path':'url(#hClip)'});
  el('path',{d:BODY,fill:'none',stroke:C.red,'stroke-width':56},hl);
  el('path',{d:BODY,fill:C.red,transform:'translate(-20 -22) scale(1)'},hl);
  // lichte vlakken (glans)
  el('path',{d:'M170 330C170 262 210 214 262 214C220 250 206 300 214 366C194 360 172 350 170 330Z',fill:'#FF8A7C',opacity:.7},hl);
  el('path',{d:'M330 230C348 230 366 244 380 262C360 262 340 252 330 230Z',fill:'#FF8A7C',opacity:.6},hl);
  // tussenschotgroef + kransslagaders
  el('path',{d:'M404 248C374 380 430 560 404 706',fill:'none',stroke:'#B52A20','stroke-width':20,'stroke-linecap':'round'},hl);
  const cor=g(hl,{fill:'none',stroke:C.yellow,'stroke-width':9,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.95});
  el('path',{d:'M404 248C470 290 520 360 560 470'},cor); el('path',{d:'M480 330C520 330 560 300 590 262'},cor);
  el('path',{d:'M404 300C340 340 300 410 292 500'},cor); el('path',{d:'M330 380C290 372 250 340 232 296'},cor);
  el('path',{d:'M470 420C440 460 430 520 440 580'},cor);
  return root;
};
})();
