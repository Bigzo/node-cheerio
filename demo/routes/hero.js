var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

var url = 'http://lol.qq.com/biz/hero/champion.js';

function httpGet(callback) {
    http.get(url, function (res) {
        var LolData = '';
        res.on('data', function (data) {
            LolData += data;
        })
        res.on('end', function () {
            var dataArray = filterJs(LolData);
            var heroData = printData(dataArray);
            console.log(heroData);
            callback(heroData);
        });
    }).on('error', function (error) {
        console.log('data wrong!!!')
    });
};
function filterJs(jsfile) {
    if(jsfile) {
        var jarray = jsfile.split("=");
        var sarray = jarray[2];
        var darray = sarray.split(";");
        var dataArray = darray[0];
        return JSON.parse(dataArray);
    } else {
        console.log('no data!!!')
    }
};
function printData(obj) {
    var objhero = obj.data;
    var heroLis = [];
    for (var i in objhero) {
        heroLis.push("http://ossweb-img.qq.com/images/lol/img/champion/" + objhero[i].image.full);
    }
    return heroLis;
}
exports.httpGet = httpGet;
