'use strict';

let Controller = require(global.PHINK_ROOT + 'mvc/controller');

class StickyFooter extends Controller {
    constructor(parent, viewName) {
        super(parent, viewName);

        this._home = '';
    }

    get home () {
        return this._home;
    }

    load(callback) {

        this._home = 'http://localhost:' + this.port;
        callback(true);
 
    }
}

module.exports = StickyFooter;
