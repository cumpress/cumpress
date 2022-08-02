const fs = require('fs');
const path = require('path');

let mime = {"aac":"audio/aac","abw":"application/x-abiword","arc":"application/x-freearc","avif":"image/avif","avi":"video/x-msvideo","azw":"application/vnd.amazon.ebook","bin":"application/octet-stream","bmp":"image/bmp","bz":"application/x-bzip","bz2":"application/x-bzip2","cda":"application/x-cdf","csh":"application/x-csh","css":"text/css","csv":"text/csv","doc":"application/msword","docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","eot":"application/vnd.ms-fontobject","epub":"application/epub+zip","gz":"application/gzip","gif":"image/gif","htm .html":"text/html","ico":"image/vnd.microsoft.icon","ics":"text/calendar","jar":"application/java-archive","jpg":"image/jpeg","jpeg":"image/jpeg","js":"text/javascript (Specifications: HTML and RFC 9239)","json":"application/json","jsonld":"application/ld+json","mid .midi":"audio/midi audio/x-midi","mjs":"text/javascript","mp3":"audio/mpeg","mp4":"video/mp4","mpeg":"video/mpeg","mpkg":"application/vnd.apple.installer+xml","odp":"application/vnd.oasis.opendocument.presentation","ods":"application/vnd.oasis.opendocument.spreadsheet","odt":"application/vnd.oasis.opendocument.text","oga":"audio/ogg","ogv":"video/ogg","ogx":"application/ogg","opus":"audio/opus","otf":"font/otf","png":"image/png","pdf":"application/pdf","php":"application/x-httpd-php","ppt":"application/vnd.ms-powerpoint","pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation","rar":"application/vnd.rar","rtf":"application/rtf","sh":"application/x-sh","svg":"image/svg+xml","swf":"application/x-shockwave-flash","tar":"application/x-tar","tif .tiff":"image/tiff","ts":"video/mp2t","ttf":"font/ttf","txt":"text/plain","vsd":"application/vnd.visio","wav":"audio/wav","weba":"audio/webm","webm":"video/webm","webp":"image/webp","woff":"font/woff","woff2":"font/woff2","xhtml":"application/xhtml+xml","xls":"application/vnd.ms-excel","xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","xml":"application/xml is recommended as of RFC 7303 (section 4.1), but text/xml is still used sometimes. You can assign a specific MIME type to a file with .xml extension depending on how its contents are meant to be interpreted. For instance, an Atom feed is application/atom+xml, but application/xml serves as a valid default.","xul":"application/vnd.mozilla.xul+xml","zip":"application/zip","3gp":"video/3gpp; audio/3gpp if it doesn't contain video","3g2":"video/3gpp2; audio/3gpp2 if it doesn't contain video","7z":"application/x-7z-compressed"};

async function getfile(name,dirpath){
    name = name.slice(1);
    let dir = await fs.readdirSync("./"+dirpath);
    let file = dir.find((e) => e === name);
    if(!file) return {success:false,message:"Not found!",code:404};
    let ext = path.extname(file).slice(1);
    let type = mime[ext];
    if(!type) type = "text/plain";
    let data = await fs.readFileSync("./"+dirpath+"/"+file);
    return {success:true,data:data,message:"Success!",code:200,type};
}

exports.getfile = getfile;
