/* eslint-disable @typescript-eslint/no-empty-function */
import { populateDominoes, shuffleWithRecursion } from "../functions and utilities/util";
import Domino from "./Domino";
import DominoesChain from "./DominoesChain";
import { Player } from "./Player";

/**
 * The dealer is in charge of managing the rules of the game,
 * it has 28 dominoes, and owns the DominoesChain. It displays the DominoesChain
 * on the board. It deals the dominoes when a round is started. And shuffles them.
 * Since it has direct access to the DominoesChain
 */
export class Dealer {
    private static instance: Dealer;
    private dominoes: Domino[] = shuffleWithRecursion(populateDominoes()); //shuffle after creation
    private dominoesChain: DominoesChain = DominoesChain.getInstance();

    private constructor() { }

    public static getInstance(): Dealer {
        if (!Dealer.instance) {
            Dealer.instance = new Dealer();
        }
        return Dealer.instance;
    }

    /**
     * This method is used to receive the dominoes to be shuffled.
     * @param Domino
     */
    public shuffle(dominoes: Domino[]): Dealer {
        this.dominoes = shuffleWithRecursion(dominoes);
        return this;
    }

    public dominoesLength(): number {
        return this.dominoes.length;
    }

    /**
     * gives 7 dominoes to each player and stays with none.
     */
    public deal(players: Player[]): void {
        players.forEach((player) => {
            const sevenDominoes = this.dominoes.splice(0, 7);
            player.receiveDominoes(sevenDominoes);
        })
    }
}
