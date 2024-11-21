import axios from 'axios'

const Task = ({ data }) => {
  
  const { todo, setTodos, setUpdatingTodos, todos, index, removeTodo, splitSentence } = data;

  return(
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'monospace',
          color: 'black',
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '300px',
            padding: '10px',
            paddingBottom: '25px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            marginBottom: '15px',          
          }}
        >
          <input 
            type="checkbox" 
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            checked={todo.completed}
            onChange={(e) => {
              setTodos(todos.map((item, i) => {
                if (i === index) {
                  return {
                    ...item,
                    completed: !item.completed,
                  };
                }
                return item;
              }));

              axios.put(`${SERVER_URL}/todos/${todo._id}`, {
                ...todo,
                completed: !todo.completed
              })

              setUpdatingTodos(true)
            }}
          />

          <div
            style={{
              maxWidth: '200px',
              marginLeft: '10px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'black',
            }}
          >{splitSentence(todo.description)}</div>
          <div
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              paddingTop: '2px',
            }} 
            onClick={() => removeTodo(todo._id)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
        </div>

        <div
          style={{
            marginLeft: '5px',
            position: 'relative',
            fontSize: '10px',
            width: 0,
            height: 0,
            bottom: 35,
            fontWeight: 'bold',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : '#222',
            left: 20,
          }}
        >
          {`${todo.limitDate.day}/${todo.limitDate.month}/${todo.limitDate.year}`}
        </div>
        
        <div
          style={{
            marginLeft: '5px',
            position: 'relative',
            fontSize: '10px',
            width: 0,
            height: 0,
            bottom: 35,
            fontWeight: 'bold',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : '#222',
            left: 240,
          }}
        >
          {`${todo.limitDate.hour < 10 ? '0' + todo.limitDate.hour : todo.limitDate.hour}:${todo.limitDate.minute < 10 ? '0' + todo.limitDate.minute : todo.limitDate.minute}`}
        </div>
      </div>
      {
        todo.delayed && !todo.completed &&
        <div
          style={{
            marginLeft: '15px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            top: -7,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill-rule="evenodd" clip-rule="evenodd"
              fill="red" ></path></svg>
        </div>
      }
    </div>
  )
}

export default Task;