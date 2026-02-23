import type { LoopGameAPI } from '../useLoopGame';

interface DropProps {
  game: LoopGameAPI;
}

export default function Drop({ game }: DropProps) {
  const { state, resetGame } = game;
  const v = state.vessel;
  if (!v) return null;

  const survived = state.health > 0;

  return (
    <div className="screen active" id="screen-drop">
      <div className="top-bar">
        <span className="top-bar-label">Phase 07</span>
        <span className="top-bar-phase" style={{ color: 'var(--amber)' }}>Drop</span>
      </div>
      <div className="content-area">
        <div className="theology-line">
          {survived
            ? 'You reached the bottom. The record is written.'
            : 'The Depth claimed you. But the record remains.'}
        </div>
        <div className="section-label">Run Summary</div>
        <div className="drop-summary">
          <div className="drop-stat">
            <span className="drop-stat-label">Vessel</span>
            <span className="drop-stat-value" style={{ color: v.color }}>{v.name}</span>
          </div>
          <div className="drop-stat">
            <span className="drop-stat-label">Depth Reached</span>
            <span className="drop-stat-value">{state.depth} / {state.maxDepth}</span>
          </div>
          <div className="drop-stat">
            <span className="drop-stat-label">Points</span>
            <span className="drop-stat-value">{state.points}</span>
          </div>
          <div className="drop-stat">
            <span className="drop-stat-label">Final Parity</span>
            <span className="drop-stat-value">
              <span style={{ color: 'var(--light)' }}>{state.light}L</span>{' / '}
              <span style={{ color: 'var(--dark)' }}>{state.dark}D</span>
            </span>
          </div>
          <div className="drop-stat">
            <span className="drop-stat-label">Status</span>
            <span
              className="drop-stat-value"
              style={{ color: survived ? 'var(--success)' : 'var(--danger)' }}
            >
              {survived ? 'SURVIVED' : 'FALLEN'}
            </span>
          </div>
          <div className="drop-stat">
            <span className="drop-stat-label">Total Runs</span>
            <span className="drop-stat-value">{state.runs}</span>
          </div>
        </div>

        <div className="section-label" style={{ marginTop: 12 }}>Unlocked</div>
        <div>
          {state.points >= 10 && <span className="unlock-badge">+1 Currency</span>}
          {state.depth >= 3 && <span className="unlock-badge">Scar: Fragile</span>}
          {state.depth >= 5 && <span className="unlock-badge">Boon: Deep Memory</span>}
          {state.points < 10 && state.depth < 3 && (
            <span style={{ fontSize: 9, color: 'var(--dim)' }}>No new unlocks this run.</span>
          )}
        </div>
      </div>
      <div className="bottom-action">
        <button className="btn btn-primary" onClick={resetGame}>
          Return to Staging
        </button>
      </div>
    </div>
  );
}