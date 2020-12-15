let form = document.querySelector(".create-post-form");
form.addEventListener("submit", createPun);

async function createPun(e) {
  e.preventDefault();

  console.log("asdasdiuygasdiuyasdgy");
  /**
   * 1. Retrive the form data
   * 2. Put the formdata in an object
   * 3. JSON stringify the object, before sending the data with an API request
   */

  // this => is the form it self
  let formData = new FormData(this);

  console.log(formData);
  console.log(formData.get("title"));

  // You can retrive the for data by selecting the components individually OR use new FormData()
  // console.log(document.getElementById("content-textarea").value);
  // console.log(formData.get("content"));

  let object = {
    // content: document.getElementById('content-textarea').value
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    tags: formData.getAll("tags"),
  };
  console.log(object);
  console.log(JSON.stringify(object));
  console.log(formData.get("title"));

  try {
    await fetch("http://localhost:3000/posts", {
      method: "POST", // GET, POST, PATCH, DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object), // body data type must match "Content-Type" header
    });

    // window.location.replace("index.html"); // redirects to the index.html page
  } catch (message) {
    throw new Error(message);
  }
}
