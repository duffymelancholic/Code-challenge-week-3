# Code-challenge-week-3

# Simple Blog Web App

This is a simple blog web application built with vanilla JavaScript, HTML, and CSS. It allows users to create, view, edit, and delete blog posts. The app interacts with a backend server (such as [json-server](https://github.com/typicode/json-server)) for data storage and retrieval.

## Features

- **View Posts:** See a list of all blog posts and view details for each post.
- **Add Post:** Submit a new blog post with a title, content, and author.
- **Edit Post:** Update the title and content of an existing post.
- **Delete Post:** Remove a post from the list.
- **Responsive UI:** Clean and user-friendly interface.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [json-server](https://github.com/typicode/json-server) or any REST API backend that supports standard CRUD operations.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/simple-blog-web.git
   cd simple-blog-web
   ```

2. **Install and start the backend server:**
   - If using `json-server`, create a `db.json` file in the project root:
     ```json
     {
       "posts": []
     }
     ```
   - Start the server:
     ```bash
     npx json-server --watch db.json --port 3000
     ```

3. **Open the frontend:**
   - Open `index.html` in your browser (you can use the Live Server extension in VS Code for a better experience).

## Project Structure

```
.
├── index.html
├── src/
│   ├── index.js
│   └── styles.css
└── db.json
```

- `index.html` - Main HTML file.
- `src/index.js` - JavaScript logic for fetching, displaying, editing, and deleting posts.
- `src/styles.css` - CSS for styling the app.
- `db.json` - Mock database for `json-server`.

## Usage

1. **Add a Post:**  
   Fill in the "Title", "Content", and "Author" fields and click "Add Post".

2. **View Post Details:**  
   Click on a post title in the list to view its details.

3. **Edit a Post:**  
   Click "Edit" on a post, update the fields, and click "Update Post".

4. **Delete a Post:**  
   Click "Delete" to remove a post.

## Customization

- You can modify the CSS in `src/styles.css` to change the look and feel.
- The backend API URL is set to `http://localhost:3000/posts` in `src/index.js`. Change it if your backend runs elsewhere.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy blogging!**
