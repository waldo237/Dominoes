import { pregunta2 } from "../functions and utilities/userInputFunctions";
import Board from "./Board";
import { Dealer } from "./Dealer";
import DominoesChain from "./DominoesChain";
import { Leads } from "./Leads";

const teamSchema1 = {
    player1: 'juan',
    player2: 'Maria'
},
    teamSchema2 = {
        player1: 'Carla',
        player2: 'Pedro'
    };

Board.getInstance().init(teamSchema1, teamSchema2);



describe("There can be only 28 dominoes at a time", () => {
    const { playersArray } = Board.getInstance(); //get players array
    Dealer.getInstance().deal(playersArray); //receive 7 dominoes from the dealer
    const player1 = Board.getInstance().team1?.player1; //select one.
    test('Dominoes get removed from array when they are played.', () => {
        if (player1) {
            player1.dominoes.forEach((d) => {
                const { side1, side2 } = d;
                const mockLead = new Leads(side1, side2) // mock lead
                player1.play(mockLead, d);
            })
            expect(player1.dominoes.length).toBeLessThan(7);
        }
    });
});