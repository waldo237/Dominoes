import { pregunta2 } from "../functions and utilities/userInputFunctions";
import Board from "./Board";
import { Dealer } from "./Dealer";

const teamSchema1 = {
    player1: 'juan',
    player2: 'Maria'
},
    teamSchema2 = {
        player1: 'Carla',
        player2: 'Pedro'
    };

Board.getInstance().init(teamSchema1, teamSchema2);

Dealer.getInstance().monitorAndForceNextMove(Board.getInstance().nextPlayer());

describe(".", () => {

    test('', () => {
      
     });
  });