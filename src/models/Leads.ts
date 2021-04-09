
/**
 * Leads are used by the chain of Dominoes to signal what's at each end. 
 */
export class Leads {
    lead1: number | null;
    lead2: number | null;
    constructor(lead1: number | null, lead2: number | null) {
        this.lead1 = lead1;
        this.lead2 = lead2;
    }
}
