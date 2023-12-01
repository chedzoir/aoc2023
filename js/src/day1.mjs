import fs from 'fs';

const testInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]
const testInput2 = ["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"]

const lup = { "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9" }

const wordDigits = Object.keys(lup);

const replaceWordDigits = (str) => {
    if (!str) {
        return "";
    }

    const word = wordDigits.find(digit => str.startsWith(digit));

    if (word) {
        return lup[word] + replaceWordDigits(str.substring(1))
    }

    return str[0] + replaceWordDigits(str.substring(1));
}


const getDigits = (str) => str.replaceAll(/[a-zA-Z]/g, '')

const getCalibrationValue = (str) => {
    const v = getDigits(str);
    return + (v[0] + v[v.length - 1])
}

const getCalibration = (strs) => strs.map(s => getCalibrationValue(s))

const getCalibrationSum = (strs) => getCalibration(strs).reduce((a, b) => a + b, 0)

const getCalibrationSumWithWordDigits = (strs) => getCalibrationSum(strs.map(s => replaceWordDigits(s)))

console.log("Examples")
console.log("--------")
console.log(`Part 1 : ${getCalibrationSum(testInput)}`);
console.log(`Part 2 : ${getCalibrationSumWithWordDigits(testInput2)}`);

const input = fs.readFileSync('./data/day1.txt').toString().split('\n');

console.log("\nMy Puzzle")
console.log("--------")

console.log(`Part 1 : ${getCalibrationSum(input)}`);
console.log(`Part 2 : ${getCalibrationSumWithWordDigits(input)}`);

