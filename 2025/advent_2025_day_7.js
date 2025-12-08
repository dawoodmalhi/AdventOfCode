const fs = require("fs").promises;

function splitsInBeamPathP1(grid) {
  let totalSplits = 0;
  let beamIndexes = new Set();

  beamIndexes.add(grid[0].indexOf("S"));

  for(let i = 1; i < grid.length; ++i) {
    for(const beamIdx of beamIndexes) {
      if(grid[i][beamIdx] === "^") {
        beamIndexes.delete(beamIdx);
        if((beamIdx - 1) >=0) beamIndexes.add(beamIdx - 1);
        if((beamIdx + 1) < grid[0].length) beamIndexes.add(beamIdx + 1);
        ++totalSplits;
      }
    }
  }

  return totalSplits;
}

async function calculateBeamSplitting(filePath) {
  const file = await fs.readFile(filePath, "utf8");

  const grid = file.split("\n");

  // return performCalculationsP1(lines);
  return splitsInBeamPathP1(grid);
}

calculateBeamSplitting("advent_2025_day_7_input.txt").then((result) =>
  console.log(result)
);