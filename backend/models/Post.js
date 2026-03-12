const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

username:String,

content:String,

image:String,

tags:[String],

likes:{
type:Number,
default:0
},

comments:[String]

});

module.exports = mongoose.model("Post",PostSchema);