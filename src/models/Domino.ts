type numRange = |0 | 1 | 2 | 3 | 4 | 5 | 6|number;

/**
 * A data structure that represents a domino, similar to a
 * node in a SinglyList it can remember what next and what's behind
 */
export class Domino {
    private _side1: numRange;
    private _side2: numRange;

    private _next:number |null = null;

    constructor(side1: numRange, side2: numRange) {
        this._side1 = side1;
        this._side2 = side2;
    }
    public get next():number |null {
        return this._next;
    }
    public set next(value:number |null) {
        this._next = value;
    }

    public get side2(): numRange {
        return this._side2;
    }

    public get side1(): numRange {
        return this._side1;
    }

    public get total(): number {
        return this._side1 + this._side2;
    }
    public isDouble(): boolean {
        return this._side1 === this.side2;
    }
    public isDoubleSix(): boolean {
        return this._side1 === 6 && this._side1 === 6;
    }
}

export default Domino; export type {numRange}