import { memo } from 'react';
import { GAME_STATES } from '@/lib/gravity/constants';
import { STRINGS, format } from '@/lib/gravity/strings';
import { formatNumber } from '@/lib/gravity/formatNumber';

/* ---------------- Sidebar / mobile controls (ModeControls) ---------------- */

interface ControlsProps {
  gameState: string;
  points: number;
  level: number;
  setPathLabel: string;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

function ModeControlsBase({
  gameState,
  points,
  level,
  setPathLabel,
  onPause,
  onResume,
  onRestart,
}: ControlsProps) {
  const isPaused = gameState === GAME_STATES.PAUSED;
  const pauseDisabled = gameState === GAME_STATES.COPY_ANSWER;
  const pauseHandler = isPaused ? onResume : onPause;

  return (
    <>
      <div className="GravityModeLayout-sidebar">
        <div className="GravityModeLayout-sidebarTitle">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="5" fill="#3ccfcf" />
            <circle cx="5" cy="7" r="1.6" fill="#ff725b" />
            <circle cx="19" cy="16" r="1.2" fill="#fff" />
          </svg>
          {STRINGS.study_mode_name}
        </div>

        <div className="GravityModeControls-stat">
          <span className="GravityModeControls-label">
            {STRINGS.sidebar.score_label}
          </span>
          <span className="GravityModeControls-value">
            {formatNumber(points)}
          </span>
        </div>
        <div className="GravityModeControls-stat">
          <span className="GravityModeControls-label">
            {STRINGS.sidebar.level_label}
          </span>
          <span className="GravityModeControls-value">{level}</span>
        </div>

        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
          <button
            className="UIButton UIButton--hero UIButton--fill"
            disabled={pauseDisabled}
            onClick={pauseHandler}
          >
            {isPaused
              ? STRINGS.sidebar.resume_button
              : STRINGS.sidebar.pause_button}
          </button>
          <div className="GravityModeControls-restartButton">
            <button className="UILink" onClick={onRestart}>
              {STRINGS.sidebar.restart_button}
            </button>
          </div>
        </div>
      </div>

      <div className="GravityMobileControlsBar">
        <div className="GravityMobileControlsBar-stats">
          <div className="GravityMobileControlsBar-stat">
            <span className="GravityModeControls-label">
              {STRINGS.sidebar.score_label}
            </span>
            <span className="GravityMobileControlsBar-statValue">
              {formatNumber(points)}
            </span>
          </div>
          <div className="GravityMobileControlsBar-stat">
            <span className="GravityModeControls-label">
              {STRINGS.sidebar.level_label}
            </span>
            <span className="GravityMobileControlsBar-statValue">{level}</span>
          </div>
        </div>
        <div className="GravityMobileControlsBar-actions">
          <button
            className="UILink"
            disabled={pauseDisabled}
            onClick={pauseHandler}
            aria-label={isPaused ? STRINGS.sidebar.resume_button : STRINGS.sidebar.pause_button}
          >
            {isPaused ? '▶' : '❚❚'}
          </button>
          <button
            className="UILink"
            onClick={onRestart}
            aria-label={STRINGS.sidebar.restart_button}
          >
            ⟳
          </button>
        </div>
      </div>
    </>
  );
}

export const ModeControls = memo(ModeControlsBase);

/* ---------------- Screen size blocker ---------------- */
export function ScreenSizeBlocker({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="GravityScreenSizeBlocker">
      <div className="GravityScreenSizeBlocker-icon">
        <div className="UIIcon">{isMobile ? '📱' : '⤢'}</div>
      </div>
      <div className="GravityScreenSizeBlocker-content">
        {isMobile ? STRINGS.mobile_blocker : STRINGS.desktop_blocker}
      </div>
    </div>
  );
}

/* ---------------- Site header ---------------- */
export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="GravitySiteHeader">
      <div className="GravitySiteHeader-logo">
        <span className="GravitySiteHeader-logoMark">Q</span>
        <span>Quizlet</span>
      </div>
      <div className="GravitySiteHeader-setTitle">{title}</div>
    </header>
  );
}

export { format };
