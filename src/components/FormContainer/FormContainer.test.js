import React from 'react';
import { render } from '@testing-library/react';

import FormContainer from './FormContainer';

describe('FormContainer', () => {
  it('should accept children', () => {
    const { getByTestId } = render(
      <FormContainer>
        <form data-testid="form" />
      </FormContainer>,
    );

    expect(getByTestId('form')).toBeVisible();
  });
});
