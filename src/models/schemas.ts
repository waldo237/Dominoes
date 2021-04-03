import { Domino } from "./Domino";
import { DoublyLinkedList } from "./DoublyLinkedList";

export class Leads {
    lead1?: number;
    lead2?: number;
    constructor(lead1?: number, lead2?: number) {
        this.lead1 = lead1;
        this.lead2 = lead2;
    }
}

 class DominoesChain extends DoublyLinkedList<Domino> {

    constructor() {
        super()
    }
    addDomino(domino:Domino){
        this.head?.data.frontInTheChain === 
    }
    showLeads(): Leads{
      const  lead1 = this.head?.data.frontInTheChain;
      const  lead2 = this.tail?.data.frontInTheChain;
        const  leads = new Leads(lead1 , lead2);
        return leads;
    }
}
const chain = new DominoesChain();

export { Domino }