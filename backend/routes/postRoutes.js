const express = require("express");
const router = express.Router();
const multer = require("multer");

const Post = require("../models/Post");

/* Multer storage */

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null,"uploads/");
},

filename: function(req,file,cb){
cb(null, Date.now() + "-" + file.originalname);
}

});

const upload = multer({ storage });

/* CREATE POST */

router.post("/create", upload.single("image"), async (req,res)=>{

try{

const tags = req.body.tags ? req.body.tags.split(",") : [];

const post = new Post({

username: req.body.username,
content: req.body.content,
tags: tags,
image: req.file ? req.file.filename : ""

});

await post.save();

res.json(post);

}
catch(err){

console.log(err);
res.status(500).json({error:"Post failed"});

}

});

/* GET POSTS */

router.get("/", async (req,res)=>{

const posts = await Post.find();
res.json(posts);

});

/* GET SINGLE POST */

router.get("/:id", async (req,res)=>{

const post = await Post.findById(req.params.id);

res.json(post);

});

/* LIKE */

router.put("/like/:id", async (req,res)=>{

const post = await Post.findById(req.params.id);

post.likes++;

await post.save();

res.json(post);

});

/* COMMENT */

router.post("/comment/:id", async (req,res)=>{

const post = await Post.findById(req.params.id);

post.comments.push(req.body.comment);

await post.save();

res.json(post);

});

module.exports = router;