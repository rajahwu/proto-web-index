export default function CodexHomePage() {
  return (
    <div className="lite-game-home-container">
      <h1>Welcome to the Lite Game!</h1>
      <p>Embark on a thrilling adventure where you choose your path and face exciting challenges. Are you ready to test your skills and make your mark in the world of the Lite Game?</p>
      <button onClick={() => window.location.href = '/codex/lore'}>Read Lore</button>
      <button onClick={() => window.location.href = '/lite-game/title-start'}>Start Your Journey</button>
    </div>
  );
}
