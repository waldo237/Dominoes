import { printDoubles, printGreaterDown, printGreaterUp } from "./screenFunctions";
global.console.log = jest.fn();


describe("Testing the functions that print to the screen.", () => {
  test('console.log the double dominoes', () => {
    printDoubles(5, 5)
    expect(console.log).toHaveBeenCalledWith(`    ⌜      ⌝\n` + `     ` + `${5} | ${5}\n` + `    ⌞      ⌟`);
  });
  test('console.log the dominoes with the greater facing Up', () => {
    printGreaterUp(6, 2)
    expect(console.log).toHaveBeenCalledWith(`      ⌜${6}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${2}⌟`);
  });
  test('console.log the dominoes with the greater facing down', () => {
    printGreaterDown(3, 5)
    expect(console.log).toHaveBeenCalledWith(`      ⌜${5}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${3}⌟`)
  });
});


