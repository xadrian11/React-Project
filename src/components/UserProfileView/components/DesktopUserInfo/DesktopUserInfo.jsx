import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../../../UserAvatar';
import FollowUser from '../../../FollowUser';
import styles from './DesktopUserInfo.module.css';

export default function DesktopUserInfo({
  userEmail,
  userName,
  userLastName,
  followersNr,
  followingNr,
  userId,
  onFollow,
}) {
  return (
    <div className={styles.header}>
      <UserAvatar />
      <div className={styles['user-info']}>
        <span className={styles['user-name']}>
          {userEmail}
          <FollowUser userId={userId} onFollow={onFollow} />
        </span>
        <div className={styles['main-info']}>
          <div className={styles['posts-nr']}>Posts: 0</div>
          <div className={styles['followers-nr']}>Followers: {followersNr}</div>
          <div className={styles['following-nr']}>Following: {followingNr}</div>
        </div>
        <span>
          {userName} {userLastName}
        </span>
      </div>
    </div>
  );
}

DesktopUserInfo.propTypes = {
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  postsNr: PropTypes.number,
  followersNr: PropTypes.number,
  followingNr: PropTypes.number,
  userId: PropTypes.string,
  onFollow: PropTypes.func,
};
