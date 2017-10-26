jQuery.fn.extend({
    getPath: function() {
        var pathes = [];

        this.each(function(index, element) {
            var path, $node = jQuery(element);

            while ($node.length) {
                var realNode = $node.get(0), name = realNode.localName;
                if (!name) { break; }

                name = name.toLowerCase();
                var parent = $node.parent();
                var sameTagSiblings = parent.children(name);

                if (sameTagSiblings.length > 1)
                {
                    allSiblings = parent.children();
                    var index = allSiblings.index(realNode) +1;
                    if (index > 0) {
                        name += ':nth-child(' + index + ')';
                    }
                }

                path = name + (path ? ' > ' + path : '');
                $node = parent;
            }

            pathes.push(path);
        });

        return pathes.join(',');
    }
});

const capturePrice = element => {
  const ok = confirm("Price " + $(element).text());
  if (ok) {
    return $.ajax({
      type: "POST",
      url: "/capture",
      data: JSON.stringify({
        price: $(element).text(),
        priceSelector: $(element).attr('id') ? '#'+ $(element).attr('id') : $(element).attr('class'),
        productUrl: window.location.href.match(/url=(.+)/)[1],
        site: window.location.href.match(/url=(.+)/)[1].match(/https?:\/\/www\.(.+\.(com|in))/)[1],
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
