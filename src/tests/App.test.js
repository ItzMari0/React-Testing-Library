import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <App />', () => {
  describe('Testa o Link de navegação "Home"', () => {
    it('o primeiro link possui texto "Home" e seu redirecionamento', () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: 'Home' });
      expect(home).toBeInTheDocument();

      userEvent.click(home);
      expect(history.location.pathname).toBe('/');
    });
  });

  describe('Testa o Link de navegação "About"', () => {
    it('o segundo link possui texto "About" e seu redirecionamento', () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: 'About' });
      expect(about).toBeInTheDocument();

      userEvent.click(about);
      expect(history.location.pathname).toBe('/about');
    });
  });

  describe('Testa o Link de navegação "Favorite Pokémons"', () => {
    it('o terceiro link possui texto "Favorite Pokémons" e seu redirecionamento', () => {
      const { history } = renderWithRouter(<App />);
      const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favorite).toBeInTheDocument();

      userEvent.click(favorite);
      expect(history.location.pathname).toBe('/favorites');
    });
  });

  describe('Testa o componente <NotFound />', () => {
    it('redireciona para a página "Not Found" ao entrar em URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/deuruim');

      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
  });
});
