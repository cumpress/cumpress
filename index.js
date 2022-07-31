const http = require('http');

let routers = []

module.exports.use = (url,method,callback) => {
    routers.push({url,method,callback});
};

module.exports.listen = (port) => {
    http.createServer((req,res) => {
        let start_time = Date.now();

        res.json = (json) => {
            res.write(JSON.stringify(json));
        }

        res.status = (code) => {
            res.writeHead(code);
        }

        let find = routers.find((e) => e.url === req.url && e.method === req.method);
        if(find) {
            find.callback(req,res);
        }else{
            res.status(404);
            res.json({status:404,message:"Cannot get "+req.url});
        }

        res.end().on('close',() => {
            console.log(`[${req.method}] - ${req.url} - ${res.statusCode} - ${Date.now() - start_time}ms`)
        })
    })
    .listen(port);
};
