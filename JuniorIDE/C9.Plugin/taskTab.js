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
        
        var markup = require("text!./markups/task.xml");
        var css = require("text!./tab-style.css");
        
        var membersTree, doc;
        
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
       
        function setUploadButton(task){
                var isVisibleUploadButton = !task.isShared && !task.isClosed;
                
                var uploadButtonText = task.autoTested ? "Upload and test" : "Upload";
                var buttonText = task.testing ? ( task.autoTested ? "Testing..." : "Uploading..." ) : uploadButtonText;
                
                var uploadButton = handle.getElement("upload");
                
                /*if(isVisibleUploadButton)
                    uploadButton.show();
                uploadButton.hide();*/
                
                uploadButton.setAttribute("caption", buttonText);
                
                if(task.testing){
                    uploadButton.setAttribute("class", "btn-custom loading");
                    uploadButton.setAttribute("disabled", "true");
                }else{
                    uploadButton.setAttribute("class", "btn-custom");
                    uploadButton.setAttribute("disabled", "false");
                }
                
        }
       
        function loadStatistic(){
            var task = JuniorSettings.getCurrentTask();
            
            if(!task)
                return;
                
            var root = StatisticDP.root;
            
            JuniorServer.getTaskStatistic(task.id, function(error, result){
                if(error){
                    StatisticDP.setError(error);
                    root.children = [];
                    
                }else{
                
                    result.sort(function(th1, th2) { 
                        return new Date(th2.dateTime).getTime() - new Date(th1.dateTime).getTime();
                    });
                    
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
                }
                
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
            
            var uploadButton = handle.getElement("upload");
            uploadButton.addEventListener("click", function(){
                var task = JuniorSettings.getCurrentTask();
                task.testing = true;
                setUploadButton(task);
                
                uploadWorkspace();
            });
            
            var refreshBtn = handle.getElement("refreshTasks");
            
            refreshBtn.addEventListener("click", function(){
                var taskId = JuniorSettings.getCurrentTask().id;
                 refreshTask(taskId, refreshUi);
            });
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
            var task = JuniorSettings.getCurrentTask();
            
            if(!task)
                return;
            
            JuniorServer.uploadProject(task.id, stream, function(){});
        }
        
        function changeActiveTab(tabName){
            var navigationBar = handle.getElement("navigation");
            navigationBar.childNodes.forEach(function(node){
                node.setAttribute("class", "btn-menu");
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
        
        function refreshTask(taskId, callback){
            JuniorServer.getTask(taskId, function(error, task){
               
               if(task)
                JuniorSettings.setCurrentTask(task);
                
               if(callback) callback(error, task);
            });
        }
        
        function refreshUi(error, task){
            if(error)
                console.log(error);
            
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
            
            //upload button
            setUploadButton(task);
            
            //mark
            var markContainer = handle.getElement("markContainer");
            
            if(task.mark){
                markContainer.show();
                handle.getElement("mark").setAttribute("caption", task.mark);
            } else {
                markContainer.hide();
            }
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
                doc = e.doc;
                
                var taskTab = handle.getElement("taskTab");
                taskTab.hide();
                
                var loading = handle.getElement("loading");
                loading.show();
                
                refreshTask(task.id, function(error, task){
                    refreshUi(error, task);
                    
                    loading.hide();
                    taskTab.show();
                }); 
            });
            
            plugin.on("documentActivate", function(e) {
                e.doc.tab.on("unload", function() {
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