import cors from 'cors'
import express from 'express'

import index from '@routes/index.route'
import raffle from '@routes/raffle.route'
import raffles from '@routes/raffles.route'

import { error } from '@middlewares/response.middleware'

const server = express()

server.set('json spaces', 4)

server.use(cors())
server.use(express.json({ limit: '25mb' }))
server.use(express.urlencoded({ limit: '25mb', extended: true }))

server.use('/', index)
server.use('/raffle', raffle)
server.use('/raffles', raffles)

server.use(error)

export default server
