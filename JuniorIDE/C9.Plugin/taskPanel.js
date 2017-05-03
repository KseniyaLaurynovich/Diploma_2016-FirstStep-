define(function(require, exports, module) {
    main.consumes = [
        "Panel", "ui", "menus", "panels", "tabManager", "commands", "layout",
        "settings", "http", "preferences", "info", "vfs", "editors"
    ];
    main.provides = ["tasks.panel"];
    return main;
    
    function main(options, imports, register) {
        var Panel = imports.Panel;
        var ui = imports.ui;
        var tabs = imports.tabManager;
        var menus = imports.menus;
        var settings = imports.settings;
        var commands = imports.commands;
        var prefs = imports.preferences;
        
        var panelMarkup = require("text!./markup/panel.xml");
        var noAuthMarkup = require("text!./markup/not_authorized.xml");
        var loadingMarkup = require("text!./markup/loading.xml");
        
        var Tree = require("ace_tree/tree");
        
        var search = require('./search');
        var ListData = require("./dataProviders/taskdp");
        var JuniorSettings = new (require("./settings"))(settings);
        var JuniorServer = new (require("./juniorServerApi"))(JuniorSettings);
        
        /***** Initialization *****/
        
        var plugin = new Panel("Junior IDE", main.consumes, {
            index: options.index || 600,
            caption: "Tasks",
            minWidth: 500,
            width: 500,
            where: options.where || "right"
        });
        
        var taskNameFilter, tree, ldSearch, taskUpload, options;
        var lastSearch;
        
        function load() {
            plugin.setCommand({
                name: "tasks",
                hint: "search for a task",
                bindKey: { mac: "Command-H", win: "Ctrl-H" }
            });
            
            menus.addItemByPath("Goto/Goto task...", new ui.item({ 
                command: "tasks" 
            }), 300, plugin);
            
            initSettings();
        }
        
        var drawn = false;
        function draw(args) {
            if (drawn) return;
            
            drawn = true;
            
            ui.insertCss(require("text!./style.css"), plugin);
            
            authorizeCurrentUser(args, loadTasksMarkup, loadUnauthorizeMarkup);
        }
        
        /***** Methods *****/
    
        function authorizeCurrentUser(options, callbackOnSuccess, callbackOnError){
            var username = JuniorSettings.getUsername();
            var password = JuniorSettings.getPassword();
            
            if(!username || !password)
                callbackOnError();
                
            loadLoadingMarkup(options);
            
            JuniorServer.getToken(username, password, function(error, userData){
                setLoading(false);
                
                if(error){
                    callbackOnError(options, error);
                    return;
                }
                
                JuniorSettings.setToken(userData.access_token); 
                callbackOnSuccess(options);
            });
        }
    
        function loadLoadingMarkup(args){
            ui.insertMarkup(args.aml, loadingMarkup, plugin);
            setLoading(true);
        }
    
        function setLoading(loading){
             var loadingBar = plugin.getElement("loading");
             
            if(loading){
                loadingBar.setAttribute("style", "background-image: url(" +  options.staticPrefix + "/images/loading.gif)");
            }else{
                loadingBar.setAttribute("style", "");
            }
        }
    
        function loadUnauthorizeMarkup(args, error){
            ui.insertMarkup(args.aml, noAuthMarkup, plugin);
            showError(error);
        }
        
        function refreshTasks(){
            JuniorServer.getTasks(onDataReload.bind(this));
        }
        
        function loadTasksMarkup(args){
            ui.insertMarkup(args.aml, panelMarkup, plugin);
            
            var treeParent = plugin.getElement("tasksList");
            taskNameFilter = plugin.getElement("taskNameFilter");
            
            refreshTasks();
            
            var refreshBtn = plugin.getElement("refreshTasks");
            refreshBtn.setAttribute("style", "background-image: url(" + options.staticPrefix + "/images/refresh.png)")
            refreshBtn.addEventListener("click", refreshTasks);
            
            tree = new Tree(treeParent.$int);
            tree.on("click", onTaskClicked.bind(this));
            
            ldSearch = new ListData([], tabs);
            ldSearch.search = search;
            
            tree.renderer.setScrollMargin(0, 10);

            var key = commands.getPrettyHotkey("tasks");
            taskNameFilter.setAttribute("initial-message", key);
            tree.textInput = taskNameFilter.ace.textInput;
            
            taskNameFilter.ace.commands.addCommands([
                {
                    bindKey: "ESC",
                    exec: function() { plugin.hide(); }
                }
            ]);
            
            taskNameFilter.ace.on("input", function(e) {
                var val = taskNameFilter.getValue();
                filter(val);
                settings.set("state/tasksPanel/@value", val);
            });
        }
    
        function onDataReload(error, tasks){
            if(!error){
                ldSearch.tasks = tasks;
                ldSearch.updateData();
            }else{
                ldSearch.warnMessage = error;
            }
            
            tree.setDataProvider(ldSearch);
            tree.selection.$wrapAround = true;
        }
    
        function onTaskClicked(ev){
            
            if (tree.selection.getSelectedNodes().length === 1){
                var selectedIndex = tree.selection.getSelectedNodes()[0].index;
                ldSearch.selectedIndex = selectedIndex;
                
                tree.selection.clearSelection();
                openTaskTab();
            }
        }
    
        function openTaskTab(){
            var task = ldSearch.tasks[ldSearch.selectedIndex];
            
            if(!task)
                return;
                
            JuniorSettings.setCurrentTask(task);
            
            closeTaskTab();
            tabs.open({
                editorType: "juniorTask",
                active: true
            });
        }
    
        function closeTaskTab() {
            var pages = tabs.getTabs();
            for (var i = 0, tab = pages[i]; tab; tab = pages[i++]) {
                if (tab.editorType == "juniorTask") {
                    tab.close();
                }
            }
        }
    
        function initSettings(groups){
            prefs.add({
                "Junior IDE" : {
                    position: 450,
                    "Junior IDE plugin settings" : {
                        position: 100,
                        "Login": {
                            type: "textbox",
                            setting: JuniorSettings.loginKey,
                            width: "185",
                            position: 100
                        },
                        "Password": {
                            type: "password",
                            setting: JuniorSettings.passwordKey,
                            width: "185",
                            position: 200
                        }
                    }
                }
            }, plugin);
        }
    
        function showError(error){
            document.getElementById("error").innerHTML = error;
        }
    
        /**
         * Searches through the dataset
         *
         */
        function filter(keyword, nosel) {
            
            keyword = keyword.replace(/\*/g, "");
    
            // Needed for highlighting
            ldSearch.keyword = keyword;
            
            var names = ldSearch.tasks.map(function(task){
                return { 
                    displayName: task.name + ' ' + task.subjectName, 
                    id: task.id 
                };
            });
            
            var searchResults;
            if (!keyword) {
                searchResults = names;
            }
            else {
                tree.provider.setScrollTop(0);
                searchResults = search.byNameSearch(names, keyword);
            }
    
            lastSearch = keyword;
    
            if (searchResults){
                var filteredTasks = ldSearch.tasks.filter(function(task){
                    return searchResults.find(function (element, index, array) {
                      return element.id == task.id;
                    });
                });
                
                ldSearch.updateData(filteredTasks);
            }
                
            if (nosel || !searchResults.length)
                return;
    
            // select the first item in the list
            tree.select(tree.provider.getNodeAtIndex(0));
        }

        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("draw", function(e) {
            draw(e);
        });
        plugin.on("show", function(e) {
            if(taskNameFilter){
                taskNameFilter.focus();
                taskNameFilter.select();
            }
        });
        plugin.on("hide", function(e) {
            tabs.preview({ cancel: true });
        });
        plugin.on("unload", function() {
            drawn = false;
        });
        
        plugin.freezePublicAPI({
            /**
             * @property {Object}  The tree implementation
             * @private
             */
            get tree() { return tree; }
        });
        
        register(null, {
            "tasks.panel": plugin
        });
    }
});