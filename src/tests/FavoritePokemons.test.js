import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;', async () => {
  renderWithRouter(<App />);

  const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favorites);
  const emptyMessage = await screen.findByText('No favorite pokemon found');
  expect(emptyMessage).toBeInTheDocument();
});

test('se são exibidos todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);
  const favoriteCheckbox = screen.getByRole('checkbox');
  userEvent.click(favoriteCheckbox);
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favoriteLink);
  const pikachu = screen.getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
