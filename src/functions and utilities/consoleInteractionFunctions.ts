/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */


import Domino from "../models/Domino";
import DominoesChain from "../models/DominoesChain";
import { createInterface } from "readline";
import { Player } from "../models/Player";
import { Team } from "../models/Team";


const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

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

function brandLong(str: string) {
    console.clear();
    console.log("\x1b[1m", '      ⚽⚽ Juego de Dominoes ⚽⚽      \n')
    console.log(str)
}
function ask(querry: string) {
    brandLong("")
    return new Promise((resolve, reject) => {
        rl.question(querry, (input) => resolve(input));
    });
}

export type teamNames = {
    [key: string]: string
}
/**
 * Welcomes the players and promps them to write their names.
 * @returns returns { player1: Sam, player2: John }
 */
async function welcome(): Promise<{ team1: teamNames; team2: teamNames; }> {
    const T1Names: teamNames = {};
    const T2Names: teamNames = {};
   await ask('\nBievenidos al juego de Dominoes😉 !\n\nPresiona Enter para comenzar')
        .then(() => {
            rl.on('line', () => {
                brandLong('Comenzando...'); rl.close();
            })
            return ask('Nombre del  Jugador 1, Equipo 1? : ');
        })
        .then((name: any) => {
            T1Names['player1'] = name;
            return ask('Nombre del  Jugador 2, Equipo 1? : ');
        })
        .then((name: any) => {
            T1Names['player2'] = name;
            return ask('Nombre del  Jugador 1, Equipo 2? : ');
        })
        .then((name: any) => {
            T2Names['player1'] = name;
            return ask('Nombre del  Jugador 2, Equipo 2? : ');
        })
        .then((name: any) => {
            T2Names['player2'] = name;
             ask('Nombre del  Jugador 2, Equipo 2? : ');
             rl.close();
        })
        .finally(() => { brandLong('starting...') })
        .catch(e => console.log(e));
    return { team1: T1Names, team2: T2Names }
}

/**
 * determines the direction of the domino on the console and prints it.
 * @param currDom 
 */
function printDomino(currDom: Domino) {

    const { side1, side2 } = currDom;
    console.log(`${side1}, ${side2}`);

    // if (currDom.isDouble()) {
    //       printDoubles(side1,side2);
    // }else if (currDom.direction) {
    //      printUpwards(side1, side2);
    // } else {
    //     printDownwards(side2, side1);
    // }

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
    if (length === 0) return dominoes; //base case

    const currDom = dominoes.pop();

    if (currDom) printDomino(currDom);
    return printChainRecursively(dominoes, length - 1);
}





export { printChainOfDominoes, welcome }