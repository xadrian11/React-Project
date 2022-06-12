import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input component', () => {
  it('should render input', () => {
    const { getByTestId } = render(
      <Input id={'input'} type={'text'} name={'Halina'} />,
    );

    const input = getByTestId('input');
    expect(input).toBeVisible();
  });
  it('should focus on click', () => {
    const { getByTestId } = render(
      <Input id={'input'} type={'text'} name={'Halina'} />,
    );

    const input = getByTestId('input');
    userEvent.click(input);
    expect(input).toHaveFocus();
  });
  it('should focus on tab', () => {
    const { getByTestId } = render(
      <Input id={'input'} type={'text'} name={'Halina'} />,
    );

    const input = getByTestId('input');
    userEvent.tab();
    expect(input).toHaveFocus();
  });
  it('should call onChange when user type', () => {
    const handleOnChange = jest.fn();
    const { getByTestId } = render(
      <Input type="text" onChange={handleOnChange} name={'Halina'} />,
    );

    const input = getByTestId('input');

    userEvent.type(input, 'hello');

    expect(handleOnChange).toHaveBeenCalled();
  });
});
