/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */


import Domino from "../models/Domino";
import DominoesChain from "../models/DominoesChain";



function printUpwards(front: number, back: number): void {
    console.log(`      ⌜${front}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${back}⌟`);
}

function printDownwards(back: number, front: number): void {
    console.log(`      ⌜${front}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${back}⌟`);
}


function printDoubles(side1: number, side2: number): void {
    if (side1 === side1) {
        console.log(`    ⌜      ⌝\n` + `     ` + `${side1} | ${side2}\n` + `    ⌞      ⌟`);
    }
}
function printGameHeadings(heading: string) {
    console.log(`   ${heading}\n`)
}

function printScores() {

}
function printDomino(currDom:Domino){
    const { side1, side2, direction, isDouble } = currDom;
    if (isDouble()) {
        printDoubles(side1, side2);
    }
    if (direction) {
        printUpwards(side1, side2);
    } else {
        printDownwards(side2, side1);
    }
}

function printChainOfDominoes(dominoes: Domino[]):void{
   const { length} = dominoes;
    printChainRecursively(dominoes, length );
}

function printChainRecursively(dominoes: Domino[], length: number): Domino[] {
    if (length === 0) return dominoes; //base case

    const currDom = dominoes.pop();
    if (currDom) printDomino(currDom);
   return printChainRecursively(dominoes, length-1 );
}



export { printChainOfDominoes }