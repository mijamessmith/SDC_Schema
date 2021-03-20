const fs = require('fs');
const readline = require('readline');
const path = require('path');

function removeDoubleQuotes(str) {
  return str.replace(/"/g,"");
}

function getRowFromCsv(path) {
  var pathCsv = '../../csv-raw-data/filteredCharacteristics.csv';
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: fs.createWriteStream(pathCsv),
  });
    readInterface.on('line', function (line) {
      if (line.substring(0, 16) !== 'chacteristics_id') {
        var checkedLine = scrubCharacteristicsRow(line);
        if (checkedLine) {
          readInterface.output.write(checkedLine);
        } else {

        }
      } else {
        readInterface.output.write(line + '\n');
      }
    })
}

function scrubCharacteristicsRow(rowStr) {
  //check length of array to match num of cols
  //let row = rowStr.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  let row = rowStr.split(',');
  if (row.length !== 3) {
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    row[i] = removeDoubleQuotes(row[i]);
  }

  if (!checkCharacteristicsId(row[0])) return false;
  if (!checkCharacteristicsId(row[1])) return false;
  if (!checkValue(row[2])) return false;
  return row.join(',') + '\n';
}

(function invokenow(){
  try {
    getRowFromCsv('../../csv-raw-data/characteristics.csv')
  } catch (err) {
    console.log(err);
  }
})()

function checkCharacteristicsId(id) {
  if(id === 'null' ) {
    return false;
  }
  if (typeof Number(id) !== 'number') {
    return false;
  }
  if (Number(id) % 1 !== 0) {
    return false;
  }
  if (Number(id) < 1) {
    return false;
  }
  return true;
}

function checkValue(val) {
  let validVals = ['Fit', 'Length', 'Quality', 'Comfort', 'Width', 'Size'];
  if(validVals.indexOf(val) < 0) {
    return false;
  }
  return true;
}


/*
\copy characteristics (characteristic_id,product_id,characteristic) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredCharacteristics.csv' DELIMITER ',' CSV;
*/