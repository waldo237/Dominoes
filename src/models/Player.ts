import { pickOne } from "../functions and utilities/util";
import { Domino } from "./Domino";
import { Leads } from "./Leads";



export class Player {
    private dominoes: Domino[] = [];
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

    /**
     * method that makes the comparison of the leads of the board
     * and the current Domino.
     * @param currentDomino 
     * @param leads 
     * @returns 
     */
    private compareHandWithBoard(currentDomino: Domino, leads: Leads) {
        return currentDomino.side1 === leads.lead1 ||
            currentDomino.side2 === leads.lead1 ||
            currentDomino.side1 === leads.lead2 ||
            currentDomino.side2 === leads.lead2;
    }

    /**
     * @param leads 🧪 The next move is randomized  when there is more than one option.🧪: 
     * • Cuando un jugador tiene más de una opción para jugar: 
     * utiliza un algoritmo random para decidir la jugada.
     * @returns 
     */
    public play(leads: Leads): Domino {
        const selection = this.dominoes.filter((currentDomino) => {
            return this.compareHandWithBoard(currentDomino, leads);
        });
        if (selection.length > 1) {
            return pickOne<Domino>(selection);
        }
        return selection[0];
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
        this.dominoes.push(...dominos);
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
    public hasDoubleSixInRound1(round: number): boolean {
        let res = false;
        if (round==0) {
            this.dominoes.forEach(domino => {
                if (domino.side1 === 6 && domino.side1 === 6) {
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

