import { useState } from 'react';
import type { LoopGameAPI } from '../useLoopGame';

interface DraftProps {
  game: LoopGameAPI;
}

export default function Draft({ game }: DraftProps) {
  const { state, pickCard, startLevel } = game;
  const [pickedIds, setPickedIds] = useState<Set<string>>(new Set());

  const handlePick = (pool: 'light' | 'dark', index: number) => {
    if (state.draftPicked >= state.draftMax) return;
    const key = `${pool}-${index}`;
    if (pickedIds.has(key)) return;
    pickCard(pool, index);
    setPickedIds((prev) => new Set(prev).add(key));
  };

  const draftDone = state.draftPicked >= state.draftMax;

  return (
    <div className="screen active" id="screen-draft">
      <div className="top-bar">
        <div>
          <span className="top-bar-label">Phase 04</span>
          <span className="top-bar-phase" style={{ color: 'var(--dark)' }}> Draft</span>
        </div>
        <div className="parity-display">
          <span><span className="parity-dot light" /><span>{state.light}</span></span>
          <span><span className="parity-dot dark" /><span>{state.dark}</span></span>
        </div>
      </div>
      <div className="content-area">
        <div className="theology-line">The Keepers present their offerings.</div>

        {/* Light keeper */}
        <div className="keeper-section">
          <div className="keeper-header">
            <span className="keeper-name" style={{ color: 'var(--light)' }}>The Surveyor</span>
            <span className="keeper-tag" style={{ borderColor: 'var(--light)40', color: 'var(--light)' }}>Light</span>
          </div>
          {state.draftPool.light.map((card, i) => {
            const key = `light-${i}`;
            const isPicked = pickedIds.has(key);
            return (
              <div
                key={key}
                className={`draft-card${isPicked ? ' picked' : ''}`}
                onClick={() => handlePick('light', i)}
              >
                <span className="draft-card-name">{card.name}</span>
                <span className="draft-card-effect" style={{ color: 'var(--light)' }}>{card.effect}</span>
              </div>
            );
          })}
        </div>

        {/* Dark keeper */}
        <div className="keeper-section">
          <div className="keeper-header">
            <span className="keeper-name" style={{ color: 'var(--dark)' }}>The Smuggler</span>
            <span className="keeper-tag" style={{ borderColor: 'var(--dark)40', color: 'var(--dark)' }}>Dark</span>
          </div>
          {state.draftPool.dark.map((card, i) => {
            const key = `dark-${i}`;
            const isPicked = pickedIds.has(key);
            return (
              <div
                key={key}
                className={`draft-card${isPicked ? ' picked' : ''}`}
                onClick={() => handlePick('dark', i)}
              >
                <span className="draft-card-name">{card.name}</span>
                <span className="draft-card-effect" style={{ color: 'var(--dark)' }}>{card.effect}</span>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', fontSize: 8, color: 'var(--dim)', marginTop: 4 }}>
          Pick {state.draftMax} cards
        </div>
      </div>
      <div className="bottom-action">
        <button
          className="btn btn-primary"
          disabled={!draftDone}
          onClick={startLevel}
        >
          Enter the Depth
        </button>
      </div>
    </div>
  );
}
