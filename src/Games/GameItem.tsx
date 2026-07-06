import { useNavigate } from "react-router";
import type { Game } from "../types"

interface GameInterface {
  game: Game
}

function GameItem({game}: GameInterface) {
  const navigate = useNavigate();

  function handlePlay() {
    navigate(`/game/${game.code}`);
  }

  return (
    <div className="game item">
      <div className="ui small image">
        <img src={game.icon} alt="game-icon" />
      </div>
      <div className="content">
        <div className="header"><b className="name">{game.name}</b></div>
        <div className="description">
          {game.description}
        </div>
        <div className="extra">
          <button
            type="button"
            className="play ui right floated secondary button inverted"
            onClick={handlePlay}
          >
            Play
            <i className="right chevron icon"></i>
          </button>

        </div>
      </div>
    </div>
  )
}

export default GameItem
