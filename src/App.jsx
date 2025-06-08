import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import { fetchTodos, addTodoAsync, toggleTodoAsync, deleteTodoAsync } from './features/todos/todosSlice'

function App() {
  const {items: todos, status, error}= useSelector((state) => state.todos);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  const todoElements = todos.map(todo => 
    <li key={todo.id} className="todo-list-item">
      <span style={{textDecoration: todo.is_complete ? 'line-through' : 'none', cursor:'pointer'}} onClick={() => handleToggle(todo)}>{todo.title}</span>
      <button className='delete-todo' onClick={() => dispatch(deleteTodoAsync(todo.id))}>X</button>
    </li>
  )

  function handleAdd() {
    if(title.length>0){
      dispatch(addTodoAsync(title));
      setTitle("");
    }
  }

  function handleToggle(todo) {
    dispatch(toggleTodoAsync(todo));
    console.log(todos)
  }

  return (
    <main className='todo-main'>
      <h2 className='title'>Todo App</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter a todo'/>
      <button onClick={handleAdd}>Add</button>
      <ul className='todo-list'>
        {todoElements}
      </ul>
    </main>
  )
}

export default App
