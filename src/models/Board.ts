import { Team, Player, DominoesChain } from "./schemas";

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

    public get dominoesDisplay(): DominoesChain | null {
        return this._dominoesDisplay;
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
}
