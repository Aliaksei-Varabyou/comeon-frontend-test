import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function InGame() {
  const navigate = useNavigate();
  const { gameCode } = useParams<{ gameCode: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameCode) {
      setError("Game not found");
      return;
    }

    setError(null);

    try {
      window.comeon?.game.launch(gameCode);
    } catch {
      setError("Unable to load this game");
    }

    return () => {
      const container = document.getElementById("game-launch");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [gameCode]);

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="ingame">
      <div className="ui stackable grid centered">
        <div className="three wide column">
          <button
            type="button"
            className="ui right floated secondary button inverted"
            onClick={handleBack}
          >
            <i className="left chevron icon"></i>Back
          </button>
        </div>
        <div className="ten wide column">
          {error && (
            <div className="ui negative message" role="alert">
              <p>{error}</p>
            </div>
          )}
          <div id="game-launch"></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
}

export default InGame;
