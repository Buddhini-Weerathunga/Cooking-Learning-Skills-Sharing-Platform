import React, { useState } from 'react';
import {
  FaSearch,
  FaHeart,
  FaComment,
  FaBookmark,
  FaEllipsisH,
  FaStar,
  FaPlus,
} from 'react-icons/fa';
import './PostFeed.css';

// Dummy data – replace with real API data
const POSTS = [
  {
    id: 1,
    author: 'Anna Wagner',
    title: 'Homemade Margherita Pizza',
    desc:
      'Here’s my favorite Margherita pizza recipe with fresh ingredients and a crispy crust.',
    images: [
      '/images/pizza.jpeg',
      '/images/pasta.jpeg',
      '/images/lava.jpeg',
    ],
    likes: 15,
    comments: 8,
    rating: 4,
  },
  {
    id: 2,
    author: 'Michael Baker',
    title: 'Cozy Corner Review',
    desc:
      'I visited Cozy Corner and tried their delicious brunch menu. Here’s what I thought!',
    images: ['/images/burger.jpeg'],
    likes: 5,
    comments: 2,
  },
  {
    id: 3,
    author: 'Emily Johnson',
    title: 'Baking a Chocolate Cake',
    desc:
      'Sharing my step-by-step guide to baking a moist and rich chocolate cake at home.',
    images: ['/images/lava.jpeg'],
    likes: 12,
    comments: 6,
  },
];

export default function PostFeed() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Recipes');
  const [sort, setSort] = useState('Newest');

  const filtered = POSTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="search-box">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Recipes</option>
          <option>Reviews</option>
          <option>General</option>
        </select>
        <select
          className="filter-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option>Newest</option>
          <option>Popular</option>
        </select>
      </div>

      <div className="feed-list">
        {filtered.map(post => (
          <div key={post.id} className="post-card">
            <div className="card-top">
              <div className="author">
                <strong>{post.author}</strong>
                <div className="post-title">{post.title}</div>
              </div>
              <FaEllipsisH className="more" />
            </div>

            <p className="desc">{post.desc}</p>

            <div className={`images images-${post.images.length}`}>
              {post.images.map((src, i) => (
                <img key={i} src={src} alt="" />
              ))}
            </div>

            <div className="card-bottom">
              <div className="stats">
                <span><FaHeart /> {post.likes}</span>
                <span><FaComment /> {post.comments}</span>
                <FaBookmark />
              </div>
              {post.rating != null && (
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < post.rating ? 'filled' : ''}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="fab"><FaPlus /></button>
    </div>
  );
}
