import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import { faker } from '@faker-js/faker';
import './styles.css'; 


function createRandomPost() {

  return {
  
  title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,  
  body: faker.hacker.phrase(),
  }
  };

function App() {
  const [posts, setPosts] = useState([]);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Function to update a post
  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  // Function to delete a post
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

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
        </nav>      
        {/* Routing */}
        <Routes>
          <Route path="/create" element={<CreatePost addPost={addPost} />} />
          <Route path="/posts" element={<PostList posts={posts} deletePost={deletePost} />} />
          <Route path="/edit/:id" element={<EditPost posts={posts} updatePost={updatePost} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
