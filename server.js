import {fastify} from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

// Request Body

server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body

    await database.create ({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send
})



server.get('/videos', async (request) => {

    const search = request.query.search

    const videos = await database.list(search)

    return videos
})


// Route Parameter = é um parametro que é enviado pela rota 
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
  port: process.env.PORT || 3000,
  host: '0.0.0.0'
}, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
})