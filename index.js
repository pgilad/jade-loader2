var jade = require('jade');
var loaderUtils = require('loader-utils');
var path = require('path');

module.exports = function (source) {
    if (this.cacheable) {
        this.cacheable();
    }
    var compileDebug = Boolean(this.debug);
    var pretty = false;
    var query = loaderUtils.parseQuery(this.query);
    var filename = loaderUtils.getRemainingRequest(this);
    var result;

    // use relative filename
    filename = path.relative(process.cwd(), filename);

    if (query.pretty !== undefined) {
        pretty = query.pretty;
    } else if (this.minimize !== undefined) {
        pretty = !this.minimize;
    }

    result = jade.compileClientWithDependenciesTracked(source, {
        compileDebug: compileDebug,
        filename: filename,
        globals: query.globals || [],
        pretty: Boolean(pretty),
        self: null
    });

    result.dependencies.forEach(function(dep) {
        this.addDependency(dep);
    }, this);

    var runtime = 'var jade = require("jade/lib/runtime");\n';
    var response = runtime + 'module.exports = ' + result.body + ';';
    return response;
};
