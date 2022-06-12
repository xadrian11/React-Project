import React from 'react';
import { UserContext } from '../../components/UserProvider';

function useAuth() {
  return React.useContext(UserContext);
}

export default useAuth;
