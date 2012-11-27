window.Galli = window.Galli || new Backbone.Model();
Galli.render = function (path, locals, callback) {
    if (Galli.templates && Galli.templates[path]) {
        callback(Mustache.render(Galli.templates[path], locals));
    } else {
        Galli.templates = Galli.templates || {};
        $.get("/templates" + path + ".mustache", function (data) {
            Galli.templates[path] = data;
            callback(Mustache.render(Galli.templates[path], locals));
        })
    }
};