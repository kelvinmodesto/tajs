import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import { server } from '../src/api.js';

/*
 - Deve cadastrar usuarios e definir uma categoria onde:
        - Jovens Adultos:
            - Usuarios de 18-25
        - Adultos:
            - Usuarios de 26-50
        - Idosos:
            - 51+
        - Menor
            - Estoura um erro!
*/
describe('API  Users E2E Suite', () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once('error', (err) => reject(err));
      server.once('listening', () => resolve());
    });
  }

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`);
    return user.json();
  }

  let _testServer;
  let _testServerAddress;

  beforeAll(async () => {
    _testServer = server.listen();

    await waitForServerStatus(_testServer);

    const serverInfo = _testServer.address();
    _testServerAddress = `http://localhost:${serverInfo.port}`;
  });

  afterAll((done) => {
    server.closeAllConnections();
    _testServer.close(done);
  });

  it.todo('should register a new user with young-adult category');

  it.todo('should register a new user with adult category');
  it.todo('should register a new user with senior category');
  it.todo('should throw an error when registering a under-age user');
});
