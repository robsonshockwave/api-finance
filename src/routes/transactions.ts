import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import crypto from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request, response) => {
    const transactions = await knex('transactions').select();

    return {
      transactions,
    };
  });

  app.get('/:id', async (request, response) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex('transactions').where('id', id).first();

    return {
      transaction,
    };
  });

  app.post('/', async (request, response) => {
    //   const tables = await knex('sqlite_schema').select('*');

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'debit' ? -1 * amount : amount,
    });

    return response.status(201).send();
  });
}
