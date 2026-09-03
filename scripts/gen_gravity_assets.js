#!/usr/bin/env node
// Generates starfield background, intro background and 10 planet SVGs
// (recreations of the original Quizlet Gravity assets)
const fs = require('fs');
const path = require('path');
const OUT = '/home/z/my-project/public/assets/gravity';

// deterministic pseudo-random
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- stars background (1600x1000) ----------
function starsBg() {
  const rnd = mulberry32(42);
  const W = 1600, H = 1000;
  let s = '';
  // layered stars: small dim, medium, bright with glow
  for (let i = 0; i < 420; i++) {
    const x = (rnd() * W).toFixed(1), y = (rnd() * H).toFixed(1);
    const r = (rnd() * 0.9 + 0.3).toFixed(2);
    const o = (rnd() * 0.5 + 0.25).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
  }
  for (let i = 0; i < 70; i++) {
    const x = (rnd() * W).toFixed(1), y = (rnd() * H).toFixed(1);
    const r = (rnd() * 1.3 + 1.1).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="0.9"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${(r * 3.2).toFixed(2)}" fill="#fff" opacity="0.08"/>`;
  }
  // a few star glints (4-point)
  for (let i = 0; i < 14; i++) {
    const x = (rnd() * W).toFixed(1), y = (rnd() * H).toFixed(1);
    const r = (rnd() * 1.6 + 1.6).toFixed(2);
    s += `<path d="M${x} ${y - r * 3} L ${(+x + r * 0.35).toFixed(1)} ${y} L ${x} ${+y + r * 3} L ${(x - r * 0.35).toFixed(1)} ${y} Z" fill="#fff" opacity="0.95"/>`;
    s += `<path d="M${+x - r * 3} ${y} L ${x} ${+y - r * 0.35} L ${+x + r * 3} ${y} L ${x} ${+y + r * 0.35} Z" fill="#fff" opacity="0.95"/>`;
  }
  // faint nebulas
  const nebula = `
  <ellipse cx="1200" cy="180" rx="380" ry="200" fill="#3b4a80" opacity="0.14"/>
  <ellipse cx="300" cy="800" rx="420" ry="230" fill="#2e5b7a" opacity="0.12"/>
  <ellipse cx="800" cy="420" rx="500" ry="260" fill="#1f2a4d" opacity="0.25"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMax slice">
  <defs>
    <radialGradient id="bg" cx="0.5" cy="0.9" r="1.1">
      <stop offset="0" stop-color="#2b3552"/>
      <stop offset="0.45" stop-color="#232c46"/>
      <stop offset="1" stop-color="#1a2136"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${nebula}
  ${s}
</svg>`;
  fs.writeFileSync(path.join(OUT, 'stars.svg'), svg);
  console.log('stars.svg', svg.length);
}

// ---------- intro background (1600x1000): big planet bottom + asteroids ----------
function introBg() {
  const rnd = mulberry32(7);
  const W = 1600, H = 1000;
  let s = '';
  for (let i = 0; i < 300; i++) {
    const x = (rnd() * W).toFixed(1), y = (rnd() * (H - 320)).toFixed(1);
    const r = (rnd() * 0.9 + 0.3).toFixed(2);
    const o = (rnd() * 0.5 + 0.2).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
  }
  // floating asteroids top right
  const ast = (x, y, scale, cls) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path fill="url(#g${cls})" stroke="#3d7a9c" stroke-width="6"
      d="M182 14 C 258 10, 322 62, 344 128 C 360 176, 352 232, 320 276 C 288 320, 236 350, 180 350 C 122 350, 70 318, 40 272 C 12 228, 6 170, 24 120 C 44 64, 106 18, 182 14 Z"/>
    <ellipse cx="98" cy="96" rx="34" ry="30" fill="#8ecbe2" stroke="#4d86a6" stroke-width="4"/>
    <ellipse cx="272" cy="150" rx="26" ry="23" fill="#8ecbe2" stroke="#4d86a6" stroke-width="4"/>
    <ellipse cx="150" cy="272" rx="30" ry="25" fill="#8ecbe2" stroke="#4d86a6" stroke-width="4"/>
  </g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMax slice">
  <defs>
    <radialGradient id="sky" cx="0.5" cy="0.25" r="1.2">
      <stop offset="0" stop-color="#2b3552"/>
      <stop offset="0.5" stop-color="#232c46"/>
      <stop offset="1" stop-color="#1a2136"/>
    </radialGradient>
    <radialGradient id="g1" cx="0.38" cy="0.32" r="0.85">
      <stop offset="0" stop-color="#9fd4e8"/><stop offset="0.55" stop-color="#71b6d6"/><stop offset="1" stop-color="#4b93b8"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.38" cy="0.32" r="0.85">
      <stop offset="0" stop-color="#f2b3a6"/><stop offset="0.55" stop-color="#e98a76"/><stop offset="1" stop-color="#d96550"/>
    </radialGradient>
    <radialGradient id="planet" cx="0.36" cy="0.25" r="0.9">
      <stop offset="0" stop-color="#8fe3d0"/>
      <stop offset="0.45" stop-color="#48b5a0"/>
      <stop offset="1" stop-color="#2a7d8f"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <ellipse cx="1350" cy="240" rx="420" ry="180" fill="#3b4a80" opacity="0.15"/>
  ${s}
  ${ast(1180, 90, 0.5, 1)}
  ${ast(1330, 260, 0.34, 2)}
  ${ast(960, 200, 0.24, 2)}
  ${ast(1420, 90, 0.18, 1)}
  <!-- big planet peeking from bottom -->
  <g>
    <circle cx="800" cy="${H + 340}" r="620" fill="url(#planet)"/>
    <path d="M 180 ${H} Q 260 ${H - 130}, 400 ${H - 120} Q 520 ${H - 105}, 600 ${H - 40} Q 700 ${H - 150}, 830 ${H - 90} Q 950 ${H - 190}, 1080 ${H - 80} Q 1200 ${H - 150}, 1330 ${H - 60} Q 1430 ${H - 90}, 1530 ${H - 20} L 1530 ${H} Z" fill="#3c8fa3" opacity="0.55"/>
    <path d="M 240 ${H} Q 340 ${H - 60}, 480 ${H - 30} Q 640 1005, 800 980 Q 980 1005, 1150 ${H - 45} Q 1300 ${H - 15}, 1420 ${H} Z" fill="#256d7f" opacity="0.5"/>
    <ellipse cx="560" cy="${H - 120}" rx="90" ry="26" fill="#2a7d8f" opacity="0.45" transform="rotate(-14 560 ${H - 120})"/>
    <ellipse cx="1030" cy="${H - 70}" rx="70" ry="20" fill="#2a7d8f" opacity="0.45" transform="rotate(8 1030 ${H - 70})"/>
    <path d="M 300 ${H + 40} Q 800 ${H - 470}, 1300 ${H + 40} " fill="none" stroke="#c9f4ef" stroke-width="14" opacity="0.28"/>
  </g>
</svg>`;
  fs.writeFileSync(path.join(OUT, 'intro-bg.svg'), svg);
  console.log('intro-bg.svg', svg.length);
}

// ---------- planets ----------
const PLANETS = [
  { n: 1, base: '#8fe3d0', mid: '#48b5a0', dark: '#2a7d8f', crater: '#3c9c8e', type: 'terra' },
  { n: 2, base: '#d3b6f5', mid: '#a67ce8', dark: '#6f47b5', crater: '#b28aee', type: 'smooth' },
  { n: 3, base: '#ffcf9e', mid: '#f59a5b', dark: '#c96a2e', crater: '#f4a86a', type: 'bands' },
  { n: 4, base: '#a8d8ff', mid: '#5b9be0', dark: '#33619e', crater: '#6ca6e8', type: 'smooth' },
  { n: 5, base: '#ffe9a8', mid: '#f5c95b', dark: '#c99a2e', crater: '#f4d36a', type: 'bands' },
  { n: 6, base: '#f9c5d8', mid: '#ef8fb5', dark: '#c25a8a', crater: '#f2a3c3', type: 'terra' },
  { n: 7, base: '#c8e8a8', mid: '#8ec45b', dark: '#5a8f2e', crater: '#a3d24a', type: 'craters' },
  { n: 8, base: '#9fd4e8', mid: '#5b9be0', dark: '#33619e', crater: '#71b6d6', type: 'bands' },
  { n: 9, base: '#e8e8ea', mid: '#b8bcc4', dark: '#8a8f9a', crater: '#c8ccd4', type: 'craters' },
  { n: 10, base: '#f2a3a3', mid: '#d96a6a', dark: '#a83e3e', crater: '#e88a8a', type: 'craters' },
];

function planet(p) {
  const S = 600;
  const rnd = mulberry32(1000 + p.n * 17);
  const cx = S / 2, cy = S / 2, r = S / 2 - 8;
  let detail = '';
  // shading overlay
  const shade = `<radialGradient id="sh${p.n}" cx="0.38" cy="0.3" r="0.95">
      <stop offset="0" stop-color="${p.base}"/>
      <stop offset="0.55" stop-color="${p.mid}"/>
      <stop offset="1" stop-color="${p.dark}"/>
    </radialGradient>`;
  const rim = `<radialGradient id="rim${p.n}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.62" stop-color="${p.dark}" stop-opacity="0"/>
      <stop offset="1" stop-color="#0c1020" stop-opacity="0.55"/>
    </radialGradient>`;
  const clip = `<clipPath id="cl${p.n}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`;

  if (p.type === 'terra') {
    // continents
    for (let i = 0; i < 7; i++) {
      const x = cx + (rnd() - 0.5) * r * 1.5, y = cy + (rnd() - 0.5) * r * 1.5;
      const w = r * (0.22 + rnd() * 0.3), h = w * (0.5 + rnd() * 0.4);
      const rot = (rnd() * 60 - 30).toFixed(0);
      detail += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${w.toFixed(0)}" ry="${h.toFixed(0)}" fill="${p.crater}" opacity="0.75" transform="rotate(${rot} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
    }
    detail += `<ellipse cx="${cx}" cy="${cy - r * 0.72}" rx="${r * 0.55}" ry="${r * 0.18}" fill="#fff" opacity="0.28"/>`;
  } else if (p.type === 'bands') {
    for (let i = 0; i < 6; i++) {
      const y = cy - r + (r * 2 * (i + 0.5)) / 6;
      const hh = (r * 2) / 6 * 0.55;
      const col = i % 2 ? p.crater : p.dark;
      detail += `<ellipse cx="${cx}" cy="${y.toFixed(0)}" rx="${r}" ry="${hh.toFixed(0)}" fill="${col}" opacity="0.4"/>`;
    }
    detail += `<ellipse cx="${cx + r * 0.25}" cy="${cy - r * 0.55}" rx="${r * 0.42}" ry="${r * 0.15}" fill="#fff" opacity="0.3"/>`;
  } else if (p.type === 'craters') {
    for (let i = 0; i < 9; i++) {
      const ang = rnd() * Math.PI * 2, dist = rnd() * r * 0.85;
      const x = cx + Math.cos(ang) * dist, y = cy + Math.sin(ang) * dist;
      const cr = r * (0.05 + rnd() * 0.1);
      detail += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${cr.toFixed(0)}" fill="${p.dark}" opacity="0.55"/>`;
      detail += `<circle cx="${x.toFixed(0)}" cy="${(y - cr * 0.25).toFixed(0)}" r="${(cr * 0.75).toFixed(0)}" fill="${p.crater}" opacity="0.6"/>`;
    }
  } else {
    // smooth with subtle swirls
    for (let i = 0; i < 5; i++) {
      const ang = rnd() * Math.PI * 2, dist = rnd() * r * 0.7;
      const x = cx + Math.cos(ang) * dist, y = cy + Math.sin(ang) * dist;
      const w = r * (0.18 + rnd() * 0.25);
      detail += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${w.toFixed(0)}" ry="${(w * 0.45).toFixed(0)}" fill="${p.crater}" opacity="0.35" transform="rotate(${(rnd() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
    }
    detail += `<ellipse cx="${cx - r * 0.2}" cy="${cy - r * 0.6}" rx="${r * 0.4}" ry="${r * 0.14}" fill="#fff" opacity="0.3"/>`;
  }

  const ring = p.n === 2 || p.n === 5 || p.n === 8 ? `
    <g transform="rotate(-18 ${cx} ${cy})">
      <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.45}" ry="${r * 0.4}" fill="none" stroke="${p.crater}" stroke-width="${r * 0.09}" opacity="0.65"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.28}" ry="${r * 0.33}" fill="none" stroke="${p.base}" stroke-width="${r * 0.05}" opacity="0.8"/>
    </g>` : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <defs>${shade}${rim}${clip}</defs>
  ${ring}
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sh${p.n})"/>
  <g clip-path="url(#cl${p.n})">${detail}</g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#rim${p.n})"/>
</svg>`;
  fs.writeFileSync(path.join(OUT, 'planets', `level${p.n}.svg`), svg);
  console.log(`planets/level${p.n}.svg`, svg.length);
}

// level1 placeholder (faint outline used pre-load behind level 1/2)
function placeholder() {
  const S = 600, cx = S / 2, cy = S / 2, r = S / 2 - 8;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2b3552" opacity="0.6"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3b4a80" stroke-width="8"/>
</svg>`;
  fs.writeFileSync(path.join(OUT, 'planets', 'level1-placeholder.svg'), svg);
  console.log('planets/level1-placeholder.svg', svg.length);
}

starsBg();
introBg();
PLANETS.forEach(planet);
placeholder();
console.log('ALL ASSETS DONE');
