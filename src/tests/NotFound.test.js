import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <NotFound />', () => {
  it('contém um heading "h2" com o texto "Page Request Not Found"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });

  it('a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying/i);
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
