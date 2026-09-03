'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { GAME_STATES } from '@/lib/gravity/constants';
import { gravityStore } from '@/lib/gravity/store';
import type { GameData, GravitySet, GravityTerm } from '@/lib/gravity/types';
import { getStoredPartialAnswer } from '@/lib/gravity/parse';
import { GameplayView, useGameplaySize } from './GameplayView';
import { ModeControls, ScreenSizeBlocker, SiteHeader } from './ModeControls';
import { StartView, GameOverView } from './StartScreens';
import { ImportScreen } from './ImportScreen';

const BEST_SCORE_KEY = 'gravityBestScore';
const MIN_WINDOW_WIDTH = 480;

export function GravityApp() {
  const [started, setStarted] = useState(false);
  const [mobileBlocked, setMobileBlocked] = useState(false);
  const gameplayRef = useRef<HTMLDivElement>(null);
  const size = useGameplaySize(gameplayRef, started);
  const data = useSyncExternalStore(
    gravityStore.subscribe,
    gravityStore.getSnapshot,
    () => null as unknown as GameData,
  );

  // detect mobile (original GravityScreenSizeBlocker) — async to satisfy
  // the set-state-in-effect rule
  useEffect(() => {
    const t = setTimeout(() => {
      const isMobile =
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) &&
        window.innerWidth < MIN_WINDOW_WIDTH;
      if (isMobile) setMobileBlocked(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleStartSet = useCallback((set: GravitySet, terms: GravityTerm[]) => {
    gravityStore.setup({
      set,
      terms,
      acceptsPartialAnswer: getStoredPartialAnswer(),
    });
    setStarted(true);
  }, []);

  // keyboard: ESC skips the first live term (keymaster GAMEPLAY scope)
  useEffect(() => {
    if (!started || !data) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const target = e.target as HTMLElement | null;
      const inInput = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if (data.gameState === GAME_STATES.FREE_FALL) {
        e.preventDefault();
        const firstLive = Object.keys(data.liveTerms)[0];
        if (firstLive) gravityStore.missTerm(firstLive, true);
      } else if (data.gameState === GAME_STATES.COPY_ANSWER && !inInput) {
        // nothing — copy modal is modal
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [started, data]);

  const handleNewSet = useCallback(() => {
    gravityStore.dispose();
    setStarted(false);
  }, []);

  const best = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const raw = window.localStorage.getItem(BEST_SCORE_KEY);
    return raw ? Number(raw) || 0 : 0;
  }, [data?.gameState]);

  // persist high score at game over
  useEffect(() => {
    if (data?.gameState === GAME_STATES.GAME_OVER && data.points > best) {
      try {
        window.localStorage.setItem(BEST_SCORE_KEY, String(data.points));
      } catch {
        /* ignore */
      }
    }
  }, [data?.gameState, data?.points, best]);

  if (!started || !data) {
    return <ImportScreen onStart={handleStartSet} />;
  }

  const showBlocker = mobileBlocked || size.w < MIN_WINDOW_WIDTH;

  return (
    <div className="gravity-root">
      <SiteHeader title={data.set.title} />
      <div className="GravityModeLayout">
        <div className="GravityModeLayout-body">
          <ModeControls
            gameState={data.gameState}
            points={data.points}
            level={data.level}
            setPathLabel={data.set.title}
            onPause={() => gravityStore.pauseGame()}
            onResume={() => gravityStore.resumeGame()}
            onRestart={() => gravityStore.restartGame()}
          />
          <div
            className="GravityModeLayout-main"
            ref={gameplayRef}
            style={{ minHeight: 'calc(100vh - 3rem)' }}
          >
            <GameplayView
              data={data}
              onMissed={(id) => gravityStore.missTerm(id, false)}
              onType={(v) => gravityStore.updateMainTypingPromptValue(v)}
              onGrade={() => gravityStore.gradeAnswer()}
              onCopyAnswer={(id, answer) => gravityStore.checkCopiedAnswer(id, answer)}
              onPlanetLoaded={(level) => gravityStore.markPlanetLoaded(level)}
              windowWidth={size.w || 800}
              windowHeight={size.h || 600}
            />

            {[
              GAME_STATES.INTRO,
              GAME_STATES.DIRECTIONS,
              GAME_STATES.OPTIONS,
              GAME_STATES.LOADING,
              GAME_STATES.ERROR_NO_AVAILABLE_TERMS,
            ].includes(data.gameState as never) ? (
              <StartView
                data={data}
                onStart={() => gravityStore.startGame()}
                onOptions={() => gravityStore.displayGameOptions()}
                onDirections={() => gravityStore.displayGameDirections()}
                onDifficultyChange={(d) => gravityStore.changeDifficultyLevel(d)}
                onSideChange={(s) => gravityStore.changeShowingSide(s)}
                onPartialChange={(b) => gravityStore.updateAlternateAnswerOption(b)}
              />
            ) : null}

            {data.gameState === GAME_STATES.GAME_OVER ? (
              <GameOverView
                points={data.points}
                level={data.level}
                best={best}
                onRestart={() => gravityStore.restartGame()}
                onNewSet={handleNewSet}
              />
            ) : null}

            {showBlocker ? <ScreenSizeBlocker isMobile={mobileBlocked} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
