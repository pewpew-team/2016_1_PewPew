define([
    'views/baseView',
    'tmpl/game',
    'gameLogic'
], function (baseView, tmpl, application) {
        console.log(application);
        var View = baseView.extend({
            template: tmpl,
            show: function(){
                application.init("Alex", "Edgar");
                application.run();
            }
        });

        return new View();
    }
);