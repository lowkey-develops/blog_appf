import React, { useState } from 'react';

function CreatePost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState(null); // To store the image URL

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); // Set the result (base64) as the image URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !imageURL) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    // Create a new post object
    const newPost = {
      id: Date.now(),
      title,
      content,
      imageURL, // Store the image URL
    };

    addPost(newPost);

    // Reset the form
    setTitle('');
    setContent('');
    setImageURL(null);
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
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
        {/* Image preview */}
        {imageURL && <img src={imageURL} alt="Preview" className="image-preview" />}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
