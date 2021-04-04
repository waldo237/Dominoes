import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";



class Board {
    private static instance: Board;
    private _topPoints = 200;
    private _rounds = 0;
    private _team1: Team | null = null;
    private _team2: Team | null = null;
    private _nextRoundStarter: Player | null = null;
    private _nextPlayer: Player | null = null;
    private _currentPlayer: Player | null = null;
    private _dominoesDisplay: DominoesChain | null = null;
    //##################debugging only ########################################
    public set dominoesDisplay(value: DominoesChain | null) {
        this._dominoesDisplay = value;
    }
    public get dominoesDisplay(): DominoesChain | null {
        return this._dominoesDisplay;
    }
    //##########################################################

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Board {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    init(team1: Team, team2: Team, dominoesDisplay: DominoesChain) {
        this._team1 = team1;
        this._team2 = team2;
        this._dominoesDisplay = dominoesDisplay;
    }

    public get currentPlayer(): Player | null {
        return this._currentPlayer;
    }
    public set currentPlayer(value: Player | null) {
        this._currentPlayer = value;
    }
    public get nextPlayer(): Player | null {
        return this._nextPlayer;
    }
    public set nextPlayer(value: Player | null) {
        this._nextPlayer = value;
    }
    public get nextRoundStarter(): Player | null {
        return this._nextRoundStarter;
    }
    public set nextRoundStarter(value: Player | null) {
        this._nextRoundStarter = value;
    }
    public get team1(): Team | null {
        return this._team1;
    }
    public get team2(): Team | null {
        return this._team2;
    }
    public get rounds(): number {
        return this._rounds;
    }
    public set rounds(value: number) {
        this._rounds = value;
    }

    public get topPoints(): number {
        return this._topPoints;
    }
    private getPlayersArray() {
        if (this.team1 && this.team2) {
            const { player1: t1p1, player2: t1p2 } = this.team1;
            const { player1: t2p1, player2: t2p2 } = this.team2;
            return [t1p1, t1p2, t2p1, t2p2]
        }
    }
    /**
    * 🧪The game was ended when one of the teams.points gets to 200 🧪
    * @param Player
    * @param param1
    */
    public gameOver(): boolean {
        if (this.team1 && this.team2) {
            return this.team1.points >= this.topPoints ||
                this.team2.points >= this.topPoints;
        }
        return false;
    }
    /**
      *  🧪 a win is triggered and properly recorded when a player runs out of dominoes 🧪
      * The resulting poings after a game is ended go to the winning team
      * @param Player
      * @param param1
      */
    public didRoundEnd(): boolean {
//TODO
    }
    /**
     * 🧪a deadlock is declared when there are no more matches🧪
     * @param DominoesChain
     * @param player
     * @param param2
     */
    public isDeadLock(): boolean {
        const deadLock = this.getPlayersArray()?.filter((p) => { this._dominoesDisplay?.showLeads() });
        return deadLock?.length === 0;
    }

    /**
     * triggers the output to the console using 
     * the internal dominoes display and its print
     * formatter to output content to the screen.
     */
    public print(): void {
        this.dominoesDisplay?.print();

    }
}

export default Board;