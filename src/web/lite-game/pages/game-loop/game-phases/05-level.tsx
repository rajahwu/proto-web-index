import { useEffect, useRef, useCallback } from 'react';
import type { LoopGameAPI } from '../useLoopGame';
import { levelNames, levelTypes } from '../data';

interface LevelProps {
  game: LoopGameAPI;
}

export default function Level({ game }: LevelProps) {
  const { state, tapCell, lightRandom, clearCell, applyVesselBonus, goTo, startTimer, stopTimer } = game;
  const randomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasStartedRef = useRef(false);

  const hpPercent = (state.health / state.maxHealth) * 100;
  const depthLabel = `Depth ${state.depth}`;
  const levelTitle = levelNames[state.depth - 1] ?? `Depth ${state.depth}`;
  const levelType = levelTypes[state.depth - 1] ?? 'Encounter';
  const timerUrgent = state.levelTimeLeft <= 30;

  // Kick off the first random after mount
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startTimer();
      randomTimerRef.current = setTimeout(lightRandom, 500);
    }
    return () => {
      stopTimer();
      if (randomTimerRef.current) clearTimeout(randomTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch for level ending conditions
  useEffect(() => {
    if (!state.levelActive && hasStartedRef.current) {
      stopTimer();
      if (state.tapsHit >= state.tapsNeeded) {
        // Completed
        applyVesselBonus();
        const t = setTimeout(() => goTo('door'), 600);
        return () => clearTimeout(t);
      } else if (state.health <= 0) {
        // Dead
        const t = setTimeout(() => goTo('drop'), 600);
        return () => clearTimeout(t);
      } else if (state.levelTimeLeft <= 0) {
        // Timeout
        applyVesselBonus();
        const t = setTimeout(() => goTo('door'), 400);
        return () => clearTimeout(t);
      }
    }
  }, [state.levelActive, state.tapsHit, state.tapsNeeded, state.health, state.levelTimeLeft, applyVesselBonus, goTo, stopTimer]);

  const handleTap = useCallback(
    (index: number) => {
      if (!state.levelActive) return;
      tapCell(index);
      // On hit → schedule next random; on miss → clear cell after delay
      if (index === state.litCellIndex) {
        randomTimerRef.current = setTimeout(lightRandom, 300);
      } else {
        setTimeout(() => clearCell(index), 200);
      }
    },
    [state.levelActive, state.litCellIndex, tapCell, lightRandom, clearCell],
  );

  const cellSymbol = (cellState: string, _cellType: string | null) => {
    if (cellState === 'lit') return '✦';
    if (cellState === 'dark-lit') return '◆';
    if (cellState === 'hit') return '✓';
    if (cellState === 'miss') return '✗';
    return '';
  };

  return (
    <div className="screen active" id="screen-level">
      <div className="top-bar">
        <div>
          <span className="top-bar-label">{depthLabel}</span>
          <span className="top-bar-phase" style={{ color: 'var(--danger)' }}>{levelTitle}</span>
        </div>
        <div className="parity-display">
          <span><span className="parity-dot light" /><span>{state.light}</span></span>
          <span><span className="parity-dot dark" /><span>{state.dark}</span></span>
        </div>
      </div>

      {/* Timer */}
      <div className="timer-bar">
        <div
          className={`timer-fill${timerUrgent ? ' urgent' : ''}`}
          style={{ width: `${Math.max(0, state.levelTimeLeft)}%` }}
        />
      </div>

      {/* HUD */}
      <div className="hud-bar" style={{ padding: '4px 16px' }}>
        <div className="hud-item">
          <span className="hud-label">HP</span>
          <div className="health-bar-container" style={{ width: 80 }}>
            <div className="health-bar">
              <div
                className={`health-fill${hpPercent <= 30 ? ' low' : ''}`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">PTS</span>
          <span className="hud-value">{state.points}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Depth</span>
          <div className="depth-meter">
            {Array.from({ length: state.maxDepth }, (_, i) => {
              const d = i + 1;
              const cls =
                d < state.depth ? 'depth-pip reached' : d === state.depth ? 'depth-pip current' : 'depth-pip';
              return <div key={d} className={cls} />;
            })}
          </div>
        </div>
      </div>

      {/* Game area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 16px 16px' }}>
        <div className="level-header">
          <div className="level-type-tag">{levelType}</div>
        </div>
        <div className="game-slot">
          <div className="tap-area">
            {state.tapGrid.map((cell, i) => (
              <div
                key={i}
                className={`tap-cell${cell.state === 'lit' ? ' lit' : ''}${cell.state === 'dark-lit' ? ' dark-lit' : ''}${cell.state === 'hit' ? ' hit' : ''}${cell.state === 'miss' ? ' miss' : ''}`}
                onClick={() => handleTap(i)}
              >
                {cellSymbol(cell.state, cell.type)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}