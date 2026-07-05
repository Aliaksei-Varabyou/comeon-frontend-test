import type { ApiResponseType, ApiUser, Category, Game, LoginResponse, LogoutResponse, User } from "../types";
import { ApiError } from "./ApiError";

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/';

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
  login: async (data: ApiUser): Promise<User> => {
    const response = await client<LoginResponse>('login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response?.player;
  },
  logout: (username: string) => client<LogoutResponse>('logout', {
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
