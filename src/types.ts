export interface User {
  "name": string,
  "avatar": string,
  "event": string,
  "password": string
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
