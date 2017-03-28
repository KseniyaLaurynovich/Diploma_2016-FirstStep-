define(function(require, exports, module) {
    main.consumes = [
        "Panel", "ui", "menus", "panels", "tabManager", "commands", "layout",
        "settings", "http", "preferences"
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
        var http = imports.http;
        var prefs = imports.preferences;
        
        var markup = require("text!./panel.xml");
        var noAuth = require("text!./not_authorized.html");
        
        var search = require('./search');
        var Tree = require("ace_tree/tree");
        var ListData = require("./dataprovider");
        
        var TasksProvider = require("./tasks");
        var GroupsProvider = require("./groups");
        var AuthSettings = require("./auth");
        
        /***** Initialization *****/
        
        var plugin = new Panel("Junior IDE", main.consumes, {
            index: options.index || 600,
            caption: "Tasks",
            minWidth: 500,
            width: 500,
            where: options.where || "right"
        });
        
        var taskNameFilter, tree, ldSearch, tasksProvider, groupsProvider, authSettings;
        var lastSearch;
        
        authSettings = new AuthSettings(settings);
        
        function load() {
            plugin.setCommand({
                name: "tasks",
                hint: "search for a task",
                bindKey: { mac: "Command-H", win: "Ctrl-H" }
            });
            
            menus.addItemByPath("Goto/Goto task...", new ui.item({ 
                command: "tasks" 
            }), 300, plugin);
            
            groupsProvider = new GroupsProvider(http)
            groupsProvider.onReload = onGroupsReload.bind(this);
            groupsProvider.load();
        }
        
        var drawn = false;
        function draw(options) {
            if (drawn) return;
            drawn = true;
            
            // Import CSS
            ui.insertCss(require("text!./style.css"), plugin);
            
            var group = authSettings.getGroup();
            if(!group){
                options.html.innerHTML = noAuth;
                return;
            }
            
            // Create UI elements
            ui.insertMarkup(options.aml, markup, plugin);
            
            var treeParent = plugin.getElement("tasksList");
            taskNameFilter = plugin.getElement("taskNameFilter");

            // Initialize task provider
            tasksProvider = new TasksProvider(http, group);
            tasksProvider.onReload = onDataReload.bind(this);
            tasksProvider.load();
            
            // Initialize the Ace Tree
            tree = new Tree(treeParent.$int);
            tree.on("click", onTaskClicked.bind(this));
            
            ldSearch = new ListData([], tabs);
            ldSearch.search = search;
            
            tree.renderer.setScrollMargin(0, 10);

            //set filter input placeholder
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
        
        /***** Methods *****/
    
        function onDataReload(){
            ldSearch.tasks = tasksProvider.tasks;
            ldSearch.updateData();
            
            tree.setDataProvider(ldSearch);
            tree.selection.$wrapAround = true;
        }
    
        function onTaskClicked(ev){
            var e = ev.domEvent;
            if (!e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey)
            if (tree.selection.getSelectedNodes().length === 1){
                var selectedIndex = tree.selection.getSelectedNodes()[0].index;
                
                if(ldSearch.selectedIndex != undefined){
                    ldSearch.selectedIndex = undefined;
                }else{
                    ldSearch.selectedIndex = selectedIndex;
                }
                
                tree.selection.clearSelection();
            }
        }
    
        function onGroupsReload(){
            
            var items = groupsProvider.groups.map(function(group){
                return {
                    value: group.id, caption: group.name
                }
            });
            
            prefs.add({
                "Junior IDE" : {
                    position: 450,
                    "Junior IDE plugin settings" : {
                        position: 100,
                        "Group": {
                            type: "dropdown",
                            setting: authSettings.groupKey,
                            width: "185",
                            position: 200,
                            items: items
                        }
                    }
                }
            }, plugin);
        }
    
        /**
         * Searches through the dataset
         *
         */
        function filter(keyword, nosel) {
            keyword = keyword.replace(/\*/g, "");
    
            // Needed for highlighting
            ldSearch.keyword = keyword;
            
            var names = tasksProvider.tasks.map(function(task){
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
                var filteredTasks = tasksProvider.tasks.filter(function(task){
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