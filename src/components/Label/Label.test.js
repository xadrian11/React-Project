import React from 'react';
import { render } from '@testing-library/react';

import Label from './Label';

describe('label component', () => {
  it('should render label component', () => {
    const { getByTestId } = render(
      <Label htmlFor="name" labelContent={'Name'}></Label>,
    );
    const label = getByTestId('label');

    expect(label).toBeVisible();
  });
  it('should contain htmlFor attribute', () => {
    const { getByTestId } = render(
      <Label htmlFor="name" labelContent={'Name'}></Label>,
    );
    const label = getByTestId('label');

    expect(label).toHaveAttribute('for', 'name');
  });
});
