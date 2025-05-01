import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:8080/api/posts");
    setPosts(response.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:8080/api/posts/${id}`);
    fetchPosts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{post.postTitle}</h3>
          <p>
            <strong>Name:</strong> {post.postName}
          </p>
          <p>{post.postContent}</p>
          <p>
            <strong>Author:</strong> {post.author}
          </p>
          <button
            onClick={() => navigate(`/update/${post.id}`)}
            style={{ marginRight: "10px" }}
          >
            Update
          </button>
          <button
            onClick={() => deletePost(post.id)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListPost;
