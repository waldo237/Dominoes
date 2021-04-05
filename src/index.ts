
import Game from "./models/Game";

async function main() {

  // const board = Board.getInstance();

  // const chain =  DominoesChain.getInstance();
  // const pupulated = shuffleWithRecursion(populateDominoes());

  // pupulated.forEach((domino)=>{
  //   chain.addDomino(domino);

  // })

  const game = Game.getInstance();

  await game.run();

}


main()


export default main;