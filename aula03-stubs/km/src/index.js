import Service from './service';

const data = {
  username: `luffy-${Date.now()}`,
  password: 'keypass',
};

const service = new Service({
  filename: './users.ndjson',
});

await service.create(data);

const users = await service.read();
console.log('users', users);
