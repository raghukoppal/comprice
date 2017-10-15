var proxy = require("express-http-proxy");
var express = require("express");
var app = express();
var request = require("request");
var PouchDB = require("pouchDB");

var db = new PouchDB("comprice123");
var remoteCouch = false;
var bodyParser = require('body-parser')
var Crawler = require("crawler");

function addCapture(data) {
  return new Promise((resolve, reject) => {
    var capture = {
      _id: new Date().toISOString(),
      url: data.url,
      selector: data.price
    };
    db.put(capture, function callback(err, result) {

      if (!err) {
        console.log("Successfully posted a price capture!");
        reject(error);
      }
       resolve(result);
    });
  });
}

var r = request.defaults({
  proxy: "http://T12449:%21Ilitap7tth@10.40.1.98:8080"
});

var requestOptions = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  }
};

const Panel = `
  <div style="width: 100%; height: 100%; background: gray;" ></div>
`;

app.use(bodyParser());

app.use("/", express.static("static"));

app.use("/scripts/", express.static("scripts"));

app.get("/panel", (req, res) => {
  if (!req.query.url) {
    res.sendfile("./static/panel.html", { root: "./" });
  }
  r.get(
    Object.assign({}, requestOptions, { url: req.query.url }),
    (error, data) => {
      if (data) {
        const html = data.body;
        let _html = html.replace(
          "</body>",
          `            
             <link rel="stylesheet" type="text/css" href="/scripts/vex.css" />
             <link rel="stylesheet" type="text/css" href="/scripts/vex-theme-default.css" />
             <link rel="stylesheet" type="text/css" href="/scripts/vex-theme-wireframe.css" />
             <link rel="stylesheet" type="text/css" href="/scripts/vex-theme-os.css" />
             <link rel="stylesheet" type="text/css" href="/scripts/vex-theme-plain.css" />
             <link rel="stylesheet" type="text/css" href="/scripts/vex-theme-flat-attack.css" />
             <script src="/scripts/jquery-3.2.1.min.js" ></script>
             <script src="/scripts/vex.combined.min.js" ></script>
             <script>vex.defaultOptions.className = 'vex-theme-os'</script>
             <script src="/scripts/linkrewrite.js" ></script>
             <script src="/scripts/rulepicker.js" ></script>
             <script src="/scripts/panel.js" ></script>
             </body>
            `
        );

        res.send(_html);
      } else {
        return "ERROR";
      }
    }
  );
});

app.listen(process.env.PORT || 3000);

app.post("/capture", function(req, res) {
  const priceData = req.body;
  addCapture({ price: priceData.price, url: priceData.productUrl });
    res.send({});
});


var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default 
            //a lean implementation of core jQuery designed specifically for the server 
            console.log($("title").text());
        }
        done();
    }
});

const crawal = (url,selector) => c.queue([{
    uri: url,
    jQuery: true,
 
    // The global callback won't be called 
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
          $(selector).text();
          console.log($(selector).text());
        }
        done();
    }
}]);



var cron = require("node-cron");

cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
  db
    .allDocs({
      include_docs: true,
      url: true,
      selector: true
    })
    .then(data => {
      data.rows.forEach( (row) => {
        console.log(row,row);
      })
    })
    .catch(error => {
      console.log(error);
    });
});
