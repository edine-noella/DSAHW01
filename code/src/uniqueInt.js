const fs = require('fs');

// function to process the input file and write the output to a file
function processFile(inputFilePath, outputFilePath) {
  const inputData = fs.readFileSync(inputFilePath, 'utf8').split('\n');
  const uniqueIntegers = getUniqueIntegers(inputData);
  writeOutput(outputFilePath, uniqueIntegers);
}

// Function to extract unique integers and filter invalid data
function getUniqueIntegers(data) {
  const occuredIntegers = {};
  const uniqueIntegers = [];
  
  for (let line of data) {
    line = line.trim(); // for each line this will remove any leading or trailing white spaces    
    // Skip empty lines or lines with non-integer inputs
    if (line === '' || !isValidInteger(line)) continue;
    
    const integer = parseInt(line, 10);
    if (!occuredIntegers[integer]) {
      occuredIntegers[integer] = true;
      uniqueIntegers.push(integer);
    }
  }

  return sortUniqueNumbers(uniqueIntegers);
}

// Function to check if a line is a valid integer
function isValidInteger(line) {
  return /^-?\d+$/.test(line);
}

// Function to sort unique numbers
function sortUniqueNumbers(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Function to write the output to a file
function writeOutput(outputFilePath, uniqueIntegers) {
  const sortedData = uniqueIntegers.join('\n') + '\n';
  fs.writeFileSync(outputFilePath, sortedData);
}

//------------------------- calling my function -------------------------
const inputFilePath = '../../sample_inputs/sample_input_02.txt';
const outputFilePath = '../../sample_results/sample_output_02.txt';
processFile(inputFilePath, outputFilePath);
