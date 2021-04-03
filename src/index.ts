
import { Domino } from "./models/Domino";
import Board from "./models/Board";

import DominoesChain from "./models/DominoesChain";
import { Team } from "./models/Team";
import { populateDominoes } from "./functions and utilities/util";
function main() {
  const board = Board.getInstance();
  const mock_domino = new Domino(3, 3);
  const mock_domino3 = new Domino(3, 1);
  const mock_domino2 = new Domino(3, 2);
  const mock_domino4 = new Domino(1, 2);
  const mock_domino5 = new Domino(2,6);
  const mock_domino6 = new Domino(6,4);
  const mock_domino7 = new Domino(2,2);
  
  
  const chain = new DominoesChain();
  chain.addDomino(mock_domino);
  chain.addDomino(mock_domino2);
  chain.addDomino(mock_domino3);
  chain.addDomino(mock_domino4);
  chain.addDomino(mock_domino5);
  // chain.addDomino(mock_domino6);
  // chain.addDomino(mock_domino7);
  
  board.dominoesDisplay = chain;
  
  board.print();
  console.log(chain)
  
}

const mock_domino = new Domino(3, 3);
// main()
const mem = {}
console.log(populateDominoes(mem, 28 ));
export default main;