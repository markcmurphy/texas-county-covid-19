process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");
const fips = require("./txfips.json");
const { csvFormatRows } = require("d3-dsv");
const { convertArrayToCSV } = require("convert-array-to-csv");
const converter = require("convert-array-to-csv");
const { Parser } = require("json2csv");

// const asyncParser = new AsyncParser(opts, transformOpts);

/* GET users listing. */
router.get("/", function(req, res, next) {
  axios.get("https://www.dshs.texas.gov/news/updates.shtm").then(response => {
    const $ = cheerio.load(response.data);

    const counties = [];
    const cases = [];

    $(
      "table[summary='COVID-19 Cases in Texas Counties'] td:nth-child(odd)"
    ).each(function(i, e) {
      counties[i] = $(this).text();
    });

    $(
      "table[summary='COVID-19 Cases in Texas Counties'] td:nth-child(even)"
    ).each(function(i, e) {
      cases[i] = parseInt($(this).html());
    });

    const newCountiesCases = [];
    for (let i = 0; i < counties.length; i++) {
      const countiesCases = [
        {
          county: counties[i],
          cases: cases[i]
        }
      ];
      newCountiesCases.push(countiesCases);
    }

    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    const countyCaseDataArr = [];
    // countyCaseDataArr.push(["id", "name", "cases"]);

    for (let i = 0; i < newCountiesCases.length; i++) {
      const value = getKeyByValue(fips, newCountiesCases[i][0].county);
      const county = newCountiesCases[i][0].county;
      const cases = newCountiesCases[i][0].cases;
      countyCaseDataArr.push([48 + value, county, cases]);
    }

    // const header = ["id", "name", "cases"];

    // const csvFromArrayOfArrays = convertArrayToCSV(countyCaseDataArr, {
    //   header,
    //   separator: ","
    // });

    // const target = {};
    // Object.assign(target, countyCaseDataArr);
    // console.log(target);

    // res.set("Content-Type", "application/octet-stream");
    const fields = [
      {
        label: "id",
        value: "0"
      },
      {
        label: "name",
        value: "1"
      },
      {
        label: "cases",
        value: "2"
      }
    ];

    const json2csvParser = new Parser({ fields });

    const csv = json2csvParser.parse(countyCaseDataArr);

    console.log(csv);
    res.send(csv);
  });
});

module.exports = router;
