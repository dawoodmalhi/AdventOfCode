const fs = require("fs").promises;


function transformOperandsToCorrectFormat(data, index){
  let operands = [];

  let stop = false;

  while(!stop){
    let operand = 0;
    for(let i = 0; i < data.length; ++i){
      if(data[i][index] != 0){
        const digit = data[i][index] % 10;
        data[i][index] = (data[i][index] - digit) / 10;
        operand = (operand * 10) + digit;
      }
    }
    operand == 0 ? stop = true : operands.push(operand);
  }

  return operands;
}

function performCalculationsP2(data, operations) {
  let result = 0;

  for(let opIdx = 0; opIdx < operations.length; opIdx++){
    let total = operations[opIdx] == '+' ? 0 : 1;

    const transformedOperands = transformOperandsToCorrectFormat(data, opIdx);

    for(let i = 0; i < transformedOperands.length; i++)
      if(operations[opIdx] == '+')
        total += transformedOperands[i];
      else
        total *= transformedOperands[i];
    
    result += total;
  }
  
  return result;
}

function performCalculationsP1(data, operations) {
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

  let data = [];
  let operations = [];
  for(let i = 0; i < lines.length; i++){
    const splittedLine = lines[i].split(/\s+/).filter((word) => word.length > 0);

    if(i == lines.length - 1)
      operations = splittedLine
    else
      data.push(splittedLine.map((num) => parseInt(num)));
  }



  return performCalculationsP2(data, operations);
}

mathHomework("advent_2025_day_6_mini_input.txt").then((result) =>
  console.log(result)
);
