const fs = require("fs").promises;

function uniqueTimelinesOfTachyonP2(
  grid,
  currentPaths,
  currentRow,
  cachedPaths
) {
  if (currentRow == grid.length) return 1;

  let uniquePaths = 0;
  for (const path of currentPaths) {
    if (cachedPaths[currentRow][path]) {
      uniquePaths += cachedPaths[currentRow][path];
    } else if (grid[currentRow][path] === "^") {
      let newPaths = [];
      if (path - 1 >= 0) newPaths.push(path - 1);
      if (path + 1 < grid[0].length)
        newPaths.push(path + 1);

      const pathsFromHere = uniqueTimelinesOfTachyonP2(
        grid,
        newPaths,
        currentRow + 1,
        cachedPaths
      );
      cachedPaths[currentRow][path] = pathsFromHere;
      uniquePaths += pathsFromHere;
    } else {
      const pathsFromHere = uniqueTimelinesOfTachyonP2(
        grid,
        [path],
        currentRow + 1,
        cachedPaths
      );
      cachedPaths[currentRow][path] = pathsFromHere;
      uniquePaths += pathsFromHere;
    }
  }

  return uniquePaths;
}

function splitsInBeamPathP1(grid) {
  let totalSplits = 0;
  let beamIndexes = new Set();

  beamIndexes.add(grid[0].indexOf("S"));

  for (let i = 1; i < grid.length; ++i) {
    for (const beamIdx of beamIndexes) {
      if (grid[i][beamIdx] === "^") {
        beamIndexes.delete(beamIdx);
        if (beamIdx - 1 >= 0) beamIndexes.add(beamIdx - 1);
        if (beamIdx + 1 < grid[0].length)
          beamIndexes.add(beamIdx + 1);
        ++totalSplits;
      }
    }
  }

  return totalSplits;
}

async function calculateBeamSplitting(filePath) {
  const file = await fs.readFile(filePath, "utf8");

  const grid = file.split("\n");

  return uniqueTimelinesOfTachyonP2(
    grid,
    [grid[0].indexOf("S")],
    1,
    new Array(grid.length).fill(null).map(() =>
      new Array(grid[0].length).fill(null)
    )
  );
  // return splitsInBeamPathP1(grid);
}

calculateBeamSplitting("advent_2025_day_7_input.txt").then(
  (result) => console.log(result)
);
