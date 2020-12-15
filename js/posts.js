// const { deepStrictEqual } = require("assert");
// const { stderr } = require("process");

window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    let response = await fetch("http://localhost:3000/posts");
    let data = await response.json();

    let postsHTML = "";
    for (let post of data.reverse()) {
      console.log(post);
      postsHTML += `<li class="list-group-item">`;

      var str = post.content;
      var res = str.substring(0, 99); //get first 100 chars

      postsHTML += `<div>${post.title}</div>`;
      postsHTML += `<div style="float: left">${post.author} | </div>`;
      postsHTML += `<div>${post.date}</div>`;
      postsHTML += `<div>${post.tags}</div>`;
      postsHTML += `<div>${res}</div>`;
      console.log(res.length);
      if (res.length === 99)
        postsHTML += `<a href="post.html?id=${post["_id"]}">read more...</a>`;

      postsHTML += `<div>`;
      // postsHTML += `<a href="update-post.html?id=${post["_id"]}&content=${post["content"]}">Update</a> | `;
      // postsHTML += `<a href="#" class="delete-post-btn" data-id="${post["_id"]}">Delete</a> `;
      postsHTML += `</div>`;

      postsHTML += `</li>`;
    }

    document.querySelector(".posts-list").innerHTML = postsHTML;
  } catch (err) {
    console.error(err);
  }
}

// const postList = document.querySelector(".posts-list");
