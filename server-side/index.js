const express = require('express')
const app = express()

const port = 8080
const sha256 = require('js-sha256')
app.use(express.json());

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const User = require('./models/User');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid')
mongoose
  .connect('mongodb://127.0.0.1:27017/friends_schedule', {useNewUrlParser: true})
  .then(response => {
    console.log(`Connected to MongoDB`)
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

const cors = require('cors');
const Year = require('./models/Year');
const Post = require('./models/Post')

app.use(cors())

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

app.get('/', (req, res) => {
  res.send('Backed of Friends Schedule!')
})

// app.post('/upload_avatar', upload.single('avatar'), (req, res) => {
//   console.log("Someone wants to upload an avatar")
//   console.log(req.body)
// })

app.post('/get_year', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  Post.find().then(result => {
    console.log(result)
  }).catch(err => console.log(err))
  console.log(req.body)
  Year.find({year: req.body.year}).then(result => {
    console.log(result);
    if (result.length) {
      response_object.msg = "OK"
      response_object.content = result[0]
      response_object.statusCode = 200
      res.send(response_object)
    } else {
      response_object.msg = "Year not found"
      response_object.content = []
      response_object.statusCode = 401
      res.send(response_object)
    }
  }).catch(err=> {
    console.log(err);
    res.send(err)
  })
})

app.post('/get_year_posts', (req, res) => {
  console.log(req.body)
  Post.find().then(result => {
    const to_send = result.filter(post => post.id.getFullYear() === req.body.year)
    res.send(to_send)
  }).catch(err=>{
    console.log(err);
    res.send(err)
  })
})

app.post('/remove_post', (req, res) => {
  console.log(req.body.post_id)
  Post.findByIdAndDelete({id: req.body.post_id}).then(result => {
    console.log(result);
  }).catch(err=>{console.log(err);})
  res.send("gituwa")
})

app.post('/like_post', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  console.log(req.body)
  Post.findOneAndUpdate({id: req.body.id}, {$inc: {"likes": 1}}).then(result=>{
    console.log(result)
  }).catch(err=>console.log(err))
  const query = `months.${months.indexOf(req.body.month)}.days.${req.body.day-1}.availablePeople.$[post].likes`
  Year.findOneAndUpdate({year: req.body.year}, {$inc: {[query]: 1}}, {"arrayFilters": [{ "post.id": req.body.post_id }]})
  .then(result => {
    console.log(result)
    if (result.year === req.body.year) {
      // Year.findOneAndUpdate()

      response_object.msg = "OK"
      response_object.content = result
      response_object.statusCode = 200
      res.send(response_object)
    } else {
      response_object.msg = "Year not found"
      response_object.statusCode = 400
      res.send(response_object)
    }
  })
  .catch(err => {
    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 404
    res.send(response_object)
  })
})

app.post('/dislike_post', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  console.log(req.body)
  const query = `months.${months.indexOf(req.body.month)}.days.${req.body.day-1}.availablePeople.$[post].dislikes`
  Year.findOneAndUpdate({year: req.body.year}, {$inc: {[query]: 1}}, {"arrayFilters": [{ "post.id": req.body.post_id }]})
  .then(result => {
    console.log(result)
    if (result.year === req.body.year) {
      // Year.findOneAndUpdate()

      response_object.msg = "OK"
      response_object.content = result
      response_object.statusCode = 200
      res.send(response_object)
    } else {
      response_object.msg = "Year not found"
      response_object.statusCode = 400
      res.send(response_object)
    }
  })
  .catch(err => {
    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 404
    res.send(response_object)
  })
})

app.post('/comment_post', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  console.log(req.body)
  const query = `months.${months.indexOf(req.body.month)}.days.${req.body.day-1}.availablePeople.$[post].comments`
  const comment = {
    author: req.body.author,
    content: req.body.comment
  }
  Year.findOneAndUpdate({year: req.body.year}, {$push: {[query]: comment}}, {"arrayFilters": [{ "post.id": req.body.post_id }]})
  .then(result => {
    console.log(result)
    if (result.year === req.body.year) {
      // Year.findOneAndUpdate()

      response_object.msg = "OK"
      response_object.content = result
      response_object.statusCode = 200
      res.send(response_object)
    } else {
      response_object.msg = "Year not found"
      response_object.statusCode = 400
      res.send(response_object)
    }
  })
  .catch(err => {
    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 404
    res.send(response_object)
  })
})

app.post('/add_term', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  console.log("add ing new term to the database")
  console.log(req.body)
  const req_date = new Date(req.body.date)
  const u = uuidv4()
  const post = {
        date: req_date,
        author: req.body.user,
        content: req.body.text,
        likes: 0,
        dislikes: 0,
        comments: [],
        id: u
  }
  const newPost = new Post({
    date: req_date,
    author: req.body.user,
    content: req.body.text,
    likes: 0,
    dislikes: 0,
    comments: [],
    id: u
  })
  newPost.save()
  const query = `months.${req_date.getMonth()}.days.${req_date.getDate()-1}.availablePeople`
  Year.findOneAndUpdate({year: req_date.getFullYear()}, {$push: {[query]: post}}, {new: true})
  .then(result => {
    console.log(result)
    if (result.year === req_date.getFullYear()) {
      // Year.findOneAndUpdate()

      response_object.msg = "OK"
      response_object.content = result
      response_object.statusCode = 200
      res.send(response_object)
    } else {
      response_object.msg = "Year not found"
      response_object.statusCode = 400
      res.send(response_object)
    }
  })
  .catch(err => {
    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 404
    res.send(response_object)
  })
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