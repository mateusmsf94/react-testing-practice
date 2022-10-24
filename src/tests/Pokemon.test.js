import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('se é renderizado um card com as informações de determinado pokémon:', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Electric');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toBeInTheDocument();
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  const link = screen.getByText(/More details/);
  expect(link).toHaveAttribute('href', '/pokemons/25');
});

test('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByText('More details');
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  userEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));
  userEvent.click(screen.getByRole('link', { name: 'Home' }));
  const img = screen.getByAltText(/marked/);
  expect(img).toHaveAttribute('src', '/star-icon.svg');
  expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
