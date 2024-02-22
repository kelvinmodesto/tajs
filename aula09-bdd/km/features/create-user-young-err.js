import { BeforeStep, When, Then, Given } from '@cucumber/cucumber';
import assert from 'node:assert';

let _testServerAddress = '';
let _context = {};

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

BeforeStep(function () {
  _testServerAddress = this.testServerAddress;
});

When(
  `I create a young user with the following details:`,
  async function (table) {
    const [data] = table.hashes();
    const response = await createUser(data);
    assert.strictEqual(response.status, 400);

    _context.userData = await response.json();

    assert.ok(_context.userData.id);
  }
);
Then(
  'I should receive an error message that the user must be at least 18 years old',
  async function () {}
);
