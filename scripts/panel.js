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

const CapturePriceButton = $('<button>').text(' Capture Price ')
.click( () => startCapturingPrice() );

const panel = $("<div></div>")
  .addClass('comprice-panel')
  .height("100px")
  .width("100%")
  .css("top", "0")
  .css("background", "gray")
  .append(SelectList)
  .append(CapturePriceButton);

$("body").prepend(panel);
$(window).scroll(function(){
  let position = $(window).scrollTop();
  if(position <= 100) {
    $(panel).css('position','static')
  }else{
    $(panel).css('position','fixed');
    $(panel).css('top','0');
    $(panel).css('z-index','9999');
  }

});



console.log('Hello');
