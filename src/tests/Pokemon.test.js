import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se é renderizado um card com informações do pokémon', () => {
  it('o nome correto do pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getAllByText('Pikachu');
    expect(pikachuName[0]).toBeInTheDocument();
  });

  it('o tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const electricType = screen.getAllByText('Electric');
    expect(electricType[1]).toBeInTheDocument();
  });

  it('o peso médio do pokémon deve ser exibido com um texto no formato correto', () => {
    renderWithRouter(<App />);
    const pikachuWeight = screen.getByText(/6.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();
  });

  it('a imagem do pokémon deve ser exibida, com atributo src e alt', () => {
    renderWithRouter(<App />);
    const pikachuSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pikachuImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pikachuImg.src).toBe(pikachuSrc);
    expect(pikachuImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('é exibido na tela um link com o href "/pokemons/<id>"', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuDetails = screen.getByRole('link', { name: 'More details' });
    expect(pikachuDetails).toBeInTheDocument();

    userEvent.click(pikachuDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('o favorito possui src "/star-icon.svg", alt "<name> is marked as favorite"', () => {
    const { history } = renderWithRouter(<App />);
    const starIconUrl = '/star-icon.svg';

    history.push('/pokemons/25');

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const pikachuFavorite = screen
      .getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(pikachuFavorite.src).toContain(starIconUrl);
    expect(pikachuFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
