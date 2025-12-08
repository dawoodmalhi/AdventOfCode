const fs = require("fs").promises;

function performCalculationsP2(lines) {
  let maxLength = Math.max(...lines.map(line => line.length));
  let result = 0;

  let spaceEncountered;
  let operands = [];
  let operation;
  for(let i = 0; i <= maxLength; i++){

    spaceEncountered = 0;

    let number = 0;
    for(let lineIdx = 0; lineIdx < lines.length; lineIdx++){
      if(['+', '*'].includes(lines[lineIdx][i])){
        operation = lines[lineIdx][i];
      } else if(lines[lineIdx][i] == ' ' || lines[lineIdx][i] === undefined){
        ++spaceEncountered;
      } else {
        number = (number * 10) + parseInt(lines[lineIdx][i]);
      }
    }


    if(spaceEncountered == lines.length){
      if(operation == '*')
        result += operands.reduce((acc, num) => acc * num, 1);
      else if(operation == '+')
        result += operands.reduce((sum, num) => sum + num, 0);

      operation = null;
      operands = [];
    } else {
      operands.push(number);
    }
  }
  
  return result;
}

function performCalculationsP1(lines) {
  let data = [];
  let operations = [];
  for(let i = 0; i < lines.length; i++){
    const splittedLine = lines[i].split(/\s+/).filter((word) => word.length > 0);

    if(i == lines.length - 1)
      operations = splittedLine
    else
      data.push(splittedLine.map((num) => parseInt(num)));
  }

  let result = 0;

  for(let opIdx = 0; opIdx < operations.length; opIdx++){
    let total = operations[opIdx] == '+' ? 0 : 1;

    for(let rowIdx = 0; rowIdx < data.length; rowIdx++)
      if(operations[opIdx] == '+')
        total += data[rowIdx][opIdx]
      else
        total *= data[rowIdx][opIdx];
    
    result += total;
  }
  
  return result;
}

async function mathHomework(filePath) {
  const file = await fs.readFile(filePath, "utf8");

  const lines = file.split("\n");

  // return performCalculationsP1(lines);
  return performCalculationsP2(lines);
}

mathHomework("advent_2025_day_6_input.txt").then((result) =>
  console.log(result)
);
