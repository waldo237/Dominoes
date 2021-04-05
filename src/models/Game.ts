import { welcome } from "../functions and utilities/consoleInteractionFunctions";
import Board from "./Board";
import { Dealer } from "./Dealer";
import Domino from "./Domino";
import Score from "./Score";

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
     * Sets the scores on the board 🧨🧨🎇🎇🎇🧨
     * initializes the dealer
     */
    public async run(): Promise<void> {
        const { team1, team2 } = await welcome();
       
        this.board.init(team1, team2);
        const players = this.board.getPlayersArray();
        this.dealer.deal(players);
        this.dealer.monitorAndForceNextMove(this.board.getCurrentPlayer());
        console.log(JSON.stringify(this.board.team1?.player1));
        this.monitorState();
    }


    private celebrate() {
        this.board.displayCelebration();
    }

    private monitorState() {
        if (this.board.isRoundOver()) {
            Promise.resolve(() => {
                const timeOut = setTimeout(async () => {
                    Promise
                        .resolve(this.distributePoints())
                        .then(this.celebrate)
                        .catch((err) => console.log('an error happend', err));
                }, 30000); //30 seconds to celebrate
                clearTimeout(timeOut);
            })
                .then(this.reStartRound)
        }
    }


    public reStartRound(): void {
        const players = this.board.getPlayersArray();
        const dominoes = this.collectDominoes();
        this.dealer.shuffle(dominoes)
            .deal(players);
    }


    public collectDominoes<T>(): Domino[] {
        const players = this.board.getPlayersArray();
        const dominoes = players?.map(player => player.returnDominoes())
        if (dominoes) return ([] as Domino[]).concat(...dominoes);
        return []
    }
    /**
     * 🧪The resulting poings after a game is over, go to the winning team 🧪
     */
    public distributePoints(): void {
        const winner = this.board.winningPlayer();
        if (winner) {
            const winningTeam = this.board.belongingTeam(winner);
            const players = this.board.getPlayersArray();
            const totalPoints = players && players
                .map((player) => player.totalPointsInHand())
                .reduce((sum, num) => sum + num);
            if (winningTeam) winningTeam.points = totalPoints || 0;
        }
    }
}

export default Game;