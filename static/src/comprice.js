(function () {
    
    $.ajax({
        url: 'http://10.33.178.124:8006/Comprice/rest/Comprice/price?username=raghu@gmail.com'
    }).done(function(data){
        var resData = JSON.parse(data),
            alerts = resData.alerts, 
            products = [], 
            count = 0;
        for(var i = 0; i < alerts.length; i++) {
            var price = alerts[i].urls;
            var obj = {
                'columns': []
            };
            for(var j = 0; j < price.length; j++) {
                obj.columns[i] = [];
                obj.columns[i].push(price[j].name);
                obj.columns[i].push(..._.pluck(price[j].pricehistory, 'price'));
            }
            products.push(obj);

            $('<li class="w3-padding-16">\
            <a href="#">\
            <span class="w3-xlarge">'+alerts[i].name+'</span></a>\
                <div class="content" style="padding: 20px;">\
                    <div id="chart'+i+'">'+alerts[i].name+'</div>\
                </div>\
            </li>')
            .appendTo("ul.accordion" );

            generateGraph(i, products[i]);
        }
    });

    function generateGraph(count, product) {
        c3.generate({
            bindto: "#chart"+count,
            data: product
        });
    }

    $( document ).ready(function() {
        setTimeout(function(){
            $('ul.accordion li').on('click', function(e){
                e.preventDefault();
                $(this).find('.content').toggle();
            });
        },1000);
    });
})();