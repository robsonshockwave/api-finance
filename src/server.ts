import fastify from 'fastify';
import crypto from 'node:crypto';
import { knex } from './database';

const app = fastify();

app.get('/hello', async () => {
  //   const tables = await knex('sqlite_schema').select('*');

  //   const transaction = await knex('transactions')
  //     .insert({
  //       id: crypto.randomUUID(),
  //       title: 'Transação de teste',
  //       amount: 1000,
  //     })
  //     .returning('*');

  const transaction = await knex('transactions')
    .where('amount', 500)
    .select('*');

  return transaction;
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333');
});
