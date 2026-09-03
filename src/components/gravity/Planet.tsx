import { memo, useEffect, useRef } from 'react';
import {
  GAME_STATES,
  PLANET_COUNT,
  shouldShowPlanet,
  planetLevelFor,
} from '@/lib/gravity/constants';

interface Props {
  currentLevel: number;
  planetLevel: number;
  gameState: string;
  windowHeight: number;
  windowWidth: number;
  src?: string;
  onLoaded?: (level: number) => void;
}

const TRANSITION = 'all 500ms ease-in';

/** Position/scale per relative level — exact values from GravityPlanet.getAnimation */
function getTransform(
  currentLevel: number,
  planetLevel: number,
  windowHeight: number,
  windowWidth: number,
): { x: number; y: number; scale: number } {
  const cur = planetLevelFor(currentLevel);
  if (planetLevel === cur) {
    return { x: -0.5 * windowWidth, y: windowHeight - 300, scale: 1 };
  }
  if (planetLevel === planetLevelFor(currentLevel + 1)) {
    return { x: 0.7 * windowWidth, y: 0.1 * windowHeight, scale: 0.05 };
  }
  if (planetLevel === planetLevelFor(currentLevel + 2)) {
    return { x: 0.9 * windowWidth, y: 0.08 * windowHeight, scale: 0.02 };
  }
  return { x: 9999, y: -1200, scale: 1 };
}

function PlanetBase({
  currentLevel,
  planetLevel,
  gameState,
  windowHeight,
  windowWidth,
  src,
  onLoaded,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const size = 2 * windowWidth;

  const isSplashState =
    gameState === GAME_STATES.INTRO ||
    gameState === GAME_STATES.OPTIONS ||
    gameState === GAME_STATES.DIRECTIONS ||
    gameState === GAME_STATES.LOADING ||
    gameState === GAME_STATES.GAME_OVER;

  const hidden = isSplashState || !shouldShowPlanet(currentLevel, planetLevel);

  // level 1 placeholder shown behind planets 1 and 2 at levels 1–2
  const isPlaceholder =
    (currentLevel === 1 || currentLevel === 2) && planetLevel === 1;

  const cls = [
    'GravityPlanet',
    hidden ? 'is-hidden' : '',
    isPlaceholder ? 'GravityPlanet--level1Placeholder' : '',
    !isPlaceholder ? `GravityPlanet--level${planetLevel}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const { x, y, scale } = getTransform(
    currentLevel,
    planetLevel,
    windowHeight,
    windowWidth,
  );

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) onLoaded?.(planetLevel);
  }, [onLoaded, planetLevel]);

  // Original hides planets >3 on level 1 splash states
  if (currentLevel === 1 && isSplashState && planetLevel > 3) return null;

  return (
    <div
      key={`planet${planetLevel}`}
      className={cls}
      style={{
        height: size,
        width: size,
        transform: `translate(${x}px, ${y}px) scale(${scale}, ${scale})`,
        transition: TRANSITION,
      }}
    >
      {src ? (
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="GravityPlanet--preload"
          onLoad={() => onLoaded?.(planetLevel)}
        />
      ) : null}
    </div>
  );
}

export const Planet = memo(PlanetBase);

export function Planets(props: {
  currentLevel: number;
  gameState: string;
  windowHeight: number;
  windowWidth: number;
  planetAssetPaths: Record<number, string>;
  onLoaded: (level: number) => void;
}) {
  return (
    <>
      {Array.from({ length: PLANET_COUNT }, (_, i) => i + 1).map((level) => (
        <Planet
          key={level}
          currentLevel={props.currentLevel}
          planetLevel={level}
          gameState={props.gameState}
          windowHeight={props.windowHeight}
          windowWidth={props.windowWidth}
          src={props.planetAssetPaths[level]}
          onLoaded={props.onLoaded}
        />
      ))}
    </>
  );
}
