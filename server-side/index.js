const express = require('express')
const app = express()

const port = 8080
const sha256 = require('js-sha256')
app.use(express.json());

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const User = require('./models/User');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017/friends_schedule', {useNewUrlParser: true})
  .then(response => {
    console.log(`Connected to MongoDB`)
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  User.find().then(result => console.log(result))
  res.send('Backed of Friends Schedule!')
})

app.post('/upload_avatar', upload.single('avatar'), (req, res) => {
  console.log("Someone wants to upload an avatar")
  console.log(req.body)
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
  let response_object = {
    msg: null,
    statusCode: null
  }
  newUser.save().
  then(result => {
    console.log(result)
    response_object.msg = "Now you have to log in"
    response_object.statusCode = 200
    console.log("User ha been added");
    return res.send(response_object)
  })
  .catch(err=>res.send(err))
})

app.post('/login', (req, res) => {
  //in body: login, password
  console.log(req.body)
  // const newUser = new User({
  //   login: req.body.login,
  //   password: sha256(req.body.password),
  //   email: req.body.email,
  //   registrationDate: new Date(),
  //   friendsList: [],
  //   notifications: []
  // })
  let response_object = {
    msg: null,
    statusCode: null
  }

  User.find({
    login: req.body.login
  })
  .then(result => {
    console.log(result);
    if (result.length) {
      if (result[0].password === sha256(req.body.password)) {
        response_object.msg = "User exists and password is valid"
        response_object.statusCode = 200
      } else {
        response_object.msg = "Password is incorrect"
        response_object.statusCode = 402
      }
    } else {
      response_object.msg = "User not in database"
      response_object.statusCode = 401
    }
    console.log(response_object)
    res.send(response_object)
  })
  .catch(err => {
    console.log(err);
    res.send("An error has ocurred");
  })
})

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})