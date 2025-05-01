import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    postName: "",
    postTitle: "",
    postContent: "",
    author: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/posts/${id}`, post);
    alert("Post updated!");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="postName"
          value={post.postName}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <input
          type="text"
          name="postTitle"
          value={post.postTitle}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <textarea
          name="postContent"
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
          value={post.author}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          required
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
