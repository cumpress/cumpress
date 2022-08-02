const fs = require('fs');
const path = require('path');

let mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

async function getfile(name,dirpath){
    name = name.slice(1);
    let dir = await fs.readdirSync("../"+dirpath);
    let file = dir.find((e) => e === name);
    if(!file) return {success:false,message:"Not found!",code:404};
    let ext = path.extname(file).slice(1);
    let type = mime[ext];
    if(!type) type = "text/plain";
    let data = await fs.readFileSync("../"+dirpath+"/"+file);
    return {success:true,data:data,message:"Success!",code:200,type};
}

exports.getfile = getfile;
