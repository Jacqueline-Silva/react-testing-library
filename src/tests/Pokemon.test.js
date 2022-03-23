import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
  },
];

describe('Teste o componente Pokemon', () => {
  it('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const verifyCardName = screen.getByTestId('pokemon-name');
    expect(verifyCardName).toHaveTextContent(/pikachu/i);

    const verifyCardType = screen.getByTestId('pokemon-type');
    expect(verifyCardType).toHaveTextContent(/electric/i);

    const verifyCardWeight = screen.getByTestId('pokemon-weight');
    expect(verifyCardWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const verifyCardImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const urlCardImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(verifyCardImage).toHaveAttribute('src', urlCardImage);
    expect(verifyCardImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[1] } />);

    const verifyMoreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(verifyMoreDetailsLink).toBeInTheDocument();

    userEvent.click(verifyMoreDetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
  });

  it('se ao clicar no link de navegação, é redirecionado à página de detalhes', () => {
    renderWithRouter(<App />);

    const verifyMoreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(verifyMoreDetailsLink).toBeInTheDocument();

    userEvent.click(verifyMoreDetailsLink);

    const sectionDetailsH2 = screen.getByRole('heading', {
      level: 2,
      name: /details/i,
    });
    expect(sectionDetailsH2).toBeInTheDocument();
  });

  it('se a URL do navegador muda para /pokemon/id com os detalhes que deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    const verifyMoreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(verifyMoreDetailsLink).toBeInTheDocument();
    userEvent.click(verifyMoreDetailsLink);

    const beforeHistory = history.location.pathname;
    expect(beforeHistory).toBe('/pokemons/25');

    history.goBack();

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);

    const verifyMoreDetailsLink2 = screen.getByText(/more details/i);
    userEvent.click(verifyMoreDetailsLink2);

    const afterHistory = history.location.pathname;
    expect(afterHistory).toBe('/pokemons/4');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const verifyMoreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(verifyMoreDetailsLink).toBeInTheDocument();
    userEvent.click(verifyMoreDetailsLink);

    const check = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(check);

    const star = screen.queryAllByRole('img')[1];
    console.log(star);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
