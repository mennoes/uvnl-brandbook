#!/usr/bin/env node
/* Podiumbeelden UvNL/UvVL — renderen naar PNG (4K) en MP4-loops (1080p).
 *
 *   node podium/render.cjs alles                         → alle beelden (JPG, 4K) + loops in podium/uit/
 *   node podium/render.cjs beeld <scene> <uit.jpg|png>       → één scène (4K)
 *   node podium/render.cjs loop  <scene> <uit.mp4> [sec] → rustige loop (standaard 8 s, 30 fps)
 *   node podium/render.cjs taart <data.json> <uit.jpg|png> [titel]
 *   node podium/render.cjs foto  <foto.jpg> <uit.jpg|png> [kwantum|groen]
 *
 * Vereist: playwright (node), Chromium, ffmpeg.  NODE_PATH wijst naar playwright.
 */
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('node:child_process');
const fs = require('node:fs'); const path = require('node:path');
const here = __dirname; const OUT = path.join(here, 'uit');
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

async function open(scale){
  const b = await chromium.launch({ executablePath: fs.existsSync(CHROME) ? CHROME : undefined });
  const p = await b.newPage({ viewport:{ width:1920, height:1080 }, deviceScaleFactor: scale });
  p.on('pageerror', e => console.error('FOUT', e.message));
  return { b, p };
}
async function goto(p, scene, extra=''){
  await p.goto('file://' + here + '/src/scene.html?s=' + scene + (extra ? '&' + extra : ''));
  await p.evaluate(() => document.fonts.ready);
}
async function beeld(scene, out, extra=''){
  const { b, p } = await open(2); await goto(p, scene, extra);
  fs.mkdirSync(path.dirname(out), { recursive:true }); await p.screenshot({ path: out, type: out.endsWith('.png') ? 'png' : 'jpeg', quality: 92 }); await b.close();
  console.log('✓', out);
}
async function loop(scene, out, sec=8, fps=24){
  const { b, p } = await open(1); await goto(p, scene);
  fs.mkdirSync(path.dirname(out), { recursive:true });
  const ff = spawn('ffmpeg', ['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-i','-','-c:v','libx264','-crf','17','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart', out], { stdio:['pipe','inherit','inherit'] });
  const n = Math.round(sec * fps);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => window.setTime(t), i / fps * (8 / sec));
    const buf = await p.screenshot({ type:'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('✓', out);
}
async function dims(file){
  const { b, p } = await open(1);
  await p.goto('file://' + path.resolve(file));
  const d = await p.evaluate(() => { const i = document.querySelector('img'); return i ? [i.naturalWidth, i.naturalHeight] : [1600, 1000]; });
  await b.close(); return d;
}
(async () => {
  const [cmd, a, b2, c] = process.argv.slice(2);
  if (cmd === 'beeld') return beeld(a, path.resolve(b2));
  if (cmd === 'loop') return loop(a, path.resolve(b2), c ? +c : 8);
  if (cmd === 'taart') { const d = fs.readFileSync(a, 'utf8'); return beeld('taart', path.resolve(b2), 'd=' + encodeURIComponent(JSON.stringify(JSON.parse(d))) + (c ? '&titel=' + encodeURIComponent(c) : '')); }
  if (cmd === 'foto') { const [w, h] = await dims(a); return beeld('foto', path.resolve(b2), `img=${encodeURIComponent('file://' + path.resolve(a))}&iw=${w}&ih=${h}&bg=${c || 'kwantum'}`); }
  if (cmd === 'alles') {
    const stills = [['brein','01-brein'],['brein-activiteit','02-brein-activiteit'],['brein-plaques','03-brein-plaques'],['hart','04-hart'],['antibiotica','05-antibioticaresistentie'],['kwantum','06-kwantum-achtergrond'],['kwantum-qubit','07-kwantum-qubit']];
    for (const [s, f] of stills) await beeld(s, path.join(OUT, f + '.jpg'));
    const voorbeeld1 = [{label:'Voorbeeld A',value:71},{label:'Voorbeeld B',value:29}];
    const voorbeeld2 = [{label:'Voorbeeld A',value:46},{label:'Voorbeeld B',value:31},{label:'Voorbeeld C',value:15},{label:'Voorbeeld D',value:8}];
    await beeld('taart', path.join(OUT, '08-taartdiagram-1-voorbeeld.jpg'), 'd=' + encodeURIComponent(JSON.stringify(voorbeeld1)));
    await beeld('taart', path.join(OUT, '09-taartdiagram-2-voorbeeld.jpg'), 'd=' + encodeURIComponent(JSON.stringify(voorbeeld2)));
    for (const [s, f] of [['brein','01-brein'],['brein-activiteit','02-brein-activiteit'],['hart','04-hart'],['antibiotica','05-antibioticaresistentie'],['kwantum-qubit','07-kwantum-qubit']]) await loop(s, path.join(OUT, 'loops', f + '-loop.mp4'));
    return;
  }
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 11).join('\n'));
})();
