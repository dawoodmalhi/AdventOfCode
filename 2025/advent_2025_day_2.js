const fs = require('fs').promises;

isIDInvalid = (id) => {
  let str = id.toString();

  if (str.length % 2 !== 0) return false;

  const firstPart = str.slice(0, str.length / 2);
  const secondPart = str.slice(str.length / 2);

  return firstPart == secondPart;
};

async function invalidIDsSum(filePath) {
  let sum = 0;

  const data = await fs.readFile(filePath, "utf8")

  const ranges = data.split(',');

  for (let i = 0; i < ranges.length; i++) {
    let currentID = parseInt(ranges[i].split("-")[0]);
    const lastID = parseInt(ranges[i].split("-")[1]);

    while (currentID <= lastID) {
      if (isIDInvalid(currentID)) sum += currentID;
      ++currentID;
    }
  }

  return sum;
}


invalidIDsSum("advent_2025_day_2_input.txt").then(sum => console.log(sum));
