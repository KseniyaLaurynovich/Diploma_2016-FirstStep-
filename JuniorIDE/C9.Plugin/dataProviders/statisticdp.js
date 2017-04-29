define(function(require, exports, module) {
    
    var oop = require("ace/lib/oop");
    var Base = require("ace_tree/data_provider");

    function DataProvider(root) {
        Base.call(this, root || {});

        this.rowHeight = 25;
        this.rowHeightInner = 25;
        this.expandedList = Object.create(null);
        this.selectedList = Object.create(null);

        Object.defineProperty(this, "loaded", {
            get: function() { return this.visibleItems.length; }
        });
    }

    oop.inherits(DataProvider, Base);

    (function() {
        this.$sortNodes = false;

        this.getEmptyMessage = function() {
            if(this.error)
                return this.error;
                
            return "Loading statistic...";
        };

        this.getContentHTML = function (datarow) {
            var html = [];
            var status = datarow.pass
                ? "<span class='tag tag--green'>passed</span>\n"
                : "<span class='tag tag--red'>not passed</span>\n";
            
            if(!datarow.isSubItem){
                var compiled = datarow.pass
                    ? "<span class='tag tag--green'>compiled</span>\n"
                    : "<span class='tag tag--red'>not compiled</span>\n";
                var passed = datarow.allTests > 0
                        ? "<span class='align-right'>" + datarow.passed + " of " + datarow.allTests + "</span>\n"
                        : "";
                
                html = [
                    "<span class='caption'>" + datarow.dateTime + "</span>\n",
                    compiled,
                    datarow.children.length > 0 ? status : "",
                    passed
                ];
            }else{
               html = [
                    "<span class='caption'>test №" + datarow.index + "</span>\n",
                    status,
                    datarow.errors
                ]; 
            }

            return html.join("");
        };
        
        this.setOpen = function(node, val) {
            if (!node.id)
                return (node.isOpen = val);
            if (val)
                this.expandedList[node.id] = val;
            else
                delete this.expandedList[node.id];
        };
        
        this.setError = function(error){
            this.error = error;
        };
        
        this.isOpen = function(node) {
            if (!node.id)
                return node.isOpen;
            return this.expandedList[node.id];
        };
        
        this.isSelected = function(node) {
            if (!node.id)
                return node.isSelected;
            return this.selectedList[node.id];
        };
        
        this.setSelected = function(node, val) {
            if (!node.id)
                return (node.isSelected = !!val);
            if (val)
                this.selectedList[node.id] = !!val;
            else
                delete this.selectedList[node.id];
        };

    }).call(DataProvider.prototype);

    return DataProvider;
});