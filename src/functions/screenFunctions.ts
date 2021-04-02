function printGreaterUp(bigger: number, smaller: number): void {
    console.log(`      ⌜${bigger}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${smaller}⌟`);
}

function printGreaterDown(bigger: number, smaller: number): void {
    console.log(`      ⌜${smaller}⌝\n` + `      ⎸—⎹      \n` + `      ⌞${bigger}⌟`);
}

function printDoubles(side1: number, side2: number): void {
    if (side1 === side1) {
        console.log(`    ⌜      ⌝\n` + `     ` + `${side1} | ${side2}\n` + `    ⌞      ⌟`);
    }
}

export { printDoubles, printGreaterDown, printGreaterUp }