import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";


/**
 * The board monitors the interaction of the teams, players
 * and the chain of dominoes.
 */
class Board {
    private static instance: Board;
    private _team1: Team | null = null;
    private _team2: Team | null = null;
    private _dominoesDisplay: DominoesChain | null = null;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Board {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    private init(team1: Team, team2: Team, dominoesDisplay: DominoesChain): void {
        this._team1 = team1;
        this._team2 = team2;
        this._dominoesDisplay = dominoesDisplay;
    }

    public get team1(): Team | null {
        return this._team1;
    }
    public get team2(): Team | null {
        return this._team2;
    }
    public getPlayersArray() {
        if (this.team1 && this.team2) {
            const { player1: t1p1, player2: t1p2 } = this.team1;
            const { player1: t2p1, player2: t2p2 } = this.team2;
            return [t1p1, t1p2, t2p1, t2p2]
        }
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
        const deadLock = this.getPlayersArray()?.filter((p) => {
            return p.hasDominoes() && !p.canPlayHand(this._dominoesDisplay?.showLeads())
        });
        return deadLock?.length === 4;
    }

    /**
     * triggers the output to the console using 
     * the internal dominoes display and its print
     * formatter to output content to the screen.
     */
    public print(): void {
        this._dominoesDisplay?.print();

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
}
export default Board;