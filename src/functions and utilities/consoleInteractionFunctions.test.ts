import Board from "../models/Board";
import { Dealer } from "../models/Dealer";


global.console.log =  jest.fn();


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


describe("Testing the functions that print to the screen.", () => {
  global.console.log = jest.fn();
  test('test that the board is printing properly', () => {

    // expect(console.log).toBeCalled();
    // jest.spyOn(global.console, 'log').mockImplementation();

  });
});