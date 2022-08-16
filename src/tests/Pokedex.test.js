import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokedex />', () => {
  it('contém um heading "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('é exibido um botão com texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');
  });

  it('é exibido o próximo pokémon da lista ao clicar em "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
});
