import { describe, it, beforeAll, afterAll, expect, jest } from '@jest/globals';
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

  it('should register a new user with young-adult category', async () => {
    const expectedCategory = 'young-adult';
    // importante pois o ano que vem o teste pode quebrar
    // sempre que estiver usando datas, sempre mockar o tempo!
    jest.useFakeTimers({
      now: new Date('2024-03-23T00:00'),
    });

    const response = await createUser({
      name: 'Monkey D. Luffy',
      birthDay: '2000-03-23',
    });

    expect(response.status).toBe(201); // 201 - created
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });

  it('should register a new user with adult category', async () => {
    const expectedCategory = 'adult';
    jest.useFakeTimers({
      now: new Date('2024-03-23T00:00'),
    });

    const response = await createUser({
      name: 'Monkey D. Luffy',
      birthDay: '1991-03-23',
    });

    expect(response.status).toBe(201); // 201 - created
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });

  it('should register a new user with senior category', async () => {
    const expectedCategory = 'senior';
    jest.useFakeTimers({
      now: new Date('2024-03-23T00:00'),
    });

    const response = await createUser({
      name: 'Monkey D. Luffy',
      birthDay: '1947-03-23',
    });

    expect(response.status).toBe(201); // 201 - created
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });
  it('should throw an error when registering a under-age user', async () => {
    const response = await createUser({
      name: 'Monkey D. Luffy',
      birthDay: '2018-03-24',
    });

    expect(response.status).toBe(400); // 400 - bad request
    const result = await response.json();
    expect(result.message).toBe('User must be 18yo or older');
  });
});
