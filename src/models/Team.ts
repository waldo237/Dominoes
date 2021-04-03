import { Player } from "./Player";


export class Team {
    private _points = 0;
    private _wins = 0;
    private _player1: Player;
    private _player2: Player;

    constructor(player1: Player, player2: Player) {
        this._player1 = player1;
        this._player2 = player2;
    }

    public get wins(): number {
        return this._wins;
    }
    public set wins(value: number) {
        this._wins = value;
    }
    public get points(): number {
        return this._points;
    }
    public set points(value: number) {
        this._points = value;
    }
    public get player1(): Player {
        return this._player2;
    }
    public get player2(): Player {
        return this._player2;
    }

}
