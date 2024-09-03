import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { query } from './db';
import { getCache, setCache } from './cache';

const SKINPORT_API_URL = 'https://api.skinport.com/v1/items';
const CACHE_TTL = 60 * 1000; // 1 минута

async function routes(fastify: FastifyInstance) {
  
  // Эндпоинт HelloWorld!
  fastify.get('/', async (request, reply) => {
    return 'Hello World!';
  });

  // Эндпоинт для получения предметов с минимальными ценами
  fastify.get('/items', async (request, reply) => {
    const { page, offset } = request.query as { page: number, offset: number };
    
    const cacheKey = `items+${request.ip+page+offset}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
        const { data } = await axios.get(SKINPORT_API_URL, {
            params: {
              app_id: 730, // Например, CS:GO
              currency: 'USD'
            }
          });
          
          // Пагинация
          const startIndex = (page - 1) * offset;
          const endIndex = page * offset;

          const paginatedItems = data.slice(startIndex, endIndex).map((item: any) => ({
            name: item.market_hash_name,
            currency: item.currency,
            suggested_price: item.suggested_price,
            min_price: item.min_price,
            max_price: item.max_price,
            non_tradable_price: item.median_price
          }));
    
          setCache(cacheKey, paginatedItems, CACHE_TTL);

      return paginatedItems;
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch items from Skinport API' });
    }
  });

  // Эндпоинт для списания баланса
  fastify.post('/purchase', async (request, reply) => {
    const { userId, amount } = request.body as { userId: number, amount: number };

    try {
      const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
      
      if (result.rows.length === 0) {
        return reply.status(404).send({ error: 'User not found' });
      }

      const user = result.rows[0];
      
      if (user.balance < amount) {
        return reply.status(400).send({ error: 'Insufficient balance' });
      }

      await query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, userId]);

      return reply.send({ success: true });
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to update balance' });
    }
  });
}

export default routes;
