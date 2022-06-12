import React from 'react';
import styles from './Homepage.module.css';
import useHomepage from '../../hooks/useHomepage';
import AddNewPostView from '../AddNewPostView/AddNewPostView';
import Modal from '../Modal/Modal';
import PostComponent from '../PostComponent/PostComponent';

function Homepage() {
  const { homepagePosts, handleModalOpen, handleModalClose, isOpen } =
    useHomepage();

  return (
    <>
      <button className={styles.addpostbutton} onClick={handleModalOpen}>
        Add new post
      </button>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <AddNewPostView />
      </Modal>
      <div className={styles.postsContainer}>
        {homepagePosts.map((post) => {
          return <PostComponent key={post.id} {...post} />;
        })}
      </div>
    </>
  );
}

export default Homepage;
