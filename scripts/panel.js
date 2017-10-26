getOptions = () => {
  const Sites = [
    { name: "Select one", url: "--" },
    { name: "Amazon", url: "https://www.amazon.co.in" },
    { name: "Flipkart", url: "https://www.flipkart.com" },
    { name: "Ebay", url: "https://www.ebay.in" },
    { name: "Sanpdeal", url: "https://www.snapdeal.com" }
  ];
  return Sites.map(site =>
    $("<option></option>")
      .text(site.name)
      .val(site.url)
  );
};

const getSelectLilst = () => $("<select></select>").html(getOptions());

const SelectList = $("<center></center>")
  .change(event => (window.location = "/panel/?url=" + event.target.value))
  .html(getSelectLilst());




const panel = $(`<div  style="z-index: 2147483647; position: static;" class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div class="mdl-layout-icon"></div>
      <center><button id="capture-price" 
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"> Capture Price </button></center>
      <center>
           <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="page-url">
    <label class="mdl-textfield__label" for="sample1">Text...</label>
  </div>
      </center>
  </header>
</div>`);

$(panel).find('#capture-price').click(() => startCapturingPrice());;

$(panel).find('#page-url').on('keyup', function (e) {
    if (e.keyCode == 13) {
        (window.location = "/panel/?url=https://" + event.target.value)
    }
});

$("body").prepend(panel);

$(window).scroll(function() {
  let position = $(window).scrollTop();
 if (position <= 100) {
    $(panel).css("position", "static");
  } else {
    $(panel).css("position", "fixed");
    $(panel).css("top", "0");
    $(panel).css("z-index", "2147483647");
  }
});

console.log("Hello");
