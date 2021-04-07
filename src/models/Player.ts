import { pickOne } from "../functions and utilities/util";
import { Domino } from "./Domino";
import { Leads } from "./Leads";



export class Player {
    private _dominoes: Domino[] = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get dominoes(): Domino[] {
        return this._dominoes;
    }

    /**
     * method that makes the comparison of the leads of the board
     * and the current Domino.
     * @param currentDomino 
     * @param leads 
     * @returns 
     */
    private compareHandWithBoard(currentDomino: Domino, leads: Leads | null) {
        if (leads) {
            return currentDomino.side1 === leads.lead1 ||
                currentDomino.side2 === leads.lead1 ||
                currentDomino.side1 === leads.lead2 ||
                currentDomino.side2 === leads.lead2;
        }
    }

    /**
     * simulates a move passing the returned domino to the dominoes chain.
     * @param leads  
     * The next move is randomized  when there is more than one option.: 
     * @returns 
     */
    public play(leads: Leads | null, input: Domino | null): Domino | null {
        //🧨🧨up til here you are working with input that is a copy and it hasn't  been taken away from the array.🧨🧨
        console.log(`${this.name} selected Domino`, input)
        console.log(`${this.name} selected leads`, leads)
        let res: Domino | null = null;
        const selection = this.dominoes.filter((currentDomino) => {
            return this.compareHandWithBoard(currentDomino, leads);
        });

        if (leads === null) { //if the dominoes chain is empty. 
            if (input?.side1 === 6 && input?.side2 === 6) {
                res = this.snatchOne(input);
            } else if (selection.length > 1) { //if you have more than one option
                res = pickOne(selection);//pick randomly.
            } else if (input) { 
                res = this.snatchOne(input);
            }
        }
        if (selection.length > 1) { //if you have more than one option
            res = pickOne(selection);//pick randomly.
        } else if (selection.length === 1) {//if there is only one option
            if (input) {//coming from the user.
                res = this.snatchOne(input);
            } else {//dealer played
                console.log('El arbitro decidio porque el jugador tomo demasiado tiempo.')
                res = res = this.snatchOne(selection[0]);
            }
        }
        console.log('this is the response', res);
        return res;
    }
    private snatchOne(input: Domino) {
        const index = this.dominoes.findIndex((dom) => dom === input);
        return  this.dominoes.splice(index, 1)[0];
    }

    /**
     * it is called in the first round to force the double six move when the game is started.
     * @param round 
     * @returns 
     */
    public playDoubleSix(round: number): Domino | null {
        let res: Domino | null = null;
        if (round == 0) {
            const i = this.dominoes.findIndex((domino) => domino.side1 === 6 && domino.side2 === 6);
            res = this.dominoes.splice(i, 1)[0];
        }
        return res;
    }

    /**
     * Lets the outside know that the player has the next move.
     * @param leads 
     * @returns 
     */
    public canPlayHand(leads: Leads | undefined): boolean {
        return this.dominoes
            .some((currentDomino) => this.compareHandWithBoard(currentDomino, leads || new Leads(null, null)))
    }

    /**
     * Receives dominoes from the dealer after starting game and after shuffle.
     * @param dominos 
     */
    public receiveDominoes(dominos: Domino[]): void {
        this._dominoes = dominos;
    }
    /**
      * returns all dominoes to the board so the dealer can reshuffle them.
      * @param dominos 
      */
    public returnDominoes(): Domino[] {
        return this.dominoes.splice(0, this.dominoes.length - 1);
    }

    /**
     * Inform whether the player has dominoes left.
     * @returns boolean
     */
    public hasDominoes(): boolean {
        return this.dominoes.length > 0;
    }

    /**
     * Says how many dominoes the player has.
     * @returns 
     */
    public DominoesNum(): number {
        return this.dominoes.length;
    }

    public hasDoubleSixInRound1(round: number): boolean {
        let res = false;
        if (round == 0) {
            this.dominoes.forEach((domino) => {
                if (domino.side1 === 6 && domino.side2 === 6) {
                    res = true;
                }
            });
        }
        return res;
    }

    public totalPointsInHand(): number {
        return this.dominoes
            .map((domino) => domino.side1 + domino.side2)
            .reduce((group, current) => group + current);
    }

}

