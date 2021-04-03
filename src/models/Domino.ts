type numRange = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class Domino {
    private _side1: numRange;
    private _side2: numRange;
    private _frontInTheChain = 0;

    constructor(side1: numRange, side2: numRange) {
        this._side1 = side1;
        this._side2 = side2;
    }
    public get frontInTheChain(): number {
        return this._frontInTheChain;
    }
    public set frontInTheChain(value: number) {
        this._frontInTheChain = value;
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
        return this._side1 === this.side2
    }
    public isDoubleSix(): boolean {
        return this._side1 === 6 && this._side1 === 6;
    }
}

export default Domino;