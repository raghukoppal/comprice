var Crawler = require("crawler");
var PouchDB = require("pouchdb");
const request = require("request");

var Log = require("log"),
  fs = require("fs"),
  stream = fs.createReadStream(__dirname + "/crawler-file.log"),
  log = new Log("debug", stream);

var c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      let price = $("#prcIsum").text();
      console.log("Tracking ---> ", price);
      request.post(
        "http://10.33.126.175:8006/Comprice/rest/Comprice/user/alert",
        { price: price }
      );
    }
    done();
  }
});

const db = new PouchDB("comprice1");
const PriceUrlPairs = new PouchDB("price-url-pairs");
const addTrackingRecord = (url, price) => {
  let time = new Date().toISOString();
  PriceUrlPairs.put({
    _id: time,
    url: url,
    price: price
  });
};

const getAll = () =>
  db
    .allDocs({
      include_docs: true,
      selector: true
    })
    .then(function(result) {
      return result;
    })
    .catch(function(err) {
      return err;
    });

require("node-cron").schedule("* * * * *", function() {
  getAll().then(data => {
    data.rows.forEach(record => {
      c.queue([
        {
          uri: record.id,
          proxy: ""
        }
      ]);
    });
  });
});

modules.exports = {
  addTracker: addTrackingRecord
};
