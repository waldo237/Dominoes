import { Player } from "./Player";


export class Team {
    private _points = 0;
    private _wins = 0;
    private _player1: Player;
    private _player2: Player;
    private _name: string;

    constructor(name: string, player1: Player, player2: Player) {
        this._name = name;
        this._player1 = player1;
        this._player2 = player2;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get wins(): number {
        return this._wins;
    }

    public get points(): number {
        return this._points;
    }
    /**
     * not a tipical setter, it adds the number
     * instead of subtituting it. use the clearPoints
     * method to reset the number to 0
     */
    public set points(value: number) {
        this._points += value;
    }
    public get player1(): Player {
        return this._player2;
    }
    public get player2(): Player {
        return this._player2;
    }
    public clearPoints(): void {
        this._points = 0;
    }
    /**
   * It adds one to the wins property.
   */
    public addWin(): void {
        this._wins += 1;
    }
}
