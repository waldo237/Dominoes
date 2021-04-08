import { printScores } from "../functions and utilities/consolePrintFunctions";
import Board from "./Board";
import { Dealer } from "./Dealer";
import DominoesChain from "./DominoesChain";

const teamSchema1 = {
    player1: 'juan',
    player2: 'Maria'
},
    teamSchema2 = {
        player1: 'Carla',
        player2: 'Pedro'
    };

const board = Board.getInstance();
const dealer = Dealer.getInstance();
board.init(teamSchema1, teamSchema2);
const players = board.playersArray;
dealer.deal(players);
dealer.monitorAndForceNextMove(board.nextPlayer());
players.forEach(p => {
    p.dominoes.forEach((d) => DominoesChain.getInstance().addDomino(d))
})


describe("The dominoes in the chain follow a sequence and direction.", () => {
    test('The dominoes are inserted and printed in the correct order(check in the console).', () => {
        printScores(true); //visual test.
    });
});