import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignUpView from './SignUpView';

describe('SignUpView', () => {
  it('should render component', async () => {
    const { getByRole } = render(<SignUpView />, { wrapper: MemoryRouter });
    expect(getByRole('heading')).toHaveTextContent('Sign Up');
  });
});
