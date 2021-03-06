/*
We need to look at each piece and determine which results should be discarded if null.
should be tossed if null or ,,
id - no
product_id - yes
rating - yes
summary - yes
body - yes
recommended - no default to 0
reported - no, default to 0 or false
reviewer_name - yes
reviewer_email - yes
response - no default to null
helpfulness - no default to 0


//fs.createReadStream
//use events to control the reading and writing process. drain, on, close, etc.

postgres command:
\copy reviews (review_id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredReview.csv' CSV;

*/

const fs = require('fs');
const readline = require('readline');
const path = require('path');

function removeDoubleQuotes(str) {
  return str.replace(/"/g,"");
}

function getRowFromCsv(path) {
  var pathCsv = '../../csv-raw-data/filteredReview.csv';
  var pathToDisgard = '../../csv-raw-data/disgarded-reviews.csv';
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: fs.createWriteStream(pathCsv),
  });



    readInterface.on('line', function (line) {
      if (line.substring(0, 9) !== 'review_id') {
        var checkedLine = scrubReviewRow(line);
        if (checkedLine) {
          readInterface.output.write(checkedLine);
        } else {

        }
      } else {
        readInterface.output.write(line + '\n');
      }
    })
}

function scrubReviewRow(rowStr) {
  //check length of array to match num of cols
  //let row = rowStr.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  let row = rowStr.split(',');
  if (row.length !== 12) {
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    row[i] = removeDoubleQuotes(row[i]);
  }

  if (!checkReviewId(row[0])) return false;
  if (!checkProductId(row[1])) return false;
  if (!checkRating(row[2])) return false;
  if (!checkDate(row[3])) return false;
  if (!checkSummary(row[4])) return false;
  if (!checkBody(row[5])) return false;
  if (!checkRecommended(row[6])) return false;
  if (!checkReported(row[7])) return false;
  if (!checkReviewName(row[8])) return false;
  if (!checkReviewEmail(row[9])) return false;
  if (!checkResponse(row[10])) return false;
  if (!checkHelpfulness(row[11])) return false;

  return row.join(',') + '\n';
}

(function invokenow(){
  try {
    getRowFromCsv('../../csv-raw-data/reviews.csv')
  } catch (err) {
    console.log(err);
  }

})()

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

function checkProductId(id) {
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

function checkDate(date) {
  if (date.length < 10) {
    return false;
  }
  if (date.length > 40) {
    return false;
  }
  return true;
}

function checkSummary(summary) {
  if (summary === 'null' ) {
    return false;
  }
  if (summary.length < 2) {
    return false;
  }
  if (summary.length > 50) {
    return false;
  }
  return true;
}

function checkBody(body) {
  if (body === 'null' ) {
    return false;
  }
  if (body.length > 5000) {
    return false;
  }
  if (body.length < 2) {
    return false;
  }
  return true;
}

function checkRecommended(rec) {
  if (rec === 'true' || rec === 'false' || rec === '0' || rec === '1') {
    return true;
  }
  return false;
}

function checkReported(rep) {
  if (rep === 'true' || rep === 'false' || rep === '0' || rep === '1') {
    return true;
  }
  return false;
}

function checkReviewName(name) {
  if (name === 'null' ) {
    return false;
  }

  if (name.length < 2) {
    return false;
  }
  if (name.length > 40) {
    return false;
  }
  return true;
}

function checkReviewEmail(email) {
  if (email === 'null') {
    return false;
  }
  if (email.length < 3) {
    return false;
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return false;
  }
  if (email.length > 320) {
    return false;
  }
  return true;
}

function checkResponse(resp) {
  if (resp === 'null'  || resp === '') {
    return true;
  }
  if (resp.length > 1000) {
    return false;
  }
  if (resp.length < 4) {
    return false;
  }
  return true;
}

function checkHelpfulness(help) {
  if (help === 'null' || help === '') {
    return true;
  }
  if (typeof Number(help) !== 'number') {
    return false;
  }
  if (Number(help) % 1 !== 0) {
    return false;
  }
  return true;
}


