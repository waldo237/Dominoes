import { Domino } from "./Domino";
import { Leads } from "./Leads";


/**
 * A data structure that represents the chain of 
 * Dominoes on a table. Its _store is an array, not a 
 * DoublyLinkedList because it facilitates the interaction
 * with the other objects that use arrays.
 * 
 */
class DominoesChain {
    public static instance: DominoesChain
    private _store: Domino[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): DominoesChain {
        if (!DominoesChain.instance) {
            DominoesChain.instance = new DominoesChain();
        }
        return DominoesChain.instance;
    }
    public get store(): Domino[] {
        return this._store;
    }
    // this sacrificies O(n) for inserts at the head
    private insertAtHead(domino: Domino): void {
        this._store = [domino, ...this._store];
    }
    private insertAtTail(domino: Domino): void {
        this._store.push(domino);
    }

    public isEmpty(): boolean {
        return this._store.length === 0;
    }
    private getHead(): Domino {
        return this._store[0];
    }
    private getTail(): Domino {
        return this._store[this._store.length - 1];
    }
    private getSize(): number {
        return this._store.length;
    }

    public returnDominoes(): Domino[] {
        return this._store.splice(0, this._store.length);
    }
    /**
     * Follows a complex control flow to simulate laying a domino on a table.
     * @param domino 
     * @returns void
     */
    public addDomino(domino: Domino): void {
        const { side1, side2 } = domino;
        if (this.isEmpty()) { //if the _store is empty
            if (domino.isDouble()) {
                // if both faces of the domino are equal, any of them can be the next.
                domino.firstInserted = true;
                domino.direction = false;
                return this.insertAtTail(domino);
            } else {
                // the very next domino will set the direction and the next property.
                domino.direction = false;
                //Signal that any of the sides can be next.
                domino.firstInserted = true;
                return this.insertAtTail(domino);
            }
        } else {
            // The second domino in the chain. if so, set the direction to true.
            if (this._store.length === 1) {
                const firstDomino = this.getHead();
                // check against the first domino
                if (side1 === firstDomino.side1) {
                    domino.next = side2;
                    firstDomino.next = firstDomino.side2;
                    domino.direction = true; //initialize a direction
                    return this.insertAtTail(domino);
                } else if (side1 === firstDomino.side2) {
                    domino.next = side2;
                    firstDomino.next = firstDomino.side1;
                    domino.direction = true; //initialize a direction
                    return this.insertAtTail(domino);
                } else if (side2 === firstDomino.side1) {
                    domino.next = side1;
                    firstDomino.next = firstDomino.side2;
                    domino.direction = true; //initialize a direction
                    return this.insertAtTail(domino);
                } else if (side2 === firstDomino.side2) {
                    domino.next = side1;
                    firstDomino.next = firstDomino.side1;
                    domino.direction = true; //initialize a direction
                    return this.insertAtTail(domino);
                }
            }

            // the rest of the numbers
            const head = this.getHead();
            const tail = this.getTail();


            if (side1 === head.next) {
                domino.next = side2;
                domino.direction = head.direction;
                return this.insertAtHead(domino);
            } else if (side1 === tail.next) {
                domino.next = side2;
                domino.direction = tail.direction;
                return this.insertAtTail(domino);
            }
            else if (side2 === head.next) {
                domino.next = side1;
                domino.direction = head.direction;
                return this.insertAtHead(domino);
            } else if (side2 === tail.next) {
                domino.next = side1;
                domino.direction = tail.direction;
                return this.insertAtTail(domino);
            }
        }
        console.log('Hey! Esa ficha no cabe en esta mano!!')
    }

    /**
     * shows the outside whats on the two ends of the _store.
     * It may be null so it must be handled properly.
     */
    public showLeads(): Leads | null {
        // if there is only one domino and is double, both of its sides will be the two leads.
        const head = this.getHead();
        const tail = this.getTail();
        if (!head) {
            return null;
        }
        if (this.getSize() === 1) {
            const lead1 = head.side1;
            const lead2 = tail.side2;
            const leads = new Leads(lead1, lead2);
            return leads;
        } else {
            const lead1 = head.next;
            const lead2 = tail.next;

            const leads = new Leads(lead1, lead2);
            return leads;
        }
    }

}
export default DominoesChain;