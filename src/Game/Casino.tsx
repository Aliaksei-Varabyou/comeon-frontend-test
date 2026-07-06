import { useEffect, useState } from "react";
import Logout from "../Auth/Logout";
import Player from "./Player";
import type { Category, Game } from "../types";
import { api } from "../api/client";
import { ApiError } from "../api/ApiError";
import GameItem from "./GameItem";
import CategoryItem from "./CategoryItem";

function Casino() {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      setError(null)
      try {
        const response: Game[] | undefined = await api.getGames();
        if (response) setGames(response);
        const response2: Category[] | undefined = await api.getCategories();
        if (response2) setCategories(response2);
        setError('asfasfa asfasdfasdf asdf')
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message)
        } else {
          setError('Server error')
        }
      } finally {
        setLoading(false);
      }
    }

    getData()
  }, [])

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
            <input type="text" placeholder="Search Game" />
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
            {games.length === 0 && (
              <>games list is empty</>
            )}
            {games.map((game: Game) => {
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
              return <CategoryItem key={category.id} category={category} />
            })}
            {/* <!-- end category item template --> */}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Casino;
