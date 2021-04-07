/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Domino from "../models/Domino";
import { createInterface } from "readline";
import DominoesChain from "../models/DominoesChain";
import Board from "../models/Board";
import Score from "../models/Score";


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

function printScores(withHand: boolean): void {
    const { currentPlayer, rounds, topPoints } = Score.getInstance()
    const { team1, team2 } = Board.getInstance()
    const { store } = DominoesChain.getInstance();
    brandLong("")
    console.log(`      Numero de Jugadas: ${rounds}      `)
    console.log(`  team1: ${team1?.points}/ ${topPoints}pts    |    Manos ganadas ${team1?.wins} `)
    console.log(`  team2: ${team2?.points}/ ${topPoints}pts    |    Manos ganadas ${team2?.wins} `)
    console.log("\x1b[32m", `  Jugador de turno: ${currentPlayer?.name} `)
    console.log("\x1b[30m", '  usa  🡐 🡒  para navegar\n');
    const hand = currentPlayer?.dominoesHand;
    withHand ? printHand(hand || []) : "";
    if (store.length) printChainOfDominoes(store);
}

function ask(querry: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(querry, input => resolve(input));
    });
}

function askForNumber(querry: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(querry, (input) => {
            if (isNaN(Number(input))) {
                console.log('Solo se acepta 4, 6 y 0');
            }
            resolve(Number(input))
        });
    });
}

function listenForInput(): void {
    catchInputRecursively(!Board.getInstance().isRoundOver());
}

/**
 * Get dominoes in currentplayer.
 * Make a counter, add 1 with arrowforward, substract 1 with arrowbackwards.
 * Get the input from user.
 * Display move to the screen with the array index.
 * print title, the hand, and dominochain (always)
 * when the user selects 0, make the player play domino.
 */
async function catchInputRecursively(roundIsActive: boolean): Promise<boolean> {
    if (!roundIsActive) { //base case
        rl.on('line', () => {
            rl.close();
        })
        return roundIsActive;
    }

    const  { currentPlayer } = Score.getInstance();
    const writeCurrentPlayer = Score.getInstance().writeCurrentPlayer //can't de-structure, needs 'this' property.
    const getCurrentPlayer = Board.getInstance().getCurrentPlayer;
    if (currentPlayer) {
        const counter = 0;
        const inputted: Domino | null = null;
        const moveWasDone = false;
        const { dominoesHand } = currentPlayer;
        const chain = DominoesChain.getInstance();
        printScores(true); //refesh the screen if another num
        const keyPressed = await moveHorizontally(counter, dominoesHand, inputted, moveWasDone);

        if (keyPressed === 0) {
            const playedDomino = currentPlayer.play(chain.showLeads(), inputted);
            playedDomino && chain.addDomino(playedDomino);//put the domino in the chain
            // 🧨🧨🧨update the board and the score🧨🧨🧨
           writeCurrentPlayer();
        }
    }
    return catchInputRecursively(roundIsActive);
}

async function moveHorizontally(counter: number, dominoesHand: Domino[], inputted: Domino | null, moveWasDone: boolean): Promise<number> {
    if (moveWasDone) return 0; //base case

    const userInput = await askForNumber('Escoje con el 0.\n  🡐4    6🡒  ');
    if (userInput == 6) { //arrow forward
        (counter + 1 === dominoesHand.length - 1)
            ? counter = 0
            : counter += 1;
        inputted = dominoesHand[counter]
        printScores(true);
        printHand([inputted])
    } else if (userInput == 4) { //arrow backwards
        (counter - 1 === 0)
            ? counter = dominoesHand.length - 1
            : counter -= 1;
        inputted = dominoesHand[counter]
        printScores(true);
        printHand([inputted])
    } else if (userInput == 0) {
        moveWasDone = true;
    } else {
        printScores(true); //refesh the screen if another num
    }
    return moveHorizontally(counter, dominoesHand, inputted, moveWasDone);
}

/**
 * allows to for the use of bracket notation in typescript
 */
export type teamNames = {
    [key: string]: string
}
/**
 * Welcomes the players and promps them to write their names.
 * @returns returns { player1: Sam, player2: John }
 */
async function welcome(): Promise<{ teamSchema1: teamNames; teamSchema2: teamNames; }> {
    const T1Names: teamNames = {};
    const T2Names: teamNames = {};
    brandLong("")
    await ask('\nBievenidos al juego de Dominoes😉 !\n\nPresiona Enter para comenzar')
        .then(() => {
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
        })
        .finally(() => { brandLong('starting...') })
        .catch(e => console.log(e));
    return { teamSchema1: T1Names, teamSchema2: T2Names }

}

async function pregunta1() {
    brandLong("")
    console.log('pregunta 1❓')
    const { playersArray } = Board.getInstance();
    for (const player of playersArray) {
        console.log('player: ', player.name);
        printHand(player.dominoesHand);
        console.log('\n');
    }
}
async function pregunta2(): Promise<void> {
    await Promise
        .resolve(printScores(false))
        .then(firstMove)
        .then(() => printScores(false))

    listenForInput();
}


async function firstMove() {
    const currentPlayer = Board.getInstance().getCurrentPlayer();
    if (currentPlayer) {
        currentPlayer.play(DominoesChain.getInstance().showLeads(), null); //force the first move.
        printScores(false);
        return await ask(`La primera jugada fue efectuada por ${currentPlayer.name} with double 6.\n Estan listos para continuar?`)
    }
}

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



function displayCelebration(): void {
    const winner = Board.getInstance().winningPlayer()
    if (winner) {
        const winningTeam = Board.getInstance().belongingTeam(winner);
        brandLong("");
        console.log("%c 💛💛GAME OVER💛💛", "color:green");
        console.log(`%c ${winner.name} ha ganado el juego y aporto ${winningTeam && winningTeam.points}  a para su equipo! felicitaciones, ${winningTeam && winningTeam.name}🎉🎊!.`, "color:blue");

    } else {
        brandLong("");
        console.log("a celebration was trigger but there is a problem with celebration message.")
    }
}

function brandLong(str: string) {
    console.log("\x1b[47m");
    console.clear();
    console.log("\x1b[30m", '        ⚽⚽ Juego de Dominos ⚽⚽      \n')
    console.log(str)
}

/**
 * determines the direction of the domino on the console and prints it.
 * @param currDom 
 */
function printDomino(currDom: Domino) {

    const { side1, side2 } = currDom;
    console.log(`${side1}, ${side2}`);

    if (currDom.isDouble()) {
        printDoubles(side1, side2);
    } else if (currDom.direction) {
        printUpwards(side1, side2);
    } else {
        printDownwards(side2, side1);
    }

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





export { printChainOfDominoes, welcome, displayCelebration, pregunta1, pregunta2, listenForInput }