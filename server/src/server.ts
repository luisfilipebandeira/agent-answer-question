import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';
import { env } from './env.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createRoomsRoute } from './http/routes/create-room.ts';
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';
import fastifyMultipart from '@fastify/multipart';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.register(fastifyMultipart)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/health', () => {
  return 'OK';
});

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});