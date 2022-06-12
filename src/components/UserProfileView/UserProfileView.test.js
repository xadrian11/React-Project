import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import './matchMedia.mock';
import UserProfileView from './UserProfileView';

const mockUser = {
  avatarURL: null,
  email: 'kroljulian@gmail.com',
  followers: [],
  following: [],
  id: 'ii9OkMOswtXfi0zIiFOn1xp3eTy2',
  lastname: 'Julian',
  name: 'Król',
};

jest.mock('../../services/users-service.js', () => {
  return {
    getUserById: async () => {
      return mockUser;
    },
  };
});

jest.mock('../../services/posts-service.js', () => {
  return {
    getUserPosts: async () => {
      return [];
    },
  };
});

jest.mock('../../hooks/useAuth', () => {
  return () => mockUser;
});

describe('UserProfileView component', () => {
  it('should render user email', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <UserProfileView />
      </BrowserRouter>,
    );

    const email = await findByText('kroljulian@gmail.com');
    expect(email).toBeVisible();
  });

  it('should render user name and lastname', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <UserProfileView />
      </BrowserRouter>,
    );
    const name = await findByText('Król Julian');
    expect(name).toBeVisible();
  });

  it('should render posts number', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <UserProfileView />
      </BrowserRouter>,
    );
    const postsNr = await findByText('Posts: 0');
    expect(postsNr).toBeVisible();
  });

  it('should render followers number', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <UserProfileView />
      </BrowserRouter>,
    );
    const followersNr = await findByText('Followers: 0');
    expect(followersNr).toBeVisible();
  });

  it('should render following number', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <UserProfileView />
      </BrowserRouter>,
    );
    const followersNr = await findByText('Following: 0');
    expect(followersNr).toBeVisible();
  });
});
