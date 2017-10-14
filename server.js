var proxy = require("express-http-proxy");
var express = require("express");
var app = express();
var request = require("request");

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

app.use("/", express.static("static"));

app.use("/scripts/", express.static("scripts"));

app.get("/panel", (req, res) => {
  console.log(req);
  if(!req.query.url){
    res.sendfile('./static/panel.html', {root: './'});
  };
  r.get(
    Object.assign({}, requestOptions, { url: req.query.url }),
    (error, data) => {
      if (data) {
        const html = data.body;
        let _html = html
          .replace(
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
