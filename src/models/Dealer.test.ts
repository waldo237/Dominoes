import Board from "./Board";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

const teamSchema1 = {
    player1: 'juan',
    player2: 'Maria'
},
    teamSchema2 = {
        player1: 'Carla',
        player2: 'Pedro'
    };

Board.getInstance().init(teamSchema1, teamSchema2);

const players = Board.getInstance().playersArray;


describe("The dominoes were distributed correctly ", () => {
    Dealer.getInstance().deal(players); //dealing

    test("- test4: 🧪each player has 7 dominoes🧪", async () => {
        expect(Board.getInstance().team1?.player1.DominoesNum()).toBe(7);
        expect(Board.getInstance().team1?.player2.DominoesNum()).toBe(7);
        expect(Board.getInstance().team2?.player1.DominoesNum()).toBe(7);
        expect(Board.getInstance().team2?.player2.DominoesNum()).toBe(7);
    });
});

describe("The Game is initialized correctly", () => {
    test("- test5.1: 🧪The very first game was started by the player with [6|6]🧪:", async () => {
        expect(Board.getInstance().nextPlayer()).toBeInstanceOf(Player);
    });
}); 