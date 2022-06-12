import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../../../UserAvatar';
import FollowUser from '../../../FollowUser';
import styles from './MobileUserInfo.module.css';

export default function MobileUserInfo({
  userEmail,
  userName,
  userLastName,
  followersNr,
  followingNr,
  userId,
  onFollow,
}) {
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['top-wrapper']}>
        <FollowUser userId={userId} onFollow={onFollow} />
        <span className={styles['user-name']}>{userEmail}</span>
        <img
          className={styles['add-icon']}
          src="/images/add.png"
          alt="add icon"
        ></img>
      </div>
      <div className={styles.header}>
        <div className={styles['avatar-and-name']}>
          <UserAvatar />
          <span className={styles['name-and-lastname']}>
            {userName} {userLastName}
          </span>
        </div>
        <div className={styles['user-info']}>
          <div className={styles['main-info']}>
            <span className={styles['main-info-nr']}>0</span>
            <span className={styles['main-info-label']}>Posts</span>
          </div>
          <div className={styles['main-info']}>
            <span className={styles['main-info-nr']}>{followersNr}</span>
            <span className={styles['main-info-label']}>Followers</span>
          </div>
          <div className={styles['main-info']}>
            <span className={styles['main-info-nr']}>{followingNr}</span>
            <span className={styles['main-info-label']}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

MobileUserInfo.propTypes = {
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  followersNr: PropTypes.number,
  followingNr: PropTypes.number,
  userId: PropTypes.string,
  onFollow: PropTypes.func,
};
