import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import z from 'zod'
 
export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms', {schema: {
        body: z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional()
        })
    }}, async ({ body }, reply) => {
        const { name, description } = body

        const result = await db.insert(schema.rooms).values({
            name,
            description: description || null
        }).returning()

        if (!result[0]) {
            throw new Error('Failed to create room')
        }

        return reply.status(201).send({ roomId: result[0].id })
    })
 }