import Domino from "../models/Domino";

/**
 * takes in an array and randomly picks one element to be removed and return
 * @param selection 
 * @returns 
 */
function pickOne<T>(selection: T[]): T {
    const index = Math.round((Math.random() * selection.length - 1) + 0);
    return selection.splice(index, 1)[0]; //take the element at index and since an array is returned get [0]
}

/**
 * shuffles an array using recursion
 * @param items 
 * @returns 
 */
function shuffleWithRecursion<T>(items: T[]): T[] {
    const index = items.length - 1;
    return shuffler(items, index);
}

/**
 * helper function for shuffleWithRecursion
 * @param items 
 * @param itemsLeft 
 * @returns 
 */
function shuffler<T>(items: T[], itemsLeft: number): T[] {
    if (itemsLeft === 0) return items; //base case

    const randomNum: number = Math.floor(Math.random() * (itemsLeft - 1));
    swap(items, itemsLeft, randomNum);
    return shuffler(items, itemsLeft - 1);
}

/**
 * swaps variables using array destructuring syntax. Does not need return
 * because it's done by reference.
 * @param array 
 * @param a 
 * @param b 
 * @returns 
 */
function swap<T>(array: T[], a: number, b: number): void {
    [array[a], array[b]] = [array[b], array[a]];
}

/**
 * allows to use objects as maps in Typescript
 */
type hashMap = {
    [key: string]: boolean
}

/**
 * The function recurses to create nominoes with numbers from 0-6
 * @param dominoes an empty array of dominoes 
 * @returns returns an array with 28 dominoes
 */
function populateDominoes(): Domino[] {
    const index = 6, indexX6 = 6;
    const dominoes: Domino[] = [];
    const memo: hashMap = {};
    return populateDominoesHepper(dominoes, index, indexX6, memo);
}

/**
 * helper function for populateDominoes
 * @param dominoes 
 * @param index 
 * @param indexX6 
 * @param memo 
 * @returns 
 */
function populateDominoesHepper(dominoes: Domino[], index: number, indexX6: number, memo: hashMap): Domino[] {
    if (indexX6 == 0) return dominoes; //base case

    if (index === -1) { //re-start first counter
        index = indexX6 - 1;
        indexX6 -= 1;
    }
    const pairHash = [index, indexX6].sort().join();
    if (!memo[pairHash]) { //momoize the values that are already in results.
        memo[pairHash] = true;
        dominoes.push(new Domino(index, indexX6))
    }
    return populateDominoesHepper(dominoes, index - 1, indexX6, memo);
}




export { shuffleWithRecursion, pickOne, populateDominoes }