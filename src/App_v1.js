import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import { faker } from '@faker-js/faker';
import './styles.css';

function createRandomPost() {
  return {
    id: faker.string.uuid(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App_v1() {
  const [posts, setPosts] = useState(Array.from({ length: 30 }, createRandomPost));
  const [searchQuery, setSearchQuery] = useState('');

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Function to update a post
  const updatePost = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  // Function to delete a post
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav>
          <div className="logo">Blogg App</div>
          <div className="nav-links">
            <Link to="/create">Create Post</Link>
            <Link to="/posts">View Posts</Link>
          </div>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </nav>

        {/* Routing */}
        <Routes>
          <Route
            path="/create"
            element={<CreatePost addPost={addPost} />}
          />
          <Route
            path="/posts"
            element={<PostList posts={filteredPosts} deletePost={deletePost} />}
          />
          <Route
            path="/edit/:id"
            element={<EditPost posts={posts} updatePost={updatePost} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App_v1;
