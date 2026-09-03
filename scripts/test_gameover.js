#!/usr/bin/env node
// Test game over: let terms hit the ground (miss), copy answer,
// then miss the same term again when it returns as a meteor.
const { execSync } = require('child_process');

const DEFS = {
  photo: 'light', chrom: 'color', helio: 'sun', geo: 'earth',
  bio: 'life', hydro: 'water', therm: 'heat',
};

function ab(cmd) {
  try {
    return execSync(`agent-browser ${cmd}`, { timeout: 30000, encoding: 'utf8' }).trim();
  } catch (e) {
    return (e.stdout || '').trim() || 'ERR';
  }
}

function query(js) {
  const escaped = js.replace(/'/g, "\\'");
  const out = ab(`eval '${escaped}'`);
  const m = out.match(/"((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\(.)/g, '$1') : '';
}

function typeInto(selector, text) {
  const safe = text.replace(/'/g, "\\'");
  const safeSel = selector.replace(/'/g, "\\'");
  ab(`eval "(() => { const el = document.querySelector('${safeSel}'); if (!el) return false; const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; setter.call(el, '${safe}'); el.dispatchEvent(new Event('input', { bubbles: true })); return true; })()"`);
}

function score() {
  return query('document.querySelector(".GravityModeControls-stat .GravityModeControls-value")?.textContent');
}

function level() {
  return query('Array.from(document.querySelectorAll(".GravityModeControls-value")).map(e=>e.textContent).join(",")');
}

function gameOverVisible() {
  return query('!!document.querySelector(".GravityUIModal-box")');
}

console.log('waiting for term to hit the ground (miss #1)...');
let guarded = 0;
let missCount = 0;
while (guarded < 90 && missCount < 2) {
  guarded++;
  const modalAnswer = query('document.querySelector(".GravityCopyTermView-answer")?.textContent || ""');
  if (modalAnswer) {
    const ans = modalAnswer.trim();
    console.log(`miss #${missCount + 1}: copy modal answer = "${ans}" — typing it`);
    typeInto('.GravityCopyTermView textarea', ans);
    missCount++;
    execSync('sleep 2.5');
    // wait for resume
    let w = 0;
    while (w < 10 && query('document.querySelector(".GravityCopyTermView-answer")?.textContent')) {
      execSync('sleep 0.5');
      w++;
    }
  } else {
    execSync('sleep 1');
  }
}

console.log('after misses — score:', score(), '| stats:', level());
console.log('game over modal visible:', gameOverVisible());
const title = query('document.querySelector(".GravityUIModal-box .GravityUIHeading")?.textContent || ""');
console.log('game over title:', title);
execSync('sleep 1');
