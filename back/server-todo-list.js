import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose'; //Sí se usa, en el la expresión evaluada con eval

import { Todo } from './modelDB.js';

const SERVER_CONFIG_URL = `http://localhost:3011/config` || process.env.SERVER_CONFIG_URL;


axios.get(SERVER_CONFIG_URL)
.then((res) => {
  const { url, config } = res.data;
  const { SERVER_DB_URL } = url;

  axios.get(SERVER_DB_URL+'/db')
  .then((res) => {
    
    const connect = eval(res.data.connect);

    const app = express();

    app.use(cors());  
    app.use(express.json());
    app.use(bodyParser.json());
    
    let tries = 0;
    
    const startServer = async () => {
      const isConnected = await connect(config.DB_URL);
      
      if (isConnected) {
        app.listen(config.PORT_SERVER, () => {
          console.log(`Back server running on port ${config.PORT_SERVER}`);
        });
      } else {
        console.log('Error connecting to database');
        if (tries < 5) {
          tries++;
          console.log('Retrying...');
          setTimeout(startServer, 5000);
        } else {
          console.log('Max retries reached');
        }
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
  })
  .catch((error) => {
    console.log(error);
  })
})
.catch((error) => {
  console.log(error);
})


