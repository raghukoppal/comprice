var proxy = require("express-http-proxy");
var express = require("express");
var app = express();
var request = require("request");
var Trarcker = require("./tracker");

var bodyParser = require("body-parser");

var r = request.defaults({
  proxy: ""
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
          `  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
             <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">          
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
             <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
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

app.post("/capture", (req,res) => {
  Trarcker.addTracker(req.body.productUrl,req.body.priceSelector);
   res.send(req.body);
});

app.listen(process.env.PORT || 3000);
