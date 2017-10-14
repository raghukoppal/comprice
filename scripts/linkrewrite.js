const rewriteLinks = function() {
  $("a").each(function() {
    const href = $(this).attr("href");
    let __href = "";
    if (href && !$(this).hasClass('link-rewrite')) {
      if (href.includes("http")) {
        __href = href && href.replace("http", "/panel?url=http");
      } else {
        __href =
          "/panel?url=" +
          window.location.href.match(/(url=(.+\.(in|com)))/)[2] +
          "" +
          href;
      }
    }
    $(this).attr('href',__href);
    $(this).addClass('link-rewrite');
  });
};
rewriteLinks();

const formActionRewrite = () => {
  
};

$('input').keyup(function(){
  rewriteLinks();
});

