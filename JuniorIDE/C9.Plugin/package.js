define(function(require, exports, module) {
    main.consumes = ["Panel", "preferences", "http", "ui"];
    main.provides = ["juniorPlugin"];
    return main;

    function main(options, imports, register) {
        var Panel = imports.Panel;
        var prefs = imports.preferences;
        var http = imports.http;
        var ui = imports.ui;
        
        /***** Initialization *****/
        
        var plugin = new Panel("JuniorIDE", main.consumes, {
            index    : 100,
            width    : 500,
            caption  : "Tasks",
            minWidth : 500,
            where    : "right"
        });
        var emit = plugin.getEmitter();
        
        function load() {
             plugin.setCommand({
                name    : "My tasks",
                hint    : "My tasks",
                bindKey : { mac: "Command-H", win: "Ctrl-H" }
            });
        }
        
        prefs.add({
                "JuniorIDE" : {
                    position: 450,
                    "Junior IDE settings" : {
                        position: 100,
                        "My group": {
                            type: "dropdown",
                            setting: "user/junior/@group",
                            width: "185",
                            position: 100,
                            items: [
                                { value: "1", caption: "POIT-131" },
                                { value: "2", caption: "POIT-141" },
                                { value: "3", caption: "POIT-151" }
                            ]
                        }
                    }
                }
            }, plugin);
            
        
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        plugin.on("draw", function(e) {
            
            ui.insertSkin({
                name         : "c9statusbar",
                data         : require("text!./skin.xml"),
                "media-path" : options.staticPrefix + "/images/",
                "icon-path"  : options.staticPrefix + "/icons/"
            }, plugin);
            
            // Create UI elements
            ui.insertMarkup(null, require("text!./skin.xml"), plugin);
            
            // Insert CSS
            ui.insertCss(require("text!./style.css"), plugin);
            
            /*var dropdown = new ui.dropdown({
                id         : "ddCountries",
                childNodes : [
                    new ui.item({ caption: "United States of America" }),
                    new ui.item({ caption: "The Netherlands" }),
                    new ui.item({ caption: "France" }),
                    new ui.item({ caption: "China" })
                ]
            }, plugin);
            plugin.addElement(dropdown);
            var markup = require("text!./index.html");
            e.html.innerHTML = markup;
            
            ui.insertCss(require("text!./style.css"), options.staticPrefix, plugin);
            
            http.request("https://junioride-site.com/groups/all", function(err, data) {
                if (err) {
                    console.log(err);
                    console.log("error occures");
                }
                e.html.innerHTML = data;
            });*/
        });
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
        
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "juniorPlugin": plugin
        });
    }
});