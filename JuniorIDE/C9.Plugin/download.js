define(function(require, exports, module) {
    "use strict";
    
    var Path = require("path");
    
    var DownloadManager = function(vfs) {
        
        this.vfs = vfs;
    };
    
    DownloadManager.prototype.downloadAsZip = function(paths, callback){
        
        paths = paths.map(function(path) {
            return Path.join("/home/ubuntu/workspace", Path.normalize(unescape(path).replace(/^(\/?\.\.)?\/?/, "")));
        });
        
        var path = paths[0];
        var name = Path.basename(path);
        var executable = "zip";
        var args = ["-r", "-", "--"];
        var cwd = null;
        
        paths.forEach(function (path) {
            if (!path) return;
            var dir = Path.dirname(path);
            if (!cwd) {
                cwd = dir;
            }
            else {
                var relative = Path.relative(cwd, dir).split(Path.sep);
                var i = 0;
                while (relative[i] === '..') {
                    cwd = Path.resolve(cwd, '..');
                    i++;
                }
            }
        });
            
        paths.forEach(function(path) {
            if (!path) return;
            path = Path.relative(cwd, path);
            args.push(path);
        });
            
        this.vfs.spawn(executable, {
            args: args,
            cwd: cwd,
            windowsVerbatimArguments: true 
        }, function(err, meta){
            //todo handle error
            if(err) console.log(err);
            
            var proc = meta.process;
            
            var decodedBuffer = '';
            
            proc.stdout.once('data', function(chunk){
                
                decodedBuffer = new Uint8Array(chunk.data).buffer;
            })
            
            proc.stdout.on('end', function(){
            
                if(callback) callback(decodedBuffer);
            })
        });
    };
    
    return DownloadManager;
});