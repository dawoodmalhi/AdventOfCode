const fs = require('fs');
const readline = require('readline');

// Dry Run Examples P1:
// Initial position = 9
// R74 =>  74 + 9       = 83%100  = 83
// R278 => 278 + 9      = 287%100 = 87
// L3 =>   9 - 3        = 6%100   = 6
// L43 =>  9 - 43       = -34%100 = -34     = -34 + 100 = 66
// L198 => 9 - 198      = -189%100 = -89    = -89 + 100 = 11

async function processDocumentPuzzle1(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity // Handles both Windows and Unix line endings
  });

  let zeroCount = 0;
  let dialPosition = 50;
  let direction;
  let rotations;

  rl.on('line', (line) => {
    direction = line[0];
    rotations = parseInt(line.slice(1));

    if(direction == 'L')
      dialPosition -= rotations;
    else if(direction == 'R')
      dialPosition += rotations;

    dialPosition = dialPosition % 100;

    if(dialPosition < 0)
      dialPosition += 100;

    if(dialPosition == 0) ++zeroCount;
  });

  // Wait for the 'close' event to ensure all lines have been processed
  await new Promise(resolve => rl.on('close', resolve));

  return zeroCount;
}

processDocumentPuzzle1('advent_2025_day_1_input.txt').then((zeroCount) => {
  console.log(` Puzzle 1 Answer: ${zeroCount}`);
});



// Dry Run Examples P2:
// Initial position = 9
// R74 =>  74 + 9       = 83%100     = 83                          = no occurence
// R94 =>  94 + 9       = 103%100    = 3                           = 1 occurence
// R278 => 278 + 9      = 287%100    = 87                          = 2  occurences
// R91 =>  81 + 9       = 100%100    = 0                           = 1  occurences
// R291 => 291 + 9      = 300%100    = 0                           = 3  occurences
// L3 =>   9 - 3        = 6%100      = 6                           = no occurences
// L43 =>  9 - 43       = -34%100    = -34     = -34 + 100 = 66    = 1  occurence
// L198 => 9 - 198      = -189%100   = -89     = -89 + 100 = 11    = 2  occurences
// L9 =>   9 - 9        = 0%100      = 0                           = 1  occurences
// L409 => 9 - 409      = -400%100   = 0                           = 5  occurences

// Simply doing one by one iterations for each rotation to count zero occurences works.
// But there is a issue with following optimal solution, But I am not able to figure it out right now.
async function processDocumentPuzzle2(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity // Handles both Windows and Unix line endings
  });

  let zeroCount = 0;
  let dialPosition = 50;
  let direction;
  let rotations;

  rl.on('line', (line) => {
    direction = line[0];
    rotations = parseInt(line.slice(1));

    if(direction == 'L')
      dialPosition -= rotations;
    else if(direction == 'R')
      dialPosition += rotations;

    zeroCount += Math.abs((dialPosition - (dialPosition % 100)) / 100);

    dialPosition = dialPosition % 100;

    if(dialPosition < 0){
      dialPosition += 100;
      ++zeroCount;
    }
  });

  // Wait for the 'close' event to ensure all lines have been processed
  await new Promise(resolve => rl.on('close', resolve));

  return zeroCount;
}

processDocumentPuzzle2('advent_2025_day_1_input.txt').then((zeroCount) => {
  console.log(` Puzzle 2 Answer: ${zeroCount}`);
});