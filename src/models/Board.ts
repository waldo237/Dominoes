import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";
import Domino from "./Domino";



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
    private winningPlayer() {
        return this.getPlayersArray()?.find(player => !player.hasDominoes());
    }
    private belongingTeam(player: Player): Team | null | undefined {
        const theTeam = [this.team1, this.team2].find(team => team?.player1 === player
            || team?.player2 === player);
        return theTeam;
    }

    /**
    * 🧪The game is ended when one of the teams.points gets to 200 🧪
    * @param Player
    * @param param1
    */
    public isGameOver(): boolean {
        if (this.team1 && this.team2) {
            return this.team1.points >= this.topPoints ||
                this.team2.points >= this.topPoints;
        }
        return false;
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

    /**
     * 🧪The resulting poings after a game is over, go to the winning team 🧪
     */
    public distributePoints():void {
        const winner = this.winningPlayer()
        if (winner) {
            const winningTeam = this.belongingTeam(winner)
            const players = this.getPlayersArray();
            const totalPoints = players && players
                .map((player) => player.totalPointsInHand())
                .reduce((sum, num) => sum + num);
            if (winningTeam) winningTeam.points = totalPoints || 0;
        }
    }
    public collectDominoes<T>():Domino[]{
        const players = this.getPlayersArray();
        const dominoes = players?.map(player=>player.returnDominoes())
        if(dominoes) return ([] as Domino[]).concat(...dominoes);
        return []
    }
}
export default Board;