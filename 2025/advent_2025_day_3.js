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

// Monotonic Stack approach
function maxJoltageInBankP2(bank) {
  const toRemove = bank.length - 12; 
  let remove = toRemove;
  const stack = [];

  for (let digit of bank) {
      while (remove > 0 && stack.length > 0 && stack[stack.length - 1] < digit) {
          stack.pop();
          remove--;
      }
      stack.push(digit);
  }

  return parseInt(stack.slice(0, 12).join(''));
}

async function maxOutputJoltage(filePath) {
  let combinedJoltage = 0;

  const data = await fs.readFile(filePath, "utf8");

  const banks = data.split("\n");

  for (let i = 0; i < banks.length; i++)
    combinedJoltage += maxJoltageInBankP2(banks[i]);

  return combinedJoltage;
}

maxOutputJoltage("advent_2025_day_3_input.txt").then((joltage) =>
  console.log(joltage)
);

// maxJoltageInBankP2('234234234234278')