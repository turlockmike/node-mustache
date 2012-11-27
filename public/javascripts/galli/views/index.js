$(function() {
    window.Galli = window.Galli || new Backbone.Model();

_.each($("[data-view]"), function(view) {
    var locals = {};
    var attributes = $(view).data("locals").split(",");


    var render = function() {
        window.attrs = attributes;
        _.each(attributes, function(attr) {
            locals[attr] = Galli.get(attr);
        })
        Galli.render($(view).data("view"), locals , function(html) {
            $(view).html(html);
        });
    }
    Galli.on("change", render);
    render();
    _.each(attributes, function(attr) {
        if (!Galli.get(attr)) {
             $.get($(view).data("path"), function(data) {
                 Galli.set(attr, data);
                 Galli.get()
             })
        }
    })


});
});