import React, { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

export default function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([])

  const url = "http://localhost:8081"

  const fetchTodos = async () => {
    const res = await axios.get(`${url}/todos`)
    setTodos(res.data)
  }

  const addTodo = async () => {
    if (task.trim() === "") {
      alert("Please enter a task")
      return
    }

    await axios.post(`${url}/todos/add`, {
      task: task,
    })

    setTask("")
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${url}/todos/delete/${id}`)
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="container">
      <h2>Todo App MERN</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-item" key={todo._id}>
            <span>{todo.task}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}