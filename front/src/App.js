import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import TaskAdder from './components/taskAdder/TaskAdder';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskList from './components/taskList/TaskList';
import axios from 'axios';

import { SERVER_URL } from './config/config.mjs'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [updatingTodos, setUpdatingTodos] = useState(true);

  useEffect(() => {
    setInterval(() => {
      
      if (!todos.length) return;

      axios.get(`${SERVER_URL}/todos`)
      .then((res) => {
        const newTodos = res.data;
      //const newTodos = JSON.parse(JSON.stringify(todos));

      if (!newTodos) return;
      newTodos.forEach((todo) => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const currentDay = date.getDate();
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();

        if (
          todo.limitDate.year < currentYear ||
          (todo.limitDate.year === currentYear &&
            todo.limitDate.month < currentMonth) ||
          (todo.limitDate.year === currentYear &&
            todo.limitDate.month === currentMonth &&
            todo.limitDate.day < currentDay) ||
          (todo.limitDate.year === currentYear &&
            todo.limitDate.month === currentMonth &&
            todo.limitDate.day === currentDay &&
            todo.limitDate.hour < currentHour) ||
          (todo.limitDate.year === currentYear &&
            todo.limitDate.month === currentMonth &&
            todo.limitDate.day === currentDay &&
            todo.limitDate.hour === currentHour &&
            todo.limitDate.minute < currentMinute)
        ) {
          axios.put(`${SERVER_URL}/todos/` + todo._id, {
            ...todo,
            delayed: true,
          });
        } else {
          axios.put(`${SERVER_URL}/todos/` + todo._id, {
            ...todo,
            delayed: false,
          });
        }
      })})
    }, 1000);
  }, [])

  useEffect(()=>{

    if (updatingTodos) {
      setUpdatingTodos(false);

      axios.get(`${SERVER_URL}/todos`)
      .then((res) => {
        const newTodos = res.data;

        setTodos(
          newTodos.sort((a, b) => {
            if (a.completed === b.completed) {
              if (a.completed) {
                // Ordenar solo por fecha descendente si completed es true
                if (a.limitDate.year === b.limitDate.year) {
                  if (a.limitDate.month === b.limitDate.month) {
                    if (a.limitDate.day === b.limitDate.day) {
                      if (a.limitDate.hour === b.limitDate.hour) {
                        return b.limitDate.minute - a.limitDate.minute;
                      }
                      return b.limitDate.hour - a.limitDate.hour;
                    }
                    return b.limitDate.day - a.limitDate.day;
                  }
                  return b.limitDate.month - a.limitDate.month;
                }
                return b.limitDate.year - a.limitDate.year;
              } else {
                // Ordenar por delayed y luego por fecha ascendente si completed es false
                if (a.delayed === b.delayed) {
                  if (a.limitDate.year === b.limitDate.year) {
                    if (a.limitDate.month === b.limitDate.month) {
                      if (a.limitDate.day === b.limitDate.day) {
                        if (a.limitDate.hour === b.limitDate.hour) {
                          return a.limitDate.minute - b.limitDate.minute;
                        }
                        return a.limitDate.hour - b.limitDate.hour;
                      }
                      return a.limitDate.day - b.limitDate.day;
                    }
                    return a.limitDate.month - b.limitDate.month;
                  }
                  return a.limitDate.year - b.limitDate.year;
                }
                return b.delayed ? 1 : -1;
              }}
            return a.completed ? 1 : -1;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, [todos, updatingTodos]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <html
        style={{
          backgroundColor: '#222222',
          minHeight: '120vh',
          margin: '0',
        }}
      >
        <Header />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '100px',
          }}
        >
          <TaskAdder 
            data={{ 
              todos,
              setTodos,
              setUpdatingTodos,
              input, 
              setInput, 
              showDatePicker, 
              setShowDatePicker,
              showTimePicker,
              setShowTimePicker,
            }} />

          <TaskList 
            data={{ 
              todos,
              setTodos,
              setUpdatingTodos,
              showDatePicker, 
              showTimePicker,
            }} />
        </div>
      </html>
    </ThemeProvider>
  );
}

export default App;
