(function () {
    
    $.ajax({
        url: 'src/data.json'
    }).done(function(data){
        var count = 0;
        for(var product in data) {
            ++count;
            $('<li class="w3-padding-16">\
                    <a href="#">\
                    <span class="w3-xlarge">'+product+'</span></a>\
                    <div class="content" style="padding: 20px;">\
                        <div id="chart'+count+'">'+product+'</div>\
                    </div>\
                </li>')
            .appendTo("ul.accordion" );

            generateGraph(count, product, data);
        }
    });

    function generateGraph(count, product, data) {
        c3.generate({
            bindto: "#chart"+count,
            data: data[product]
        });
    }

    $( document ).ready(function() {
        $('ul.accordion li').on('click', function(e){
            e.preventDefault();
            $(this).find('.content').toggle();
        });
    });
})();