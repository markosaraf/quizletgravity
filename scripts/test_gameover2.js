#!/usr/bin/env node
// Phase 2: answer all terms to reach level 2 where missed terms return as
// meteors; then deliberately miss a meteor to trigger game over.
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

function stats() {
  return query('Array.from(document.querySelectorAll(".GravityModeControls-value")).map(e=>e.textContent).join(",")');
}

// {term, meteor} pairs currently falling
function falling() {
  const raw = query(
    'Array.from(document.querySelectorAll(".GravityTerm.is-showing")).map(el => (el.className.includes("is-meteor") ? "M:" : "") + el.querySelector(".GravityTerm-text").textContent).join("|")',
  );
  return raw ? raw.split('|').filter(Boolean) : [];
}

function modalAnswer() {
  return query('document.querySelector(".GravityCopyTermView-answer")?.textContent || ""').trim();
}

let gameOver = false;
let rounds = 0;
let answered = 0;
while (rounds < 120 && !gameOver) {
  rounds++;
  const modal = modalAnswer();
  if (modal) {
    const isGameOver = query('document.querySelector(".GravityUIModal-box") ? "modal" : ""');
    // game-over modal has no CopyTermView; check separately below
    if (modal.length > 0) {
      console.log(`miss happened — copying "${modal}"`);
      typeInto('.GravityCopyTermView textarea', modal);
      execSync('sleep 2.5');
      // check game over after this copy
      const over = query('document.querySelector(".GravityUIModal-box .GravityUIHeading")?.textContent || ""');
      if (over) {
        console.log('GAME OVER MODAL:', over);
        gameOver = true;
        break;
      }
    }
    continue;
  }

  // check game over modal directly
  const over = query('document.querySelector(".GravityUIModal-box .GravityUIHeading")?.textContent || ""');
  if (over) {
    console.log('GAME OVER MODAL:', over);
    gameOver = true;
    break;
  }

  const terms = falling();
  const normal = terms.filter((t) => !t.startsWith('M:'));
  const meteor = terms.find((t) => t.startsWith('M:'));
  if (normal.length > 0) {
    // answer the first normal term
    const term = normal[0].replace('M:', '').trim();
    const ans = DEFS[term];
    if (ans) {
      typeInto('.GravityTypingPrompt textarea', ans);
      ab('eval \'(() => { const el = document.querySelector(".GravityTypingPrompt textarea"); if (!el) return false; el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); return true; })()\'');
      answered++;
      typeInto('.GravityTypingPrompt textarea', '');
      console.log(`answered ${term} (total ${answered}) stats=${stats()}`);
    }
  } else if (meteor) {
    const term = meteor.replace('M:', '').trim();
    console.log(`meteor ${term} falling — letting it hit the ground...`);
  }
  execSync('sleep 0.9');
}

console.log('final stats:', stats(), '| answered:', answered, '| game over:', gameOver);
if (gameOver) {
  const body = query('document.querySelector(".GravityUIModal-box")?.textContent || ""');
  console.log('game over modal text:', body.slice(0, 200));
}
