import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('should render Loader component', () => {
    render(<Loader />);
    const element = screen.getByTestId('loader');
    expect(element).toBeVisible();
  });
});
