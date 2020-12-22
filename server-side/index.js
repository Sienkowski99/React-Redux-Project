const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Backed of Friends Schedule!')
})

app.post('/login', (req, res) => {
  res.send("You're trying to log in")
})

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})