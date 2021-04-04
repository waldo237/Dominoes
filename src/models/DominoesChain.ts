import { Domino } from "./Domino";
import { Leads } from "./Leads";

enum itGoes {
    TO_THE_HEAD,
    TO_THE_TAIL,
    NOWHERE
}

/**
 * A data structure that represents the chain of 
 * Dominoes on a table. Its store is an array, not a 
 * DoublyLinkedList because it facilitates the interaction
 * with the other objects that use arrays.
 * 
 */
class DominoesChain {
    public static instance: DominoesChain
    private store: Domino[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): DominoesChain {
        if (!DominoesChain.instance) {
            DominoesChain.instance = new DominoesChain();
        }
        return DominoesChain.instance;
    }
    private insertAtHead(domino: Domino): void {
        this.store = [domino, ...this.store];
    }
    private insertAtTail(domino: Domino): void {
        this.store.push(domino);
    }
    public reset(): void {
        this.store = [];
    }
    public isEmpty(): boolean {
        return this.store.length === 0;
    }
    private getHead(): Domino {
        return this.store[0];
    }
    private getTail(): Domino {
        return this.store[this.store.length - 1];
    }
    private getSize(): number {
        return this.store.length;
    }

    /**
     * helper function to abstract logic
     * @param dominoSide 
     * @returns itGoes enum
     */
    placeOf(dominoSide: number): itGoes {
        const head = this.getHead();
        const tail = this.getTail();
        if (head.firstInserted && (dominoSide === head.side1 || dominoSide === head.side2)) {
            return itGoes.TO_THE_TAIL;
        }
        else if (dominoSide === head.next) {
            return itGoes.TO_THE_HEAD
        } else if (dominoSide === tail.next) {
            return itGoes.TO_THE_TAIL;
        }
        return itGoes.NOWHERE;
    }

    /**
     * helper function to determine the lead either of the head or tail
     * It sets the 'next' and the 'direction' fields, does the insert and returns a boolean
     * @param selectedSide 
     * @param theOtherSide 
     * @param domino 
     * @returns boolean
     */
    determineLead(selectedSide: number, theOtherSide: number, domino: Domino): boolean {
        let result = false;
        switch (this.placeOf(selectedSide)) {
            case itGoes.TO_THE_HEAD:
                domino.next = theOtherSide;
                domino.direction = this.getHead().direction;
                this.insertAtHead(domino);
                result = true;
                break;
            case itGoes.TO_THE_TAIL:
                domino.next = theOtherSide;
                domino.direction = this.getTail().direction;
                this.insertAtHead(domino);
                result = true;
                break;
            case itGoes.NOWHERE:
                result = false;
                break;
        }
        return result;
    }

    /**
     * Follows a complex control flow to simulate laying a domino on a table.
     * @param domino 
     * @returns void
     */
    public addDomino(domino: Domino): void {
        const { side1, side2 } = domino;

        if (this.isEmpty()) { //if the store is empty
            if (domino.isDouble()) {
                // if both faces of the domino are equal, any of them can be the next.
                domino.firstInserted;
                domino.direction = false;
                this.insertAtHead(domino);
            } else {
                // the next dominoes don't need to know the direction, its only one.
                domino.direction = false;
                //Signal that any of the sides can be next.
                domino.firstInserted;
                this.insertAtHead(domino);
            }
        } else {
            // The second domino in the chain. if so set the direction to true.
            if (this.store.length === 1) {
                const firstDomino = this.store[0];
                // check against the first domino
                if (side1 === firstDomino.side1 || side1 === firstDomino.side2) {
                    domino.next = side2;
                } else if (side2 === firstDomino.side1 || side2 === firstDomino.side2) {
                    domino.next = side1;
                }
                domino.direction = true; //initialize a direction
                return this.insertAtTail(domino);
            }
            //DRY:call a switch backwards if first doesn't pass
            const passed = this.determineLead(side1, side2, domino);
            if (!passed) this.determineLead(side2, side1, domino);
        }
    }

    /**
     * shows the outside whats on the two ends of the store
     */
    public showLeads(): Leads {
        // if there is only one domino and is double, both of its sides will be the two leads.
        if (this.getSize() === 1) {
            const lead1 = this.getHead().side1;
            const lead2 = this.getTail().side2;
            const leads = new Leads(lead1, lead2);
            return leads;
        }
        const lead1 = this.getHead().next;
        const lead2 = this.getTail().next;
        const leads = new Leads(lead1, lead2);
        return leads;
    }
}
export default DominoesChain;