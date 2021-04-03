/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */


import Domino from "../models/Domino";



function printfrontUp(front: number, back: number): void {
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

function printChainFormatter(domino: Domino) {
    const { side1, side2, next, prev } = domino;
    if (domino.isDouble()) {
         printDoubles(side1, side2);
    }else if (next) {
        printfrontUp(side1, side2);
    }else if(prev){
        printfrontUp(side2, side1);
    }
}



export { printChainFormatter }