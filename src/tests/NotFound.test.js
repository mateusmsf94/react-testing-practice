import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { NotFound } from '../pages';

test(' se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const notFoundTitle = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFoundTitle).toBeInTheDocument();
});

test('se a página mostra a imagem', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByAltText(/pikachu/i);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
