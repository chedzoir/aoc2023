import fs from 'fs';

const testInput = 
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`


const cubes = {
    "red":12,
    "green":13,
    "blue":14
}

const parseLine = (line) => {
    const [game, roundInfo] = line.split(':')
    const [_, id] = game.split(' ');

    
    const rounds = roundInfo.split(';').map(t => {
        const res = {}    

        t.split(',').forEach(c => {
            const [val, colour] = c.trim().split(' ');
            res[colour] = +val;
        })
        return res;
    })

    return { id, rounds}
}

const parseInput = (strs) => strs.map(l => parseLine(l))

const minColours = (game) => {

    const res = {}
    Object.keys(cubes).map( k => {
        res[k] = game.rounds.map(r => r[k] || 0).reduce((a,b) => Math.max(a,b), 0)
    })

    return res;
}

const calcPartOne = (strs) => {
    const games = parseInput(strs)
    
    const possibleGames = games.filter(g => g.rounds.every(r => 
        Object.keys(r).every(k => r[k] <= cubes[k])
        ))
    
    return possibleGames.map(p => +p.id).reduce((a,b) => a+b, 0)
}

const calcPartTwo = (strs) => {
    const games = parseInput(strs);

    return games.map(minColours)
        .map(a => a.green * a.blue * a.red)
        .reduce((a,b) => a+b, 0)
}


console.log("Example");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(testInput.split('\n'))}`);
console.log(`Part 2 : ${calcPartTwo(testInput.split('\n'))}`);

const input = fs.readFileSync('./data/day2.txt').toString().split('\n')

console.log("Puzzle");
console.log("-------");
console.log(`Part 1 : ${calcPartOne(input)}`);
console.log(`Part 2 : ${calcPartTwo(input)}`);

