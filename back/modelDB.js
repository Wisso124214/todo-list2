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