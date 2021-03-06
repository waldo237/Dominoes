import { pickOne } from "../functions and utilities/util";
import { Domino } from "./Domino";
import { v4 } from 'uuid'
import { Leads } from "./Leads";
import Score from "./Score";



export class Player {
    private _dominoes: Domino[] = [];
    private _name: string;
    private _id: string = v4();

    constructor(name: string) {
        this._name = name;
    }
    public get id(): string {
        return this._id;
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
     * The next move is randomized  when there is more than one option.: 
     * @param leads  
     * @returns 
     */
    public play(leads: Leads | null, input: Domino | null): Domino | null {
        const optionsAvailable: Domino[] = [];
        this.dominoes.forEach((currentDomino) => {
            if (this.compareHandWithBoard(currentDomino, leads)) {
                optionsAvailable.push(this.snatchOne(currentDomino))
            }
        });

        if (leads === null) { //if the dominoes chain is empty, you are the first playing.
            if (this.hasDoubleSixInRound1(0) && Score.getInstance().rounds === 0) {
                return this.playDoubleSix(0);
            }
            // if the player has doubles, have him, play it.
            const index = this.dominoes.findIndex((domino) => domino.side1 === domino.side2);
            if (index !== -1) {
                return this.dominoes.splice(index,1)[0];
            } else {
                return pickOne(this.dominoes);
            }
        }
        //not the first one playing
        if (optionsAvailable.length > 1) { // you have more than one option
            const selected = pickOne(optionsAvailable);//pick randomly.
            this.dominoes.push(...optionsAvailable); //return the ones you didn't use.
            return selected;
        } else if (optionsAvailable.length === 1) {//if there is only one option
            if (input) {//coming from the user.
                // what if the user played the wrong card? 
                return optionsAvailable[0];
            } else {//the domino is null and it could only have come from dealer.
                console.log('El arbitro decidio porque el jugador tomo demasiado tiempo.') //this functionality was removed
                return optionsAvailable[0];
            }
        }

        console.log(`??????????????? ${this.name} no va..???????????????`)

        return null;
    }

    private snatchOne(input: Domino) {
        const index = this.dominoes.findIndex((dom) => dom === input);
        return this.dominoes.splice(index, 1)[0];
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
        return this.dominoes.splice(0, this.dominoes.length);
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
        // return
        return this.dominoes
            .map((domino) => (domino) ? domino.side1 + domino.side2 : 0)
            .reduce((sum, num) => sum + num, 0);
    }

}

