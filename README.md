# Quizlet Gravity — Faithful Recreation (2020–2024 era)

A faithful recreation of Quizlet's retired **Gravity** study mode, rebuilt from the
original production code recovered via the Wayback Machine:

- `gravity.1e63caa21a5af6d5.js` — final-era game bundle (Jan 2024)
- `gravity.1c12830e823a23626a62.js` — Feb 2023 bundle (keyboard handling)
- `gravity.4194bc4c603b506.css` — the exact stylesheet (the "look")
- `hurmegeosans-no2-400.woff2` — Quizlet's font (already included, exact file)

The game engine (`src/lib/gravity/store.ts`) is a **method-for-method port** of the
original `GravityStore`: same state machine, same timers, same scoring formulas.

## How to play

1. **Paste** a term/definition list (one pair per line: `term, definition`) —
   commas, semicolons, tabs or ` - ` separators all work — **or upload a CSV**
   (Quizlet-style: `term,definition` per row; quoted fields supported).
2. Start → splash (`Defend Your Planet!`) → **Options** → directions → play.
3. Type the answer for each falling asteroid and press **Enter**.
4. Miss one? You must **copy the correct answer** to continue.
   Miss the same term **twice** → game over.
5. **ESC** skips a falling asteroid. Levels speed everything up as you climb.

### Exact mechanics (from the original store)

| Behavior | Value |
|---|---|
| Terms per level | 7 |
| Asteroid fall time (termLife) | 17 s → ×0.9 per level (min 1 s) |
| New asteroid interval | Easy/Med 17 s, Hard 3.5 s → ×0.8 per level (min 0.5 s; Hard ×0.9) |
| Gravity constant | 9.8 (Easy/Med), 11 (Hard), +0.2 per level (Easy stays fixed) |
| Correct answer points | `20 × consecutive + 150 × (1 + round((gravity − 9.8) / 0.2))` |
| Wrong answer | −10 points (floor 0) |
| Miss handling | pause → copy-the-answer modal; 2nd miss of the same term ends the game |
| Meteor | a previously missed term falls as a red asteroid + warning banner |
| Skip tip | after 12 s idle: "Don't know the answer? Press esc to skip." |
| Level up | LEVEL_UP badge for 2.3 s, then next level begins |
| Options | answer side (term/definition/both), difficulty, allow partial answers |
| Persistence | last set, best score, side preference (localStorage) |

## Using the 100% original image assets

The sandbox could not reach `web.archive.org` / `assets.quizlet.com`, so the game
currently ships with **SVG recreations** (close in style, easy to swap). To get the
pixel-exact originals, download these from the Wayback Machine and drop them into
`public/assets/gravity/…` (keep the base filename, change the extension in
`src/gravity/gravity.css` from `.svg` to `.png` — 5 places — or re-upload them
here and I'll wire them in):

**Asteroids → `public/assets/gravity/asteroids/`**
```
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/BlueLargeAsteroid.7e1ab2f869cf89e.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/BlueLargeAsteroid@2x.f6b902f06cd6ea4.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/RedLargeAsteroid.c108a3a203a8cca.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/RedLargeAsteroid@2x.467b36b0d344501.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/IntroRedAsteroid.5653074ea78dccb.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/asteroids/IntroRedAsteroid@2x.98e37c3b207d887.png
```

**Backgrounds → `public/assets/gravity/`**
```
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/stars.109ec79091c1f09.jpg
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/intro-bg.387e6732387c12a.jpg
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/intro-bg@2x.e1cab4f796d3301.jpg
```

**Planets → `public/assets/gravity/planets/`**
```
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level1-placeholder.ea4b94e649865cc.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level1.6b9a2ca90f7ba5e.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level2.0a74a6bd7817131.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level3.b66c0f0fc26a3e3.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level4.ec6e59a76389eb2.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level5.a75ba07e0f9282c.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level6.d479d51b9579bdb.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level7.6055608ea50094a.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level8.c06fcb13f30750a.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level9.85d6badb4097bd6.png
https://web.archive.org/web/20231109135624id_/https://assets.quizlet.com/a/j/dist/app/i/gravity/planets/level10.d1d89b47ca65b8c.png
```

(The `@2x` variants only matter on retina screens; the base files are enough.)

## Project structure

```
src/
  app/                      Next.js 16 route (page, layout)
  gravity/gravity.css       ported original stylesheet + recreated dark UI tokens
  lib/gravity/
    constants.ts            every constant & formula from the original bundle
    store.ts                GravityStore port (state machine, timers, scoring)
    grader.ts               answer grading (normalization, typos, partial answers)
    parse.ts                paste/CSV import + localStorage persistence
    strings.ts              UI strings (reconstructed from gravity.* locale keys)
    formatNumber.ts         comma-grouped score display
  components/gravity/
    GravityApp.tsx          root: import screen ↔ game
    ImportScreen.tsx        paste list / CSV upload (start here)
    GameplayView.tsx        the game view
    Asteroid.tsx            falling term (original sizing/animation logic)
    Planet.tsx              10 planets with original positioning/scales
    LevelUpBadge.tsx        exact original SVG shield + rocket
    TypingPrompt.tsx        the answer input (auto-focused)
    CopyTermView.tsx        copy-the-answer overlay
    BannerAlert.tsx         meteor warning + skip tip
    StartScreens.tsx        splash / options / directions / game over
    ModeControls.tsx        sidebar: score, level, pause, restart
public/assets/gravity/     asteroids, planets, backgrounds + the original font
```

## Notes

- The original bundles are minified/webpacked and depend on dozens of sibling
  Quizlet chunks (`window.Quizlet` globals, session syncers, ads, high-score
  posting). A drop-in rehost isn't possible — this port reproduces the client
  game exactly while replacing the server/API surfaces with localStorage.
- UI strings were reconstructed from the original `gravity.*` i18n keys; edit
  `src/lib/gravity/strings.ts` if you want different wording.
- The grader approximates Quizlet's Kotlin grader: case/punctuation-insensitive,
  per-word typo tolerance, slash-separated alternate answers, optional
  "allow partial answers".
