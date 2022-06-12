import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SubmitButton from './SubmitButton';

describe('submit button component', () => {
  it('should render submit button', () => {
    const { getByRole } = render(
      <SubmitButton type="submit" buttonContent={'Next'} />,
    );

    const button = getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Next');
  });
  it('should call handler on user click', () => {
    const handleOnClick = jest.fn();
    const { getByRole } = render(
      <SubmitButton
        type="submit"
        buttonContent={'Next'}
        onClick={handleOnClick}
      />,
    );

    const button = getByRole('button');
    userEvent.click(button);

    expect(handleOnClick).toHaveBeenCalled();
  });
});
