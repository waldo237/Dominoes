import Board from "../models/Board";
import DominoesChain from "../models/DominoesChain";
import { printChainOfDominoes } from "./consoleInteractionFunctions";




describe("Testing the functions that print to the screen.", () => {
  global.console.log = jest.fn();

  test('test that the board is printing properly', () => {
    const board = Board.getInstance();
    const chain = DominoesChain.getInstance();
    board.print();
    expect(console.log).toHaveBeenCalledWith(printChainOfDominoes(chain.store));
  });
});