import Logout from "../Auth/Logout";
import Player from "../Game/Player";
import type { Category, Game } from "../types";
import GameItem from "./GameItem";
import CategoryItem from "./CategoryItem";
import { useCasino } from "./useCasino";

function Casino() {
  const {
    games: filteredGames,
    categories,
    loading,
    error,
    search,
    currentCategory,
    onSearchChange,
    onCategoryClick,
  } = useCasino();

  if (loading) {
    return (
      <div>...Loading</div>
    )
  }

  return (
    <div className="casino">
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">
            <Player />
          </div>
          <Logout />
        </div>
        <div className="four wide column">
          <div className="search ui small icon input ">
            <input
              type="text"
              placeholder="Search Game"
              value={search}
              onChange={onSearchChange}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      {error && (
        <div className="ui negative message" role="alert">
          <p>{error}</p>
        </div>
      )}
      <div className="ui grid">
        <div className="twelve wide column">
          <h3 className="ui dividing header">Games</h3>

          <div className="ui relaxed divided game items links">

            {/* <!-- game item template --> */}
            {filteredGames.length === 0 && (
              <>games list is empty</>
            )}
            {filteredGames.map((game: Game) => {
              return <GameItem key={game.code} game={game} />
            })}
            {/* <!-- end game item template --> */}

          </div>
        </div>
        <div className="four wide column">
          <h3 className="ui dividing header">Categories</h3>

          <div className="ui selection animated list category items">

            {/* <!-- category item template --> */}
            {categories.length === 0 && (
              <>---</>
            )}
            {categories.map((category: Category) => {
              return (
                <CategoryItem
                  key={category.id}
                  category={category}
                  active={currentCategory?.id === category.id}
                  onClick={() => onCategoryClick(category.id)}
                />
              )
            })}
            {/* <!-- end category item template --> */}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Casino;
