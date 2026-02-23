import type { LoopGameAPI } from '../useLoopGame';

interface TitleProps {
  game: LoopGameAPI;
}

export default function Title({ game }: TitleProps) {
  return (
    <div className="screen active" id="screen-title">
      <div className="title-center">
        <div className="title-sub">FORENSIC ARCHIVE</div>
        <div className="title-logo">Sinerine</div>
        <div className="title-sub">THE DUDAEL DROP</div>
        <div className="title-version">V-00 // PROTOTYPE</div>
      </div>
      <div className="bottom-action">
        <button className="btn btn-primary" onClick={() => game.goTo('select')}>
          Enter
        </button>
      </div>
    </div>
  );
}