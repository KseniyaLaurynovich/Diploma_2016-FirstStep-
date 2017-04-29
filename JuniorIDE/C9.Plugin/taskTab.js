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
        var settings = imports.settings;
        var info = imports.info;
        var ui = imports.ui;
        var vfs = imports.vfs;
        
        var Tree = require("ace_tree/tree");
        
        var StatisticDP = new (require("./dataProviders/statisticdp"))();
        var JuniorSettings = new (require("./settings"))(settings);
        var JuniorServer = new (require("./juniorServerApi"))(JuniorSettings);
        var DownloadManager = new (require("./download"))(vfs);

        var utils = require("./utils");
        
        var markup = require("text!./markup/task.xml");
        var css = require("text!./style.css");
        
        var membersTree;
        
        /***** Initialization *****/
        
        var extensions = [];
        
        var handle = editors.register(
            "juniorTask", "Junior task", JuniorTask, extensions);
                                      
        var emit = handle.getEmitter();
        emit.setMaxListeners(1000);
        
        var drawn = false;
        var parent;
        
        function draw(e) {
            if (drawn) return;
            drawn = true;
            
            ui.insertCss(css, options.staticPrefix, handle);
            ui.insertMarkup(e.tab.editor.aml, markup, handle);
            
            openDescription();
            initTabContainer();
            initEvents();
            
            emit("draw");
        }
        
        /***** Methods *****/

        function initTabContainer(){
            membersTree = new Tree(handle.getElement("barStatistic").$int);
            membersTree.setDataProvider(StatisticDP);
        }

        function openDescription(e){
            changeActiveTab("Description");
        }
       
        function loadStatistic(){
            JuniorServer.getTaskStatistic(function(error, result){
                if(error){
                    StatisticDP.setError(error);
                    return;
                }
                
                result.sort(function(th1, th2) { 
                    return new Date(th2.dateTime).getTime() - new Date(th1.dateTime).getTime();
                });
                
                var root = StatisticDP.root;
                root.children = result.map(function(th){
                    return {
                        dateTime: utils.dateTimeToString(new Date(th.dateTime)),
                        compiled: th.compiled,
                        pass: th.items.every(function(i){ return i.pass; }),
                        allTests: th.items.length,
                        passed: th.items.filter(function(i){ return i.pass; }).length,
                        children: th.items.map(function(t, i){ return { index: i + 1, pass: t.pass, isSubItem: true, errors: t.errors } }),
                        noSelect: true,
                        clickAction: "toggle",
                        className: "caption",
                        isOpen: false
                    }
                });
                StatisticDP.setRoot(root);
            }.bind(this));
        }
       
        function openStatistic(e){
            changeActiveTab("Statistic");
            loadStatistic();
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
                bar.hide();
            });
            
            var activeTab = handle.getElement("bar" + tabName);
            activeTab.show();
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
                
                openDescription();
                
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
                
                //load statistic
                loadStatistic();
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