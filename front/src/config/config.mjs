export const config = {
  PORT_SERVER: 3010 || process.env.PORT,
  DB_URL: 'mongodb+srv://user2024:RGnZs5il1bxubcUi@cluster0.o7x9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true',
  PROTOCOL: 'http',
  IP_SERVER: 'localhost',
}

export const SERVER_URL = `${config.PROTOCOL}://${config.IP_SERVER}:${config.PORT_SERVER}`;