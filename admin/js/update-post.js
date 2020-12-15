const urlParams = new URLSearchParams(window.location.search);
const currentContent = urlParams.get("id");
const postId = urlParams.get("id");

console.log(postId);

const tags = document.querySelectorAll(".tags");
console.log(tags);

window.onload = function () {
  fetchPost();
};

async function fetchPost() {
  try {
    let response = await fetch(`http://localhost:3000/posts/${postId}`);
    let data = await response.json();

    let postsHTML = "";
    console.log(data);

    document.getElementById("title").value = data.title;
    document.getElementById("author").value = data.author;
    document.getElementById("content").value = data.content;
    // postsHTML += `<li class="list-group-item">`;
    console.log(data.tags[0]);
    console.log(tags[0].value);
    console.log("-----");
    for (let tag of tags) {
      console.log(tag);
    }

    console.log(tags.every((e) => data.tags.includes(e)));
    // var str = post.content;
    // var res = str.substring(0, 99); //get first 100 chars

    // postsHTML += `<div>${data.title}</div>`;
    // postsHTML += `<div style="float: left">${data.author} | </div>`;
    // postsHTML += `<div>${data.date}</div>`;
    // postsHTML += `<div>${data.tags}</div>`;
    // postsHTML += `<div>${data.content}</div>`;
    // console.log(res.length);
    // if (res.length === 99)
    //   postsHTML += `<a href="post.html?id=${post["_id"]}">read more...</a>`;

    // postsHTML += `<div>`;
    // postsHTML += `<a href="update-post.html?id=${post["_id"]}&content=${post["content"]}">Update</a> | `;
    // postsHTML += `<a href="#" class="delete-post-btn" data-id="${post["_id"]}">Delete</a> `;
    // postsHTML += `</div>`;

    // postsHTML += `</li>`;

    for (let tag of tags)
      document.querySelector(".the-post").innerHTML = postsHTML;
  } catch (err) {
    console.error(err);
  }
}

// const postList = document.querySelector(".the-post");
