/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Domino from "../models/Domino";
import { createInterface } from "readline";
import DominoesChain from "../models/DominoesChain";
import Board from "../models/Board";
import Score from "../models/Score";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { printHand, brandLong, printScores } from "./consolePrintFunctions";


const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * tringgers text input from the user.
 * @param querry 
 * @returns 
 */
function ask(querry: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(querry, input => resolve(input));
    });
}

/**
 * tringgers number input from the user.
 * @param querry 
 * @returns 
 */
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
    catchInputRecursively(!Score.getInstance().roundIsOver);
}

async function catchInputRecursively(roundIsActive: boolean): Promise<boolean> {
    if (!roundIsActive) { //base case
        rl.on('line', () => rl.close());
        return roundIsActive;
    }

    const { currentPlayer } = Score.getInstance();
    const score = Score.getInstance()//can't de-structure, needs 'this' property.
    if (currentPlayer) {
        const counter = 0;
        const inputted: Domino | null = null;
        const moveWasDone = false;
        const { dominoes } = currentPlayer;
        const chain = DominoesChain.getInstance();
        printScores(true); //refesh the screen if another num
        const keyPressed = await moveHorizontally(counter, dominoes, inputted, moveWasDone);

        if (keyPressed === 0) {
            const playedDomino = currentPlayer.play(chain.showLeads(), inputted);
            playedDomino && chain.addDomino(playedDomino);//put the domino in the chain
            score.writeCurrentPlayer(Board.getInstance().nextPlayer()); //update board

        }
    }
    return catchInputRecursively(roundIsActive);
}

/**
 * Get dominoes in currentplayer.
 * gets a counter, add 1 with arrowforward, substract 1 with arrowbackwards.
 * Get the input from user.
 * Display move to the screen with the array index.
 * print title, the hand, and dominochain (always)
 * when the user selects 0, make the player play domino.
 */
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
        (counter - 1 === -1)
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
/**
 * 1. Haz un programa que prepare el inicio de un juego de dominoes. Esto incluye la estructura de datos de las piezas, barajarlas, y repartirlas entre 4 jugadores. Para probar, el juego puede imprimir en la consola las piezas de cada jugador. 
 */
async function pregunta1() {
    brandLong("")
    console.log('pregunta 1❓')
    const { playersArray } = Board.getInstance();
    for (const player of playersArray) {
        console.log('player: ', player.name);
        printHand(player.dominoes);
        console.log('\n');
    }
}
/**
 * 2. Haz un programa que juegue una mano de dominoes, agregándole al punto anterior, que inicie el jugador que tenga doble seis, y que siga jugando el próximo jugador. Cuando un jugador tiene más de una opción para jugar, utiliza un algoritmo random para decidir la jugada. Debes imprimir en la consola cada jugada, o alguna otra forma de validarlas. 
 */
async function pregunta2(): Promise<void> {
    await Promise
        .resolve(printScores(false))
        .then(() => firstMove())
        .then(() => printScores(false))

    listenForInput();
}

async function firstMove() {

    const score = Score.getInstance();
    const currentPlayer = Board.getInstance().nextPlayer();
    if (currentPlayer) {
        score.writeCurrentPlayer(currentPlayer); //update the scores before

        const d6 = currentPlayer.playDoubleSix(0);
        if (d6) DominoesChain.getInstance().addDomino(d6); //force the first move with 6/6

        const nextP = Board.getInstance().nextPlayer();
        score.writeCurrentPlayer(nextP); //update the scores after

        printScores(false);
        return await ask(`La primera jugada fue efectuada por ${currentPlayer.name} with double 6.\n Estan listos para continuar?`)
    }
}

/**
 * outputs a celebration and prompts the user for the next acctions.
 * @param ocation 
 * @param winner 
 * @param winningTeam 
 * @returns Promise<number>
 */
async function displayCelebration(ocation: string, winner: Player, winningTeam: Team): Promise<number> {
    let res = -1;
    if (ocation === 'round') {
        printScores(false);
        console.log(`%c ${winner.name} ha ganado la partida y aporto ${winningTeam && winningTeam.points}  a para su equipo! felicitaciones, ${winningTeam && winningTeam.name}🎉🎊!.`, "color:blue");
        res = await askForNumber('presiona 0 para ir al seguir jugando.').then(answer => {
            if (answer === 0) { pregunta2() }
            return answer || -1;
        });
    }
    if (ocation === 'game') {
        printScores(false);
        console.log("%c 💛💛GAME OVER💛💛", "color:green");
        console.log(`%c ${winner.name} gano el juego. Hooray para el equipo ${winningTeam && winningTeam.name}🎉🎊!.`, "color:blue");
        res = await askForNumber('presiona 5 para salir de juego').then(answer => { if (answer === 5) rl.close; process.exit(0) });
        // 🧨🧨🧨 add action for when the players want to continue the next game 🧨🧨🧨🧨
    }
    return res;
}



export { welcome, displayCelebration, pregunta1, pregunta2, listenForInput }