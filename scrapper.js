/*
  Yahoo Earnings Calendar API in NodeJS
  -------------------------
  Crawler and Parser for Yahoo Earnings Calendar
  Copyright: (c) 2017 Hernan Vargas
  License: BSD, see LICENSE for more details
*/

var request = require("request");
var cheerio = require("cheerio");

const BASE_URL = 'http://finance.yahoo.com/calendar/earnings'
const BASE_STOCK_URL = 'https://finance.yahoo.com/quote'

exports.getEarningsDates = function() {
  request(BASE_URL, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var calendar = {
          date: "",
          symbols: []
      };
      
      $('div#fin-cal-table h3 span span').first().filter(function() {
        var el = $(this);
        calendar.date = el.text();
      });

      $('div#fin-cal-table div div table tbody tr td a').filter(function() {
        var el = $(this);
        var quote = { ticker: "", company: "" };
//        console.log(el);
        quote.ticker = el.attr('data-symbol');
        quote.company = el.attr('title');
        calendar.symbols.push(quote);
      });
      console.log(calendar);
    }
  });
}

exports.getQuoteEarningsDate = function(ticker) {
  var quote_url = BASE_URL + "?symbol=" + ticker;
  request(quote_url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var earningsDate = "";
      var companyName = "";
      var epsEstimate = "";
      var epsReported = "";
      
      $('#fin-cal-table div div table tbody tr td span').first().filter(function() {
        var el = $(this);
        earningsDate = el.text() + " " + el.next().text();
      });

      $('#fin-cal-table div div table tbody tr td.data-col1').first().filter(function() {
        var el = $(this);
        companyName = el.text();
      });

      $('#fin-cal-table div div table tbody tr td.data-col3').first().filter(function() {
        var el = $(this);
        epsEstimate = el.text();
      });

      $('#fin-cal-table div div table tbody tr td.data-col4').first().filter(function() {
        var el = $(this);
        epsReported = el.text();
      });

      console.log(companyName + " (" + ticker.toUpperCase() + ") reports on " + earningsDate + " EPS Estimate: " + epsEstimate + " Reported EPS: " + epsReported);
    }
  });
}
