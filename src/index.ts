import Fastify from 'fastify';
import routes from './routes';
import * as dotenv from 'dotenv';

dotenv.config();

const server = Fastify();

server.register(routes);

const port = parseInt(process.env.PORT || '3000');
const host = process.env.HOST || '127.0.0.1';

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
