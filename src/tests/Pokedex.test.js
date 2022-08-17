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

  it('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonsTypeBtn = 7;
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtn).toHaveLength(pokemonsTypeBtn);
  });

  it('o texto do botão deve corresponder ao tipo', () => {
    renderWithRouter(<App />);
    const fireBtn = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(fireBtn);
    const firePokemons = screen.getAllByText('Fire');
    expect(firePokemons).toHaveLength(2);
  });

  it('contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });

    userEvent.click(allBtn);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
