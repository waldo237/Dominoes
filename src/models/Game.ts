
import { listenForInput, displayCelebration, pregunta1, pregunta2, welcome } from "../functions and utilities/userInputFunctions";
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
        const { teamSchema1, teamSchema2 } = await welcome();
        this.board.init(teamSchema1, teamSchema2);
        const players = this.board.playersArray;
        this.dealer.deal(players);
        this.dealer.monitorAndForceNextMove(this.board.nextPlayer());
        // pregunta1()
        pregunta2();

    }

    public reStartRound(): void {
        const players = this.board.playersArray;
        const dominoes = this.collectDominoes();
        this.dealer.shuffle(dominoes)
            .deal(players);
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
    public monitorState() {
        if (this.board.aPlayerHasWon()) {
            const winner = this.board.winningPlayer();
            if (winner) {
                const winningTeam = this.board.belongingTeam(winner)
                if (winningTeam) {
                    this.roundOrGameOver(winningTeam, winner);
                }
            }
        } else if (this.board.isDeadLock()) { //if none of the players can continue
            const currentP = this.score.currentPlayer;
            const nextP = currentP ? this.board.findNextPInLine(currentP) : null;
            if (currentP && nextP) {
                const ptsInC = currentP && currentP.totalPointsInHand();
                const ptsInN = nextP && nextP.totalPointsInHand();

                if (ptsInC <= ptsInN) { //the player with the least pts wins.
                    const winningTeam = this.board.belongingTeam(currentP)
                    if (winningTeam) this.roundOrGameOver(winningTeam, currentP)
                } else {
                    const winningTeam = this.board.belongingTeam(nextP)
                    if (winningTeam) this.roundOrGameOver(winningTeam, nextP)
                }
            }
        }
    }

    private roundOrGameOver(winningTeam: Team, winner: Player) {
        if (winningTeam.points >= this.score.topPoints) { //reached top(200)
            this.gameOver(winner, winningTeam);
        } else {
            this.RoundOver(winner, winningTeam);
        }
    }

    /**
    * The game is ended when one of the teams gets to total points
    */
    private async gameOver(winner: Player, winningTeam: Team): Promise<void> {
        this.score.writeGameWinner(this.board.winningPlayer());
        this.score.resetRounds();
        this.score.roundIsOver = true;
        this.score.gameIsOver = true;
        this.score.writeCurrentPlayer(null);
        await displayCelebration('game', winner, winningTeam);
    }

    /**
    *  a win is triggered and properly recorded when a player runs out of dominoes or
    * There is a deadlock or one player got more than 3 consecutive doubles
    * The resulting poings after a game is ended go to the winning team
    */
    private async RoundOver(winner: Player, winningTeam: Team) {
        this.distributePoints(winningTeam);
        this.score.roundIsOver = true;
        await displayCelebration('round', winner, winningTeam);
        this.reStartRound();
    }
    /**
     * After a round is over, all the points in the dominoes available, go to the winning team.
     */
    private distributePoints(winningTeam: Team): void {
        const players = this.board.playersArray;
        const totalPoints = players && players
            .map((player) => player.totalPointsInHand())
            .reduce((sum, num) => sum + num);
        winningTeam.points = totalPoints || 0;
    }
}

export default Game;