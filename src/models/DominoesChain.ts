import { Domino } from "./Domino";
import { Leads } from "./Leads";
import { printChainFormatter } from "../functions and utilities/screenFunctions";

/**
 * A data structure that represents the chain of 
 * Dominoes on a table. Its store is an array, not a 
 * DoublyLinkedList because it facilitates the interaction
 * with the other objects that use arrays.
 */
class DominoesChain {
    public static instance: DominoesChain
    private store:Domino[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    public static getInstance(): DominoesChain {
        if (!DominoesChain.instance) {
            DominoesChain.instance = new DominoesChain();
        }
        return DominoesChain.instance;
    }

    public addDomino(domino: Domino): void {
        const { side1, side2 } = domino;

        if (this.isEmpty()) {
            domino.next = side1;
            this.insertAtHead(domino);
        } else {
            const headLead = this.getHead().next;
            const tailLead = this.getTail().next;

            // try to fitting the first side of the Domino
            if (side1 === headLead) {
                domino.next = side1;
                return this.insertAtHead(domino);
            } else if (side1 === tailLead) {
                domino.next = side2;
                return this.insertAtTail(domino);
            }
            // try the other side of the Domino
            if (side2 === headLead) {
                domino.next = side2;
                return this.insertAtHead(domino);

            } else if (side2 === tailLead) {
                domino.next = side1;
                return this.insertAtTail(domino);
            }

        }
    }

    private insertAtHead(domino: Domino): void {

        this.store = [domino, ...this.store];
    }
    private insertAtTail(domino: Domino): void {
        this.store.push(domino);
    }
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
    public reset(): void {
        this.store = [];
    }
    public isEmpty(): boolean {
        return this.store.length === 0;
    }
    private getHead(): Domino {
        return this.store[0];
    }
    private getSize():number {
        return this.store.length;
    }
    private getTail(): Domino {
        return this.store[this.store.length - 1];
    }
    /**
     * - test10: 🧪 The next matching domino is added to 
     * the correct end of the chain with the frontInTheChain property properly pointed outwards 🧪: 
     * - test 11: 🧪 On the console, the doubles go horizontally 🧪 : 
     */
    public print(): void {
        this.store.forEach((currentDomino) => {
            printChainFormatter(currentDomino);
        })
    }
}
export default DominoesChain