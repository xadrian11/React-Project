import React from 'react';
import { render } from '@testing-library/react';

import Form from './Form';

describe('Form component', () => {
  it('should render form', () => {
    const { getByTestId } = render(<Form></Form>);

    const form = getByTestId('form');
    expect(form).toBeVisible();
  });

  it('should accept children', () => {
    const { getByTestId } = render(<Form>{<input></input>}</Form>);

    const form = getByTestId('form');
    expect(form).toContainHTML('input');
  });
});
