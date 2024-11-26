import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost({ posts, updatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the post to edit
  const postToEdit = posts.find((post) => post.id === Number(id));
  
  // State variables
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState(postToEdit ? postToEdit.imageURL : null);

  // Set the initial state with post details
  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImageURL(postToEdit.imageURL);
    }
  }, [postToEdit]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); // Update image URL with new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !imageURL) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    // Create the updated post object
    const updatedPost = {
      id: postToEdit.id,
      title,
      content,
      imageURL, // Include the updated image URL
    };

    updatePost(updatedPost);
    navigate('/posts'); // Redirect to posts after updating
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {/* Show current image or preview new image */}
        {imageURL && <img src={imageURL} alt="Preview" className="image-preview" />}
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
