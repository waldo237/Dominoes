import { printDoubles } from "./screenFunctions";
describe("Testing the functions that print to the screen.", () => {
  test('console.log the double dominoes', () => {
    console.log = jest.fn();
    printDoubles(5, 5)

    expect(console.log(5, 5)).toHaveBeenCalledWith(`    ⌜      ⌝\n` + `     ` + `${5} | ${5}\n` + `    ⌞      ⌟`);
  });
});