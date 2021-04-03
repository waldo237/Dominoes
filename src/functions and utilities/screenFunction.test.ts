import Board from "../models/Board";
import Domino from "../models/Domino";
import DominoesChain from "../models/DominoesChain";
import { Team } from "../models/Team";


global.console.log = jest.fn();

describe("Testing the functions that print to the screen.", () => {
  // test('console.log the double dominoes', () => {
    const board = Board.getInstance();
    const mock_domino = new Domino(5, 3);
    const chain =new DominoesChain();
    chain.addDomino(mock_domino)
    board.dominoesDisplay = chain;
    board.print();
    
  //   expect(console.log).toHaveBeenCalledWith(`    ⌜      ⌝\n` + `     ` + `${5} | ${5}\n` + `    ⌞      ⌟`);
  // });
  test('console.log the dominoes with the front facing Up', () => {
    expect(console.log).toHaveBeenCalledWith(`      ⌜${5}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${3}⌟`);
  });

});


