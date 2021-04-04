import { populateDominoes, shuffleWithRecursion } from "../functions and utilities/util";
import Domino from "./Domino";
import DominoesChain from "./DominoesChain";
import { Player } from "./Player";

/**
 * The dealer is in charge of managing the rules of the game,
 * it has 28 dominoes, and owns the DominoesChain. It displays the DominoesChain
 * on the board. It deals the dominoes when a round is started. And shuffles them.
 *
 * Since it has direct access to the DominoesChain
 */
export class Dealer {
    private dominoes: Domino[];
    dominoesChain: DominoesChain;

    constructor() {
        this.dominoes = populateDominoes();
        this.dominoesChain = DominoesChain.getInstance();
    }

    /**
     * This method is used to receive the dominoes to be shuffled.
     * @param Domino
     */
    public shuffle(dominoes: Domino[]): void {
        this.dominoes = shuffleWithRecursion(dominoes);
    }

    /**
     * gives 7 dominoes to each player and stays with none.
     */
    public deal(): Domino[] {
        return this.dominoes.splice(this.dominoes.length - 8, 7);
    }
    /**
     * 🧪The dealer forced the next move 🧪:
     * • Cuando un jugador tiene una sola opción de colocar ficha, después de 3 segundos,
     * el programa lo hace automáticamente.
     */
    public monitorNextPlayer(nextPlayer: Player) {
        if (nextPlayer.canPlayHand(this.dominoesChain.showLeads())) {
            const timeOut = setTimeout(() => {
                nextPlayer.play(this.dominoesChain.showLeads());
            }, 3000);
        }
    }
}
