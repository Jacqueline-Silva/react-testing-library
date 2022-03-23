import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const encounteredH2 = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredH2).toBeInTheDocument();
  });

  it('se é exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    const terceiroPokemon = screen.getByText(/ekans/i);
    expect(terceiroPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    const ultimoPokemon = screen.getByText(/dragonair/i);
    expect(ultimoPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const imagePokemon = screen.queryAllByRole('img');
    expect(imagePokemon).toHaveLength(1);
  });

  it('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const sete = 7;
    const testId = screen.queryAllByTestId('pokemon-type-button');
    expect(testId).toHaveLength(sete);

    const eletric = screen.getByRole('button', { name: /electric/i });
    expect(eletric).toBeInTheDocument();

    const fire = screen.getByRole('button', { name: /fire/i });
    expect(fire).toBeInTheDocument();

    const bug = screen.getByRole('button', { name: /bug/i });
    expect(bug).toBeInTheDocument();

    const poison = screen.getByRole('button', { name: /poison/i });
    expect(poison).toBeInTheDocument();

    const psychic = screen.getByRole('button', { name: /psychic/i });
    expect(psychic).toBeInTheDocument();

    const dragon = screen.getByRole('button', { name: /dragon/i });
    expect(dragon).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeVisible();

    userEvent.click(fire);
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i });
    userEvent.click(nextPokemon);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/fire/i);
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeVisible();

    userEvent.click(btnAll);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
