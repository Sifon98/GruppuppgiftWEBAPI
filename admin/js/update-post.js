const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const form = document.querySelector(".update-post-form")

const tags = document.querySelectorAll(".tags");

window.onload = function () {
  fetchPost();
};

async function fetchPost() {
  try {
    let response = await fetch(`http://localhost:3000/posts/${postId}`);
    let data = await response.json();
 
    // Appends post data to inputs
    document.getElementById("title").value = data.title;
    document.getElementById("author").value = data.author;
    document.getElementById("content").value = data.content;

    // Appends post tags to tags list
    for(let i = 0; i < tags.length; i++) {
      for (let x = 0; x < data.tags.length; x++) {
        if(tags[i].value === data.tags[x]) {
          tags[i].selected = true;
        }
      }
    }

} catch (message) {
    throw new Error(message);
  }
}



form.addEventListener("submit", updatePost);

async function updatePost(e) {
  e.preventDefault();
  

  let formData = new FormData(this);


  let object = {
    // content: document.getElementById('content-textarea').value
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    tags: formData.getAll("tags"),
  };

  try {
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object), 
    });

    window.location.replace("index.html"); 
  } catch (message) {
    throw new Error(message);
  }
}
