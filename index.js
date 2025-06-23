// Main entry point: runs when the DOM is fully loaded
function main() {
    displayPosts(); // Fetch and display all blog posts
    addNewPostListener(); // Set up listener for new post form submission
    // Advanced: Add listeners for edit and delete buttons dynamically
}

document.addEventListener("DOMContentLoaded", main); // Run main() after DOM is ready

// Fetch all posts from the server and display them in the post list
function displayPosts() {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())   
      .then(posts => {
        const list = document.getElementById("post-list");
        list.innerHTML = ""; // Clear the list before adding new items
        posts.forEach(post => {
          const item = document.createElement("div");
          item.textContent = post.title; // Show post title
          item.addEventListener("click", () => handlePostClick(post.id)); // Show details on click
          list.appendChild(item);
        });
        // Show first post by default if any exist
        if (posts.length) handlePostClick(posts[0].id);
      });
}

let currentPostId = null; // Track the currently selected post

// Fetch and display details for a single post, and set up edit/delete buttons
function handlePostClick(id) {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(post => {
        currentPostId = id; // Update current post ID
        const detail = document.getElementById("post-detail");
        // Display post details and action buttons
        detail.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p><em>By ${post.author}</em></p>
          <button id="edit-btn">Edit</button>
          <button id="delete-btn">Delete</button>
        `;
        setupEdit(post); // Set up edit functionality
        setupDelete(id); // Set up delete functionality
      });
}

// Set up the form to add a new post
function addNewPostListener() {
    const form = document.getElementById("new-post-form");
    form.addEventListener("submit", event => {
      event.preventDefault(); // Prevent default form submission
      // Gather new post data from form fields
      const newPost = {
        title: form.title.value,
        content: form.content.value,
        author: form.author.value
      };

      // Send new post to server
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPost)
      })
      .then(res => res.json())
      .then(() => {
        displayPosts(); // Refresh post list
        form.reset();   // Clear form fields
      });
    });
}

// Set up the edit functionality for a post
function setupEdit(post) {
    const editForm = document.getElementById("edit-post-form");
    const editBtn = document.getElementById("edit-btn");
    const cancelBtn = document.getElementById("cancel-edit");

    // Show edit form and populate with current post data when Edit is clicked
    editBtn.addEventListener("click", () => {
      editForm.classList.remove("hidden");
      editForm.title.value = post.title;
      editForm.content.value = post.content;
    });

    // Handle edit form submission
    editForm.addEventListener("submit", event => {
      event.preventDefault(); // Prevent default form submission
      // Gather updated post data from form fields
      const updatedPost = {
        title: editForm.title.value,
        content: editForm.content.value
      };

      // Send updated post to server
      fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedPost)
      })
      .then(() => {
        displayPosts(); // Refresh post list
        handlePostClick(post.id); // Refresh post details
        editForm.classList.add("hidden"); // Hide edit form
      });
    });

    // Hide edit form when Cancel is clicked
    cancelBtn.addEventListener("click", () => {
      editForm.classList.add("hidden");
    });
}

// Set up the delete functionality for a post
function setupDelete(id) {
    const deleteBtn = document.getElementById("delete-btn");
    // When Delete is clicked, remove the post from the server
    deleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
      })
      .then(() => {
        document.getElementById("post-detail").innerHTML = ""; // Clear post details
        displayPosts(); // Refresh post list
      });
    });
}

