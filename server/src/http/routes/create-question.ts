import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import z from 'zod'
 
export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms/:roomId/questions', {schema: {
        params: z.object({
            roomId: z.string()
        }),
        body: z.object({
            question: z.string().min(1, 'Question is required'),
        })
    }}, async (request, reply) => {
        const { question } = request.body

        const result = await db.insert(schema.questions).values({
            roomId: request.params.roomId,
            question,
        }).returning()

        if (!result[0]) {
            throw new Error('Failed to create room')
        }

        return reply.status(201).send({ roomId: result[0].id })
    })
 }