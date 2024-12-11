import { useState } from 'react';

// import './App.css';

function Review() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0); 
  const [error ,setErrors]=useState({})
  const starArray = [1, 2, 3, 4, 5];

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };

  const validation=()=>{
    setErrors({});
    const newErrors={};
    if (!author) {
      newErrors.author = 'Please enter your name.';
    }
    else{
       if(author.length<3){
        newErrors.author = 'Please enter your full name';
       }
    }
    if (!text) {
      newErrors.text = 'Please enter your comment.';
    }
    else {
       if(text.length<10){
        newErrors.text="Minimum Your Comment in 10 word"
       }
    }
    if (rating === 0) {
      newErrors.rating = 'Please provide a rating.';
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    else{
      return true;
    }
  }
  const handleAddComment = (e) => {
    e.preventDefault();
    if (validation()) {
      const newComment = {
        author: author,
        text: text,
        rating: rating,
      };
      setComments([newComment, ...comments]);
      setAuthor('');
      setText('');
      setRating(0); // Reset to 0 instead of an empty string
    }
  };

  return (
    <>
      <h1>Comment And Review Section</h1>
      <div className="comment">
        <div className="comment-section">
          <h2 style={{textAlign:'center', fontSize:'40px'}}>Comments</h2>
          <div className="comment-form">
            <h3>Author Name:</h3>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {<p style={{ color: 'red' }}>{error.author}</p>}
              <h3>What You Think About It:</h3>
              <textarea
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {<p style={{ color: 'red' }}>{error.text}</p>}
              <h3>How Was Your Experience?</h3>
              <div className="rating">
                {starArray.map((star) => (
                  <span
                    key={star}
                    className={`star ${rating >= star ? 'filled' : ''}`}
                    onClick={() => handleRating(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              {<p style={{ color: 'red' }}>{error.rating}</p>}
              <button >Add Comment</button>
            </form>
          </div>
        </div>

        {/* Displaying Comments */}
        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className='display-comments'>
                <p>
                  <strong>Author:</strong> {comment.author}
                </p>
                <p>
                  <strong>Comments:</strong> {comment.text}
                </p>
                <p>
                  <strong>Rating:</strong> {"⭐".repeat(comment.rating)}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
