import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserAvatar from './UserAvatar';

const file = { type: 'image/jpg', size: 1000000 };

const id = 'ii9OkMOswtXfi0zIiFOn1xp3eTy2';

const mockUser = {
  avatarURL: null,
  email: 'johndoe@mail.com',
  followers: [],
  following: [],
  id: id,
  lastname: 'Doe',
  name: 'John',
};

jest.mock('../../hooks/useAuth', () => {
  return () => mockUser;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ userId: id }),
}));

describe('UserAvatar component', () => {
  it('Should render edit button on avatar hover', async () => {
    render(<UserAvatar />);

    fireEvent.mouseOver(screen.getByTestId('avatar'));

    const editBtn = await screen.getByTestId('editBtn');

    expect(editBtn).toBeVisible();
  });

  it('Should render modal component with submit button', async () => {
    render(<UserAvatar />);

    fireEvent.mouseOver(screen.getByTestId('avatar'));

    const editBtn = await screen.findByTestId('editBtn');

    fireEvent.click(editBtn);

    const submitBtn = await screen.findByText('Submit');

    expect(submitBtn).toBeVisible();
  });

  it('Should change user avatar after file input changes', async () => {
    window.URL = {
      createObjectURL: jest.fn().mockImplementation(() => './chucknorris.jpg'),
    };

    render(<UserAvatar />);

    fireEvent.mouseOver(screen.getByTestId('avatar'));

    const editBtn = await screen.findByTestId('editBtn');

    fireEvent.click(editBtn);

    const inputFile = await screen.findByTestId('inputFile');

    fireEvent.change(inputFile, {
      target: { files: [file] },
    });

    const avatar = screen.getByTestId('avatar');

    expect(avatar.src).toContain('chucknorris');
  });
});
