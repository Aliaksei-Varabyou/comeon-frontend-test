import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { api } from "../api/client";
import type { Category, Game } from "../types";
import { ApiError } from "../api/ApiError";

export function useCasino() {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    async function getData() {
      setLoading(true)
      setError(null)
      try {
        const response: Game[] | undefined = await api.getGames()
        if (response) {
          setGames(response)
        }
        const response2: Category[] | undefined = await api.getCategories()
        if (response2) setCategories(response2)
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message)
        } else {
          setError('Server error')
        }
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  const filteredGames = useMemo(() => {
    let result = games
    if (currentCategory && currentCategory.id !== 0) {
      result = games.filter(game => game.categoryIds.includes(currentCategory.id))
    }
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(game => game.name.toLowerCase().indexOf(searchLower) !== -1 
        || game.description.toLowerCase().indexOf(searchLower) !== -1
      )
    }
    return result
  }, [games, currentCategory, search])

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function onCategoryClick(id: number) {
    setCurrentCategory(categories.find(category => category.id === id) || null)
  }

  return {
    games: filteredGames,
    categories,
    loading,
    error,
    search,
    currentCategory,
    onSearchChange,
    onCategoryClick,
  };
}