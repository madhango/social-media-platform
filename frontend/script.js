const API = "http://localhost:5000/posts";

/* CREATE POST */

async function createPost(){

const username = document.getElementById("username").value;
const content = document.getElementById("content").value;
const tags = document.getElementById("tags").value;
const image = document.getElementById("image").files[0];

const formData = new FormData();

formData.append("username", username);
formData.append("content", content);
formData.append("tags", tags);
formData.append("image", image);

await fetch(API + "/create",{
method:"POST",
body:formData
});

loadPosts();

}


/* LOAD POSTS */

async function loadPosts(){

const res = await fetch(API);
const posts = await res.json();

const postDiv = document.getElementById("posts");

postDiv.innerHTML = "";

posts.forEach(post => {

postDiv.innerHTML += `

<div class="post">

<h3>${post.username}</h3>

<p>${post.content}</p>

<p><b>Tags:</b> ${post.tags.join(", ")}</p>

${post.image ? `<img src="http://localhost:5000/uploads/${post.image}" width="200">` : ""}

<br><br>

<button onclick="likePost('${post._id}')">
❤️ Like (${post.likes})
</button>

<button onclick="sharePost('${post._id}')">
🔗 Share
</button>

<br><br>

<input id="comment-${post._id}" placeholder="Write comment">

<button onclick="addComment('${post._id}')">Comment</button>

<div class="comments">

<b>Comments:</b>

${post.comments.map(c => `<p>• ${c}</p>`).join("")}

</div>

</div>

`;

});

}


/* LIKE POST */

async function likePost(id){

await fetch(API + "/like/" + id,{
method:"PUT"
});

loadPosts();

}


/* ADD COMMENT */

async function addComment(id){

const comment = document.getElementById("comment-" + id).value;

await fetch(API + "/comment/" + id,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
comment:comment
})

});

loadPosts();

}

function sharePost(id){

const link = window.location.href.replace("index.html","post.html?id=" + id);

navigator.clipboard.writeText(link);

alert("Post link copied!");

}

/* LOAD POSTS WHEN PAGE OPENS */

loadPosts();