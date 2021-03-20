const fs = require('fs');
const readline = require('readline');
const path = require('path');

function removeDoubleQuotes(str) {
  return str.replace(/"/g,"");
}

function getRowFromCsv(path) {
  var pathCsv = '../../csv-raw-data/filteredPhotos.csv';
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: fs.createWriteStream(pathCsv),
  });
    readInterface.on('line', function (line) {
      if (line.substring(0, 8) !== 'photo_id') {
        var checkedLine = scrubPhotoRow(line);
        if (checkedLine) {
          readInterface.output.write(checkedLine);
        } else {

        }
      } else {
        readInterface.output.write(line + '\n');
      }
    })
}

function scrubPhotoRow(rowStr) {
  //check length of array to match num of cols
  //let row = rowStr.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  let row = rowStr.split(',');
  if (row.length !== 3) {
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    row[i] = removeDoubleQuotes(row[i]);
  }

  if (!checkPhotoId(row[0])) return false;
  if (!checkReviewId(row[1])) return false;
  if (!checkUrl(row[2])) return false;
  return row.join(',') + '\n';
}

(function invokenow(){
  try {
    getRowFromCsv('../../csv-raw-data/reviews_photos.csv')
  } catch (err) {
    console.log(err);
  }
})()

function checkPhotoId(id) {
  if(id === 'null' ) {
    return false;
  }
  if (typeof Number(id) !== 'number') {
    return false;
  }
  if (Number(id) % 1 !== 0) {
    return false;
  }
  return true;
}

function checkReviewId(id) {
  if(id === 'null' ) {
    return false;
  }
  if (typeof Number(id) !== 'number') {
    return false;
  }
  if (Number(id) % 1 !== 0) {
    return false;
  }
  return true;
}

function checkUrl(url) {
  if (url === 'null' ) {
    return false;
  }
  if (url.length < 5) {
    return false;
  }
  if (url.length > 255) {
    return false;
  }

  let urlTry;

  try {
    urlTry = new URL(url);
  } catch (_) {
    return false;
  }
  return urlTry.protocol === "http:" || urlTry.protocol === "https:";
}

/*
\copy photos (photo_id,review_id,url) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredPhotos.csv' Header DELIMITER ',' CSV;
*/