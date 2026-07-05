import type { ApiResponseType, Category, Game, User } from "../types";
import { ApiError } from "./ApiError";

const BASE_URL = import.meta.env.BASE_URL ?? 'http://localhost:3001/';

async function client<T>(path: string, options: RequestInit): Promise<T> {
  const headers: HeadersInit = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body || undefined
  })

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = data as ApiResponseType | null;
    const errorCode = error?.code !== undefined ? String(error.code) : undefined;
    throw new ApiError(
      error?.error || 'Request error',
      response.status,
      errorCode
    )
  }

  return data as T;
}

export const api = {
  login: (data: Pick<User, 'name' | 'password'>) => client<User>('login', {
    method: 'POST',
    body: JSON.stringify({
      username: data.name,
      password: data.password
    })
  }),
  logout: (username: string) => client<void>('logout', {
    method: 'POST',
    body: JSON.stringify({username})
  }),
  getGames: () => client<Game[]>('games', {
    method: 'GET'
  }),
  getCategories: () => client<Category[]>('categories', {
    method: 'GET'
  }),
}