# Worklog

---
Task ID: 1
Agent: main (Super Z)
Task: Recreate Quizlet Gravity (2020+ version) from recovered original code, with a paste/CSV import start screen (Kysariin-style)

Work Log:
- Analyzed uploaded original assets: gravity.1e63caa21a5af6d5.js (Jan 2024, 456KB), gravity.1c12830e823a23626a62.js (2023, 305KB), gravity.4194bc4c603b506.css (42KB), hurmegeosans woff2
- Wrote scripts/gravity_research/extract_modules.js to split webpack chunk into modules; extracted the full gravity entry (66KB) and beautified it
- Extracted exact game mechanics from the original GravityStore: 10 game states, physics constants (termLife 17s, 7 terms/level, gravity 9.8/11 +0.2/level), scoring formula 20*consec+150*(1+round((g-9.8)/0.2)), miss/copy-answer/game-over rules, level-up timing, meteor logic, planet positioning math, LevelUpBadge SVG paths, fall animation keyframes
- Ported gravity.css with exact original values; defined Quizlet dark-theme tokens; recreated shared UI (modal, toggles, dropdown, sidebar)
- web.archive.org and assets.quizlet.com unreachable from sandbox → generated SVG recreations of asteroids/planets/stars/intro-bg (scripts/gen_gravity_assets.js); font is the exact original file
- Built the game as a Next.js 16 app: store.ts (method-for-method GravityStore port), grader.ts, parse.ts (paste/CSV import), strings.ts, all views (GameplayView, Asteroid, Planet, TypingPrompt, CopyTermView, BannerAlert, StartScreens, ModeControls, ImportScreen)
- Fixed during browser testing: store snapshot immutability (useSyncExternalStore), infinite resize loop, hydration mismatch, StartView callback wiring, CopyTermView side inversion, splash title styling
- Verified end-to-end via agent-browser: import → splash → options → directions → loading → gameplay; scoring exactly matches (170 first answer, level-2 gravity step), ESC skip, copy-answer modal, meteor re-fire, level-up, game-over on double miss, pause/resume/restart, localStorage persistence
- Lint passes; dev server clean

Stage Summary:
- Deliverable: playable Quizlet Gravity recreation at / (Next.js 16, ported 2020-2024 mechanics + exact CSS values + original font + close SVG assets)
- Asset swap: README.md lists the 21 Wayback Machine URLs for the pixel-exact original images; drop into public/assets/gravity/ and change 5 CSS extensions
- Key research artifacts preserved under scripts/gravity_research/ (extracted modules, beautified entry, pretty CSS)
