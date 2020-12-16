window.onload = function () {
  fetchAllPosts();
};

// Get all posts from the server and display them
async function fetchAllPosts() {
  try {
    let response = await fetch("http://localhost:3000/posts");
    let data = await response.json();

    let postsHTML = "";
    for (let post of data.reverse()) {
      postsHTML += `<li class="list-group-item">`;

      var str = post.content;
      var res = str.substring(0, 99); // Get first 100 chars

      var readMore = "";
      
      // Make sure only 100 Chars can be displayed, and add button
      if (res.length === 99)
        readMore = `<a href="post.html?id=${post["_id"]}">...read more</a>`;

      postsHTML += `<h2>${post.title}</h2>`;
      postsHTML += `<p><i>${post.author} | ${post.date}</i></p>`;
      postsHTML += `<p><b>Tags:</b> ${post.tags}</p>`;
      postsHTML += `<p>${res} ${readMore}</p>`;

      postsHTML += `</li>`;
    }

    document.querySelector(".posts-list").innerHTML = postsHTML;
  } catch (err) {
    console.error(err);
  }
}