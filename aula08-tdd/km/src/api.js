import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { createServer } from 'node:http';
const usersDb = [];

const server = createServer(async (request, response) => {
  response.end('hello world!');
});

export { server };
