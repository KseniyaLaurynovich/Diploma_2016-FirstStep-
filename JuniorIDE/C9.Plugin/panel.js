define(function(require, exports, module) {
    main.consumes = [
        "Panel", "ui", "menus", "panels", "tabManager", "commands", "layout",
        "settings", "http"
    ];
    main.provides = ["tasks.panel"];
    return main;
    
    function main(options, imports, register) {
        var Panel = imports.Panel;
        var ui = imports.ui;
        var tabs = imports.tabManager;
        var menus = imports.menus;
        var panels = imports.panels;
        var layout = imports.layout;
        var settings = imports.settings;
        var commands = imports.commands;
        var http = imports.http;
        
        var markup = require("text!./panel.xml");
        var search = require('../c9.ide.navigate/search');
        var Tree = require("ace_tree/tree");
        var ListData = require("./dataprovider");
        var TasksProvider = require("./tasks")
        
        /***** Initialization *****/
        
        var plugin = new Panel("Junior IDE", main.consumes, {
            index: options.index || 600,
            caption: "Tasks",
            minWidth: 500,
            where: options.where || "right"
        });
        // var emit = plugin.getEmitter();
        
        var taskNameFilter, tree, ldSearch, tasksProvider;
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
        }
        
        var drawn = false;
        function draw(options) {
            if (drawn) return;
            drawn = true;
            
            // Create UI elements
            ui.insertMarkup(options.aml, markup, plugin);
            
            // Import CSS
            ui.insertCss(require("text!./style.css"), plugin);
            
            var treeParent = plugin.getElement("tasksList");
            taskNameFilter = plugin.getElement("taskNameFilter");

            // Create the Ace Tree
            tree = new Tree(treeParent.$int);
            ldSearch = new ListData({}, tabs);
            tasksProvider = new TasksProvider(http, handleDataReloading.bind(this));
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
            function forwardToTree() {
                tree.execCommand(this.name);
            }
            
            taskNameFilter.ace.commands.addCommands([
                "centerselection",
                "goToStart",
                "goToEnd",
                "pageup",
                "gotopageup",
                "scrollup",
                "scrolldown",
                "goUp",
                "goDown",
                "selectUp",
                "selectDown",
                "selectMoreUp",
                "selectMoreDown"
            ].map(function(name) {
                var command = tree.commands.byName[name];
                return {
                    name: command.name,
                    bindKey: command.editorKey || command.bindKey,
                    exec: forwardToTree
                };
            }));
            
            taskNameFilter.ace.on("input", function(e) {
                var val = taskNameFilter.getValue();
                filter(val);
                settings.set("state/tasksPanel/@value", val);
            });
    
            // Focus the input field
            setTimeout(function() {
                taskNameFilter.focus();
            }, 10);
            
            setTimeout(function() {
                // Assign the dataprovider
                tree.setDataProvider(ldSearch);
                tree.selection.$wrapAround = true;
                var val = settings.get("state/tasksPanel/@value");
                if (val)
                    taskNameFilter.ace.setValue(val);
            }, 200);
        }
        
        /***** Methods *****/
    
        function handleDataReloading(){
            ldSearch.tasks = tasksProvider.tasks;
            ldSearch.updateData();
        }
    
        /**
         * Searches through the dataset
         *
         */
        function filter(keyword, nosel) {
            keyword = keyword.replace(/\*/g, "");
    
            // Needed for highlighting
            ldSearch.keyword = keyword;
            
            var names = tasksProvider.tasks;
            
            var searchResults;
            if (!keyword) {
                searchResults = names;
            }
            else {
                tree.provider.setScrollTop(0);
                searchResults = search.fileSearch(names, keyword);
            }
    
            lastSearch = keyword;
    
            if (searchResults)
                ldSearch.updateData(searchResults);
                
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
        plugin.on("enable", function() {
            
        });
        plugin.on("disable", function() {
            
        });
        plugin.on("show", function(e) {
            taskNameFilter.focus();
            taskNameFilter.select();
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