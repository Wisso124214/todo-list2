import Task from "./Task";
import axios from 'axios';

const TaskList = ({ data }) => {
  
  const SERVER_CONFIG_URL = `http://localhost:3011/config` || process.env.SERVER_CONFIG_URL;

  const getUrl = async () => {
    let url = ''

    await axios.get(SERVER_CONFIG_URL)
    .then((res) => {
      url = res.data.url;
      return url
    })
    return url;
  }
  const url = getUrl();
  
  
  const { todos, setTodos, setUpdatingTodos, showDatePicker, showTimePicker } = data;

  const maxlength = 22;

  const removeTodo = (id) => {
    axios.delete(`${url.SERVER_BACK_URL}/todos/${id}`)
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