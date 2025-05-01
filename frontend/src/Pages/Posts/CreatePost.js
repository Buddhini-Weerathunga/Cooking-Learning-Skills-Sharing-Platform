import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [post, setPost] = useState({
    postName: "",
    postTitle: "",
    postContent: "",
    author: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/posts", post);
    alert("Post created!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="postName"
          placeholder="Post Name"
          value={post.postName}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <input
          type="text"
          name="postTitle"
          placeholder="Post Title"
          value={post.postTitle}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <textarea
          name="postContent"
          placeholder="Content"
          value={post.postContent}
          onChange={handleChange}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "300px",
            height: "100px",
          }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
