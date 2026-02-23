import type { LoopGameAPI } from '../useLoopGame';

interface StagingProps {
  game: LoopGameAPI;
}

export default function Staging({ game }: StagingProps) {
  const { state, healAction, boostAction, initDraft } = game;
  const v = state.vessel;
  if (!v) return null;

  return (
    <div className="screen active" id="screen-staging">
      <div className="top-bar">
        <span className="top-bar-label">Phase 03</span>
        <span className="top-bar-phase" style={{ color: 'var(--success)' }}>Staging</span>
      </div>
      <div className="content-area">
        <div className="theology-line">Prepare for the descent.</div>

        <div className="staging-stat-row">
          <span className="staging-stat-label">Vessel</span>
          <span className="staging-stat-value" style={{ color: v.color }}>{v.name}</span>
        </div>
        <div className="staging-stat-row">
          <span className="staging-stat-label">Health</span>
          <span className="staging-stat-value" style={{ color: 'var(--success)' }}>
            {state.health} / {state.maxHealth}
          </span>
        </div>
        <div className="staging-stat-row" style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="staging-stat-label">Light</span>
            <span className="staging-stat-value" style={{ color: 'var(--light)' }}>{state.light}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="staging-stat-label">Dark</span>
            <span className="staging-stat-value" style={{ color: 'var(--dark)' }}>{state.dark}</span>
          </div>
        </div>
        <div className="staging-stat-row">
          <span className="staging-stat-label">Currency</span>
          <span className="staging-stat-value" style={{ color: 'var(--amber)' }}>{state.currency}</span>
        </div>

        <div className="section-label" style={{ marginTop: 8 }}>Actions</div>
        <div className="staging-action-row">
          <button
            className="staging-btn"
            disabled={state.health >= state.maxHealth || state.currency < 1}
            onClick={healAction}
          >
            Heal +3 HP
            <span className="cost">Cost: 1</span>
          </button>
          <button
            className="staging-btn"
            disabled={state.currency < 2}
            onClick={boostAction}
          >
            Boost +1 L/D
            <span className="cost">Cost: 2</span>
          </button>
        </div>
      </div>
      <div className="bottom-action">
        <button className="btn btn-go" onClick={initDraft}>Descend</button>
      </div>
    </div>
  );
}
