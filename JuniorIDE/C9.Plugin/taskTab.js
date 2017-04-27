define(function(require, exports, module) {
    main.consumes = [
        "Editor", "editors", "ui", "commands", "menus", "layout", "info",
        "tabManager", "util", "settings", "vfs"
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
        var info = imports.info;
        var ui = imports.ui;
        var vfs = imports.vfs;
        
        var JuniorSettings = new (require("./settings"))(settings);
        var JuniorServer = new (require("./juniorServerApi"))();
        var DownloadManager = new (require("./download"))(vfs);
        
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
            
            var uploadButton = handle.getElement("upload");
            uploadButton.addEventListener("click", uploadWorkspace);
        }
        
        function uploadWorkspace(){
             upload(["/"], makeArchiveFilename(info.getWorkspace().name));
        }
        
        function upload(paths, filenameHeader){
            DownloadManager.downloadAsZip(paths, onProjectUpload.bind(this));
        }
    
        function makeArchiveFilename(filename) {
             
            return filename + getArchiveFileExtension();
        }
    
        function getArchiveFileExtension(){
            
            return ".zip";
        }
        
        function onProjectUpload(stream){
            JuniorServer.uploadProject("", stream, function(){alert("upload");});
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
                var tags = utils.getTagsHtml(task);
                var taskNameHeader = handle.getElement("taskName");
                taskNameHeader.$html.innerHTML = task.name + ' ' + tags;
                
                //insert deadline
                var deadlineDate = handle.getElement("deadlineDate");
                deadlineDate.$html.innerHTML = utils.dateTimeToDateString(new Date(task.deadline));
                var deadlineTime = handle.getElement("deadlineTime");
                deadlineTime.$html.innerHTML = utils.dateTimeToTimeString(new Date(task.deadline));
                
                //check if upload available
                var isVisibleUploadButton = !task.isShared && !task.isClosed;
                var uploadButtonText = task.autoTested ? "Upload and test" : "Upload";
                var uploadButton = handle.getElement("upload");
                
                /*if(isVisibleUploadButton)
                    uploadButton.show();
                uploadButton.hide();*/
                uploadButton.setAttribute("caption", uploadButtonText);
                
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