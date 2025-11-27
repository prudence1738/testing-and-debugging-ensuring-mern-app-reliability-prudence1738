import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/Login';

test('Login calls onLogin with email and password', async () => {
  const onLogin = jest.fn();
  render(<Login onLogin={onLogin} />);
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText('email'), 'a@b.com');
  await user.type(screen.getByPlaceholderText('password'), 'pwd');
  await user.click(screen.getByText('Login'));
  expect(onLogin).toHaveBeenCalledWith({ email: 'a@b.com', pass: 'pwd' });
});
