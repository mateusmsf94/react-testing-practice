import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', { name: /Encountered pokémons/ });
  expect(title).toBeInTheDocument();
});

test('se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado:', () => {
  renderWithRouter(<App />);

  const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/ });
  expect(nextPokemonBtn).toBeInTheDocument();
  userEvent.click(nextPokemonBtn);
  const charmander = screen.getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Teste se é mostrado apenas um pokémon por vez;', () => {
  renderWithRouter(<App />);
  const pokemon = document.querySelectorAll('.pokemon');
  expect(pokemon).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const typeBtn = screen.getAllByTestId('pokemon-type-button');
  expect(typeBtn).toHaveLength(7);
  expect(typeBtn[0]).toHaveAccessibleName('Electric');
  expect(typeBtn[1]).toHaveAccessibleName('Fire');
  expect(typeBtn[2]).toHaveAccessibleName('Bug');
  expect(typeBtn[3]).toHaveAccessibleName('Poison');
  expect(typeBtn[4]).toHaveAccessibleName('Psychic');
  expect(typeBtn[5]).toHaveAccessibleName('Normal');
  expect(typeBtn[6]).toHaveAccessibleName('Dragon');
  userEvent.click(typeBtn[1]);
  const pokemonType = screen.getAllByText('Fire');
  expect(pokemonType).toHaveLength(2);
  const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(nextPokemonBtn).toBeInTheDocument();
  userEvent.click(nextPokemonBtn);
  const allBtn = screen.getByRole('button', { name: 'All' });
  expect(allBtn).toBeInTheDocument();
});
