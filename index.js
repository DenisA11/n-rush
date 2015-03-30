var request = require('request');
var $ = require('cheerio');
var argv = require('minimist')(process.argv.slice(2));

var page = 'http://catalog.onliner.by';
var catalogName =   argv.catalogName || '/mobile';
var deviceName = argv.deviceName || 'iphone6_16gb';
var req = page + catalogName;
//Предполагалось, что будут распаршены аргументы командной строки.
//Идея была в том, чтобы научиться пользоваться minimist. Там есть ключи e.g. --name и
//aliasы. e.g. -n.

request(req, function (error, response, body) {
    //Нет хендлинга ошибок. Если ошибка произошла, она проглатывается.
    //Обычно пишут if (err) { обработка return; } далее, логика если ошибки не было
    if (!error && response.statusCode == 200) {
        var name = $(body).find('a[href*='+deviceName+']')
            .parent()
            .parent()
            .find('.pname')
            .text().trim();
        //Может быть, можно было обойтись без .parent.parent()?
        //Не очень красиво. На худой конец closest, если он там есть, конечно.
       var price = $(body).find('a[href*='+deviceName+']')
           .parent()
           .parent()
           .find('.pprice')
           .text().trim();
        console.log(name, price);
    }
});
