import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../services/users-service';
import Loader from '../Loader';
import { onAuthStateChanged } from '../../services/auth-service';

import styles from './UserProvider.module.css';

export const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  function fetchUser() {
    getCurrentUser()
      .then((data) => setCurrentUser(data))
      .catch(() => {
        setCurrentUser(null);
      });
  }

  useEffect(() => {
    fetchUser();

    const unsubscribe = onAuthStateChanged(() => {
      setCurrentUser();
      fetchUser();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (currentUser === undefined) {
    return (
      <div className={styles.loadercontainer}>
        <Loader />
      </div>
    );
  }

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node,
};
