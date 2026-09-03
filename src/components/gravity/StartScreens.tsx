import { useState } from 'react';
import { DIFFICULTY, GAME_STATES } from '@/lib/gravity/constants';
import { STRINGS, format } from '@/lib/gravity/strings';
import type { Difficulty, Side } from '@/lib/gravity/constants';
import type { GameData } from '@/lib/gravity/types';

interface StartScreenProps {
  data: GameData;
  onStart: () => void;
  onOptions: () => void;
  onDirections: () => void;
}

/* ---------------- Splash (INTRO) ---------------- */
export function SplashView({ onStart }: { onStart: () => void }) {
  return (
    <div className="GravitySplashView">
      <h1 className="GravitySplashView-title">{STRINGS.splash.title}</h1>
      <p className="GravitySplashView-description">
        {STRINGS.splash.description}
      </p>
      <button
        className="UIButton UIButton--hero"
        aria-label={STRINGS.splash.start_button}
        onClick={onStart}
      >
        {STRINGS.splash.start_button}
      </button>
    </div>
  );
}

/* ---------------- Options ---------------- */
export function OptionsView({
  data,
  onDifficultyChange,
  onSideChange,
  onPartialChange,
  onNext,
}: {
  data: GameData;
  onDifficultyChange: (d: Difficulty) => void;
  onSideChange: (s: Side) => void;
  onPartialChange: (b: boolean) => void;
  onNext: () => void;
}) {
  const [showMultipleAnswersOption, setShowMultipleAnswersOption] = useState(false);
  const [acceptsPartialAnswer, setAcceptsPartialAnswer] = useState(
    data.acceptsPartialAnswer,
  );

  // The dropdown value is the ANSWER side; showing side is flipped
  const answerSideValue: 'word' | 'definition' | 'random' =
    data.showingTermSide === 'word'
      ? 'definition'
      : data.showingTermSide === 'definition'
        ? 'word'
        : 'random';

  const wordLabel =
    data.set.wordLang !== data.set.defLang
      ? data.set.wordLang
      : STRINGS.options.side_selector.term;
  const defLabel =
    data.set.wordLang !== data.set.defLang
      ? data.set.defLang
      : STRINGS.options.side_selector.definition;

  return (
    <div className="GravityUIModal">
      <div className="GravityUIModal-box">
        <div className="GravityUIModal-boxHeader">{STRINGS.options.title}</div>
        <div className="GravityOptionsView">
          <div className="GravityUIRow">
            <div className="GravityUIColumn">
              <fieldset className="GravityUIFieldset">
                <div className="GravityUIFieldset-legend">
                  {STRINGS.options.study_starred_selector.title}
                </div>
                <div className="GravityUIToggle">
                  <button
                    type="button"
                    className={`GravityUIToggle-option ${!data.selectedOnly ? 'is-selected' : ''}`}
                  >
                    {STRINGS.options.study_starred_selector.all}
                  </button>
                  <button
                    type="button"
                    className={`GravityUIToggle-option ${data.selectedOnly ? 'is-selected' : ''}`}
                    disabled
                    title="Star terms on the import screen"
                  >
                    {STRINGS.options.study_starred_selector.starred}
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="GravityUIColumn">
              <fieldset className="GravityUIFieldset">
                <div className="GravityUIFieldset-legend">
                  {STRINGS.options.side_selector.title}
                </div>
                <select
                  className="GravityUIDropdown"
                  value={answerSideValue}
                  disabled={data.hasPhotoOnlyDefinitions}
                  onChange={(e) => {
                    const v = e.target.value;
                    onSideChange(
                      v === 'word'
                        ? 'definition'
                        : v === 'definition'
                          ? 'word'
                          : 'random',
                    );
                  }}
                >
                  <option value="word">{wordLabel}</option>
                  <option value="definition">{defLabel}</option>
                  <option value="random">{STRINGS.options.side_selector.random}</option>
                </select>
              </fieldset>
            </div>
          </div>

          <div className="GravityOptionsView-row">
            <fieldset className="GravityUIFieldset">
              <div className="GravityUIFieldset-legend">
                {STRINGS.options.difficulty_selector.title}
              </div>
              <div
                className="GravityUIToggle"
                role="radiogroup"
                aria-label={STRINGS.options.difficulty_selector.title}
              >
                {(['BEGINNER', 'INTERMEDIATE', 'EXPERT'] as Difficulty[]).map(
                  (d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={data.difficultyLevel === d}
                      className={`GravityUIToggle-option ${data.difficultyLevel === d ? 'is-selected' : ''}`}
                      onClick={() => onDifficultyChange(d)}
                    >
                      {STRINGS.options.difficulty_selector[
                        d === DIFFICULTY.BEGINNER
                          ? 'easy'
                          : d === DIFFICULTY.INTERMEDIATE
                            ? 'medium'
                            : 'hard'
                      ]}
                    </button>
                  ),
                )}
              </div>
            </fieldset>
          </div>

          <div className="GravityOptionsView-row">
            {showMultipleAnswersOption ? (
              <div>
                <label className="GravityUICheckbox">
                  <input
                    type="checkbox"
                    checked={acceptsPartialAnswer}
                    onChange={() => {
                      const next = !acceptsPartialAnswer;
                      setAcceptsPartialAnswer(next);
                      onPartialChange(next);
                    }}
                  />
                  <span className="GravityUICheckbox-label">
                    {STRINGS.options.multiple_answers.label}
                  </span>
                </label>
                <div className="GravityUISmall">
                  {STRINGS.options.multiple_answers.description}
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="UILink"
                onClick={() => setShowMultipleAnswersOption(true)}
              >
                {STRINGS.options.multiple_answers.show_feedback_options}
              </button>
            )}
          </div>

          <div className="GravityOptionsView-nextButtonWrapper">
            <button
              className="UIButton UIButton--hero UIButton--fill"
              aria-label={STRINGS.options.next_button}
              onClick={onNext}
            >
              {STRINGS.options.next_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Directions ---------------- */
export function DirectionsView({ onStart }: { onStart: () => void }) {
  return (
    <div className="GravityUIModal">
      <div className="GravityUIModal-box">
        <div className="GravityDirectionsView">
          <div className="GravityDirectionsView-asteroidImage" />
          <div className="GravityDirectionsView-title">
            {STRINGS.directions.title}
          </div>
          {STRINGS.directions.body.map((p, i) => (
            <p key={i} className="GravityUIParagraph">
              {p}
            </p>
          ))}
          <div className="GravityDirectionsView-startButton">
            <button
              className="UIButton UIButton--hero"
              aria-label={STRINGS.directions.start_button}
              onClick={onStart}
            >
              {STRINGS.directions.start_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Error: no available terms ---------------- */
export function ErrorNoAvailableTermsView() {
  return (
    <div className="GravityUIModal">
      <div className="GravityUIModal-box">
        <div className="GravityErrorNoAvailableTermsView">
          <h2 className="GravityUIHeading">
            {STRINGS.error_no_available_terms.heading}
          </h2>
          <p className="GravityUIParagraph">
            {STRINGS.error_no_available_terms.message}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- StartView switch ---------------- */
export function StartView({
  data,
  onStart,
  onOptions,
  onDirections,
  onDifficultyChange,
  onSideChange,
  onPartialChange,
}: StartScreenProps) {
  return (
    <div className="GravityStartView">
      <div className="GravityStartView-backdrop" />
      {(() => {
        switch (data.gameState) {
          case GAME_STATES.INTRO:
            // splash start → options (original: displayGameOptions)
            return <SplashView onStart={onOptions} />;
          case GAME_STATES.OPTIONS:
            return (
              <OptionsView
                data={data}
                onDifficultyChange={onDifficultyChange}
                onSideChange={onSideChange}
                onPartialChange={onPartialChange}
                onNext={onDirections}
              />
            );
          case GAME_STATES.DIRECTIONS:
            // directions start → gameplay (original: startGame)
            return <DirectionsView onStart={onStart} />;
          case GAME_STATES.ERROR_NO_AVAILABLE_TERMS:
            return <ErrorNoAvailableTermsView />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

/* ---------------- Game over view ---------------- */
export function GameOverView({
  points,
  level,
  best,
  onRestart,
  onNewSet,
}: {
  points: number;
  level: number;
  best: number;
  onRestart: () => void;
  onNewSet: () => void;
}) {
  return (
    <div className="GravityUIModal">
      <div className="GravityUIModal-box">
        <div style={{ textAlign: 'center' }}>
          <h2 className="GravityUIHeading" style={{ fontSize: '1.875rem' }}>
            {STRINGS.game_over.title}
          </h2>
          <p className="GravityUIParagraph" style={{ fontSize: '1.125rem' }}>
            {format(STRINGS.game_over.score_label, { points, level })}
          </p>
          {points > best ? (
            <p
              style={{
                color: '#3ccfcf',
                fontWeight: 700,
                margin: '0 0 1.5rem',
              }}
            >
              {STRINGS.game_over.high_score_label}
            </p>
          ) : null}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}
          >
            <button className="UIButton UIButton--hero" onClick={onRestart}>
              {STRINGS.game_over.play_again_button}
            </button>
            <button className="UIButton UIButton--default" onClick={onNewSet}>
              {STRINGS.game_over.new_set_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
