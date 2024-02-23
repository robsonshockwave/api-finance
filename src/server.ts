import fastify from 'fastify';
import { knex } from './database';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
  //   const tables = await knex('sqlite_schema').select('*');

  const transaction = await knex('transactions')
    .where('amount', 500)
    .select('*');

  return transaction;
});

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3333');
});
