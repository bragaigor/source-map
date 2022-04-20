const fs = require('fs');
const sourcemap = require('source-map');

function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

function component(num) {
  var ele = num + 5;

  return ele;
}

function checkPrime(number) {
  if (number <= 1) {
    return false;
  } else {
    for (let i = 2; i < number; i++) {
      // ######## DELETE ME as I'm simulating an error ##########
      if (i == 5) {
        console.log("About to throw an ERROR!");
        throw new UserException("Throwing a test error: i is equal to 5!!!!");
      }
      // ########################################################
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  }
}

function readSourceMap() {
  fs.readFile('./main.js.map', 'utf8', function (err, jsonString) {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("33333333");
    console.log("File data:", jsonString);
    rawSourceMap = jsonString;
  });
}

function generateOriginalSource() {
  console.log("Generating original source from line: " + sourceMapData);
  // 1. Read source map from file
  // var rawSourceMap = sourceMapData;


  var startTime = performance.now();
  var consumer = sourcemap.SourceMapConsumer(sourceMapData);

  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2145534,
    })
  );
  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2145831,
    })
  );
  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 2146142,
    })
  );


  var endTime = performance.now();
  var timeTaken = endTime - startTime;

  console.log(`It took ${timeTaken} milliseconds to process 3 requests`);
}

console.log("The sum is: " + component(10));

var moment = require("moment");

const {sourceMapData} = require('./source_map.js');
console.log("hahahaha " + sourceMapData);

// Generate original source code!!!!
generateOriginalSource();

var myDate = new Date();
var coolDate = moment(myDate).format("LL");

console.log("Is " + num + " a prime number: " + checkPrime(num));

console.log("Hello World!");
console.log(coolDate);
