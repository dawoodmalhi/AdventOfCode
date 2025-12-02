const fs = require("fs").promises;

// Puzzle 1 Invalid logic, with string conversion
isIDInvalidP1 = (id) => {
  let str = id.toString();

  if (str.length % 2 !== 0) return false;

  const firstPart = str.slice(0, str.length / 2);
  const secondPart = str.slice(str.length / 2);

  return firstPart == secondPart;
};

function chunkArray(array, chunkSize) {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

// Manually Implemented Puzzle 2 Invalid logic, without string conversion
isIDInvalidP2 = (id) => {
  let stack = [];
  while (id > 0) {
    stack.unshift(id % 10);
    id = (id - (id % 10)) / 10;
  }

  for (let i = 1; i <= stack.length / 2; i++)
    if (
      chunkArray(stack, i)
        .map((chunk) =>
          chunk.reduce(
            (number, digit) => number * 10 + digit,
            0
          )
        )
        .every(
          (number, _index, array) => number === array[0]
        )
    )
      return true;

  return false;
};

async function invalidIDsSum(filePath) {
  let sum = 0;

  const data = await fs.readFile(filePath, "utf8");

  const ranges = data.split(",");

  for (let i = 0; i < ranges.length; i++) {
    let currentID = parseInt(ranges[i].split("-")[0]);
    const lastID = parseInt(ranges[i].split("-")[1]);

    while (currentID <= lastID) {
      if (isIDInvalidP2(currentID)) sum += currentID;
      ++currentID;
    }
  }

  return sum;
}

invalidIDsSum("advent_2025_day_2_input.txt").then((sum) =>
  console.log(sum)
);
