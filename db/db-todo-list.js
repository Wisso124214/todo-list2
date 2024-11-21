import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
  description: String,
  limitDate: {
    day: Number,
    month: Number,
    year: Number,
    hour: Number,
    minute: Number,
  },
  completed: Boolean,
  delayed: Boolean,
});

export const Todo = mongoose.model('Todo', todoSchema);

export const connect = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL).then(() => {
      console.log(`Connected to the database`);
    })
    .catch((error) => {
      console.log('Error connecting to the database: ', error);
    });
    console.log('Database connected');
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    return false;
  }
}