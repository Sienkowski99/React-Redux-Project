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

const cors = require('cors');
const Year = require('./models/Year');
app.use(cors())

app.get('/', (req, res) => {
  User.find().then(result => console.log(result))
  res.send('Backed of Friends Schedule!')
})

app.post('/upload_avatar', upload.single('avatar'), (req, res) => {
  console.log("Someone wants to upload an avatar")
  console.log(req.body)
})

app.post('/get_year', (req, res) => {
  console.log(req.body)
  Year.find({year: req.body.year}).then(result => {
    console.log(result);
    res.send(result[0])
  }).catch(err=> {
    console.log(err);
    res.send(err)
  })
})

// const year2020 = new Year({
//   year: 2020,
//   months: [
//   {
//       name: "January",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "February",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       ],
//   },
//   {
//       name: "March",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "April",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       ],
//   },
//   {
//       name: "May",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "June",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       ],
//   },
//   {
//       name: "July",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "August",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "September",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       ],
//   },
//   {
//       name: "October",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
//   {
//       name: "November",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       ],
//   },
//   {
//       name: "December",
//       days: [
//       { day: 1, availablePeople: [] },
//       { day: 2, availablePeople: [] },
//       { day: 3, availablePeople: [] },
//       { day: 4, availablePeople: [] },
//       { day: 5, availablePeople: [] },
//       { day: 6, availablePeople: [] },
//       { day: 7, availablePeople: [] },
//       { day: 8, availablePeople: [] },
//       { day: 9, availablePeople: [] },
//       { day: 10, availablePeople: [] },
//       { day: 11, availablePeople: [] },
//       { day: 12, availablePeople: [] },
//       { day: 13, availablePeople: [] },
//       { day: 14, availablePeople: [] },
//       { day: 15, availablePeople: [] },
//       { day: 16, availablePeople: [] },
//       { day: 17, availablePeople: [] },
//       { day: 18, availablePeople: [] },
//       { day: 19, availablePeople: [] },
//       { day: 20, availablePeople: [] },
//       { day: 21, availablePeople: [] },
//       { day: 22, availablePeople: [] },
//       { day: 23, availablePeople: [] },
//       { day: 24, availablePeople: [] },
//       { day: 25, availablePeople: [] },
//       { day: 26, availablePeople: [] },
//       { day: 27, availablePeople: [] },
//       { day: 28, availablePeople: [] },
//       { day: 29, availablePeople: [] },
//       { day: 30, availablePeople: [] },
//       { day: 31, availablePeople: [] },
//       ],
//   },
// ],
// });
// year2020.save().
//   then(result => {
//     console.log(result)
//   })
//   .catch(err=>console.log(err))




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