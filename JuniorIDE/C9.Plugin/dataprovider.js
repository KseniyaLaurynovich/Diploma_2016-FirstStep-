define(function(require, exports, module) {
    "use strict";
    
    var oop = require("ace/lib/oop");
    var Base = require("ace_tree/list_data");
    var utils = require("./utils")
    
    var ListData = function(tasks, tabManager) {
        Base.call(this);
        
        this.innerRowHeight = 38;
        this.rowHeight = 42;
        
        this.warnMessage = null;
        
        this.tasks = tasks;
        this.tabManager = tabManager;
        this.updateData();
        
        Object.defineProperty(this, "loaded", {
            get: function() { return this.visibleItems.length; }
        });
    };
    
    oop.inherits(ListData, Base);
    (function() {
        
        var cache;
        
        this.updateData = function(subset) {
            this.visibleItems = subset || this.tasks;
            
            // @TODO Deal with selection
            this._signal("change");
        };
        
        this.getEmptyMessage = function() {
            if(this.warnMessage)
                return this.warnMessage;
            
            if (!this.keyword)
                return "Loading tasks list. One moment please...";
            else
                return "No tasks found that match '" + this.keyword + "'";
        };
        
        this.replaceStrong = function(value) {
            if (!value)
                return "";
                
            var keyword = (this.keyword || "").replace(/\*/g, "");
            var i;
            if ((i = value.lastIndexOf(keyword)) !== -1)
                return value.substring(0, i) + "<strong>" + keyword + "</strong>" 
                    + value.substring(i + keyword.length);
            
            var result = this.search.matchPath(value, keyword);
            if (!result.length)
                return value;
                
            result.forEach(function(part, i) {
                if (part.match)
                    result[i] = "<strong>" + part.val + "</strong>";
                else
                    result[i] = part.val;
            });
            return result.join("");
        };
    
        this.expand = function(node, deep, silent){
          alert("expand")  
        };
    
        this.renderRow = function(row, html, config) {
            var task = this.visibleItems[row];
            
            if(!task) return;
            
            var isSelected = this.selectedIndex == row;
            var deadline = utils.dateTimeToString(new Date(task.deadline));
            
            html.push("<div class='item "
                    + (isSelected ? "selected " : "") 
                    + "'>"
                    + "<span class='caption'>"
                    + this.replaceStrong(task.name)
                    + "</span><span class='keys'>" + deadline + "</span>"
                    + "<span class='path'>"
                    + task.subjectName
                    + "</span>"
                    + "</div>");
        };
        
    }).call(ListData.prototype);
    
    return ListData;
});