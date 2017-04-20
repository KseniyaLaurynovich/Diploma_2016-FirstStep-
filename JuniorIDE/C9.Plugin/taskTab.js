define(function(require, exports, module) {
    main.consumes = [
        "Editor", "editors", "ui", "commands", "menus", "layout", 
        "tabManager", "util", "settings"
    ];
    main.provides = ["juniorTask"];
    return main;
    
    function main(options, imports, register) {
        var Editor = imports.Editor;
        var editors = imports.editors;
        var tabs = imports.tabManager;
        var commands = imports.commands;
        var settings = imports.settings;
        var menus = imports.menus;
        var util = imports.util;
        var layout = imports.layout;
        var ui = imports.ui;
        
        var JuniorSettings = new (require("./settings"))(settings);
        
        var taskMarkup = require("text!./markup/task.xml");
        
        /***** Initialization *****/
        
        var extensions = [];
        
        var handle = editors.register("juniorTask", "Junior task", 
                                      JuniorTask, extensions);
                                      
        var emit = handle.getEmitter();
        emit.setMaxListeners(1000);
        
        var WIDTH = "300";
        
        var drawn = false;
        var parent, navigation, activePanel, container;
        
        function draw(options) {
            if (drawn) return;
            drawn = true;
            
            //var css = require("text!./preferences.css");
            //ui.insertCss(css, options.staticPrefix, handle);
            
            ui.insertMarkup(options.aml, taskMarkup, handle);
            
            emit("draw");
        }
        
        /***** Methods *****/

       
        /***** Editor *****/
        
        function JuniorTask() {
            var plugin = new Editor("JuniorIDETask", main.consumes, extensions);
            //var emit = plugin.getEmitter();
            var tab;
            
            plugin.on("resize", function(e) {
                emit("resize", e);
            });
            
            plugin.on("draw", function(e) {
                tab = e.tab;
                draw(e);
            });
            
            /***** Lifecycle *****/
            
            plugin.on("documentLoad", function(e) {
                var task = JuniorSettings.getCurrentTask();
                var doc = e.doc;
                
                doc.title = task.name;
                ui.insertMarkup(doc.tab.aml, taskMarkup, plugin);
            });
            
            plugin.on("documentActivate", function(e) {
                e.doc.tab.on("unload", function() {
                    if (parent.parentNode == tab)
                        tab.removeChild(parent);
                });
                
                tab.appendChild(parent);
                
                emit("show");
            });
            
            plugin.load(null, "juniorTask");
            
            return plugin;
        }
        
        register(null, {
            juniorTask: handle
        });
    }
});