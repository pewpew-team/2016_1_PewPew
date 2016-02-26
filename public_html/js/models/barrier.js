define(
    ['backbone'],
    function(Backbone) {
        var Barrier = Backbone.Model.extend({
            initialize : function(pos, barrerType) {
                this.set({
                    "position" : {
                        "x" : pos.x,
                        "y" : pos.y
                    },
                    "size" : {
                        "x" : 25,
                        "y" : 25
                    },
                    "type" : barrerType
                })
            }
        });
        return new Barrier();
    }
);