define(
    ['views/baseView','tmpl/main'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #login' : function () {

                }
            }
        });

        return new View();
    }
);