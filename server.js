var http = require("http");
var h = require('./hero.js');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n this the world...');
}).listen(8888);
var a = h.httpGet()
console.log(a)