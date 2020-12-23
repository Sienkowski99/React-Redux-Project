const express = require('express')
const app = express()
const port = 8080
const sha256 = require('js-sha256')
app.use(express.json());
const User = require('./models/User');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017/friends_schedule', {useNewUrlParser: true})
  .then(response => {
    console.log(`Connected to MongoDB`)
  })
  .catch(error => console.error('Error connecting to MongoDB', error));


app.get('/', (req, res) => {
  User.find().then(result => console.log(result))
  res.send('Backed of Friends Schedule!')
})

app.post('/register', (req, res) => {
  console.log("body: "+req.body)
  const newUser = new User({
    login: req.body.login,
    password: sha256(req.body.password),
    email: req.body.email,
    registrationDate: new Date(),
    friendsList: [],
    notifications: []
  })
  newUser.save().then(result => {return res.send({newUser: result})}).catch(err=>res.send(err))

  // res.send("You're trying to log in")
})

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})