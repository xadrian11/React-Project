import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SignInView from '../SignInView';
import SignUpView from '../SignUpView';
import UserProfileView from '../UserProfileView';
import PrivateRoute from '../PrivateRoute';
import styles from './App.module.css';
import Homepage from '../Homepage';
import useAuth from '../../hooks/useAuth';

function App() {
  const user = useAuth();
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.viewContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div>
                  <Homepage />
                </div>
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignInView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <UserProfileView />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={<Navigate to={`/users/${user?.id}`} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
