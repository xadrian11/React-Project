import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import styles from './PostComponent.module.css';
import { commentPost, likePost } from '../../services/posts-service';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconfilled } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Comments from '../Comments';
import clsx from 'clsx';

function PostComponent(props) {
  const { author, imgURL, description, id } = props;

  const user = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [comments, setComments] = useState(props.comments);
  const hasLiked = user && likes.includes(user.id);

  async function handleToggleLike() {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const updatedLikes = await likePost(id, hasLiked);
      setLikes(updatedLikes);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddComment(content) {
    try {
      setIsLoading(true);
      const updatedComments = await commentPost({ postId: id, content });
      setComments(updatedComments);
    } finally {
      setIsLoading(false);
    }
  }

  const authorElement = (
    <Link className={styles.link} to={`/users/${author.id}`}>
      {author.name} {author.lastname}
    </Link>
  );

  const headerElement = (
    <div className={styles.header}>
      <img className={styles.userImg} src={author.avatarURL} />
      <p className={styles.userName}>{authorElement}</p>
    </div>
  );

  const imgElement = (
    <img
      onClick={() => setIsOpen(true)}
      className={styles.postImg}
      src={imgURL}
      alt="Picture"
    />
  );

  const buttonsAndDescriptionElement = (
    <>
      <div>
        <div className={styles.btnContainer}>
          <div className={styles.likesCommentsContainer}>
            {hasLiked ? (
              <HeartIconfilled
                onClick={handleToggleLike}
                className={clsx(
                  styles.btnFilled,
                  isLoading && styles.btnDisabled,
                )}
              />
            ) : (
              <HeartIcon
                onClick={handleToggleLike}
                className={clsx(styles.btn, isLoading && styles.btnDisabled)}
              />
            )}
            {likes.length > 0 && (
              <p className={styles.likes}>
                {likes.length} {likes.length === 1 ? 'like' : 'likes'}
              </p>
            )}
          </div>
          <div className={styles.likesCommentsContainer}>
            <ChatIcon onClick={() => setIsOpen(true)} className={styles.btn} />
            {comments.length > 0 && (
              <p className={styles.comments}>
                {comments.length}{' '}
                {comments.length === 1 ? 'comment' : 'comments'}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className={styles.description}>
        <span className={styles.userNameDesc}>{authorElement}</span>
        {description}
      </p>
    </>
  );

  return (
    <>
      <div className={styles.postContainer} data-testid="post">
        {/* Header */}
        {headerElement}
        {/* Picture */}
        {imgElement}
        {/* Buttons */}
        {buttonsAndDescriptionElement}
        {/* Descrption */}
      </div>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalContainer} data-testid="modal">
          <div
            onClick={() => setIsOpen(true)}
            className={styles.modalImg}
            style={{ backgroundImage: `url(${imgURL})` }}
          />
          <div className={styles.commentSection}>
            {headerElement}
            {buttonsAndDescriptionElement}
            <Comments
              comments={comments}
              isLoading={isLoading}
              onAddComment={handleAddComment}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostComponent;

PostComponent.propTypes = {
  author: PropTypes.any,
  imgURL: PropTypes.string,
  description: PropTypes.string,
  likes: PropTypes.array,
  id: PropTypes.string,
  comments: PropTypes.array,
};
