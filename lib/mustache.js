var fs = require('fs');

/**
 * Require cache.
 */

var cache = {};

/**
 * Require cache.
 */

var requires = {};

/**
 * Clear the cache.
 *
 * @api public
 */

exports.clearCache = function () {
    cache = {};
};

/**
 * Read `path` with `options` with
 * callback `(err, str)`. When `options.cache`
 * is true the template string will be cached.
 *
 * @param {String} options
 * @param {Function} fn
 * @api private
 */

function read(path, options, fn) {
    var str = cache[path];

    // cached (only if cached is a string and not a compiled template function)
    if (options.cache && str && typeof str === 'string') return fn(null, str);

    // read
    fs.readFile(path, 'utf8', function (err, str) {
        if (err) return fn(err);
        if (options.cache) cache[path] = str;
        fn(null, str);
    });
}

module.exports = function (path, options, fn) {
    console.log("path",path);
    console.log("options", options.settings.views);
    var engine = requires.mustache || (requires.mustache = require('mustache'));
    read(path, options, function (err, str) {
        if (err) return fn(err);
        try {
            options.filename = path;
            var result = engine.render(str, options);
            if (options.layout) {
                read(options.settings.views + "/" + options.layout, options, function (err, strLayout) {
                    if (err) return fn(err);
                    try {
                        options.filename = options.layout;
                        options.yield = result;
                        fn(null, engine.render(strLayout, options));
                    }  catch(err) {
                        fn(err);
                    }
                });

            } else {
                fn(null, result);
            }
        } catch (err) {
            fn(err);
        }
    });
};