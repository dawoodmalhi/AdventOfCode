const fs = require('fs');
const readline = require('readline');

async function freshIngredientsCountP2(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity // Handles both Windows and Unix line endings
  });

  let ranges = [];

  rl.on("line", (line) => {
    if (line.trim() === ""){
      rl.close();
      rl.removeAllListeners();
      return;
    }

    let [start, end] = line.split("-").map(Number);
    ranges.push([start, end]);
  });

  // Wait for the 'close' event to ensure all lines have been processed
  await new Promise(resolve => rl.on('close', resolve));

  let mergedRanges = [];

  ranges.sort((a, b) => a[0] - b[0]);

  let [currentStart, currentEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      mergedRanges.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  // Push the last range
  mergedRanges.push([currentStart, currentEnd]);

  return mergedRanges.reduce((freshIngredients, [rangeStart, rangeEnd]) => freshIngredients + (rangeEnd - rangeStart + 1), 0);
}

async function freshIngredientsCountP1(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity // Handles both Windows and Unix line endings
  });

  let freshIngredients = 0;
  let rangeStart = [];
  let rangeEnd = [];

  let rangesFinished = false;
  rl.on('line', (line) => {
    if(line === '') rangesFinished = true;

    if(rangesFinished){
      for(let i = 0; i < rangeStart.length; i++){
        if(parseInt(line) >= rangeStart[i] && parseInt(line) <= rangeEnd[i]){
          ++freshIngredients;
          break;
        }
      }
    } else {
      const [start, end] = line.split('-').map(Number);
      rangeStart.push(start);
      rangeEnd.push(end);
    };
  });

  // Wait for the 'close' event to ensure all lines have been processed
  await new Promise(resolve => rl.on('close', resolve));

  return freshIngredients;
}

freshIngredientsCountP2('advent_2025_day_5_input.txt').then((freshIngredientsCount) => {
  console.log(freshIngredientsCount);
});
