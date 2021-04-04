import Board from "./Board";
import { Dealer } from "./Dealer";
import Domino from "./Domino";
import Score from "./Score";

class Game {
    private static instance: Game;
    private _rules: Rules[] = [];
    private board: Board = Board.getInstance(); //initialize instance
    private dealer: Dealer = Dealer.getInstance(); //initialize instance
    private score: Score = Score.getInstance();//initialize instance
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
            Promise.resolve(() => {
                const timeOut = setTimeout(async () => {
                    Promise
                        .resolve(this.distributePoints())
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
        const dominoes = this.collectDominoes();
        const players = this.board.getPlayersArray();
        this.dealer.shuffle(dominoes);
        players?.forEach(currentPlayer => currentPlayer.receiveDominoes(this.dealer.deal()));

    }
    public printRules(): void {
        this._rules.forEach((rule, i) => {
            console.log(`${i + 1}-${rule.ruleType}: ${rule.description}`);
        });
    }
    public collectDominoes<T>(): Domino[] {
        const players = this.board.getPlayersArray();
        const dominoes = players?.map(player => player.returnDominoes())
        if (dominoes) return ([] as Domino[]).concat(...dominoes);
        return []
    }
    /**
     * 🧪The resulting poings after a game is over, go to the winning team 🧪
     */
    public distributePoints(): void {
        const winner = this.board.winningPlayer();
        if (winner) {
            const winningTeam = this.board.belongingTeam(winner);
            const players = this.board.getPlayersArray();
            const totalPoints = players && players
                .map((player) => player.totalPointsInHand())
                .reduce((sum, num) => sum + num);
            if (winningTeam) winningTeam.points = totalPoints || 0;
        }
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
export { Game, Board }