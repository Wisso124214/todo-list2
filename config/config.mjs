import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  PROTOCOL: process.env.PROTOCOL || 'http',
  IP_SERVER: process.env.IP_SERVER || 'localhost',
  PORT_SERVER: process.env.PORT_SERVER || 3000,
  IP_DB: process.env.IP_DB || 'localhost',
  PORT_DB: process.env.PORT_DB || 3001,
  IP_FRONT: process.env.IP_FRONT || 'localhost',
  PORT_FRONT: process.env.PORT_FRONT || 3002,
  PORT_CONFIG: process.env.PORT_CONFIG || 3011,
  DB_URL: process.env.DB_URL,
};

const url = {
  SERVER_BACK_URL: `${config.PROTOCOL}://${config.IP_SERVER}:${config.PORT_SERVER}`,
  SERVER_DB_URL: `${config.PROTOCOL}://${config.IP_DB}:${config.PORT_DB}`,
  SERVER_FRONT_URL: `${config.PROTOCOL}://${config.IP_FRONT}:${config.PORT_FRONT}`,
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/config');
});

app.get('/config', (req, res) => {
  res.json({ config, url });
});

app.listen(config.PORT_CONFIG, () => {
  console.log(`Config server running on port ${config.PORT_CONFIG}`);
});
