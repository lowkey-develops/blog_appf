import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import './styles.css';
// import './style2.css';

function createRandomPost() {
  return {
    id: faker.string.uuid(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
    image: faker.image.url(), // Add random image URL
  };
}

function App_v2() {
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
            element={
              <CreatePost addPost={addPost} />
            }
          />
          <Route
            path="/posts"
            element={
              <PostList posts={filteredPosts} deletePost={deletePost} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost posts={posts} updatePost={updatePost} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function CreatePost({ addPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(faker.image.url()); // Generate initial random image

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: faker.string.uuid(),
      title,
      body,
      image,
    };
    addPost(newPost);
    setTitle('');
    setBody('');
    setImage(faker.image.url()); // Reset with a new random image
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <img src={image} alt="Post Preview" className="preview-image" />
      <button type="submit">Add Post</button>
    </form>
  );
}

function PostList({ posts, deletePost }) {
  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}

function EditPost({ posts, updatePost }) {
  const [currentPost, setCurrentPost] = useState(posts[0] || {}); // Default to the first post if no ID is passed

  const handleUpdate = () => {
    updatePost(currentPost);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {/* Editing form */}
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
}

export default App_v2;
