// public/javascripts/config.js
requirejs.config({
    // load foundation and application kernel
    baseUrl: './',
    paths: {
        "templates": "./templates",
        "jquery": "../../components/jquery/jquery",
        "jquery.color": "../../components/jquery-color/jquery.color",
        "underscore": "../../components/underscore/underscore",
        "backbone": "../../components/backbone/backbone",
        "tpl": "../../components/requirejs-tpl/tpl",
        "fossil/view": "../../src"
    },
    shim: {
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
    }
});

require([
    'tpl!templates/canvas.html',
    'jquery',
    'underscore',
    'backbone',
    'fossil/view/regionManager',
    'userCollection',
    'sidebar',
    'main',
    'data',
    'jquery.color'
], function (canvasTpl, $, _, Backbone, RegionManager, UserCollection, Sidebar, MainPanel, data) {

    var layout = new RegionManager({
        regions: {
            "content": ".content",
            "sidebar": ".sidebar"
        },
        template: canvasTpl
    });

    var users = new UserCollection(data.users);
    layout.registerView(new Sidebar({collection: users}), 'sidebar');
    layout.registerView(new MainPanel({collection: users}), 'content');
    // event broker for views to communicate
    Backbone.on('canvas:render', function () {
        layout
            .render()
            .$el.animate({
                    'backgroundColor': '#43e'
                }).animate({
                    'backgroundColor': 'transparent'
                });
    });
    Backbone.on('canvas:render:region', function (name) {
        var $el = layout.subviews[name].$el;
        layout.subviews[name]
            .render()
            .$el.animate({
                    'backgroundColor': '#43e'
                }).animate({
                    'backgroundColor': 'transparent'
                });
    });
    layout.setElement('body').render();
});
