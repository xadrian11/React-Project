import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signOut } from '../../services/auth-service';

import styles from './NavBar.module.css';

const NavBar = () => {
  const userData = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>
        <img
          className={styles.logo}
          src="/team-mw-project-2/images/logo-desktop.svg"
        />
      </Link>
      <div className={styles.navlinks}>
        {userData && (
          <>
            <Link className={styles.navlink} to="/">
              Home
            </Link>
            <Link className={styles.navlink} to="/profile">
              Profile
            </Link>
            <button className={styles.signoutbtn} onClick={handleSignOut}>
              Sign out
            </button>
          </>
        )}
        {!userData && (
          <>
            <Link className={styles.navlink} to="/signin">
              Sign in
            </Link>
            <Link className={styles.navlink} to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
