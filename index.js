var request = require('request');
var $ = require('cheerio');
var argv = require('minimist')(process.argv.slice(2));


var page = 'http://catalog.onliner.by';
var catalogName =   argv.catalogName || '/mobile';
var deviceName = argv.deviceName || 'iphone6_16gb';
var req = page + catalogName;

request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var name = $(body).find('a[href*='+deviceName+']')
            .parent()
            .parent()
            .find('.pname')
            .text().trim();
       var price = $(body).find('a[href*='+deviceName+']')
           .parent()
           .parent()
           .find('.pprice')
           .text().trim();
        console.log(name, price);
    }
});
