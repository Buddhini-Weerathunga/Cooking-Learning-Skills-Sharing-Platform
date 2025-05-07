import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './ViewPost.css';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="view-post">Loading…</div>;

  return (
    <div className="view-post">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="user-info">
          <img src={post.author.avatarUrl} alt={post.author.name} />
          <span>{post.author.name}</span>
        </div>
        <button className="follow-btn">Follow</button>
      </header>

      <div className="main-image">
        <img src={post.images[0]} alt={post.title} />
        <div className="thumbnails">
          {post.images.slice(1, 3).map((img, i) => (
            <img key={i} src={img} alt={`${post.title} thumbnail`} />
          ))}
        </div>
      </div>

      <h1 className="title">{post.title}</h1>

      <div className="tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <p className="description">{post.description}</p>

      <section className="method">
        <h2>Method</h2>
        <ol>
          {post.method.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="related-posts">
        <h2>Related Posts</h2>
        <div className="related-list">
          {post.related.map(r => (
            <div key={r.id} className="related-item">
              <img src={r.image} alt={r.title} />
              <span>{r.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
