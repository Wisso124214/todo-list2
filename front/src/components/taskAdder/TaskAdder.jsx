import { useState } from "react";
import CalendarIcon from "./CalendarIcon";
import PlusIcon from "./PlusIcon";
import TimeIcon from "./TimeIcon";
import dayjs from 'dayjs';
import axios from 'axios';

const TaskAdder = ({ data }) => {

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
  
  (async () => console.log('url', await getUrl()))()
  
  const { setUpdatingTodos, input, setInput, showDatePicker, setShowDatePicker, showTimePicker, setShowTimePicker } = data;

  const [limitDate, setLimitDate] = useState({})
  const [limitTime, setLimitTime] = useState({})

  const addTodo = () => {
    
    const date = dayjs()

    const thisLimitDate = 
      Object.keys(limitDate).length > 0 ? 
        limitDate : 
        {
          day: date.$D,
          month: date.$M+1,
          year: date.$y,
        }

    const thisLimitTime = Object.keys(limitTime).length > 0 ? 
      {
        ...limitTime,
      } : 
      {
        hour: 23,
        minute: 59,
      }

    const fullDate = {
      ...thisLimitDate,
      ...thisLimitTime,
    }

    const newTodo = {
      //Use id from MongoDB 
      description: input,
      limitDate: {
        ...fullDate, 
      },
      //Por los momentos funcionan como state, pero en el futuro se puede cambiar a un estado de "set", "delayed" o "completed"
      completed: false,
      delayed: false,
    };

    axios.post(`${url.SERVER_BACK_URL}/todos`, newTodo)

    if (input.trim()) {
      setUpdatingTodos(true)
      setInput('');
    }
    setLimitDate({})
    setLimitTime({})
  };

  return(
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <CalendarIcon data={{ showDatePicker, setShowDatePicker, setShowTimePicker, setLimitDate }} />
      <TimeIcon data={{ showTimePicker, setShowTimePicker, setShowDatePicker, setLimitTime }} />

      <input
        style={{
          padding: '10px',
          paddingLeft: '85px',
          fontSize: '16px',
          width: '300px',
          marginRight: '10px',
          borderRadius: '15px',
          fontFamily: 'monospace',
        }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        autoFocus
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />
      <PlusIcon data={{ addTodo }} />
    </div>
  )
}

export default TaskAdder;