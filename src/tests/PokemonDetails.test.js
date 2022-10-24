import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemons/25');
  });
});

test('se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
  const pokemonName = screen.getByText('Pikachu Details');
  expect(pokemonName).toBeInTheDocument();
  const allLinks = screen.getAllByRole('link');
  expect(allLinks).toHaveLength(3);
  const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
  expect(summary).toBeInTheDocument();
  const description = screen.getByText(/this intelligent Pokémon roasts/i);
  expect(description).toBeInTheDocument();
});

test('se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
  const locationText = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
  expect(locationText).toBeInTheDocument();
  const locationNames = screen.getAllByText(/Kanto/);
  expect(locationNames[0]).toBeInTheDocument();
  expect(locationNames[1]).toBeInTheDocument();
  const locationImages = screen.getAllByRole('img');
  expect(locationImages[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationImages[1]).toHaveAttribute('alt', 'Pikachu location');
  expect(locationImages[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(locationImages[2]).toHaveAttribute('alt', 'Pikachu location');
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const favorite = screen.getByRole('checkbox');
  expect(favorite).toBeInTheDocument();
  userEvent.click(favorite);
  const starImg = screen.getByAltText(/marked/);
  expect(starImg).toBeInTheDocument();
  userEvent.click(favorite);
  expect(starImg).not.toBeInTheDocument();
  const favLabel = screen.getByLabelText(/Pokémon favoritado?/);
  expect(favLabel).toBeInTheDocument();
});
