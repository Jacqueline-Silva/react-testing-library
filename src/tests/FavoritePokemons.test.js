import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente FavoritePokemons', () => {
  it('se exibe "No favorite pokemon found", caso não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [
      {
        id: 151,
        name: 'Mew',
        type: 'Psychic',
        averageWeight: {
          value: '4.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
      },
      {
        id: 78,
        name: 'Rapidash',
        type: 'Fire',
        averageWeight: {
          value: '95.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
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

    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favorites = screen.getAllByTestId('pokemon-name');
    const tamanho = 3;

    expect(favorites.length).toBe(tamanho);
  });
});
