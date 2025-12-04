const fs = require("fs").promises;


function checkPapersP1(grid) {
  let gridHeight = grid.length;
  let gridWidth = grid[0].length;
  let accessiblePapers = 0;
  for(let row = 0; row < gridHeight; row++) {
    for(let col = 0; col < gridWidth; col++) {
      if(grid[row][col] !== '@') continue;

      let adjecentPapers = 0;

      if((row - 1) >= 0 && (col - 1) >= 0 && grid[row - 1][col - 1] === '@') ++adjecentPapers;
      if((row + 1) < gridHeight && (col - 1) >= 0 && grid[row + 1][col - 1] === '@') ++adjecentPapers;
      if((row - 1) >= 0 && (col + 1) < gridWidth && grid[row - 1][col + 1] === '@') ++adjecentPapers;
      if((row + 1) < gridHeight && (col + 1) < gridWidth && grid[row + 1][col + 1] === '@') ++adjecentPapers;
      if((col - 1) >= 0 && grid[row][col - 1] === '@') ++adjecentPapers;
      if((row - 1) >= 0 && grid[row - 1][col] === '@') ++adjecentPapers;
      if((row + 1) < gridHeight && grid[row + 1][col] === '@') ++adjecentPapers;
      if((col + 1) < gridWidth && grid[row][col + 1] === '@') ++adjecentPapers;

      if(adjecentPapers < 4) ++accessiblePapers;
    }
  }
  return accessiblePapers
}

function checkPapersP2(grid) {
  let gridHeight = grid.length;
  let gridWidth = grid[0].length;
  let accessiblePapers = 0;
  
  let removedPapers = Infinity;
  while(removedPapers > 0){
    for(let row = 0; row < gridHeight; row++) {
      for(let col = 0; col < gridWidth; col++) {
        if(grid[row][col] !== '@') continue;

        let adjecentPapers = 0;

        if((row - 1) >= 0 && (col - 1) >= 0 && ['@', 'x'].includes(grid[row - 1][col - 1])) ++adjecentPapers;
        if((row + 1) < gridHeight && (col - 1) >= 0 && ['@', 'x'].includes(grid[row + 1][col - 1])) ++adjecentPapers;
        if((row - 1) >= 0 && (col + 1) < gridWidth && ['@', 'x'].includes(grid[row - 1][col + 1])) ++adjecentPapers;
        if((row + 1) < gridHeight && (col + 1) < gridWidth && ['@', 'x'].includes(grid[row + 1][col + 1])) ++adjecentPapers;
        if((col - 1) >= 0 && ['@', 'x'].includes(grid[row][col - 1])) ++adjecentPapers;
        if((row - 1) >= 0 && ['@', 'x'].includes(grid[row - 1][col])) ++adjecentPapers;
        if((row + 1) < gridHeight && ['@', 'x'].includes(grid[row + 1][col])) ++adjecentPapers;
        if((col + 1) < gridWidth && ['@', 'x'].includes(grid[row][col + 1])) ++adjecentPapers;

        if(adjecentPapers < 4){
          grid[row][col] = 'x';
          ++accessiblePapers;
        }
      }
    }

    removedPapers = removeAlreadyAccessedPapers(grid);
  }

  return accessiblePapers
}

function removeAlreadyAccessedPapers(grid) {
  let removedPapers = 0;

  for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[0].length; col++) {
      if(grid[row][col] === 'x'){
        grid[row][col] = '.';
        ++removedPapers;
      }
    }
  }

  return removedPapers;
}

async function papersThatCanBeAccessed(filePath) {
  const data = await fs.readFile(filePath, "utf8");

  const grid = data.split("\n").map((row) => row.split(""));

  return checkPapersP2(grid);
}

papersThatCanBeAccessed("advent_2025_day_4_input.txt").then((joltage) =>
  console.log(joltage)
);

// maxJoltageInBankP2('234234234234278')