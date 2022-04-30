const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let toDoList = []

app.get('/', (req, res) => {
  res.send('<h1>To Do List</h1>')
})

app.get('/todos', (req, res) => {
  res.json(toDoList)
})

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params
  const { complete } = req.body

  toDoList.map(toDo => {
    if (toDo.id === id) {
      toDo.complete = complete
    }
    return null
  })

  res.status(200).send('Modificado exitosamente')
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  const newToDos = toDoList.filter(todo => todo.id !== id)

  toDoList = newToDos

  res.status(200).send('Tarea eliminada exitosamente!')
})

app.post('/todos', (req, res) => {
  const {
    task,
    description,
    important,
    complete
  } = req.body

  if (!task || !description) {
    console.log('Complete todos los campos')
    console.log(req.body)
  }

  const date = new Date().toDateString()

  const newTask = {
    id: uuidv4(),
    task,
    description,
    important: important || false,
    complete: complete || false,
    date
  }

  toDoList = [
    ...toDoList,
    newTask
  ]

  res
    .status(201)
    .send('Tarea creada exitosamente')
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
