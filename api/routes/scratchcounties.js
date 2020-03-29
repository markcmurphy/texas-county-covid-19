var express = require("express");
var router = express.Router();
const counties = require("./txcounties.json");
const fips = require("./txfips.json");
const { convertArrayToCSV } = require("convert-array-to-csv");
const converter = require("convert-array-to-csv");

router.get("/", function(req, res, next) {
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const countyCaseDataArr = [];

  for (let i = 0; i < counties.length; i++) {
    const value = getKeyByValue(fips, counties[i][0].county);
    const county = counties[i][0].county;
    const cases = counties[i][0].cases;
    countyCaseDataArr.push([48 + value, county, cases]);
  }

  const header = ["id", "name", "cases"];

  const csvFromArrayOfArrays = convertArrayToCSV(countyCaseDataArr, {
    header,
    separator: ";"
  });

  res.send(csvFromArrayOfArrays);
});

module.exports = router;
