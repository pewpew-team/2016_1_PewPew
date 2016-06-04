define(function (require) {
    var scoreboard = require('models/scoreboard'),
        baseView = require('views/baseView'),
        tmpl = require('tmpl/scoreboard'),
        $ = require('jquery');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click .js-timeScores': 'timeScore',
            'click .js-multiScores': 'multiScore'
        },
        render: function (callback) {
            this.model.sync(
                function() {
                    var referrer = this.referrer || "#main";
                    this.$el.html(this.template(this.model.getScores(this.type)));
                    if(callback) {
                        callback();
                    }
                    $('.js-back').attr("href", referrer);
                }.bind(this)
            );
        },
        show: function () {
            this.render();
            baseView.prototype.show.call(this);
        },
        timeScore: function() {
            if ($(".js-timeScores").hasClass('menu__btn--back')){
                this.type = 'time';
                this.render(function () {
                    $(".js-timeScores").removeClass('menu__btn--back');
                    $(".js-multiScores").addClass('menu__btn--back');
                });
            }
        },
        multiScore: function() {
            if ($(".js-multiScores").hasClass('menu__btn--back')){
                this.type = 'multi';
                this.render(function() {
                    $(".js-timeScores").addClass('menu__btn--back');
                    $(".js-multiScores").removeClass('menu__btn--back');
                });
            }
        }
    });

    return new View({model: scoreboard});
});
