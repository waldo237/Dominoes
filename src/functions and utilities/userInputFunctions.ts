

import Domino from "../models/Domino";
import { createInterface } from "readline";
import DominoesChain from "../models/DominoesChain";
import Board from "../models/Board";
import Score from "../models/Score";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { printHand, brandLong, printScores } from "./consolePrintFunctions";
import Game from "../models/Game";


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
/**
 * calls a recursive function that persistently listens to user input.
 */
function listenForInput(): void {
    catchInputRecursively(!Score.getInstance().roundIsOver);
}

async function catchInputRecursively(roundIsActive: boolean): Promise<boolean> {
    if (!roundIsActive) { //base case
        return roundIsActive;
    }

    const { currentPlayer } = Score.getInstance();
    const score = Score.getInstance();
    let alreadyMonintored = false;
    if (currentPlayer) {
        const counter = 0;
        const moveWasDone = false;
        const { dominoes } = currentPlayer;
        const chain = DominoesChain.getInstance();
        const inputted: Domino | null = null;
        const index = await moveHorizontally(counter, dominoes, inputted, moveWasDone);
        printScores(true); //refesh the screen if receiving a new input

        const playedDomino = currentPlayer.play(chain.showLeads(), dominoes[index]);
        playedDomino && chain.addDomino(playedDomino);//put the domino in the chain
        if (currentPlayer.dominoes.length === 0) {//if the player ran out of dominoes, trigger monitor.
            Game.getInstance().stateMonitor(currentPlayer)
            alreadyMonintored = true;
        } else {
            score.writeCurrentPlayer(Board.getInstance().nextPlayer()); //update score
        }
    }
    if (!alreadyMonintored) Game.getInstance().stateMonitor(null);

    return catchInputRecursively(roundIsActive);
}

/**
 * Get dominoes in currentplayer.
 * gets a counter, add 1 with arrowforward, substract 1 with arrowbackwards.
 * Get the input from user.
 * Display move to the screen with the array index.
 * print title, the hand, and dominochain (always)
 * when the user selects 0, make the player play domino.
 * return the index(counter)
 */
async function moveHorizontally(counter: number, dominoesHand: Domino[], inputted: Domino | null, moveWasDone: boolean): Promise<number> {
    if (moveWasDone) return counter; //base case
    const userInput = await askForNumber(' usa  🡐(4 + Enter)   (6 + Enter)🡒  para navegar, (0 + Enter) para seleccionar: ');
    if (userInput == 6) { //arrow forward
        (counter + 1 === dominoesHand.length)
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
        console.log('solo usa 4, 6, 0');
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
        .then((name: string) => {
            T1Names['player1'] = name;
            return ask('Nombre del  Jugador 2, Equipo 1? : ');
        })
        .then((name: string) => {
            T1Names['player2'] = name;
            return ask('Nombre del  Jugador 1, Equipo 2? : ');
        })
        .then((name: string) => {
            T2Names['player1'] = name;
            return ask('Nombre del  Jugador 2, Equipo 2? : ');
        })
        .then((name: string) => {
            T2Names['player2'] = name;
        })
        .catch(e => console.log(e));
    return { teamSchema1: T1Names, teamSchema2: T2Names }

}

/**
 * Start the first round with [6/6]
 * @returns 
 */
async function firstMove(): Promise<string> {
    let res = "";
    const score = Score.getInstance();
    const currentPlayer = Board.getInstance().nextPlayer();
    if (currentPlayer) {
        score.writeCurrentPlayer(currentPlayer); //update the scores before

        const d66 = currentPlayer.playDoubleSix(0);
        if (d66) DominoesChain.getInstance().addDomino(d66); //force the first move with 6/6

        const nextP = Board.getInstance().nextPlayer();
        score.writeCurrentPlayer(nextP); //update the scores after

        printScores(false);
        res = await ask(`La primera jugada fue efectuada por ${currentPlayer.name} con 6/6.\n Estan listos para continuar?`)
    }
    return res;
}

/**
 * Start a consecutive round with the winner of the previous game.
 * @returns 
 */
async function consecutiveMove(): Promise<void> {

    const score = Score.getInstance();
    const { currentPlayer } = Score.getInstance();
    if (currentPlayer) {
        score.writeCurrentPlayer(currentPlayer); //update the scores before
        console.log("\x1b[34m")
        console.log(`Esta es la partida número ${Score.getInstance().rounds +1}. Empezará a jugar ${currentPlayer.name}, ${currentPlayer.name} Ganó la mano anterior.\n están listos para continuar?`);

    }
}

/**
 * outputs a celebration and prompts the user for the next acctions.
 * @param ocation 
 * @param winner 
 * @param winningTeam 
 * @returns Promise<number>
 */
// eslint-disable-next-line @typescript-eslint/ban-types
async function displayCelebration(ocation: string, winner: Player, winningTeam: Team, gainedPoints: number | null): Promise<void> {

    try {

        if (ocation === 'round') {
            console.log("\x1b[31m");
            console.log(`${winner.name} ha ganado la partida y aporto ${gainedPoints}pts  a para su equipo! felicitaciones, ${winningTeam && winningTeam.name} 🎉🎊!\npresiona  Enter para seguir jugando..`)
            await consecutiveMove();
            listenForInput();
        }

        if (ocation === 'game') {
            console.log("\x1b[34m");
            console.log("💛💛GAME OVER💛💛");
            console.log(`${winner.name} gano el juego. Hooray para el equipo ${winningTeam && winningTeam.name} 🎉🎊!.`);
            console.log('Escriba Ctrl + C para salir de juego Enter para continuar ')
            rl.close()
            Score.getInstance().roundIsOver = true;
            process.exit(0)
        }
    } catch (error) {
        console.log('error at the end', error)
    }


}

async function askAfterPregunta1(prompt: string): Promise<string> {
    let res = "";
    res = await ask(prompt);
    return res;
}


export { welcome, displayCelebration, listenForInput, firstMove, askAfterPregunta1, consecutiveMove }