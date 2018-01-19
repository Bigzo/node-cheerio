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
        });
    }).on('error', function (error) {
        console.log('data wrong!!!')
    });
}

function filterHtml(html) {
    if(html) {
        var $ = cheerio.load(html);
        var filterData = [];
        $('#filter-results').find('ul li').each(function (item) {
            var iSrc = $(this).find('.sell-point a').html()
            filterData.push(iSrc)
        });
        return filterData;
    } else {
        console.log('no data!!!')
    }
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
    var imgArray = [];
    var _this = this;
    for (var i in objhero) {
        var heroLis = "http://ossweb-img.qq.com/images/lol/img/champion/" + objhero[i].image.full;
        imgArray.push(heroLis);
        downloadImg(heroLis, function (err) {
          console.log(heroLis + ' has be down'); 
        });
    }
    return heroLis;
}
function parseFileName (fileName) {
    // path.basename提取用“/”隔开的path的最后一部分
    return path.basename(fileName);
}
function generateFilePath (path) {
    // fs.existsSync检测文件地址
    if (fs.existsSync(path)) {
      console.log(path + '目录已经存在');
    } else {
        // fs.mkdirSync建立文件
      fs.mkdirSync(path);
      console.log(path + '目录创建成功');
    }
    return path;
}
var filePath = generateFilePath('hero');
function downloadImg (imgUrl, callback) {
    var fileName = parseFileName(imgUrl);
    request(imgUrl).pipe(fs.createWriteStream('./' + filePath + '/'+fileName)).on('close', callback && callback);
}
getData()