import { printDoubles, printGameHeadings, printGreaterDown, printGreaterUp } from "./functions/screenFunctions";
import { Domino } from "./models/schemas";
function main() {
  const newDomino = new Domino(6,4)
  console.log(newDomino)
  return newDomino;
}
printGameHeadings("Jugando Dominos");

printGreaterDown(3, 5)
printDoubles(5, 5)
printGreaterUp(6, 2)
export  default main;