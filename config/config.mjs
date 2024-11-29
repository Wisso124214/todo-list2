import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const config = {
  PORT_SERVER: 3010,
  PORT_DB: 3012,
  PORT_FRONT: 3013,
  PORT_CONFIG: 3011,

  IP_SERVER: 'localhost',
  IP_DB: 'localhost',
  IP_FRONT: 'localhost',
  IP_CONFIG: 'localhost',
  
  DB_URL: 'mongodb+srv://user2024:RGnZs5il1bxubcUi@cluster0.o7x9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true',
  PROTOCOL: 'http',
}

const url = {
  SERVER_BACK_URL: `${config.PROTOCOL}://${config.IP_SERVER}:${config.PORT_SERVER}`,
  SERVER_DB_URL: `${config.PROTOCOL}://${config.IP_DB}:${config.PORT_DB}`,
  SERVER_FRONT_URL: `${config.PROTOCOL}://${config.IP_FRONT}:${config.PORT_FRONT}`,
}


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