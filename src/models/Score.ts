
import { Player } from "./Player";
import Board from "./Board";

class Score {
    private static instance: Score;
    private _topPoints = 200;
    private _rounds = 0;
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
    public writeCurrentPlayer(value: Player | null):void {
        this._currentPlayer = value;
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
    * The game is ended when one of the teams gets to total points
    * @param Player
    * @param param1
    */
     public isGameOver(): boolean {
         const {team1, team2} = Board.getInstance();
        if (team1 && team2) {
            return team1.points >= this.topPoints ||
                team2.points >= this.topPoints;
        }
        return false;
    }

}
export default Score;