const http = require('http');
const emejs = require('emejs');
const morgan = require('morgan');
let {getfile} = require('./static');

let settings = {
    logger:false,
    static_dir:false
}

global.cumpress_routers = [];

module.exports.set = (name,value) => {
    settings[name] = value;
}

module.exports.get = (name) => {
    return(settings[name]);
}

module.exports.use = (url,method,callback) => {
    cumpress_routers.push({url,method,callback});
};

const logger = morgan('dev');

module.exports.listen = (port) => {
    http.createServer((req,res) => {
        req.ip = req.socket.remoteAddress;
        function proc(){
            req.body = "";

            let status = 200;

            res.status = (code) => {
                res.writeHead(code);
                status = code;
                return res;
            };
        
            req.on('data', (chunk) => {
                req.body += chunk.toString();
            });
    
            res.json = (json) => {
                res.write(JSON.stringify(json));
                res.end();
            };
    
            res.send = (msg) => {
                res.write(msg.toString());
                res.end();
            };
    
            res.render = async (file,data) => {
                let html = await emejs.compilefile(file,data);
                res.write(html);
                res.end();
            };
    
            req.on('end', () => {
                req.body = req.body.split("&");
    
                let newbody = {};
    
                req.body.forEach((b) => {
                    b = b.split("=");
                    newbody[b[0]] = b[1];
                });
    
                req.body = newbody;
    
                let find = cumpress_routers.find((e) => e.url === req.url && e.method === req.method);
    
                if(settings.static_dir && !find){
                    getfile(req.url,settings.static_dir).then((data) => {
                        if(data.success){
                            res.setHeader('Content-Type', data.type);
                            res.write(data.data);
                            res.end();
                        }else{
                            res.status(404);
                            res.json({
                                status:404,
                                ip:req.ip,
                                message:"Cannot "+req.method+" "+req.url
                            })
                        }
                    });
                }else{
                    if(find){
                        find.callback(req,res);
                    }else{
                        res.status(404);
                        res.json({
                            status:404,
                            ip:req.ip,
                            message:"Cannot "+req.method+" "+req.url
                        })
                    }
                }
            });
        }

        if(settings.logger) {
            logger(req,res,() => {
                proc();
            });
        }else{
            proc();
        }

    }).listen(port);
};
