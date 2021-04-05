import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";
import { printChainOfDominoes, teamNames } from "../functions and utilities/consoleInteractionFunctions";
import Score from "./Score";



/**
 * The board monitors the interaction of the teams, players
 * and the chain of dominoes.
 */
class Board {
    private static instance: Board;
    private _team1: Team | null = null;
    private _team2: Team | null = null;
    private _dominoesDisplay = DominoesChain.getInstance();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Board {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    public init(tNames1: teamNames, tNames2: teamNames): Board {
        const p1 = new Player(tNames1.player1)
        const p2 = new Player(tNames1.player2)
        const p3 = new Player(tNames2.player1)
        const p4 = new Player(tNames2.player2)
        const t1 = new Team('team1', p1, p2);
        const t2 = new Team('team1', p3, p4);
        this._team1 = t1;
        this._team2 = t2;
        return this;
    }

    public get team1(): Team | null {
        return this._team1;
    }
    public get team2(): Team | null {
        return this._team2;
    }
    /**
     * Gets the players off their team and returns an array in an
     * order that simulates the turns in a domino game.
     * @returns 
     */
    public getPlayersArray(): Player[] {
        let res: Player[] = [];
        if (this.team1 && this.team2) {
            const { player1: t1p1, player2: t1p2 } = this.team1;
            const { player1: t2p1, player2: t2p2 } = this.team2;
            res = [t1p1, t2p1, t1p2, t2p2]//preserves the order
        }
        return res;
    }
    private aPlayerHasWon() {
        this.getPlayersArray()?.some(player => !player.hasDominoes());
    }
    public winningPlayer(): Player | null {
        return this.getPlayersArray()?.find(player => !player.hasDominoes()) || null;
    }
    public belongingTeam(player: Player): Team | null | undefined {
        const theTeam = [this.team1, this.team2].find(team => team?.player1 === player
            || team?.player2 === player);
        return theTeam;
    }


    /**
      *  🧪 a win is triggered and properly recorded when a player runs out of dominoes or
      * There is a deadlock or one player got more than 3 consecutive doubles🧪
      * The resulting poings after a game is ended go to the winning team
      * @param Player
      * @param param1
      */
    public isRoundOver(): boolean {
        if (this.isDeadLock() || this.aPlayerHasWon()) {
            return true;
        }
        return false;
    }

    /**
     * 🧪a deadlock is declared when there are no more matches🧪
     * @param DominoesChain
     * @param player
     * @param param2
     */
    public isDeadLock(): boolean {
        const deadLock = this.getPlayersArray().filter((p) => {
            const leads = this._dominoesDisplay.showLeads();
           if(leads) return p.hasDominoes() && !p.canPlayHand(leads)
        });
        return deadLock?.length === 4;
    }


    /**
     * - test10: 🧪 The next matching domino is added to 
     * the correct end of the chain with the frontInTheChain property properly pointed outwards 🧪: 
     * - test 11: 🧪 On the console, the doubles go horizontally 🧪 : 
     */
    public print(): void {
        printChainOfDominoes(this._dominoesDisplay.store);

    }

    public displayCelebration(): void {
        const winner = this.winningPlayer()
        if (winner) {
            const winningTeam = this.belongingTeam(winner)
            console.log("%c 💛💛GAME OVER💛💛", "color:green");
            console.log(`%c ${winner.name} ha ganado el juego y aporto ${winningTeam && winningTeam.points}  a para su equipo! felicitaciones, ${winningTeam && winningTeam.name}🎉🎊!.`, "color:blue");

        } else {
            console.log("a celebration was trigger but there is a problem with celebration message.")
        }
    }

    /**
    * The very first game starts (rounds==0) a player with [6|6] starts.
    * After round starter, player1 from the opposite team continues playing
     */
    public getCurrentPlayer(): Player | null {
        const { rounds, writeCurrentPlayer, currentPlayer } = Score.getInstance();
        const players = this.getPlayersArray();
        let pWith6n6: Player | null | undefined;

        if (rounds === 0) {
            pWith6n6 = players.find((player) => player.hasDoubleSixInRound1(rounds));
            Score.getInstance().writeCurrentPlayer(pWith6n6 || null);
        } else {
            const index = (currentPlayer) ? players.indexOf(currentPlayer) : -1;
            if(index !== -1){
                if(index === 3){
                    players[0];
                }else{
                    players[index + 1];
                }
            } 
            Score.getInstance().writeCurrentPlayer(pWith6n6 || null);
        }
        return pWith6n6 || null;
    }

}
export default Board;