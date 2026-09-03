#!/usr/bin/env node
// Automated gameplay test: reads falling terms and answers them
const { execSync } = require('child_process');

const ANSWERS = {
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

function getFallingTerms() {
  const out = ab('eval \'Array.from(document.querySelectorAll(".GravityTerm.is-showing .GravityTerm-text")).map(e => e.textContent).join("|")\'');
  const m = out.match(/"([^"]*)"/);
  return m && m[1] ? m[1].split('|').filter(Boolean) : [];
}

function getScore() {
  const out = ab('eval \'document.querySelector(".GravityModeControls-stat .GravityModeControls-value")?.textContent\'');
  const m = out.match(/"([^"]*)"/);
  return m ? m[1] : '?';
}

function getModal() {
  const out = ab('eval \'document.querySelector(".GravityCopyTermView-answer")?.textContent || ""\'');
  const m = out.match(/"([^"]*)"/);
  return m ? m[1] : '';
}

function typeInto(selector, text) {
  const safe = text.replace(/'/g, "\\'");
  const safeSel = selector.replace(/'/g, "\\'");
  ab(`eval "(() => { const el = document.querySelector('${safeSel}'); if (!el) return false; const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; setter.call(el, '${safe}'); el.dispatchEvent(new Event('input', { bubbles: true })); return true; })()"`);
}

let answered = 0;
let round = 0;
while (round < 40 && answered < 12) {
  round++;
  const terms = getFallingTerms();
  if (terms.length > 0) {
    for (const t of terms) {
      const ans = ANSWERS[t.trim()];
      if (ans) {
        typeInto('.GravityTypingPrompt textarea', ans);
        // trigger React keydown Enter via KeyboardEvent
        ab('eval \'(() => { const el = document.querySelector(".GravityTypingPrompt textarea"); if (!el) return false; el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); return true; })()\'');
        answered++;
        console.log(`answered ${t} -> ${ans} (total ${answered}, score ${getScore()})`);
        // after grading, clear the input
        typeInto('.GravityTypingPrompt textarea', '');
      }
    }
  } else {
    // maybe copy modal is up
    const modal = getModal();
    if (modal) {
      const key = modal.trim();
      const ans = Object.values(ANSWERS).find((v) => v === key);
      if (ans || ANSWERS[key]) {
        typeInto('.GravityCopyTermView textarea', key);
        console.log(`copied answer: ${key}`);
      }
    }
  }
  execSync('sleep 1.2');
}
console.log('final score:', getScore(), 'answered:', answered);
// check level
const lvl = ab('eval \'document.querySelectorAll(".GravityModeControls-value")[1]?.textContent\'');
console.log('level:', lvl);
