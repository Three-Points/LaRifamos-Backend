import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config()
dotenvExpand.expand(env)

export const MODE = process.env.MODE || process.env.NODE_ENV
export const PORT = process.env.PORT
export const API_TOKEN = process.env.API_TOKEN
export const JWT_TOKEN = process.env.JWT_TOKEN

export const DB_URL = process.env.DB_URL
export const SERVER_URL = process.env.SERVER_URL
