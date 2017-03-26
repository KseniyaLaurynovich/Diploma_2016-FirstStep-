define(function(require, exports, module) {
    "use strict";
    
    module.exports.byNameSearch = function(data, keyword) {
        if (!keyword) keyword = "";
        
        var keywordLower = keyword.toLowerCase();
        var length = data.length;
        var result = [];
        
        for(var i = 0; i < length; i++){
            var item = data[i];
            
            if(item.displayName
                .toLowerCase()
                .indexOf(keywordLower) >= 0){
                   result.push(item); 
                }
        }
        
        return result;
    }
});