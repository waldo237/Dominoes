import { pickOne } from "../functions/util";
import { Domino } from "./Domino";
import { Leads } from "./schemas";


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
    public play(leads: Leads): Domino {
        const selection = this.dominoes.filter((currentDomino) => {
            return currentDomino.side1 === leads.lead1 ||
                currentDomino.side2 === leads.lead1 ||
                currentDomino.side1 === leads.lead2 ||
                currentDomino.side2 === leads.lead2;
        });
        return pickOne<Domino>(selection);
    }

    public receiveDominoes(Dominos: Domino[]): void {
        this.dominoes = Dominos;
    }

    public hasDominoes(): boolean {
        return this.dominoes.length > 0;
    }

}
