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
    public playersArray: Player[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Board {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    public init(tNames1: teamNames, tNames2: teamNames): void {
        const { p1, p2, t: t1 } = this.formTeam('team1', tNames1)
        const { p1: p3, p2: p4, t: t2 } = this.formTeam('team2', tNames2)
        this._team2 = t2;
        this._team1 = t1;
        this.playersArray = [p1, p3, p2, p4];
    }

    private formTeam(title: string, tNames1: teamNames) {
        const p1 = new Player(tNames1.player1);
        const p2 = new Player(tNames1.player2);
        const t = new Team(title, p1, p2);
        return { t, p1, p2 };
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
        return this.playersArray
    }
    private aPlayerHasWon() {
        this.playersArray?.some(player => !player.hasDominoes());
    }
    public winningPlayer(): Player | null {
        return this.playersArray?.find(player => !player.hasDominoes()) || null;
    }
    public belongingTeam(player: Player): Team | null | undefined {
        const theTeam = [this.team1, this.team2].find(team => team?.player1 === player
            || team?.player2 === player);
        return theTeam;
    }


    /**
      *  a win is triggered and properly recorded when a player runs out of dominoes or
      * There is a deadlock or one player got more than 3 consecutive doubles
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
     * a deadlock is declared when there are no more matches
     * @param DominoesChain
     * @param player
     * @param param2
     */
    public isDeadLock(): boolean {
        const deadLock = this.playersArray.filter((p) => {
            const leads = this._dominoesDisplay.showLeads();
            if (leads) return p.hasDominoes() && !p.canPlayHand(leads)
        });
        return deadLock?.length === 4;
    }


    /**
    * The very first game starts (rounds==0) a player with [6|6] starts.
    * After round starter, player1 from the opposite team continues playing
     */
    public getCurrentPlayer(): Player | null {
        const { rounds, currentPlayer } = Score.getInstance();
        const players = this.playersArray;
        let pWith6n6: Player | null | undefined;

        if (rounds === 0) {
            pWith6n6 = players.find((player) => player.hasDoubleSixInRound1(rounds));

            Score.getInstance().writeCurrentPlayer(pWith6n6 || null);
        } else {
            const index = (currentPlayer) ? players.indexOf(currentPlayer) : -1;
            if (index !== -1) {
                if (index === 3) {
                    players[0];
                } else {
                    players[index + 1];
                }
            }
            Score.getInstance().writeCurrentPlayer(pWith6n6 || null);
        }
        return pWith6n6 || null;
    }

}
export default Board;