import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About />', () => {
  it('contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const headingH2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headingH2).toBeInTheDocument();
  });

  it('contém dois <p> com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphP1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphP1).toBeInTheDocument();
    const paragraphP2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphP2).toBeInTheDocument();
  });

  it('a página contém imagem de URL "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
