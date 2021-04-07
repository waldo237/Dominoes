
import { Player } from "./Player";

class Score {
    private static instance: Score;
    private _topPoints = 200;
    private _rounds = 0;
    private _currentPlayer: Player | null = null;
    private _lastRoundWinner: Player | null = null;
    private _lastGameWinner: Player | null = null;
    private _roundIsOver = false;
    private _gameIsOver = false;
    
    
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Score {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
    public get gameIsOver(): boolean {
        return this._gameIsOver;
    }
    public set gameIsOver(value: boolean) {
        this._gameIsOver = value;
    }
 
    public get roundIsOver(): boolean {
        return this._roundIsOver;
    }
    public set roundIsOver(value: boolean) {
        this._roundIsOver = value;
    }
    public get lastRoundWinner(): Player | null {
        return this._lastRoundWinner;
    }
    public get lastGameWinner(): Player | null {
        return this._lastGameWinner;
    }
    public get currentPlayer(): Player | null {
        return this._currentPlayer;
    }
    public get rounds(): number {
        return this._rounds;
    }
    public get topPoints(): number {
        return this._topPoints;
    }

    /**
    * Adds 1 to the number of rounds
    * @param value 
    */
    public addToRounds(): void {
        this._rounds += 1;
    }
    /**
    * resets the number of rounds when the game is over.
    * @param value 
    */
    public resetRounds(): void {
        this._rounds = 0;
    }

    /**
     * writes record of who the next player is. 
     * The information comes from the board.
    * @param value 
    */
    public writeCurrentPlayer(value: Player | null): void {
        this._currentPlayer = value;
    }

    /**
    * writes record of who won the round. 
    * The information comes from the board.
    * @param value 
    */
    public writeRoundWinner(value: Player | null): void {
        this._lastRoundWinner = value;
    }

    /**
   * writes record of who won the game. 
   * The information comes from the board.
   * @param value 
   */
    public writeGameWinner(value: Player | null): void {
        this._lastGameWinner = value;
    }
}
export default Score;