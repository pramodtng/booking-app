import express, { application } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/dummy",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  reason: String,
  room: String,
  urgency: String,
  date: Date,
  time: String,
  notes: String,
  status: String,
});
const Post = new mongoose.model("Post", postSchema);

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const Admin = new mongoose.model("Admin", adminSchema);

//User login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, (_err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

//Admin Login
app.post("/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Admin.findOne({ username: username }, (_err, admin) => {
    if (admin) {
      if (password === admin.password) {
        res.send({ message: "Login Successfull", admin: admin });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "Admin not found" });
    }
  });
});

app.get("/", (_req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((_err) => {
      res.status(500).json({ err: message });
    });
});


//Get all the posts
app.get("/getposts", (_req, res) => {
  Post.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((_err) => {
      res.status(500).json({ err: message });
    });
});

app.get('/getposts/:id', (function(req, res) {
  let id = req.params.id;
  Post.findById(id, function(err, todo) {
      res.json(todo);
  });
}));

//Register the user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (_err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send({ message: "Please enter all the required details" });
        } else {
          res.send({
            message: "User successfully Registered, Please login now.",
          });
        }
      });
    }
  });
});

//Save the post
app.post("/posts", (req, res) => {
  const { reason, room, date, time, urgency, notes, status } = req.body;
  Post.findOne({ room: room }, (_err, user) => {
    if (user) {
      res.send({ message: "Room is already booked. Please try another room" });
    } else {
      const user = new Post({
        reason,
        room,
        urgency,
        date,
        time,
        notes,
        status,
      });
      user.save((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ message: "Post successfully saved." });
        }
      });
    }
  });
});


app.route("/update-status/:id").post(function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (!post)
      return next(new Error("Unable To Find post With This Id"));
    else {
      post.status = req.body.status;
      post
        .save()
        .then((emp) => {
          res.json("Status Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Status");
        });
    }
  });
});



//Delete the posts
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id

  await Post.findByIdAndRemove(id).exec();
  res.send('Post Deleted')
})

//Update the post status
app.patch('/update-status/:id', async (req,res) => {
  const updatedStatus = await Post.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
    })
  try{
      res.status(200).json({
          status : 'Success',
          data : {
            updatedStatus
          }
        })
  }catch(err){
      console.log(err)
  }
})


app.listen(5500, () => {
  console.log("BE started at port 5000");
});
