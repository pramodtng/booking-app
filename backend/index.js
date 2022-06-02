import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/dummy", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

const postSchema = new mongoose.Schema({
    reason: String,
    room: String,
    notes: String,
    urgency: String,
    // dateTime: String
})
const Post = new mongoose.model("Post", postSchema)


const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const Admin = new mongoose.model("Admin", adminSchema)

Admin.insertMany([
    { username: 'Admin', password: "admin123"},
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});


//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (_err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

//Admin Login
app.post("/adminlogin", (req, res)=> {
    const { username, password} = req.body
    Admin.findOne({ username: username}, (_err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "Admin not found"})
        }
    })
}) 

app.get("/", (_req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((_err) => {
        res.status(500).json({ err: message });
      });
  });

app.get("/posts", (_req, res) => {
    Post.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((_err) => {
        res.status(500).json({ err: message });
      });
  });

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (_err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send({ message: "Please enter all the required details" })
                } else {
                    res.send( { message: "User successfully Registered, Please login now." })
                }
            })
        }
    })    
}) 
app.post("/posts", (req, res)=> {
    const { reason, room, notes, urgency} = req.body
    Post.findOne({room: room}, (_err, user) => {
        if(user){
            res.send({message: "Room is already booked. Please try another room"})
        } else {
            const user = new Post({
                reason,
                room,
                notes,
                urgency
                // dateTime
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Post successfully saved." })
                }
            })
        }
    })    
}) 


app.listen(9002,() => {
    console.log("BE started at port 9002")
})

