import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Teste o componente About', () => {
  it('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByText(/about pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutH2 = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutH2).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1part1 = 'This application simulates a Pokédex, ';
    const p1part2 = 'a digital encyclopedia containing all Pokémons';

    const p2part1 = 'One can filter Pokémons by type, ';
    const p2part2 = 'and see more details for each one of them';

    const p1 = screen.getByText(p1part1 + p1part2);
    const p2 = screen.getByText(p2part1 + p2part2);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();

    // expect(totalParagraph).toHaveLength(2);
  });

  it('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { src: url });

    expect(image).toHaveAttribute('src', url);
    expect(image).toHaveAttribute('alt');
  });
});
