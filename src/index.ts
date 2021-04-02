import { Domino } from "./models/schemas";
function main() {
  const newDomino = new Domino(6,4)
  console.log(newDomino)
  return newDomino;
}


export  default main;