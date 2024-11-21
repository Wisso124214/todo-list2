import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connect, Todo } from '../db/db-todo-list.js';
import { config } from '../front/src/config/config.mjs'

const app = express();

//comment

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const startServer = async () => {
  const isConnected = await connect(config.DB_URL);
  if (isConnected) {
    app.listen(config.PORT_SERVER, () => {
      console.log(`Server running on port ${config.PORT_SERVER}`);
    });
  } else {
    console.log('Error connecting to database');
  }
};

startServer();

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      ...req.body,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(402).json({ message: error.message });
    console.log(error);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { ...req.body, }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});