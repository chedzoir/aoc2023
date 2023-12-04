import fs from 'fs'

const testInput =
    `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const parseNumberSet = (nos) => nos.split(' ').filter(s => s != '').map(s => +s);

const parseRow = (str) => {
    const [card, vals] = str.split(':');

    const [winners, yourNumbers] = vals.split('|')

    const cardNo = + card.split(' ').filter(c => c != '')[1]
    return [cardNo, parseNumberSet(winners.trim()), parseNumberSet(yourNumbers.trim())]
}

const getRowScore = (str) => {
    const [cardNo, winners, yourNumbers] = parseRow(str);

    const amtOfWinners = winners.filter(w => yourNumbers.indexOf(w) > -1).length

    if (amtOfWinners > 0) {
        return [cardNo, amtOfWinners, 1 << (amtOfWinners - 1)]
    }
    return [cardNo, amtOfWinners, 0]
}

const calcPartOne = (input) => {

    const scores = input.map(inp => getRowScore(inp)[2])
    return scores.reduce((a, b) => a + b, 0);
}

const calcPartTwo = (input) => {

    const cardRes = input.map(inp => getRowScore(inp)[1]);

    const numberOfCards = [];

    for (let cnt = 0; cnt < cardRes.length; cnt++) {
        numberOfCards[cnt] = (numberOfCards[cnt] || 0) + 1
        for (let wins = cnt + 1; wins <= cnt + cardRes[cnt]; wins++) {
            numberOfCards[wins] = (numberOfCards[wins] || 0) + numberOfCards[cnt]
        }
    }

    return numberOfCards.reduce((a, b) => a + b, 0);

}

console.log("Example");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(testInput.split('\n'))}`);
console.log(`Part 2 : ${calcPartTwo(testInput.split('\n'))}`);

const input = fs.readFileSync('./data/day4.txt').toString().split('\n')

console.log("Puzzle");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(input)}`);
console.log(`Part 2 : ${calcPartTwo(input)}`);
