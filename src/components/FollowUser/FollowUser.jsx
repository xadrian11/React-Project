import React, { useState } from 'react';
import { followUser } from '../../services/users-service';
import useAuth from '../../hooks/useAuth';
import styles from './FollowUser.module.css';
import PropTypes from 'prop-types';

function FollowUser({ userId, onFollow }) {
  const currentUser = useAuth();
  const [buttonText, setButtonText] = useState(() =>
    currentUser.following.includes(userId) ? 'Unfollow' : 'Follow',
  );
  const [isLoading, setLoading] = useState(false);
  async function handleClick() {
    try {
      const undo = buttonText === 'Unfollow';
      setLoading(true);
      const { followers } = await followUser({ userId, undo });
      setButtonText(undo ? 'Follow' : 'Unfollow');

      onFollow(followers);
    } finally {
      setLoading(false);
    }
  }
  if (userId === currentUser.id) {
    return null;
  }
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={styles.followButton}
    >
      {buttonText}
    </button>
  );
}
FollowUser.propTypes = {
  userId: PropTypes.string,
  onFollow: PropTypes.func,
};
export default FollowUser;
