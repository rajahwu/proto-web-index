import type { LoopGameAPI } from '../useLoopGame';

interface DoorProps {
  game: LoopGameAPI;
}

export default function Door({ game }: DoorProps) {
  const { state, chooseDoor, goTo } = game;

  const lightReq = state.depth + 1;
  const darkReq = state.depth + 1;
  const secretReq = state.depth * 2;
  const canLight = state.light >= lightReq;
  const canDark = state.dark >= darkReq;
  const canSecret = state.light + state.dark >= secretReq;
  const noDoorsOpen = !canLight && !canDark && !canSecret;

  return (
    <div className="screen active" id="screen-door">
      <div className="top-bar">
        <div>
          <span className="top-bar-label">Phase 06</span>
          <span className="top-bar-phase" style={{ color: 'var(--neutral)' }}>Door</span>
        </div>
        <div className="parity-display">
          <span><span className="parity-dot light" /><span>{state.light}</span></span>
          <span><span className="parity-dot dark" /><span>{state.dark}</span></span>
        </div>
      </div>
      <div className="content-area">
        <div className="theology-line">Each door leads forward. Only some are open to you.</div>
        <div className="section-label">Available Paths — Depth {state.depth + 1}</div>

        {/* Light door */}
        <div
          className={`door-option${canLight ? '' : ' locked'}`}
          style={{ marginBottom: 8, ...(canLight ? { borderColor: 'var(--light)30' } : {}) }}
          onClick={() => canLight && chooseDoor('light')}
        >
          <div className="door-option-name" style={{ color: 'var(--light)' }}>Path of Light</div>
          <div className="door-option-desc">A corridor of sanctified luminescence</div>
          <div className="door-cost">
            Requires: <span className="required" style={{ color: 'var(--light)' }}>{lightReq} Light</span>{' '}
            {canLight ? '✓' : '— locked'}
          </div>
        </div>

        {/* Dark door */}
        <div
          className={`door-option${canDark ? '' : ' locked'}`}
          style={{ marginBottom: 8, ...(canDark ? { borderColor: 'var(--dark)30' } : {}) }}
          onClick={() => canDark && chooseDoor('dark')}
        >
          <div className="door-option-name" style={{ color: 'var(--dark)' }}>Path of Shadow</div>
          <div className="door-option-desc">A passage shrouded in twilight</div>
          <div className="door-cost">
            Requires: <span className="required" style={{ color: 'var(--dark)' }}>{darkReq} Dark</span>{' '}
            {canDark ? '✓' : '— locked'}
          </div>
        </div>

        {/* Secret door */}
        <div
          className={`door-option${canSecret ? '' : ' locked'}`}
          style={{ marginBottom: 8, ...(canSecret ? { borderColor: 'var(--amber)30' } : {}) }}
          onClick={() => canSecret && chooseDoor('secret')}
        >
          <div className="door-option-name" style={{ color: 'var(--amber)' }}>Secret Door</div>
          <div className="door-option-desc">Requires mastery of both paths</div>
          <div className="door-cost">
            Requires: <span className="required" style={{ color: 'var(--amber)' }}>{secretReq} Combined</span>{' '}
            {canSecret ? '✓' : '— locked'}
          </div>
        </div>

        {noDoorsOpen && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <button className="btn btn-danger" onClick={() => goTo('drop')}>
              No doors open — Drop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

