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
      postsHTML += `<tr>`;

      postsHTML += `<td class="table-row">${post.title}</td>`;
      postsHTML += `<td class="table-row">${post.author}</td>`;
      postsHTML += `<td class="table-row">${post.date}</td>`;
      postsHTML += `<td class="table-row">${post.tags}</td>`;
      postsHTML += `<td class="table-row"><a href="update-post.html?id=${post["_id"]}&content=${post["content"]}">Update</a> | <a href="#" class="delete-post-btn" data-id="${post["_id"]}">Delete</a> </td>`;
      // postsHTML += `<a href="update-post.html?id=${post["_id"]}&content=${post["content"]}">Update</a> | `;
      // postsHTML += `<a href="#" class="delete-post-btn" data-id="${post["_id"]}">Delete</a> `;

      postsHTML += `</td>`;

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

  async function deletePost(e) {
    const postId = e.target.dataset.id;

    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   We can reload the page to remove, which is not optimal,
      // Or we can remove the element on the client side with .remove()
      e.target.parentElement.parentElement.remove();
    } catch (err) {
      console.error(err);
    }
  }
}
