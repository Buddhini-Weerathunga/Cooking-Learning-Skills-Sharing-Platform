import React, { useState } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaMapMarkedAlt,
  FaConciergeBell,
  FaComments,
} from "react-icons/fa";
import "./CreatePost.css";

function CreatePost() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewURL(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/posts/create", formData);
      alert("Post created!");
      // reset
      setType("");
      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
      setPreviewURL(null);
    } catch {
      alert("Failed to create post");
    }
  };

  const PostTypeButton = ({ value, icon: Icon }) => (
    <button
      type="button"
      className={`post-type-card ${type === value ? "active" : ""}`}
      onClick={() => setType(value)}
    >
      <Icon className="icon" />
      <span>{value}</span>
    </button>
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Cooking Platform</h1>
        <nav>
          <span>Home</span>
          <span>Explore</span>
          <span>Profile</span>
        </nav>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <section>
          <h2>1. Select Post Type</h2>
          <div className="post-types">
            <PostTypeButton value="Recipe" icon={FaUtensils} />
            <PostTypeButton
              value="Restaurant Review"
              icon={FaMapMarkedAlt}
            />
            <PostTypeButton
              value="Cooking Tutorial"
              icon={FaConciergeBell}
            />
            <PostTypeButton value="General Share" icon={FaComments} />
          </div>
        </section>

        <section>
          <h2>2. Content</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="#italian, #Vegetarian"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </section>

        <section className="media-upload">
          <div className="image-preview">
            {previewURL ? (
              <img src={previewURL} alt="Selected" />
            ) : (
              <>
                <img src="/images/burger.jpeg" alt="Preview 1" />
                <img src="/images/pizza.jpeg" alt="Preview 2" />
              </>
            )}
          </div>
          <div className="upload-box">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            <p>Drag and drop images or videos, or click to upload</p>
          </div>
        </section>

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
