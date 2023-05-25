const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//model for user
const userModel = mongoose.model("user", userSchema);

//api's
app.get("/", (req, res) => {
  res.send("server is running");
});

//sign up api
app.post("/signup", async (req, res) => {
  console.log(req.body);
  // check email is available in database or not
  const { email } = req.body; //extract email from req.body

  userModel.findOne({ email: email }, (err, result) => {
    console.log(result);
    console.log(err);
    // when email is available then if loop is executed
    if (result) {
      res.send({ message: "Email id is already register", alert: false }); // alert:false set because data is already available in database so its never redirect to login.
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true }); // add true because data is signed up
    }
  });
});

// login api
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email } = req.body; //extract email from req.body
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const datasend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(datasend)
      res.send({ message: "Successfully Login", alert: true, data:datasend });
    }
    else{
      res.send({ message: "Email is not registered, Sign up for login", alert: false });
    }
  });
});


//product section 
const productSchema = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String
});

//model
const productModel = mongoose.model("product", productSchema);

//save product in database
//api for uploadProduct
app.post('/uploadProduct',async(req, res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save() 
    res.send({message : "Upload Successfully"})
})

//api for get categories data
app.get("/product", async (req, res)=>{
  const data = await productModel.find({})
    res.send(JSON.stringify(data))
})


// server is running
app.listen(PORT, () => console.log(`server is running at port : ${PORT}`));
