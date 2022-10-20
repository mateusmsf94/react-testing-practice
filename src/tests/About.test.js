import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { About } from '../pages';

test('se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const titleAbout = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(titleAbout).toBeInTheDocument();
});

test(' se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const texts = screen.getAllByText(/pokémons/i);
  expect(texts.length).toBe(2);
});

test(' se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const image = screen.getByAltText(/pokédex/i);
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
