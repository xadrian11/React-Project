import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

import styles from './UserProfileView.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import MobileUserInfo from './components/MobileUserInfo';
import DesktopUserInfo from './components/DesktopUserInfo';
import PostComponent from '../PostComponent/PostComponent';
import { getUserById } from '../../services/users-service.js';
import { getUserPosts } from '../../services/posts-service';

function UserProfileView() {
  const mountedRef = useRef(false);
  const isMobile = useMediaQuery('(max-width: 576px)');

  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profilePosts, setProfilePosts] = useState([]);
  const isLoaded = user !== null;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    getUserById(userId)
      .then((user) => {
        if (mountedRef.current) {
          setUser(user);
        }
      })
      .catch((error) => {
        console.log('error', error);
        navigate('/');
      });
  }, [userId, navigate]);

  useEffect(() => {
    getUserPosts(userId)
      .then((posts) => {
        setProfilePosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const ViewComponent = isMobile ? MobileUserInfo : DesktopUserInfo;

  return (
    <div className={styles['profile-view-container']}>
      <div className={styles.main}>
        <ViewComponent
          userEmail={user.email}
          userName={user.name}
          userLastName={user.lastname}
          followersNr={user.followers.length}
          followingNr={user.following.length}
          userId={user.id}
          onFollow={(followers) => setUser({ ...user, followers })}
        />

        <div className={styles['posts-wrapper']}>
          {profilePosts.map((post) => {
            return <PostComponent key={post.id} {...post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;

UserProfileView.propTypes = {
  userEmail: PropTypes.string,
  postsNr: PropTypes.number,
  followersNr: PropTypes.number,
  followingNr: PropTypes.number,
};
