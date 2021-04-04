
import Board from "./models/Board";

import DominoesChain from "./models/DominoesChain";

import { populateDominoes, shuffleWithRecursion } from "./functions and utilities/util";

function main() {
  const board = Board.getInstance();

  const chain =  DominoesChain.getInstance();
  const pupulated = shuffleWithRecursion(populateDominoes());
  console.log(pupulated.length);
  pupulated.forEach((domino)=>{
    chain.addDomino(domino);

  })
  board.dominoesDisplay = chain;
  process.stdout.cursorTo(0); 

  board.print();
  process.stdout.cursorTo(0); 

}


main()


export default main;