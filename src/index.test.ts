import main  from './index'; 
describe("La estructura de los objetos", () => {
  test("It should return the 2 sides and of a domino", () => {
    const domino = main()
    expect(domino).toEqual({ _side1: 6, _side2: 4, _next:0 });
    expect(domino.side2).toEqual(4);
    expect(domino.side1&& domino.side2).toBeGreaterThanOrEqual(0);
    expect(domino.side1).toBeLessThanOrEqual(6);
  });
}); 