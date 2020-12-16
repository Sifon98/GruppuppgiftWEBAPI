let form = document.querySelector(".create-post-form");
form.addEventListener("submit", createPun);

async function createPun(e) {
  e.preventDefault();

  // Creates a new form
  let formData = new FormData(this);

  let object = {
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    tags: formData.getAll("tags"),
  };
  
    // Post new form to server 
  try { 
    await fetch("http://localhost:3000/posts", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object), 
    });


    window.location.replace("index.html");      //Relocates to Index.html
  } catch (message) {
    throw new Error(message);
  }
}
