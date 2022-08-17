import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const moreDetails = 'More details';

describe('Testa o componente <PokemonDetails />', () => {
  describe('Teste se informações detalhadas do pokémon selecionado são mostradas', () => {
    it('a página deve conter um texto "<name> Details"', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      const pikachuDetailsTitle = screen
        .getByRole('heading', { name: 'Pikachu Details', level: 2 });
      expect(pikachuDetailsTitle).toBeInTheDocument();
    });

    it('não dever existir link de navegação para os detalhes do pokémon', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      expect(pikachuDetails).not.toBeInTheDocument();
    });

    it('a seção de detalhes deve conter um h2 com texto "Summary"', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      const summary = screen
        .getByRole('heading', { name: 'Summary', level: 2 });
      expect(summary).toBeInTheDocument();
    });

    it('a seção de detalhes deve conter um <p> com resumo do pokémon', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      const resume = screen
        .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
      expect(resume).toBeInTheDocument();
    });
  });

  describe('Teste se existe uma seção com mapas contendo localizações do pokémon', () => {
    it('na seção Detalhes existe h2 com texto "Game Locations of <name>"', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      const pikachuLocationTitle = screen
        .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
      expect(pikachuLocationTitle).toBeInTheDocument();
    });

    it('todas as localizações são mostradas na seção detalhes', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);
      const pikachuHabitat = screen.getAllByRole('img', { name: /Pikachu location/i });
      expect(pikachuHabitat).toHaveLength(2);
    });

    it('é exibido o nome de cada localização', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const locationNameOne = screen.getByText('Kanto Viridian Forest');
      const locationNameTwo = screen.getByText('Kanto Power Plant');
      expect(locationNameOne).toBeInTheDocument();
      expect(locationNameTwo).toBeInTheDocument();
    });

    it('a imagem da localização deve ter um aributo src com a URL da localização', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const pikachuUrlOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const pikachuUrlTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
      const pikachuMap = screen.getAllByRole('img', { name: /Pikachu location/i });
      expect(pikachuMap[0].src).toBe(pikachuUrlOne);
      expect(pikachuMap[1].src).toBe(pikachuUrlTwo);
    });

    it('a imagem deve ter alt com texto "<name> location"', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const pikachuImageMap = screen.getAllByRole('img', { name: /Pikachu location/i });
      expect(pikachuImageMap[0]).toHaveAttribute('alt', 'Pikachu location');
      expect(pikachuImageMap[1]).toHaveAttribute('alt', 'Pikachu location');
    });
  });

  describe('Teste se o usuário pode favoritar através da página de Detalhes', () => {
    it('a página deve exibir um checkbox que favorita o pokémon', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const favoriteCheckbox = screen.getByRole('checkbox');
      expect(favoriteCheckbox).toBeInTheDocument();
    });

    it('cliques alternados adicionam e removem da lista de favoritos', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const favoriteCheckbox = screen.getByRole(/checkbox/i);
      userEvent.click(favoriteCheckbox);
      const starIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
      expect(starIcon).toBeInTheDocument();

      userEvent.click(favoriteCheckbox);
      expect(starIcon).not.toBeInTheDocument();
    });

    it('o label checkbox contém o texto "Pokémon favoritado?"', () => {
      renderWithRouter(<App />);
      const pikachuDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(pikachuDetails);

      const label = screen.getByText(/Pokémon favoritado?/i);
      expect(label).toHaveTextContent('Pokémon favoritado?');
    });
  });
});
