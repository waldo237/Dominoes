
import Board from "./models/Board";

import DominoesChain from "./models/DominoesChain";

import { populateDominoes, shuffleWithRecursion } from "./functions and utilities/util";

function main() {
  const board = Board.getInstance();

  const chain = new DominoesChain();
  const pupulated = shuffleWithRecursion(populateDominoes());
  console.log(pupulated.length);
  pupulated.forEach((domino)=>{
    chain.addDomino(domino);

  })
  board.dominoesDisplay = chain;
  board.print();
  
}


main()


export default main;