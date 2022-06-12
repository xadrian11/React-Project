import React from 'react';
import PrivateRoute from './';
import { screen, render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  return <div data-testid="sign-in">Sign In</div>;
};

const PrivateComponent = () => {
  return <div data-testid="private">Private Component</div>;
};

jest.mock('../../hooks/useAuth', () => {
  return jest.fn();
});

describe('PrivateRoute', () => {
  it('should redirect to sign in page if user is not authenticated', async () => {
    useAuth.mockReturnValue(null);
    window.history.replaceState({}, '', '/private');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <PrivateComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>,
    );
    const redirectComponent = await screen.findByTestId('sign-in');
    expect(redirectComponent).toBeVisible();
  });
  it('should render private component if user is authenticated', async () => {
    useAuth.mockReturnValue({
      name: 'John',
      email: 'Johm@Doe.com',
      lastname: 'Doe',
      id: 's6nasn36aksna6s',
      following: [],
      followers: [],
      avatarURL: null,
    });
    window.history.replaceState({}, '', '/private');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <PrivateComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>,
    );
    const privateComponent = await screen.findByTestId('private');
    expect(privateComponent).toBeVisible();
  });
});
