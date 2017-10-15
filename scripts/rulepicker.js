const capturePrice = element => {
  const ok = confirm("Price " + $(element).text());
  if (ok) {
    return $.ajax({
      type: "POST",
      url: "http://10.33.178.124:8006/Comprice/rest/Comprice/user/newAlert",
      data: JSON.stringify({
        price: $(element).text(),
        productUrl: window.location.href.match(/url=(.+)/)[1],
        site: window.location.href.match(/url=(.+)/)[1].match(/http:\/\/www\.(.+\.(com|in))/)[1],
        email: "example@example.com"
      }),
      contentType: "application/json",
      dataType: "json"
    });
  }
};

$("html").append(
  $(
    "<style> .comprice-current-selection:hover { border: 1px solid red; } </style>"
  )
);

const startCapturingPrice = () => {
  $("*:not(.comprice-panel)").mouseenter(function(event) {
    const enterEvent = event;
    event.stopPropagation();
    console.log(event.currentTarget);
    $("*").removeClass("comprice-current-selection");
    $(event.currentTarget).addClass("comprice-current-selection");
    $(event.currentTarget).one("click", event => {
      event.stopPropagation();
      capturePrice(event.currentTarget);
      $("*").off("mouseenter");
      $("*").removeClass("comprice-current-selection");
    });
  });
};
