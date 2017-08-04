import express from 'express';
import fs from 'fs';
import { startCase } from 'lodash';

const users = [];

fs.readFile('./data/users.json', { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;

  JSON.parse(data).forEach((user) => {
    const { name } = user;

    name.full = startCase(`${name.first} ${name.last}`);
    users.push(user);
  });
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const buffer = users.reduce((buffer, user) => (
    buffer + `<a href="${user.username}">${user.name.full}<br/></a>`
  ), '');

  res.send(buffer);
});

app.get(/big.*./, (req, res, next) => {
  console.log('BIG USER ACCESS');
  next();
});

app.get('/:username', (req, res) => {
  const username = req.params.username;

  res.send(username);
});

app.listen(PORT, () => console.log(`Express is listening at ${PORT}`));
