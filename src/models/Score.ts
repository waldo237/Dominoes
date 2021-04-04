import DominoesChain from "./DominoesChain";
import { Team } from "./Team";
import { Player } from "./Player";
import Domino from "./Domino";



class Score {
    private static instance: Score;
    private _topPoints = 200;
    private _rounds = 0;
    private _nextRoundStarter: Player | null = null;
    private _nextPlayer: Player | null = null;
    private _currentPlayer: Player | null = null;


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Score {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
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

    public get rounds(): number {
        return this._rounds;
    }
    public set rounds(value: number) {
        this._rounds = value;
    }

    public get topPoints(): number {
        return this._topPoints;
    }
    
    /**
    * 🧪The game is ended when one of the teams.points gets to 200 🧪
    * @param Player
    * @param param1
    */
     public isGameOver(team1:Team,team2:Team ): boolean {
        if (team1 && team2) {
            return team1.points >= this.topPoints ||
                team2.points >= this.topPoints;
        }
        return false;
    }

}
export default Score;