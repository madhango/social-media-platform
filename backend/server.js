const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.static("../frontend"));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/socialMediaDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5000, ()=>{
console.log("Server running on port 5000");
});