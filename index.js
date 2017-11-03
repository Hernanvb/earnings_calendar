/*
  Yahoo Earnings Calendar API in NodeJS
  -------------------------
  Crawler and Parser for Yahoo Earnings Calendar
  Copyright: (c) 2017 Hernan Vargas
  License: BSD, see LICENSE for more details
*/

var calendar = require("./scrapper");

//calendar.getEarningsDates();
calendar.getQuoteEarningsDate("FB");
calendar.getQuoteEarningsDate("AAPL");
calendar.getQuoteEarningsDate("NfLx");
calendar.getQuoteEarningsDate("GOOGL");
calendar.getQuoteEarningsDate("tsla");
calendar.getQuoteEarningsDate("AMZN");
