const express = require('express');
const bodyParser = require('body-parser');
const storage = require('node-persist');
const uuidV1 = require('uuid/v1');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
storage.initSync();

app.get('/todos', (req, res) => {
  const todos = storage.getItemSync('todos') || [];
  res.send(todos);
});

app.post('/todos', (req, res) => {
  const todo = Object.assign({}, req.body, { id: uuidV1() });
  const todos = storage.getItemSync('todos') || [];
  const newTodos = [...todos, todo];
  storage.setItemSync('todos', newTodos);
  res.send(newTodos);
});

console.log('listening in 3001');
app.listen(3001);
