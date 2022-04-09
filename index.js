const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json())

let toDoList = [
  {
    id: uuidv4(),
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
    complete: false
  },
]

app.get('/', (req, res) => {
  res.send('<h1>To Do List</h1>')
})

app.get('/todos', (req, res) => {
  res.json(toDoList)
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
  }

  const newTask = {
    id: uuidv4(),
    task,
    description,
    important: important || false,
    complete: complete || false,
  }

  // toDoList.push(newTask)
  toDoList = [
    ...toDoList,
    newTask
  ]
  res.status(201).end()
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});