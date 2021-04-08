import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";
import { teamNames } from "../functions and utilities/userInputFunctions";
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

    public aPlayerHasWon(): boolean {
        return this.playersArray?.some(player => !player.hasDominoes());
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
    * After round starter, player1 from the opposite team continues playing.
     */
    public nextPlayer(): Player | null {
        const { rounds, currentPlayer } = Score.getInstance();
        const players = this.playersArray;
        let meetsConditions: Player | null | undefined;

        if (rounds === 0 && !currentPlayer) { //first round and the first player
            meetsConditions = players.find((player) => player.hasDoubleSixInRound1(rounds)); //the player with 6/6
        } else {
            if(currentPlayer) meetsConditions = this.findNextPInLine(currentPlayer);
        }
        return meetsConditions || null;
    }

    public findNextPInLine(currentPlayer: Player): Player | null {
        let res: Player | null = null;
        const index = (currentPlayer) ? this.playersArray.indexOf(currentPlayer) : -1;
        if (index !== -1) { //indexOf returns -1
            if (index === 3) {
                res = this.playersArray[0];
            } else {
                res = this.playersArray[index + 1];
            }
        }
        return res;
    }
}
export default Board;