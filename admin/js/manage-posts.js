window.onload = function () {
  fetchAllPosts();
};

// Create a table with data for admin page
async function fetchAllPosts() {
  try {
    let response = await fetch("http://localhost:3000/posts");
    let data = await response.json();

    let postsHTML = "";
    for (let post of data.reverse()) {
      postsHTML += `<tr>`;

      postsHTML += `<td class="table-row-1">${post.title}</td>`;
      postsHTML += `<td class="table-row-2">${post.author}</td>`;
      postsHTML += `<td class="table-row-3">${post.date}</td>`;
      postsHTML += `<td class="table-row-4">${post.tags}</td>`;
      postsHTML += `<td class="table-row-5"><a href="update-post.html?id=${post["_id"]}">Update</a> | <a href="#" class="delete-post-btn" data-id="${post["_id"]}">Delete</a> </td>`;

      postsHTML += `</tr>`;
    }

    document.querySelector(".manage-posts-list").innerHTML = postsHTML;
  } catch (err) {
    console.error(err);
  }

  const deletePostBtn = document.querySelectorAll(".delete-post-btn");

  for (post of deletePostBtn) {
    post.addEventListener("click", deletePost);
  }

  // Function to delete targeted post
  async function deletePost(e) {
    const postId = e.target.dataset.id;

    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      e.target.parentElement.parentElement.remove(); // Remove relevant element
    } catch (err) {
      console.error(err);
    }
  }
}
