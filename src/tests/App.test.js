import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se o componente App.js', () => {
  it('contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Ao clicar no link Home é redirecionado para página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar no link About é redirecionado para About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar no link Favorite Pokémons é redirecionado para Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByText(/favorite pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Ao URL desconhecida é redirecionado para Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url-que-nao-existe/');

    const notFoundTitle = screen.getByText(/page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
