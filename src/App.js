import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddToDo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevToDos => {
      return [...prevToDos, { id: Math.random(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function toggleToDo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearToDos() {
    const newTodos = todos.filter(todo => !todo.complete) 
    setTodos(newTodos)
  }

  return (
    <>
    <ToDoList todos={todos} toggleToDo={toggleToDo}/>
    <TextField inputRef={todoNameRef}></TextField>
    <Button variant="contained" onClick={handleAddToDo}>Add To Do</Button>
    <Button variant="outlined" onClick={handleClearToDos}>Clear Completed</Button>
    <InputLabel>{todos.filter(todo => !todo.complete).length} left to do</InputLabel>
    </>
  )
}

export default App;
