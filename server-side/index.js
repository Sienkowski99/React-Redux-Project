const express = require('express')
const app = express()

const port = 8080
const sha256 = require('js-sha256')
app.use(express.json());

const multer  = require('multer')


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
const Post = require('./models/Post');
const { replaceOne } = require('./models/User');

app.use(cors())

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

app.get('/', (req, res) => {
  res.send('Backed of Friends Schedule!')
})

app.post('/get_posts_from_year', (req, res) => {

  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }

  Post.find().then(result => {

    const to_send = result.filter(post => {
      const postDate = new Date(post.date)
      return postDate.getFullYear() === parseInt(req.body.year)
    })

    response_object.content = to_send
    response_object.msg = `Sending posts from year ${req.body.year}`
    response_object.statusCode = 200

    res.send(response_object)

  }).catch(err=>{
    response_object.statusCode = 400
    response_object.msg = "Error fetching posts"
    console.log(err);
    res.send(response_object)

  })
})

app.post('/remove_post', (req, res) => {

  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }

  Post.findOneAndDelete({id: req.body.id})
  .then(result => {

    console.log(result)
    response_object.msg = "OK"
    response_object.statusCode = 200
    res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 400
    res.send(response_object)

  })

})

app.post('/like_post', (req, res) => {

  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }

  Post.findOneAndUpdate({id: req.body.id}, {$inc: {"likes": 1}})
  .then(result=>{

    console.log(result)
    response_object.msg = "OK"
    response_object.statusCode = 200
    res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 400
    res.send(response_object)

  })
})

app.post('/dislike_post', (req, res) => {

  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }

  Post.findOneAndUpdate({id: req.body.id}, {$inc: {"dislikes": 1}})
  .then(result=>{

    console.log(result)
    response_object.msg = "OK"
    response_object.statusCode = 200
    res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 400
    res.send(response_object)

  })
})

app.post('/comment_post', (req, res) => {
  
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }

  const comment = {
    author: req.body.author,
    content: req.body.comment,
    id: uuidv4()
  }

  Post.findOneAndUpdate({id: req.body.id}, {$push: {"comments": comment}}, {new: true})
  .then(result=>{

    console.log(result)
    response_object.msg = "OK"
    response_object.statusCode = 200
    res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 400
    res.send(response_object)

  })
})

app.post('/add_post', (req, res) => {
  let response_object = {
    msg: null,
    content: null,
    statusCode: null
  }
  const newPost = new Post({
    date: req.body.date,
    author: req.body.user,
    content: req.body.message,
    likes: 0,
    dislikes: 0,
    comments: req.body.comments,
    id: uuidv4()
  })
  newPost.save()
  .then(result=>{

    console.log(result)
    response_object.msg = "OK"
    response_object.statusCode = 200
    res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    response_object.msg = "ERROR"
    response_object.statusCode = 400
    res.send(response_object)

  })
})

app.post('/register', (req, res) => {
  // console.log("body: "+req.body)
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
    return res.send(response_object)

  })
  .catch(err=>{

    console.log(err)
    res.send(err)

  })
})

app.post('/login', (req, res) => {

  let response_object = {
    msg: null,
    statusCode: null
  }

  User.find({login: req.body.login})
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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'assets/uploads')
  },
  filename: function (req, file, cb) {
      // You could rename the file name
      // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

      // You could use the original name
      cb(null, file.originalname)
  }
});


// const upload = multer({ 
//   dest: 'uploads/'
// })

var upload = multer({storage: storage})

const router = express.Router();

router.post("/upload_avatar", upload.single('photo'), (req, res, next) => {
  return res.json({
      image: req.file.path
  });
});
// router.post("/upload_avatar", upload.single('photo'), (req,res)=>{
//   console.log(req.file.path)
//   return res.json({
//     image: req.file.path
//   });
//   console.log(req.files)
//   res.send("OK")
// })

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})