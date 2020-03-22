process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

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
      cases[i] = $(this).text();
    });

    var coronavirusByCounty = cases.map(function(obj, index) {
      var myobj = {};
      myobj[counties[index]] = obj;
      return myobj;
    });

    // console.log(coronavirusByCounty);
    res.send(coronavirusByCounty);
  });
});

module.exports = router;
