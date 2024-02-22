import { Given, AfterAll } from '@cucumber/cucumber';
import sinon from 'sinon';
import { server } from '../src/api.js';

let _testServerAddress;
let _testServer;

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err));
    server.once('listening', () => resolve());
  });
}

AfterAll((done) => {
  sinon.restore();
  server.closeAllConnections();
  _testServer.close(done);
});

Given('I have a running server', async function () {
  _testServer = server.listen();

  await waitForServerStatus(server);

  const serverInfo = _testServer.address();
  this.testServerAddress = `http://localhost:${serverInfo.port}`;
});

Given('The current date is {string}', function (currrentDate) {
  sinon.restore();
  this.clock = sinon.useFakeTimers(new Date(currrentDate).getTime());
});
