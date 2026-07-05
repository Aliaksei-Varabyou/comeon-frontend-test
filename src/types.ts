export interface User {
  "name": string,
  "avatar": string,
  "event": string,
}

export interface ApiUser {
  "username": string,
  "password": string
}

export interface Game {
  "name": string,
  "description": string,
  "code": string,
  "icon": string,
  "categoryIds": number[]
}

export interface Category {
  "id": number,
  "name": string
}

export interface ApiResponseType {
  error: string,
  code?: number
}

export interface LoginResponse {
  status: 'success',
  player: User
}

export interface LogoutResponse {
  status: 'success',
}

export interface ApiErrorResponse {
  status: 'fail',
  error: string,
  code?: number,
}
