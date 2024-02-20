import server from './server.js';
import Person from './person.js';

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT, () => {
    const { address, port } = server.address();
    console.log(`server is running at ${address}:${port}`);
  });
}

export default server;

/*
    curl \
    -i \
    -X POST \
    -H 'Content-Type: application/json' \
    -d '{
        "name": "Monkey D. Luffy",
        "cpf": "123.123.123-12"
    }' \
    http://localhost:3000/persons

*/
