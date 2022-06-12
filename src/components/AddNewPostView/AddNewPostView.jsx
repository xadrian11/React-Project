import React from 'react';
import Loader from '../Loader/Loader';
import useAddNewPostView from '../../hooks/useAddNewPostView/useAddNewPostView';

import styles from './AddNewPostView.module.css';

function AddNewPostView() {
  const {
    picLabel,
    imgSrc,
    handleClick,
    handleFileChange,
    handleDescriptionChange,
    createPostHandler,
    description,
    myRefname,
    finalMessage,
    showFinalMessage,
    isLoading,
  } = useAddNewPostView();

  return (
    <>
      {isLoading ? (
        <div className={styles['addpostloader']}>
          <Loader />
        </div>
      ) : (
        <div className={styles['view-container']}>
          {showFinalMessage ? (
            <p className={styles['finalmessage']}>{finalMessage}</p>
          ) : (
            <div>
              <div className={styles['top-bar']}>
                <span className={styles['new-post-label']}>New Post</span>
                <button
                  className={styles['share-button']}
                  onClick={createPostHandler}
                >
                  Share
                </button>
              </div>
              <div className={styles['post-content-wrapper']}>
                <input
                  className={styles['file-input']}
                  ref={myRefname}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                ></input>
                <div
                  className={styles['pic-wrapper']}
                  role="button"
                  onClick={handleClick}
                >
                  <span className={styles['upload-pic-label']}>{picLabel}</span>
                  <img
                    className={styles['add-pic-icon']}
                    alt="your image"
                    src={imgSrc}
                  ></img>
                </div>
                <div className={styles['textarea-wrapper']}>
                  <textarea
                    className={styles['textarea']}
                    rows="10"
                    maxLength="2200"
                    placeholder="Type your post description"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AddNewPostView;
