
import { brandLong, printHand } from "../functions and utilities/consolePrintFunctions";
import { listenForInput, displayCelebration, welcome, firstMove, askAfterPregunta1 } from "../functions and utilities/userInputFunctions";
import Board from "./Board";
import { Dealer } from "./Dealer";
import Domino from "./Domino";
import DominoesChain from "./DominoesChain";
import { Player } from "./Player";
import Score from "./Score";
import { Team } from "./Team";


class Game {
    private static instance: Game;
    private board: Board = Board.getInstance(); //initialize instance
    private dealer: Dealer = Dealer.getInstance(); //initialize instance
    private score: Score = Score.getInstance();//initialize instance
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    /**
     * The game initializer
     * prompts the user to enter the names of the players
     * initializes the board with both teams.
     * initializes the dealer
     */
    public async run(): Promise<void> {
        try {
            const { teamSchema1, teamSchema2 } = await welcome();
            this.board.init(teamSchema1, teamSchema2);
            const players = this.board.playersArray;
            this.dealer.deal(players);
            await this.pregunta1();
            await this.pregunta2();
            

        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 1. Haz un programa que prepare el inicio de un juego de dominoes. Esto incluye la estructura de datos de las piezas, barajarlas, y repartirlas entre 4 jugadores. Para probar, el juego puede imprimir en la consola las piezas de cada jugador. 
     */
    private async pregunta1() {
        brandLong("")
        console.log('pregunta 1❓')
        const { playersArray } = Board.getInstance();
        for (const player of playersArray) {
            console.log('player: ', player.name);
            printHand(player.dominoes);
            console.log('\n');
        }
        await askAfterPregunta1('Quieres ir a la pregunta 2 y 3❓. Presiona Enter')
        
    }

    /**
     * 2. Haz un programa que juegue una mano de dominoes, agregándole al punto anterior, que inicie el jugador que tenga doble seis, y que siga jugando el próximo jugador. Cuando un jugador tiene más de una opción para jugar, utiliza un algoritmo random para decidir la jugada. Debes imprimir en la consola cada jugada, o alguna otra forma de validarlas. 
     */
    async pregunta2(): Promise<void> {
        await firstMove()
        listenForInput();
    }

    public reStartRound(): Promise<boolean> {
        return new Promise((resolve) => {
            const players = this.board.playersArray;
            const dominoesFromThePlayers = this.collectDominoes();
            const dominoesFromTheChain = DominoesChain.getInstance().returnDominoes()
            this.dealer.shuffle([...dominoesFromThePlayers, ...dominoesFromTheChain])
                .deal(players);
            this.score.roundIsOver = false;
            resolve(true)
        })
    }

    private collectDominoes(): Domino[] {
        const players = this.board.playersArray;
        const collection: Domino[] = [];
        players?.forEach(player => collection.push(...player.returnDominoes()))
        return collection;
    }

    /**
     * checks the state of the game after every move.
     */
    public async stateMonitor(trigger: Player | null): Promise<void> {
        const winner = (trigger) ? trigger : null;
        const winningTeam = (winner) ? this.board.belongingTeam(winner) : null;
        const deadlock = this.board.isDeadLock();

        if (winner && winningTeam) {
            this.roundOrGameOver(winningTeam, winner);
        } else if (deadlock) { //if none of the players can continue
            console.log('🔐🔐🔐🔐 Hubo un tranque! 🔒🔒🔒🔒');
            const currentP = this.score.currentPlayer;
            const nextP = currentP ? this.board.findNextPInLine(currentP) : null;

            if (currentP && nextP) {//comparing current vs. next
                const ptsInC = currentP && currentP.totalPointsInHand();
                const ptsInN = nextP && nextP.totalPointsInHand();

                if (ptsInC <= ptsInN) { //the player with the least pts wins.
                    console.log(`y lo gano ${currentP.name} con ${ptsInC} sobre ${ptsInN} a ${nextP.name}.`);
                    if (winningTeam) this.roundOrGameOver(winningTeam, currentP)
                } else {
                    const winningTeam = this.board.belongingTeam(nextP)
                    console.log(`y lo gano ${nextP.name} con ${ptsInN} sobre ${ptsInC} a ${currentP.name}.`);
                    if (winningTeam) this.roundOrGameOver(winningTeam, nextP)
                }
            }
        }
    }

    private roundOrGameOver(winningTeam: Team, winner: Player) {
        this.score.roundIsOver = true;//either or, update the baord
        const newPoints = this.distributePoints(winningTeam); //get the points first
        winningTeam.addWin();
        if (winningTeam.points >= this.score.topPoints) { //reached top(200)
            this.gameOver(winner, winningTeam);
        } else {
            this.RoundOver(winner, winningTeam, newPoints);
        }
    }

    /**
    * The game is ended when one of the teams gets to total points
    */
    private async gameOver(winner: Player, winningTeam: Team): Promise<void> {
        try {
            this.score.writeCurrentPlayer(null);//game starting from scratch.
            this.score.writeGameWinner(winner);
            this.score.resetRounds();
            this.score.gameIsOver = true;
            await displayCelebration('game', winner, winningTeam, null);
            await this.reStartRound();
        } catch (error) {
            console.log(error);
        }
    }

    /**
    *  a win is triggered and properly recorded when a player runs out of dominoes or
    * There is a deadlock or one player got more than 3 consecutive doubles
    * The resulting poings after a game is ended go to the winning team
    */
    private async RoundOver(winner: Player, winningTeam: Team, gainedPoints: number) {
        try {

            this.score.writeCurrentPlayer(winner); //allow the previous player to continue playing.
            this.score.writeRoundWinner(winner);
            this.score.addToRounds();
            await displayCelebration('round', winner, winningTeam, gainedPoints);
            await this.reStartRound();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * After a round is over, all the points in the dominoes available, go to the winning team.
     */
    public distributePoints(winningTeam: Team): number { //public for testing
        const players = this.board.playersArray;
        const totalPoints = players.map((player) => player.totalPointsInHand())
            .reduce((sum, num) => sum + num, 0);
        winningTeam.points = totalPoints;
        return totalPoints;
    }
}

export default Game;