import Task from "./Task";
import axios from 'axios';

import { SERVER_URL } from '../../config/config.mjs'


const TaskList = ({ data }) => {

  const { todos, setTodos, setUpdatingTodos, showDatePicker, showTimePicker } = data;

  const maxlength = 22;

  const removeTodo = (id) => {
    axios.delete(`${SERVER_URL}/todos/${id}`)
    setUpdatingTodos(true)
  };
  
  const splitSentence = (sentence) => {
    return sentence.split(' ').map((word, index) => {
      return splitWord(word, index)
    }).join(' ')
  }

  const splitWord = (word, index) => {
    let newWord = '';

    for (let i = 0; i < word.length; i++) {
      newWord += word[i];
      if (i % maxlength === 0 && i !== 0) {
        newWord += '- ';
      }
    }
    return newWord;
  }

  return(
    <div>
      {
        !showDatePicker && !showTimePicker &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          {todos.map((todo, index) => (
            <Task data={{ todo, setTodos, setUpdatingTodos, todos, index, removeTodo, splitSentence }} />
          ))}
        </div>
      }
    </div>
  )
}

export default TaskList;