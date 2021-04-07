import Board from "../models/Board";
import Domino from "../models/Domino";
import DominoesChain from "../models/DominoesChain";
import Score from "../models/Score";

/**
 * clears the console and changes its colors.
 */
function brandLong(str: string) {
    console.log("\x1b[47m");
    // console.clear();
    console.log("\x1b[30m", '        ⚽⚽ Juego de Dominos ⚽⚽      \n');
    console.log(str);
}
/**
 * prints the information related to scores and the dominoes chain.
 * @param withHand 
 */
function printScores(withHand: boolean): void {
    const { currentPlayer, rounds, topPoints } = Score.getInstance()
    const { team1, team2 } = Board.getInstance()
    const { store } = DominoesChain.getInstance();
    brandLong("")
    console.log(`      Numero de Jugadas: ${rounds}      `)
    console.log(`  team1: ${team1?.points}/ ${topPoints}pts    |    Manos ganadas ${team1?.wins} `)
    console.log(`  team2: ${team2?.points}/ ${topPoints}pts    |    Manos ganadas ${team2?.wins} `)
    console.log("\x1b[32m", `  Jugador de turno: ${currentPlayer?.name} `)
    const hand = currentPlayer?.dominoes;
    if (store) printChainOfDominoes(store);
    withHand ? printHand(hand || []) : "";
    console.log("\x1b[30m", '  usa  🡐 🡒  para navegar\n');
}

/**
 * prints an array of dominoes horizontally.
 * @param hand the set of dominoes to be printed.
 */
function printHand(hand: Domino[]) {
    let domsDisplay = "";
    if (hand) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i]) {
                domsDisplay += ` ⌜${hand[i].side1}|${hand[i].side2}⌝     ` || "no existe";
            }
        }
    }
    console.log("\x1b[30m", domsDisplay);
}

/**
 * makes a copy of the array passed in the argument and operates over the copy.
 * @param dominoes
 */
function printChainOfDominoes(dominoes: Domino[]): void {
    const { length } = dominoes;

    printChainRecursively([...dominoes], length);
}

function printChainRecursively(dominoes: Domino[], length: number): Domino[] {
    if (length === 0)
        return dominoes; //base case
    const currDom = dominoes.pop();
    if (currDom)
        printDomino(currDom);
    return printChainRecursively(dominoes, length - 1);
}

/**
 * determines the direction of the domino on the console and prints it.
 */
function printDomino(currDom: Domino) {

    const { side1, side2 } = currDom;

    if (currDom.isDouble()) {
        printDoubles(side1, side2);
    } else if (currDom.direction) {
        printUpwards(side1, side2);
    } else {
        printDownwards(side2, side1);
    }
}

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


export {brandLong, printChainOfDominoes, printHand, printScores}