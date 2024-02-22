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
