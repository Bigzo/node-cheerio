var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var defaultUrl = 'https://www.zhihu.com/question/34078228'; 
// process.argv返回命令行的各个参数组成的数组。以空格为标记
var url = process.argv[2];

let app = {
	init(url) {
		this.filePath = this.generateFilePath(this.parseFileName(url));
    	this.getAllHtml(url, this.filterHtml);
	},
	getAllHtml(url, callback) {
		var sHtml = '';
		var _this = this;
		https.get(url, function(res) {
			res.on('data', function(data) {
				sHtml += data;
			});
			res.on('end', function() {
				callback.bind(_this, sHtml)();
			})
		}).on('error', function(err) {
			console.log(err);
		})
	},
	filterHtml(sHtml, filePath) {
		var $ = cheerio.load(sHtml),
			$Imgs = $('noscript img'),
			imgData = [],
        	_this = this;
        $Imgs.each(function(i, e) {
        	console.log(1)
	        var imgUrl = $(e).attr('src');
	        imgData.push(imgUrl);
	        _this.downloadImg(imgUrl, _this.filePath, function (err) {
	          console.log(imgUrl + 'has be down'); 
	        });
	      });
      	console.log(imgData);
	},
	parseFileName (fileName) {
		// path.basename提取用“/”隔开的path的最后一部分
	    return path.basename(fileName);
	},
	generateFilePath (path) {
		// fs.existsSync检测文件地址
	    if (fs.existsSync(path)) {
	      console.log(path + '目录已经存在');
	    } else {
	    	// fs.mkdirSync建立文件
	      fs.mkdirSync(path);
	      console.log(path + '目录创建成功');
	    }
	    return path;
	},
	downloadImg (imgUrl, filePath, callback) {
	    let fileName = this.parseFileName(imgUrl);
	    request(imgUrl).pipe(fs.createWriteStream('./' + filePath + '/'+fileName)).on('close', callback && callback);
	}
};
app.init(url || defaultUrl);









