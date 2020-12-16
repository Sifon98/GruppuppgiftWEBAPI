const urlParams = new URLSearchParams(window.location.search);  // Get URL search parameters                  
const postId = urlParams.get("id");                             // Find search parameter "id"

window.onload = function () {
  fetchAllPosts();
};

//Get a specified blog post och display it
async function fetchAllPosts() {
  try {
    let response = await fetch(`http://localhost:3000/posts/${postId}`);
    let data = await response.json();

    let postsHTML = "";
    postsHTML += `<li class="list-group-item">`;

    postsHTML += `<h2>${data.title}</h2>`;
    postsHTML += `<p><i>${data.author} | ${data.date}</i></p>`;
    postsHTML += `<p><b>Tags: </b>${data.tags}</p>`;
    postsHTML += `<p>${data.content}</p>`;

    postsHTML += `</li>`;

    document.querySelector(".the-post").innerHTML = postsHTML;
  } catch (err) {
    console.error(err);
  }
}
