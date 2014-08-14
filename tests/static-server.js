var libpath = require('path'),
    http = require("http"),
    fs = require('fs'),
    url = require("url"),
    mime = require('mime');

var path = "./tests/";
var port = 8080;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);

    fs.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type,
                "Content-Length": fs.statSync(filename)["size"]
            });
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(port);