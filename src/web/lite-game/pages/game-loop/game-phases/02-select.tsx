import type { LoopGameAPI } from '../useLoopGame';
import { vessels } from '../data';

interface SelectProps {
  game: LoopGameAPI;
}

export default function Select({ game }: SelectProps) {
  const { state, pickVessel, confirmVessel } = game;
  const selectedId = state.vessel?.id ?? null;

  return (
    <div className="screen active" id="screen-select">
      <div className="top-bar">
        <span className="top-bar-label">Phase 02</span>
        <span className="top-bar-phase" style={{ color: 'var(--light)' }}>Select</span>
      </div>
      <div className="content-area">
        <div className="theology-line">The fall was not an end. It was a beginning.</div>
        <div className="section-label">Choose Your Vessel</div>
        <div>
          {vessels.map((v) => (
            <div
              key={v.id}
              className={`vessel-card${selectedId === v.id ? ' selected' : ''}`}
              style={{ marginBottom: 8 }}
              onClick={() => pickVessel(v)}
            >
              <div className="vessel-sigil" style={{ color: v.color, borderColor: `${v.color}30` }}>
                {v.icon}
              </div>
              <div className="vessel-info">
                <div className="vessel-info-name" style={{ color: v.color }}>{v.name}</div>
                <div className="vessel-info-desc">{v.desc}</div>
                <div className="vessel-info-perk" style={{ color: v.color }}>{v.perk}</div>
                <div className="vessel-bias-bar">
                  <div className="vessel-bias-fill" style={{ width: `${v.lightBias}%`, background: 'var(--light)' }} />
                  <div className="vessel-bias-fill" style={{ width: `${v.darkBias}%`, background: 'var(--dark)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-action">
        <button
          className="btn btn-primary"
          disabled={!selectedId}
          onClick={confirmVessel}
        >
          Choose Vessel
        </button>
      </div>
    </div>
  );
}