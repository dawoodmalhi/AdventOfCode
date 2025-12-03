const fs = require("fs").promises;


function maxJoltageInBankP1(bank) {
  let largest = 0;
  let maxBankjoltage = 0;

  for(let j = 0; j < bank.length; j++) {
    const joltage = parseInt(bank[j]);
    maxBankjoltage = Math.max(maxBankjoltage, (largest * 10) + joltage);
    if(joltage > largest) largest = joltage;
  }

  return maxBankjoltage;
}

async function maxOutputJoltage(filePath) {
  let combinedJoltage = 0;

  const data = await fs.readFile(filePath, "utf8");

  const banks = data.split("\n");

  for (let i = 0; i < banks.length; i++)
    combinedJoltage += maxJoltageInBankP1(banks[i]);

  return combinedJoltage;
}

maxOutputJoltage("advent_2025_day_3_input.txt").then((sum) =>
  console.log(sum)
);