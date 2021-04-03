import Domino from "../models/Domino";

function pickOne<T>(selection: T[]):T {
    const index = Math.round((Math.random() * selection.length - 1) + 0);
    return selection[index];
}
// TODO turn to recursion
export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        swap(array, i, randomIndex);
    }
    return array;
}

function shuffleWithRecursion<T>(items: T[]) {
    const index = items.length - 1;
    return shuffler(items, index);
}

function shuffler<T>(items: T[], itemsLeft: number): T[] {
    if (itemsLeft === 0) { return items; } //base case

    const randomNum: number = Math.floor(Math.random() * itemsLeft--);
    return shuffler(swap(items, itemsLeft, randomNum), itemsLeft--);
}

export function swap<T>(array: T[], a: number, b: number): T[] {
    return [array[a], array[b]] = [array[b], array[a]];
}

// eslint-disable-next-line @typescript-eslint/ban-types
function randDominoNum() {
    return Math.floor(Math.random() * (28/4));
}
function populateDominoes<T>( mem:{[key: string]: Domino},  toCreate:number):any{
    if(toCreate === 0) return mem;
    
  
    if(!mem[randomNum]){
      const dom = new Domino(randomNum)
    
        mem[randomNum] = randomNum
        
    }
    return populateDominoes( mem,  toCreate-1);
}

function sidePopulator<T>( items:T[], domino:Domino, mem:{[key: string]:string}, zeroTo6:numRange):T[]{
    if(zeroTo6 === 0) return items;
    
  
    if(!mem[`${zeroTo6}-${zeroTo6-1}`]){
      const dom = new Domino(zeroTo6, zeroTo6-1)
    
        mem[randomNum] = randomNum
        
    }
    return sidePopulator( mem,  zeroTo6-1);
}

export {shuffleWithRecursion, pickOne, populateDominoes}