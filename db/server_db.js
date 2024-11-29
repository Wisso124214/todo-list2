import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { connect } from './db-todo-list.js';

const info = { connect: connect.toString() }
const route = '/db';
const SERVER_CONFIG_URL = 'http://localhost:3011/config' || process.env.SERVER_CONFIG_URL;
let PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect(route);
});

app.get(route, (req, res) => {
  res.json(info)
});

axios.get(SERVER_CONFIG_URL)
.then((res) => {
  const { config } = res.data;
  PORT = config.PORT_DB;
})
.catch((error) => {
  console.log(error);
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`DB server running on port ${PORT}`);
  });
});