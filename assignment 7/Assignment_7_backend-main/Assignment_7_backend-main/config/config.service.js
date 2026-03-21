
import {resolve} from 'node:path'
import {config} from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV

const envPath = {
    development : `.env.dev`,
    production :`.env.prod`
}

config({path:resolve(`./config/${envPath[NODE_ENV]}`)})

export const port = process.env.PORT ?? 7000
export const DB_URL = process.env.DB_URL
