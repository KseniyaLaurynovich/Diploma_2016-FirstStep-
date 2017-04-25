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
        var utils = require("./utils");
        
        /***** Initialization *****/
        
        var extensions = [];
        
        var handle = editors.register("juniorTask", "Junior task", 
                                      JuniorTask, extensions);
                                      
        var emit = handle.getEmitter();
        emit.setMaxListeners(1000);
        
        var drawn = false;
        var parent;
        
        function draw(e) {
            if (drawn) return;
            drawn = true;
            
            var css = require("text!./style.css");
            ui.insertCss(css, options.staticPrefix, handle);
            ui.insertMarkup(e.tab.editor.aml, taskMarkup, handle);
            
            initEvents();
            
            emit("draw");
        }
        
        /***** Methods *****/

        function openDescription(e){
            changeActiveTab("Description");
        }
       
        function openStatistic(e){
            changeActiveTab("Statistic");
        }
        
        function initEvents(){
            var btnDescription = handle.getElement("btnDescription");
            btnDescription.addEventListener("click", openDescription);
            
            var btnStatistic = handle.getElement("btnStatistic");
            btnStatistic.addEventListener("click", openStatistic);
            
            var logo = handle.getElement("logo");
            logo.setAttribute("src", options.staticPrefix + "/images/logo.png");
            
            var deadLine = handle.getElement("deadlineIcon");
            deadLine.setAttribute("src", options.staticPrefix + "/images/calendar.png");
        }
        
        function changeActiveTab(tabName){
            var navigationBar = handle.getElement("navigation");
            navigationBar.childNodes.forEach(function(node){
                node.setAttribute("class", "bar-task--btn");
            });
            
            var activeBtn = handle.getElement("btn" + tabName);
            activeBtn.setAttribute("class", activeBtn.class + " active");
            
            var contentBar = handle.getElement("content");
            contentBar.childNodes.forEach(function(bar){
                bar.setAttribute("class", "bar-content");
            });
            
            var activeTab = handle.getElement("bar" + tabName);
            activeTab.setAttribute("class", activeTab.class + " active");
        }
        
        /***** Editor *****/
        
        function JuniorTask() {
            var plugin = new Editor("JuniorIDETask", main.consumes, extensions);
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
                doc.value = task;
                
                //insert description
                var descriptionDiv = handle.getElement("barDescription");
                descriptionDiv.$html.innerHTML = task.description;
                
                //insert name
                var taskNameHeader = handle.getElement("taskName");
                taskNameHeader.$html.innerHTML = task.name;
                
                //insert deadline
                var deadlineDate = handle.getElement("deadlineDate");
                deadlineDate.$html.innerHTML = utils.dateTimeToDateString(new Date(task.deadline));
                var deadlineTime = handle.getElement("deadlineTime");
                deadlineTime.$html.innerHTML = utils.dateTimeToTimeString(new Date(task.deadline));
                
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