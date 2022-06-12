import React from 'react';
import { render } from '@testing-library/react';

import FormControl from './FormControl';

describe('form control component', () => {
  it('should render form control component', () => {
    const { getByTestId } = render(<FormControl></FormControl>);
    const formControl = getByTestId('form-control');

    expect(formControl).toBeVisible();
  });
  it('should contain input and label elements', () => {
    const { getByTestId } = render(
      <FormControl>
        <label></label>
        <input></input>
      </FormControl>,
    );
    const formControl = getByTestId('form-control');
    expect(formControl).toContainHTML('label');
    expect(formControl).toContainHTML('input');
  });
});
