import React from 'react';

function Post({ post }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} />}
    </div>
  );
}

export default Post;
