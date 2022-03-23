import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/more details/i);
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: /details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();

    expect(moreDetailsLink).not.toBeInTheDocument();

    const sectionDetailsH2 = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(sectionDetailsH2).toBeInTheDocument();

    const descriptionPokemon = screen.getByText(
      /with electricity to make them tender enough to eat/i,
    );
    expect(descriptionPokemon).toBeInTheDocument();
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const gameDetails = screen.getByRole('heading', {
      level: 2,
      name: /game locations/i,
    });
    expect(gameDetails).toBeInTheDocument();

    const localOne = screen.getByText(/kanto viridian forest/i);
    expect(localOne).toBeInTheDocument();

    const localTwo = screen.getByText(/kanto power plant/i);
    expect(localTwo).toBeInTheDocument();

    const imageLocations = screen.queryAllByRole('img', { name: /pikachu location/i });
    expect(imageLocations).toHaveLength(2);
    expect(imageLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/more details/i);
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(check).toBeInTheDocument();

    userEvent.click(check);
    userEvent.click(check);
    userEvent.click(check);

    const labelCheck = screen.getByLabelText(/pokémon favoritado/i);
    expect(labelCheck).toBeInTheDocument();
  });
});
