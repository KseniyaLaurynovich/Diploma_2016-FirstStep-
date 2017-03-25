define(function(require, exports, module) {
    "use strict";
    
    var oop = require("ace/lib/oop");
    var Base = require("ace_tree/list_data");
    
    var ListData = function(tasks, tabManager) {
        Base.call(this);
        
        this.classes = {};
        
        // todo compute these automatically
        this.innerRowHeight = 34;
        this.rowHeight = 42;
        
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
            this.visibleItems = subset 
                                || Object.keys(this.tasks);
            
            // @TODO Deal with selection
            this._signal("change");
        };
        
        this.getEmptyMessage = function() {
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
    
        this.renderRow = function(row, html, config) {
            /*var key = this.visibleItems[row];
            var command = this.commands.commands[key];
            var name = command.displayName || key;
            var isSelected = this.isSelected(row);
            
            // disabled available check since it breaks most editor commands
            var available = true; // cache[key];
            var keys = (command.bindKey || 0)[this.commands.platform] || "";
            if (apf.isMac) keys = apf.hotkeys.toMacNotation(keys);
            
            html.push("<div class='item " + (available && isSelected ? "selected " : "") 
                + (available && this.getClassName(row))
                + (available ? "" : " notAvailable")
                + "' style='height:" + this.innerRowHeight + "px'>"
                + "<span class='caption'>"
                + this.replaceStrong(name)
                + "</span><span class='keys'>" + keys + "</span>"
                + "<span class='path'>"
                + ((command.group || "General"))
                + "</span></div>");*/
            var task = this.visibleItems[row];
            html.push("<div>"+ task +"</div>")
        };
        
        /*this.getText = function(node) {
            var command = this.commands.commands[node.id];
            if (!command) return "";
            
            var keys = (command.bindKey || 0)[this.commands.platform] || "";
            return (command.group || "General") + ": "
                + (command.displayName || command.name || node.id)
                + (command.hint ? "\n" + command.hint : "")
                + (keys ? "\n" + keys : "")
                + "\nPress F2 to change keybinding";
        };*/
        
        this.getClassName = function(row) {
            return this.classes[row] || "";
        };
        
        this.setClass = function(node, className, include) {
            if (include)
                this.classes[node.index] = className;
            else
                delete this.classes[node.index];
            this._signal("changeClass");
        };
        
    }).call(ListData.prototype);
    
    return ListData;
});