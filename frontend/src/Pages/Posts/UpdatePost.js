import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaMapMarkedAlt,
  FaConciergeBell,
  FaComments,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "./UpdatePost.css";

export default function UpdatePost() {
  const TYPES = [
    { key: "Recipe", icon: FaUtensils },
    { key: "Restaurant Review", icon: FaMapMarkedAlt },
    { key: "Cooking Tutorial", icon: FaConciergeBell },
    { key: "General Share", icon: FaComments },
  ];

  const [postType, setPostType] = useState(TYPES[0].key);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    // TODO: replace "1" with dynamic ID via useParams
    axios
      .get("http://localhost:8080/api/posts/1")
      .then((res) => {
        const { type, content, description, tags, images } = res.data;
        setPostType(type);
        setTitle(content);
        setDescription(description);
        setTags(tags.join(", "));
        setExistingImages(images);
      })
      .catch(() => {});
  }, []);

  const handleFileChange = (e) => {
    setNewFiles([...newFiles, ...Array.from(e.target.files)]);
  };

  const removeExisting = (idx) =>
    setExistingImages(existingImages.filter((_, i) => i !== idx));

  const removeNew = (idx) =>
    setNewFiles(newFiles.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("type", postType);
    form.append("content", title);
    form.append("description", description);
    form.append("tags", JSON.stringify(tags.split(",").map((t) => t.trim())));
    existingImages.forEach((img) => form.append("existingImages[]", img));
    newFiles.forEach((f) => form.append("images", f));

    axios
      .put("http://localhost:8080/api/posts/update/1", form)
      .then(() => alert("Post updated!"))
      .catch(() => alert("Failed to update"));
  };

  return (
    <div className="update-post">
      <header>
        <h1>Update Post</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="step">
          <h2>1. Select Post Type</h2>
          <div className="types">
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  className={postType === t.key ? "selected" : ""}
                  onClick={() => setPostType(t.key)}
                >
                  <Icon />
                  <span>{t.key}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="step">
          <h2>2. Content</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="#tag1, #tag2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="images">
            {existingImages.map((img, i) => (
              <div key={i} className="thumb">
                <img src={img.url} alt="" />
                <MdClose onClick={() => removeExisting(i)} />
              </div>
            ))}
            {newFiles.map((f, i) => (
              <div key={i} className="thumb">
                <img src={URL.createObjectURL(f)} alt="" />
                <MdClose onClick={() => removeNew(i)} />
              </div>
            ))}
            <label className="upload-box">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
              Drag and drop images or videos, or click to upload
            </label>
          </div>
        </div>

        <button type="submit" className="btn-update">
          Update
        </button>
      </form>
    </div>
  );
}
