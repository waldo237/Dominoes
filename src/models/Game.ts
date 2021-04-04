import Board from "./Board";
import { Dealer } from "./Dealer";

class Game {
    private static instance: Game;
    private _rules: Rules[] = [];
    private board: Board = Board.getInstance(); //initialize instance
    private dealer: Dealer = Dealer.getInstance(); //initialize instance
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    public get rules(): Rules[] {
        return this._rules;
    }
    public set rules(value: Rules[]) {
        this._rules = value;
    }
    private celebrate() {
        this.board.displayCelebration();
    }


    private monitorState() {
        if (this.board.isRoundOver()) {
            Promise.resolve(()=>{
                const timeOut = setTimeout(async () => {
                    Promise
                        .resolve(this.board.distributePoints())
                        .then(this.celebrate)
                        .catch((err) => console.log('an error happend', err));
                }, 30000); //30 seconds to celebrate
                clearTimeout(timeOut);
            })
            .then(this.reStartRound)
        }
    }

    public run(): void {
        this.monitorState();
    }
    public reStartRound(): void {
    const dominoes = this.board.collectDominoes();
    const players = this.board.getPlayersArray();
       this.dealer.shuffle(dominoes);
       players?.forEach((currentPlayer)=>{
           currentPlayer.receiveDominoes(this.dealer.deal());
       });
    }
    public printRules(): void {
        this._rules.forEach((rule, i) => {
            console.log(`${i + 1}-${rule.ruleType}: ${rule.description}`);
        });
    }
}
enum rulesEnum {
    COMENZAR,
    GANAR,
    TIEMPO_DE_JUEGO,
    GENERAL
}

class Rules {

    private _ruleType: rulesEnum = rulesEnum.GENERAL;
    private _description = "";
    constructor(ruleType: rulesEnum, description: string) {
        this._ruleType = ruleType;
        this.description = description;
    }
    public get ruleType(): rulesEnum {
        return this._ruleType;
    }
    public set ruleType(value: rulesEnum) {
        this._ruleType = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
}