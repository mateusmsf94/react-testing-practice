import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test(' se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('Ao clicar no link "Home", direciona para a rota "/"', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('Ao clicar no link "About", direciona para a rota "/about"', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('Ao clicar no link "Favorite Pokémons", direciona para a rota "/favorites"', () => {
  const { history } = renderWithRouter(<App />);

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);

  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('Renderiza o NotFound caso seja acessada uma rota inexistente', () => {
  const { history } = renderWithRouter(<App />);

  const INVALID_URL = '/xablau';
  act(() => {
    history.push(INVALID_URL);
  });

  const notFoundTitle = screen.getByRole(
    'heading',
    { name: 'Page requested not found' },
  );
  expect(notFoundTitle).toBeInTheDocument();
});
