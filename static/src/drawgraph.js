var chart = c3.generate({
    bindto: '.chart',
    data: {
      columns: [
        ['flipkart', 30, 200, 100, 400, 150, 250],
        ['amazon', 50, 20, 190, 40, 150, 250],
        ['ebay', 40, 300, 20, 55, 25, 55]
      ]
    }
});