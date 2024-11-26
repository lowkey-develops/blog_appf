import React from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts, deletePost }) {
  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available. Please create a new post.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-card">
            {/* Post Image */}
            <img src={post.imageURL} alt={post.title} className="post-image" />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <Link to={`/edit/${post.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => deletePost(post.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
