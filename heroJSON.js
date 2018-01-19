var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var url = 'http://lol.qq.com/biz/hero/champion.js';

function getData() {
    http.get(url, function (res) {
        var LolData = '';
        res.on('data', function (data) {
            LolData += data;
        })
        res.on('end', function () {
            var dataArray = filterJs(LolData);
            var heroLisdata = printData(dataArray);
            console.log(heroLisdata)
        });
    }).on('error', function (error) {
        console.log('data wrong!!!')
    });
}
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
}

function printData(obj) {
    var objhero = obj.data;
    fs.writeFileSync('./heroList.json', JSON.stringify(objhero, null, 2), 'utf-8')
    return objhero;
}
getData()