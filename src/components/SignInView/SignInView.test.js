import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SignInView from './SignInView';

describe('Sign in component', () => {
  it('should render submit button', () => {
    const { getByRole } = render(<SignInView />, { wrapper: MemoryRouter });

    expect(getByRole('button')).toHaveTextContent('Sign In!');
  });

  it('should render input', () => {
    const { getByLabelText } = render(<SignInView />, {
      wrapper: MemoryRouter,
    });

    expect(getByLabelText('Email')).toBeVisible();
    expect(getByLabelText('Password')).toBeVisible();
  });
});
