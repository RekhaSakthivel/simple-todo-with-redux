import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from './features/todos/todosSlice'
import './App.css'

function App() {
  const todos= useSelector((state) => state.todos.items);
  console.log(todos);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const todoElements = todos.length> 0 && todos.map(todo => 
  <li key={todo.id}>
    {todo.title}
    <button className='delete-todo'>X</button>
  </li>
  )

  function handleAdd() {
    if(title.length>0){
      dispatch(addTodo(title));
      setTitle("");
    }
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
