const fs = require('fs');
const readline = require('readline');
const path = require('path');

function removeDoubleQuotes(str) {
  return str.replace(/"/g,"");
}

function getRowFromCsv(path) {
  var pathCsv = '../../csv-raw-data/filteredCharacteristicReviews.csv';
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: fs.createWriteStream(pathCsv),
  });
    readInterface.on('line', function (line) {
      if (line.substring(0, 22) !== 'chacteristic_review_id') {
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
  if (row.length !== 4) {
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    row[i] = removeDoubleQuotes(row[i]);
  }

  if (!checkId(row[0])) return false;
  if (!checkId(row[1])) return false;
  if (!checkId(row[2])) return false;
  if (!checkRating(row[3])) return false;
  return row.join(',') + '\n';
}

(function invokenow(){
  try {
    getRowFromCsv('../../csv-raw-data/characteristic_reviews.csv')
  } catch (err) {
    console.log(err);
  }
})()

function checkId(id) {
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

function checkRating(rating) {
  if (rating === 'null' ) {
    return false;
  }
  var num = Number(rating);
  if (num < 0 || num > 5) {
    return false;
  }
  if (num % 1 !== 0) {
    return false;
  }
  return true;
}


/*
\copy photos (photo_id,review_id,url) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredPhotos.csv' Header DELIMITER ',' CSV;
*/