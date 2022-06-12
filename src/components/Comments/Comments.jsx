import React, { useState } from 'react';
import styles from './Comments.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Comments({ comments, isLoading, onAddComment }) {
  const [content, setContent] = useState('');

  return (
    <>
      <div className={styles.commentContainer}>
        {comments.map((comment) => {
          const { author } = comment;
          return (
            <div key={comment.id} className={styles.comment}>
              <img src={author.avatarURL} className={styles.userImg} />
              <p className={styles.commentValue}>
                <Link to={`/users/${author.id}`} className={styles.userName}>
                  {author.name} {author.lastname}:
                </Link>
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.input}
          placeholder="Add new comment..."
        />
        <button
          type="submit"
          disabled={!content.trim() || isLoading}
          onClick={() => onAddComment(content)}
          className={styles.btn}
        >
          Post
        </button>
      </div>
    </>
  );
}

export default Comments;

Comments.propTypes = {
  comments: PropTypes.array,
  isLoading: PropTypes.bool,
  onAddComment: PropTypes.func,
};
