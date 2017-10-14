
const capturePrice = element => {
  
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
