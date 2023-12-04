import fs from 'fs'

const testInput =
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const numRegex = /[0-9]/


const hasSymbolneighbour = (input, startX, endX, row, value, symbolsCoors) => {
    let res = false;
    let n = "";
  
    for (let y = row - 1; y <= row + 1; y++) {
        if (y < 0 || y >= input.length) {
            continue;
        }
        for (let x = startX - 1; x <= endX + 1; x++) {
            n += input[y][x] || ""
            if (x < 0 || x >= input[y].length) {
                continue;
            }
            if (y === row && x >= startX && x < endX) {
                continue;
            }
            if (!input[y][x].match(numRegex) && input[y][x] !== ".") {
                res = true;
                const symbol = input[y][x];
                const coor = `${x},${y}`
                if (! symbolsCoors[symbol]) {
                    symbolsCoors[symbol] = {}
                }

                symbolsCoors[symbol][coor] = [...(symbolsCoors[symbol][coor] || []) , value]
            }
        }
        if (y <= row) {
            n += "|"
        }
    }  
    return res;
}

const getPartNumbers = (input) => {
    const ySize = input.length;
    const xSize = input[0].length;

    let numbers = []
    let symbols = {}
    for (let y = 0; y < ySize; y++) {
        let num = ""
        let startX = -1
        for (let x = 0; x < xSize; x++) {
            if (input[y][x].match(numRegex) != null) {
                if (startX < 0) {
                    startX = x;
                }
                num += input[y][x]
            } else if (num != "") {
                if (hasSymbolneighbour(input, startX, x - 1, y, +num, symbols)) {
                    numbers.push(+num);
                }
                num = ""
                startX = -1
            }
            if (x === xSize - 1 && num) {
                if (hasSymbolneighbour(input, startX, x - 1, y, +num, symbols)) {
                    numbers.push(+num);
                }
            }
        }
    }

    return [numbers, symbols]    
}

const calcPartOne = (input) => {

    const [numbers] = getPartNumbers(input);
    return numbers.reduce((a, b) => a + b, 0);
}

const calcPartTwo = (input) => {
    const [_, symbols] = getPartNumbers(input);
    const items = Object.values(symbols["*"]).filter(v => v.length === 2);

    return items.reduce( (a,b) => b[0] * b[1] + a, 0)
    
}

console.log("Example");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(testInput.split('\n'))}`);
console.log(`Part 2 : ${calcPartTwo(testInput.split('\n'))}`);

const input = fs.readFileSync('./data/day3.txt').toString().split('\n')

console.log("Puzzle");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(input)}`);
console.log(`Part 2 : ${calcPartTwo(input)}`);
