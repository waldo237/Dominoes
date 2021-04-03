import { Domino } from "./Domino";

class Leads {
    lead1: number;
    lead2: number;
    constructor(lead1: number, lead2: number) {
        this.lead1 = lead1;
        this.lead2 = lead2;
    }
}

export class Player {
    private dominoes: [Domino] | [] = []
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
    public play(leads: Leads): Domino {
        const selection = this.dominoes.map((currentDomino) => {
            return currentDomino.side1 === leads.lead1 ||
                currentDomino.side2 === leads.lead1 ||
                currentDomino.side1 === leads.lead2 ||
                currentDomino.side2 === leads.lead2
        })
       
    }
    public receiveDominoes([Domino]): void {

    }
    public pass(): boolean {

    }
    public hasDominoes(): boolean {
        return this.dominoes.length > 0;
    }

}

export class Team {
    constructor(parameters) {

    }
}

export class DominoesChain {
    private head: Domino
    private tail: Domino
    private body: [Domino]
    constructor(parameters) {

    }
}
export { Domino }