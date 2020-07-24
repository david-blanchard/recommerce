var Phink = {}

Phink.DOM = (function () {

    class _DOM {
        constructor() {
            const FILE_NAME = 'phink.js';
            var phinkNode = document.querySelectorAll("script[src*='" + FILE_NAME + "']");
            this._depends = (phinkNode.length > 0 && phinkNode[0].dataset.depends !== undefined) ? phinkNode[0].dataset.depends.split(";") : [];
            this._sources = (phinkNode.length > 0 && phinkNode[0].dataset.sources !== undefined) ? phinkNode[0].dataset.sources.split(";") : [];

            if(this._depends.length > 0 && this._depends[this._depends.length - 1] == "" ) {
                this._depends.pop();
            }
            if(this._sources.length > 0 && this._sources[this._sources.length - 1] == "" ) {
                this._sources.pop();
            }

            this._rewriteBase = (phinkNode.length > 0 && phinkNode[0].dataset.rewritebase !== undefined) ? phinkNode[0].dataset.rewritebase : null;
            this._main = (phinkNode.length > 0 && phinkNode[0].dataset.init !== undefined) ? phinkNode[0].dataset.init : 'phink_main';

            this._rewriteBase = (this._rewriteBase === null) ? (new URL(phinkNode[0].src)).pathname.replace(FILE_NAME, '') : this._rewriteBase;

            this._rewriteBase = this._rewriteBase != '' ? this._rewriteBase : '/';

        }
        get rewriteBase() {
            return this._rewriteBase;
        }
        get depends() {
            return this._depends;
        }
        get sources() {
            return this._sources;
        }
        get main() {
            return this._main;
        }
        ready(f) {
            /in/.test(document.readyState) ? setTimeout('Phink.DOM.ready(' + f + ')', 9) : f();
        }
    }
    return new _DOM();
})();

Phink.include = function (file, callback) {
    var tag = document.createElement("script");
    tag.src = file;
    tag.type = "text/javascript";

    tag.addEventListener('load', function (e) {
        while (!e.returnValue) {

        }
        if (typeof callback === 'function') {
            callback.call(null, e);
        }
    })
    document.body.appendChild(tag);

}

Phink.ajax = function (url, data, callback) {
    var params = [];

    var urls = new Phink.Url(url, window.location.hostname);
    url = urls.toString();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            params.push(key + '=' + encodeURI(data[key]));
        }
    }

    var queryString = params.join('&');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhr.onload = function () {
        if (xhr.status < 300 || xhr.status === 304) {
            var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];

            if (typeof callback == 'function') {
                callback.call(this, data, xhr.statusText, xhr);
            }
        }

    }
    xhr.onerror = function () {
        xhr.abort();
    }
    xhr.onabort = function () {
        if (xhr.statusText === 'error') {
            errorLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + xhr.statusText + "\r\n" +
                "Message : " + xhr.responseText);
        }
    }

    xhr.send(queryString);
}

function debugLog(message) {
    console.log(message);
}

function errorLog(message) {
    console.error(message);
}

var Phink = Phink || {}

Phink.Registry = (function () {
    
    class _Registry {
        constructor() {
            this._registry = [];
        }
        write(item, key, value) {
            if (this._registry[item] === undefined) {
                this._registry[item] = {};
            }
            this._registry[item][key] = value;
        }
        read(item, key, defaultValue) {
            var result = null;
            if (this._registry[item] !== undefined) {
                result = (this._registry[item][key] !== undefined) ? this._registry[item][key] : ((defaultValue !== undefined) ? defaultValue : null);
            }
            return result;
        }
        item(item) {
            if(item == '') {
                item = '#';
            }

            if (item === null || item === undefined) {
                return null;
            }

            if (this._registry[item] !== undefined && this._registry[item] !== null) {
                return this._registry[item];
            }
            else {
                this._registry[item] = {};
                return this._registry[item];
            }
        }
        items() {
            return this._registry;
        }
        clear() {
            this._registry = {};
        }
        exists(item, key, value) {
            if(item !== undefined && key === undefined && value === undefined) {
                return this._registry[item] !== undefined;
            }
            if(item !== undefined && key !== undefined && value === undefined) {
                return this._registry[item][key] !== undefined;
            }
            if(item !== undefined && key !== undefined && value !== undefined) {
                return this._registry[item][key][value] !== undefined;
            }
        }
        set token(value) {
            this._registry['token'] = value;
            return this;
        }
        get token() {
            return this._registry['token'];
        }
        set origin(value) {
            this._registry['origin'] = value;
            return this;
        }
        get origin() {
            return this._registry['origin'];
        }
        set script(script) {
            var s = script.replace(/\//g, '_');
            this.write('scripts', s, script);
        }
        set scripts(scripts) {
            for(var i in scripts) {
                var value = scripts[i];
                var s = value.replace(/\//g, '_');

                this.write('scripts', s, value);
            }
        }
        get scripts() {
            return this.read('scripts');
        }
        scriptExists(script) {
            var s = script.replace(/\//g, '_');
            if(this._registry['scripts'] === undefined) {
                this._registry['scripts'] = [];
            }
            return this._registry['scripts'][s] === script;

        }
    }

    return new _Registry();
})();

var Phink = Phink || {};

Phink.Object = class _Object {
    constructor(parent = null) {
        this._id = '';
        this._name = '';
        this._parent = parent;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get parent() {
        return this._parent;
    }
}

var Phink = Phink || {}

Phink.Url = class _Url {
    constructor(url, domain, isSSL) {
        this._url = url;
        this._isParsed = false;
        this._isSSL = (isSSL !== undefined) ? isSSL : (window.location.protocol == 'https:');
        
        this._tmpDomain = domain;
        this._port = window.location.port;
        this._page = window.location.pathname;
        this._domain = this._url;
        this._isRelative = false;
        this.parse();
    }
    parse() {
        var result = [];
        this._protocol = '';
        if (this._tmpDomain !== undefined) {
            this._protocol = (this._tmpDomain.search('://') > -1) ? this._tmpDomain.substring(0, this._tmpDomain.search('://') + 1) : '';
        }
        else {
            this._protocol = (this._url.search('://') > -1) ? this._url.substring(0, this._url.search('://') + 1) : '';
        }
        if (this._protocol === '' && this._tmpDomain === undefined) {
            this._page = this._url;
            this._isRelative = true;
            this._protocol = window.location.protocol;
            this._domain = window.location.hostname;
            this._port = window.location.port;
            //this._url = window.location.href.substring(0, window.location.href.search('/'));
        }
        else {
            if (this._protocol === '' && this._tmpDomain !== undefined) {
                this._domain = this._tmpDomain;
                this._protocol = (this._isSSL) ? 'https:' : 'http:';
            }
            else {
                if (this._protocol === '') {
                    this._protocol = (this._isSSL) ? 'https:' : 'http:';
                    //throw new Error('Invalid absolute url. Protocol is missing');
                }
                this._url = this._url.replace(this._protocol + '//', '');
                var domainLimit = this._url.search('/');
                if (domainLimit > 0) {
                    this._domain = this._url.substring(0, domainLimit);
                    this._url = this._url.replace(this._domain, '');
                }
                else if (this._tmpDomain !== undefined) {
                    this._domain = this._tmpDomain;
                }
                else {
                    this._domain = this._url;
                    this._url = '/';
                }
                if (this._domain.search(':') > -1) {
                    this._port = this._domain.substring(this._domain.search(':'));
                    this._url = this._url.replace(':' + this._port, '');
                }
                if (this._domain.search('localhost') > -1) {
                    this._domain = 'localhost';
                    this._url = this._url.replace(this._domain, '');
                }
            }
            this._page = this._url;
            if (this._page.substring(0, 1) === '/') {
                this._page = this._page.substring(1);
            }
            this._port = (this._port === '') ? (this._isSSL) ? '443' : '80' : this._port;
            this._protocol = ((this._domain !== '' && this._protocol === '') ? ((this._isSSL) ? 'https:' : 'http:') : this._protocol);
        }
        var queryString = '';
        if (this._page.search(/\?/) > -1) {
            queryString = this._page.substring(this._page.search(/\?/));
        }
        this._queryString = queryString;
        result.isRelative = this._isRelative;
        result.protocol = this._protocol;
        result.domain = this._domain;
        result.port = this._port;
        result.page = this._page;
        result.queryString = this._queryString;
        this._url = result;
        this._isParsed = true;
        return result;
    }
    toString() {
        if (!this._isParsed) {
            this.parse();
        }
        var fqUrl = (this._queryString !== '') ? this._page + this._queryString : this._page;
        fqUrl = this._protocol + '//' + (this._domain + (this._port !== '80' && this._port !== '443' ? ':' + this._port : '') + Phink.DOM.rewriteBase + fqUrl).replace(/\/\//g, '/');
        return fqUrl;
    }
}

var Phink = Phink || {}

Phink.Rest = (function () {
    class _Rest {
        constructor() {
        }
        /**
             * Performs a HEAD request and return the result to a callback function
             *
             * @param {string} url
             * @param {function} callback
             * @returns JSON stream
             */
        head(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url);
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send();
        }
        /**
             * Performs a GET request and return the result to a callback function
             *
             * @param {string} url
             * @param {function} callback
             * @returns JSON stream
             */
        get(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send();
        }
        /**
             * Performs a POST request and return the result to a callback function
             *
             * @param {string} url
             * @param {array} data
             * @param {function} callback
             * @returns JSON stream on callback
             */
        post(url, data, callback) {
            var xhr = new XMLHttpRequest();
            var params = '';
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    params += '&' + encodeURI(key + '=' + data[key]);
                }
            }
            params = params.substring(1);
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send(params);
        }
        /**
         * Performs a PATCH request and return the result to a callback function
         *
         * @param {string} url
         * @param {array} data
         * @param {function} callback
         * @returns JSON stream on callback
         */
        patch(url, data, callback) {
            var xhr = new XMLHttpRequest();
            var params = '';
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    params += '&' + encodeURI(key + '=' + data[key]);
                }
            }
            params = params.substring(1);
            xhr.open('PATCH', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send(params);
        }
        /**
         * Performs a PUT request and return the result to a callback function
         *
         * @param {string} url
         * @param {array} data
         * @param {function} callback
         * @returns JSON stream on callback
         */
        put(url, data, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify(data));
        }
        /**
             * Performs a DELETE request and return the result to a callback function
             *
             * @param {string} url
             * @param {function} callback
             * @returns JSON stream on callback
             */
        delete(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', url);
            xhr.onload = function () {
                if (typeof callback === 'function') {
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        callback.call(this, data);
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            };
            xhr.send();
        }
    }

    return new _Rest()
})()

var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Object = class _WebObject extends Phink.Object {
    constructor(parent) {
        super();
        if (parent !== undefined) {
            this._isSecured = parent.isSecured;
            this._domain = parent.domain;
        } else {
            this._isSecured = (window.location.protocol === 'https:');
            this._domain = window.location.hostname;
        }
        this._origin = window.location.origin;
        this._url = {};
        this._token = '';
    }
    get isSecured() {
        return this._isSecured;
    }

    get domain() {
        return this._domain;
    }
    set origin(value) {
        this._origin = value;
    }

    get origin() {
        return this._origin;
    }
    set token(value) {
        this._token = value;
    }
    get token() {
        return this._token;
    }
    fullyQualifiedURL(url, domain) {
        this._url = new Phink.Url(url, domain, this._isSecured);
        return this._url.toString();
    }
    get url() {
        return this._url;
    }
    getJSON(url, postData, callback) {
        postData.token = Phink.Registry.token;
        this._origin = Phink.Registry.origin;
        var urls = this.fullyQualifiedURL(url, this._domain);
        var xhr = new XMLHttpRequest();
        var params = '';
        for (var key in postData) {
            if (postData.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + postData[key]);
            }
        }
        params = params.substring(1);
        xhr.open('POST', urls);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xhr.onload = function () {
            if (typeof callback === 'function') {
                if (xhr.status === 200 || xhr.status === 202) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                    try {
                        if (data.error !== undefined) {
                            errorLog('Error : ' + data.error);
                        }
                        else {
                            Phink.Registry.token = data.token;
                            Phink.Registry.origin = xhr.getResponseHeader('origin');
                            callback.call(this, data, xhr.statusText, xhr);
                        }
                    }
                    catch (e) {
                        errorLog(e);
                    }
                }
            }
        };
        xhr.send(params);
    }
    getJSONP(url, postData, callback) {
        postData.token = Phink.Registry.token;
        this.origin = Phink.Registry.origin;
        var urls = this.fullyQualifiedURL(url, this.domain);
        Phink.ajax(urls + "&callback=?", postData, function (data, textStatus, xhr) {
            try {
                Phink.Registry.token = data.token;
                Phink.Registry.origin = xhr.getResponseHeader('origin');
                if (typeof callback == 'function') {
                    callback.call(this, data, textStatus, xhr);
                }
            }
            catch (e) {
                errorLog(e);
            }
        });
    }
    getScript(url, callback) {
        var urls = this.fullyQualifiedURL(url, this.domain);
        Phink.include(urls, callback);
    }
    static getCSS(attributes) {
        // setting default attributes
        if (typeof attributes === "string") {
            var href = attributes;
            if (this.origin !== undefined) {
                href = this.origin + '/' + href;
            }
            attributes = {
                href: href
            };
        }
        if (!attributes.rel) {
            attributes.rel = "stylesheet";
        }
        // appending the stylesheet
        var styleSheet = document.createElement("link");
        for (var key in attributes) {
            styleSheet.setAttribute(key, attributes[key]);
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(styleSheet);
    }
}

var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Application = class _WebApplication extends Phink.Web.Object {
    constructor(domain, name, isSecured) {
        super();
        this._id = 'app' + Date.now();
        if (name === undefined) {
            name = this._id;
        }

        this._name = name;
        this.viewCollection = [];
        this.controllerCollection = [];
    }
    includeView(name) {
        include('app/controllers/' + name + '/' + name + '.js');
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        return newView;
    }
    createView(name, callback) {
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        
        if(typeof callback === 'function') {
            callback.call(this);
        }
        return newView;
    }
    createController(viewName, name, callback) {
        var view = this.getViewByName(viewName);
        var newCtrl = Phink.MVC.Controller.create(view, name);
        this.addController(newCtrl);

        if(typeof callback === 'function') {
            callback.call(this);
        }
        return newCtrl;
    }
    getViewByName(viewName) {
        var view = null;
        for (var name in this.viewCollection) {
            if (name === viewName && this.viewCollection[name] !== null) {
                view = this.viewCollection[name];
                break;
            }
        }

        if (!(view instanceof Phink.MVC.View)) {
            throw new Error('A view with the name ' + viewName + ' does not exist');
        }

        return view;
    }
    addView(view) {
        if (view === null)
            return null;
        if (!(view instanceof Phink.MVC.View)) {
            throw new Error('This is not a view');
        }
        else {
            this.viewCollection[view.name] = view;
        }
    }
    addController(controller) {
        if (controller === undefined)
            return null;
        if (!(controller instanceof Phink.MVC.Controller)) {
            throw new Error('This is not a controller');
        }
        else {
            this.controllerCollection.push(controller);
        }
    }
    static create(domain, name, isSSL) {
        return new Phink.Web.Application(domain, name, isSSL);
    }
}

var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}

Phink.MVC.View = class _View extends Phink.Web.Object {
    constructor(application, name) {
        super(application);
        this._id = 'view' + Date.now();
        this._domain = (application !== undefined) ? application.domain : '';
        this._isSecured = (application !== undefined) ? application.isSecured : '';
        this._token = '';
        this._name = name;
        // Phink.Registry.item(this._domain).view = this;
    }
    requestSimpleView(view, callback) {
        this.requestView(view, 'getViewHtml', null, callback);
    }
    requestView(view, action, args, callback) {
        var the = this;
        var token = Phink.Registry.token;
        var urls = this.fullyQualifiedURL(view, this._domain);
        var postData = { "action": action, "token": token };
        if (args != null) {
            for (var key in args) {
                postData[key] = args[key];
            }
        }
        var xhr = new XMLHttpRequest();
        var params = '';
        for (var key in postData) {
            if (postData.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + postData[key]);
            }
        }
        params = params.substring(1);
        xhr.open('POST', urls);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Accept", "application/json, text/javascript, request/view, */*; q=0.01");
        xhr.onload = function () {
            if (typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                    //            var url = Phink.Web.Object.parseUrl(pageName);
                    //            Phink.Registry.item(the.name).origin = xhr.getResponseHeader('origin');
                    Phink.Registry.origin = xhr.getResponseHeader('origin');
                    Phink.Registry.token = data.token;
                    if (data.jso !== undefined) {
                        Phink.Backend.loadScriptsArray(data.jso);
                    }
                    if (data.scripts !== undefined) {
                        Phink.Backend.loadScriptsArray(data.scripts);
                    }

                    data.view = atob(data.view);
                    if (typeof callback === 'function') {
                        callback.call(this, data);
                    }
                    else {
                        document.querySelector(document.body).innerHTML = data.view;
                    }
                }
                else {
                    callback.call(this, xhr.status);
                }
            }
        };
        xhr.send(params);
    }
    requestPart(pageName, action, attach, postData, callback) {
        var the = this;
        var token = Phink.Registry.token;
        var urls = this.fullyQualifiedURL(pageName, this._domain);
        postData = postData || {};
        postData.action = action;
        postData.token = token;
        var the = this;
        var xhr = new XMLHttpRequest();
        var params = '';
        for (var key in postData) {
            if (postData.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + postData[key]);
            }
        }
        params = params.substring(1);
        xhr.open('POST', urls);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Accept", "application/json, text/javascript, request/partialview, */*; q=0.01");
        xhr.onload = function () {
            try {
                if (typeof callback === 'function') {
                    var data = [];
                    data.status = xhr.status;
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        Phink.Registry.token = data.token;
                        Phink.Registry.origin = xhr.getResponseHeader('origin');
                        if (data.jso !== undefined) {
                            Phink.Backend.loadScriptsArray(data.jso);
                        }
                        if (data.scripts !== undefined) {
                            Phink.Backend.loadScriptsArray(data.scripts);
                        }
                        var html = atob(data.view);
                        document.querySelector(attach).innerHTML = html;
                        if (typeof callback === 'function') {
                            callback.call(this, data);
                        }
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            }
            catch (e) {
                errorLog(e);
            }
        };
        xhr.send(params);
    }
    parseResponse(response, callback) {
        if (response === '') {
            throw new Error('Response is empty !');
        }
        var the = this;
        response = atob(response);
        var data = JSON.parse(response);
        if (data['view'] === undefined) {
            throw new Error('Not a view !');
        }
        if (data.jso !== undefined) {
            Phink.Backend.loadScriptsArray(data.jso);
        }
        if (data.scripts !== undefined) {
            Phink.Backend.loadScriptsArray(data.scripts);
        }
        if (typeof callback === 'function') {
            callback.call(this, data);
        }
    }
    attachWindow(pageName, anchor) {
        this.requestSimpleView(pageName, function (data) {
            if (anchor !== undefined) {
                document.querySelector(anchor).innerHTML = data.view;
            }
            else {
                document.querySelector(document.body).innerHTML = data.view;
            }
        });
    }
    attachView(pageName, anchor) {
        var the = this;
        var myToken = Phink.Registry.token;
        this.getJSON(pageName, { "action": 'getViewHtml', "token": myToken }, function (data) {
            try {
                Phink.Registry.token = data.token;
                if (data.jso !== undefined) {
                    Phink.Backend.loadScriptsArray(data.jso);
                }
                if (data.scripts !== undefined) {
                    Phink.Backend.loadScriptsArray(data.scripts);
                }
                var html = atob(data.view);
                document.querySelector(anchor).innerHTML = html;
            }
            catch (e) {
                errorLog(e);
            }
        });
    }
    attachIframe(id, src, anchor) {
        var iframe = document.createElement('iframe');
        iframe.frameBorder = 0;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.id = id;
        iframe.setAttribute("src", src);
        document.getElementById(anchor).appendChild(iframe);
    }
    static create(parent, name) {
        return new Phink.MVC.View(parent, name);
    }
}

var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}
Phink.MVC.Controller = class _Controller extends Phink.Web.Object {
    constructor(view, name) {
        super();
        this._domain = (view !== null) ? view.domain : '';
        this._isSecured = (view !== null) ? view.isSecured : false;
        this._hasView = true;
        if (view instanceof Phink.MVC.View) {
            this._parent = view;
        }
        else if (typeof view === 'Object' || view === null) {
            throw new Error('Not a valid view');
        }
        else {
            this._hasView = false;
        }
        this._name = name;
    }
    oninit(callback) {
        if (typeof callback === 'function') {
            callback.call(this);
        }
        return this;
    }
    onload(callback) {
        var the = this;
        Phink.DOM.ready(function () {
            if (typeof callback === 'function') {
                callback.call(the);
            }
        });
        return this;
    }
    render() {
        if (typeof this.oninit === 'function') {
            this.oninit();
        }
        if (typeof this.onload === 'function') {
            this.onload();
        }
    }
    actions(actions) {
        for (var key in actions) {
            this[key] = actions[key];
        }
        this.render();
        return this;
    }
    route(route, callback) {
        var routeMatcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
        this._parent.requestView(view, action, args, callback);
    }
    getSimpleView(view, callback) {
        this._parent.requestSimpleView(view, callback);
    }
    getView(view, action, args, callback) {
        this._parent.requestView(view, action, args, callback);
    }
    getPartialView(pageName, action, attach, postData, callback) {
        this._parent.requestPart(pageName, action, attach, postData, callback);
    }
    parseViewResponse(pageName, callback) {
        this._parent.parseResponse(pageName, callback);
    }
    attachWindow(pageName, anchor) {
        this._parent.attachWindow(pageName, anchor);
    }
    attachView(pageName, anchor) {
        this._parent.attachView(pageName, anchor);
    }
    attachIframe(id, src, anchor) {
        this._parent.attachIframe(id, src, anchor);
    }
    static create(parent, name) {
        if (name === undefined) {
            name = 'ctrl' + Date.now();
        }
        return new Phink.MVC.Controller(parent, name);
    }
}

var Phink = Phink || {}

Phink.Utils = class _Utils {
    constructor() {
    }
    static find(haystack, index, needle) {
        var result = [];
        if (haystack.length === 0) {
            return result;
        }
        var first = (Array.isArray(haystack[0])) ? haystack[0] : JSON.parse(haystack[0]);
        if (first.length < index - 1)
            return result;
        for (var k = 0; k < haystack.length; ++k) {
            var row = (Array.isArray(haystack[k])) ? haystack[k] : JSON.parse(haystack[k]);
            if (needle == row[index]) {
                result = row;
                break;
            }
        }
        return result;
    }
    /**
     *
     * @param {type} haystack
     * @param {type} key
     * @param {type} needle
     * @returns {Array|TUtils.grep.haystack}
     */
    static grep(haystack, key, needle) {
        var result = [];
        if (haystack.length === 0)
            return result;
        var first = (Array.isArray(haystack[0])) ? haystack[0] : JSON.parse(haystack[0]);
        if (!first.hasOwnProperty(key))
            return result;
        for (var k = 0; k < haystack.length; ++k) {
            var row = (Array.isArray(haystack[k])) ? haystack[k] : JSON.parse(haystack[k]);
            if (needle == row[key]) {
                result = row;
                break;
            }
        }
        return result;
    }
    static resizeIframe(ui) {
        ui.style.height = ui.contentWindow.document.body.scrollHeight + 'px';
    }
    static html64(container, html) {
        document.querySelector(container).innerHTML = atob(html);
    }
    static secondsToString(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - (minutes * 60);
        return minutes + ':' + ('00' + seconds).toString().slice(-2);
    }
    static base64Decode(data) {
        if (!data) {
            return data;
        }
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
        data += '';
        do {
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            }
            else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            }
            else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
        dec = tmp_arr.join('');
        dec = _Utils.utf8Decode(dec);
        return dec;
    }
    static base64Encode(data) {
        if (!data) {
            return data;
        }
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
        data = _Utils.utf8Encode(data + '');
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }
    static utf8Decode(str_data) {
        var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
        str_data += '';
        while (i < str_data.length) {
            c1 = str_data.charCodeAt(i);
            if (c1 < 128) {
                tmp_arr[ac++] = String.fromCharCode(c1);
                i++;
            }
            else if (c1 > 191 && c1 < 224) {
                c2 = str_data.charCodeAt(i + 1);
                tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = str_data.charCodeAt(i + 1);
                c3 = str_data.charCodeAt(i + 2);
                tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return tmp_arr.join('');
    }
    static utf8Encode(argString) {
        if (argString === null || typeof argString === "undefined") {
            return "";
        }
        var string = (argString + '');
        var utftext = "", start, end, stringl = 0;
        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
            if (c1 < 128) {
                end++;
            }
            else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
            }
            else {
                enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl);
        }
        return utftext;
    }
    static arrayToFormData(data, formData, previousKey, index) {
        if (!(data instanceof Object))
            return false;
        if (formData === undefined)
            formData = new FormData;
        Object.keys(data).forEach(function (key, j) {
            const value = data[key];
            var curKey = key;
            if (previousKey) {
                curKey = `${previousKey}[${j}].${key}`;
                if (index !== undefined) {
                    //curKey = `${previousKey}[${index}][${j}].${key}`;
                    curKey = `${previousKey}[${index}].${key}`;
                }
            }
            if (value instanceof Object && !Array.isArray(value)) {
                arrayToFormData(value, formData, curKey);
            }
            if (Array.isArray(value)) {
                value.forEach(function (val, i) {
                    if (!(val instanceof Object)) {
                        formData.append(`${curKey}[${i}]`, val);
                    }
                    arrayToFormData(val, formData, curKey, i);
                });
            }
            else {
                if (!(value instanceof Object)) {
                    formData.append(curKey, value);
                }
            }
        });
        return formData;
    }

}


var Phink = Phink || {}

Phink.Backend = class _Backend {
    constructor() {
        this.isHacking = false;
        this.command = '';
    }
    static loadScriptsArray(scripts, callback) {

        var F = function (src) {
            if (Phink.Registry.scriptExists(src)) {
                return false;
            }

            var tag = document.createElement("script");
            tag.src = src;
            tag.type = "text/javascript";

            tag.addEventListener('load', function (e) {
                // while (!e.returnValue) {

                // }

                if (scripts.length === 0 && typeof callback === 'function') {
                    callback.call(null);
                }
            })
            document.body.appendChild(tag);

            Phink.Registry.script = src;

            if (scripts.length > 0) {
                let next = scripts.shift();

                if (next) {
                    F(next);
                }

            }

        };
        if (scripts.length > 0) {
            F(scripts.shift());
        }


    }

    static bindEvents() {

        window.onkeydown = function (e) {
            var code = e.keyCode ? e.keyCode : e.which;

            if (code === 27) { // ESC is typed
                this.command = '';
                console.log("command = '" + this.command + "'");
            }
        };

        window.onkeypress = function (e) {
            var code = e.keyCode ? e.keyCode : e.which;

            if (code === 35 && this.command === '') { // # is typed
                this.command += String.fromCharCode(code);
                console.log("command = '" + this.command + "'");
            } else if (code === 33 && this.command === '#') { // #! is typed
                this.command += String.fromCharCode(code);
                this.isHacking = true; // trying to log in as administrator
                console.log("command = '" + this.command + "'");
            } else if (this.isHacking) {
                this.command += String.fromCharCode(code);
                console.log("command = '" + this.command + "'");
            }

            Phink.Commands.run(this.command);
        };
    }

}

var Phink = Phink || {}

Phink.Commands = (function () {

    class _Commands {
        constructor() {}
        clearRuntime(callback) {
            Phink.ajax('admin/console/', {
                "action": 'clearRuntime'
            }, function (data, status, xhr) {
                if (typeof callback == 'function') {
                    callback.call(this, data, status, xhr);
                } else {
                    console.log(data.result);
                }
            });
        }
        run(command) {
            if (command === '#!r') { // rlog command
                this.clearRuntime();
            }
        }
    }

    return new _Commands();
})();
var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Plugin = class _Plugin extends Phink.Web.Object {
    constructor() {
        super();
    }
    dataBind(tableId, values, templates) {
        let colNum = templates.length;
        let rowNum = values.length;
        for (let j = 0; j < rowNum; j++) {
            let row = values[j];
            for (let i = 0; i < colNum; i++) {
                let template = templates[i];
                let html = row[i];
                if (template.content !== null && template.enabled) {
                    html = template.content;
                    let event = template.event;
                    let e = event.split('#');
                    if (e[0] === 'href') {
                        event = 'javascript:' + e[1];
                    }
                    else {
                        event = e[0] + '="' + e[1] + '"';
                    }
                    for (let m = 0; m < colNum; m++) {
                        html = html.replace('{{ ' + templates[m].name + ' }}', row[m]);
                        event = event.replace(templates[m].name, row[m]);
                        html = html.replace('{{ &' + templates[m].name + ' }}', event);
                    }
                }
                if (template.enabled) {
                    document.querySelector(tableId + 'td' + (i + colNum * j).toString()).innerHTML = html;
                }
            }
        }
    }
    static create() {
        return new Phink.Web.UI.Plugin();
    }
    static applyTemplate(templates, row, i) {
        let html = row[i];
        //    if(templates[i] === undefined) {
        //        return html;
        //    }
        if (templates[i].content !== '' && templates[i].enabled) {
            html = templates[i].content;
            let event = templates[i].event;
            let e = event.split('#');
            if (e[0] === 'href') {
                event = 'javascript:' + e[1];
            }
            else {
                event = e[0] + '="' + e[1] + '"';
            }
            for (let m = 0; m < templates.length; m++) {
                //            if(templates[m] === undefined) continue;
                html = html.replace('{{ ' + templates[m].name + ' }}', row[m]);
                html = html.replace('{{ ' + templates[m].name + ':index }}', m);
                event = event.replace(templates[m].name, "'" + row[m] + "'");
                html = html.replace('{{ &' + templates[m].name + ' }}', event);
            }
        }
        return html;
    }
    static applyDragHelper(templates, row, i) {
        let html = row[i];
        if (templates[i].dragHelper !== '' && templates[i].enabled) {
            html = templates[i].dragHelper;
            let event = templates[i].event;
            let e = event.split('#');
            if (e[0] === 'href') {
                event = 'javascript:' + e[1];
            }
            else {
                event = e[0] + '="' + e[1] + '"';
            }
            for (let m = 0; m < row.length; m++) {
                html = html.replace('{{ ' + templates[m].name + ' }}', row[m]);
                html = html.replace('{{ ' + templates[m].name + ':index }}', m);
                event = event.replace(templates[m].name, "'" + row[m] + "'");
                html = html.replace('{{ &' + templates[m].name + ' }}', event);
            }
        }
        return html;
    }
}

var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Accordion = class _Accordion extends Phink.Web.UI.Plugin {
    constructor() {
        super();
    }
    bind(container, data, callback) {
        let names = data.names;
        let values = data.values;
        let templates = data.templates;
        let elements = data.elements;
        let templateNum = templates.length;
        let colNum = names.length;
        let rowNum = values.length;
        let result = '';
        let html = '';
        let level = 0;
        let index = 0;
        let canBind = 0;
        let bound = [false, false, false];
        let oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');
        for (let k = 0; k < templateNum; k++) {
            for (let j = 0; j < colNum; j++) {
                if (templates[k].name === names[j]) {
                    templates[k].index = j;
                }
            }
        }
        for (let i = 0; i < rowNum; i++) {
            let row = (values[i] !== null) ? values[i] : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');
            for (let j = 0; j < templateNum; j++) {
                if (j === 0) {
                    level = 0;
                }
                if (!templates[j].enabled)
                    continue;
                index = templates[j].index;
                canBind = row[index] !== oldValues[j];
                if (!canBind) {
                    bound[level] = canBind;
                    level++;
                    oldValues[j] = row[index];
                    continue;
                }
                //html = this.applyTemplate(templates[j], colNum, row, i);
                //html = row[index];
                html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);
                if (level === 0) {
                    if (i > 0) {
                        result += elements[2].closing + elements[0].closing;
                        result += elements[2].closing + elements[0].closing;
                        oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');
                    }
                    result += str_replace('%s', 'blue', elements[0].opening);
                    result += elements[1].opening + html + elements[1].closing;
                    result += elements[2].opening;
                }
                else if (level === 1) {
                    if (i > 0 && !bound[level - 1]) {
                        result += elements[2].closing + elements[0].closing;
                    }
                    else {
                    }
                    result += str_replace('%s', 'odd', elements[0].opening);
                    result += elements[1].opening + html + elements[1].closing;
                    result += elements[2].opening;
                }
                else if (level === 2) {
                    result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing;
                }
                bound[level] = canBind;
                level++;
                oldValues[j] = row[index];
            }
        }
        result += elements[2].closing;
        result += elements[0].closing;
        result += elements[2].closing;
        result += elements[0].closing;
        document.querySelector(container).innerHTML = "&nbsp;";
        document.querySelector(container).innerHTML = result;
        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    static create() {
        return new Phink.Web.UI.Accordion();
    }
}

var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.List = class _List extends Phink.Web.UI.Plugin {
    constructor() {
        super();
    }
    bind(container, data, callback) {
        let names = data.names;
        let values = data.values;
        let templates = data.templates;
        let elements = data.elements;
        let colNum = templates.length;
        let rowNum = values.length;
        let result = '';
        let html = '';
        let css = '';
        result = str_replace('%s', css, elements[0].opening) + "\n";
        let oldValue = [];
        for (let i = 0; i < rowNum; i++) {
            let row = (values[i] !== null) ? values[i] : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');
            result += str_replace('%s', '', elements[1].opening) + "\n";
            for (let j = 0; j < colNum; j++) {
                let k = i * colNum + j;
                html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);
                if (templates[j]['enabled'] == 1 && row[j] != oldValue[j]) {
                    result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing + "\n";
                }
                oldValue[j] = row[j];
            }
            result += elements[1].closing + "\n";
        }
        result += elements[0].closing + "\n";
        document.querySelector(container).innerHTML = "&nbsp;";
        document.querySelector(container).innerHTML = result;
        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    static create() {
        return new Phink.Web.UI.List();
    }
}

var Phink = Phink || {}
Phink.Web = Phink.Web || {}
Phink.Web.UI = Phink.Web.UI || {}

Phink.Web.UI.Table = class _Table extends Phink.Web.UI.Plugin {
    constructor() {
        super();
    }
    fill(tableId, data, callback) {
        let values = data.values;
        let templates = data.templates;
        let colNum = templates.length;
        let rowNum = values.length;
        for (let j = 0; j < rowNum; j++) {
            let row = values[j];
            for (let i = 0; i < colNum; i++) {
                let template = templates[i];
                let html = Phink.Web.UI.Plugin.applyTemplate(templates, row, i);
                if (template.enabled) {
                    document.querySelector(tableId + 'td' + (i + colNum * j).toString()).innerHTML = html;
                }
            }
        }
        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    bind(tableId, data, callback) {
        // let names = data.names;
        let head = data.names;
        let values = data.values;
        let templates = data.templates;
        let elements = data.elements;
        let colNum = head.length;
        let rowNum = values.length;
        let colIndex = 0;
        let noTHead = false;

        let result = "\n";
        let typeId1 = '';
        if(templates[0].name != '*') {
            colNum = templates.length;
        }

        result += str_replace('%s', 'id="' + tableId + elements[0].type + '" class="table table-striped table-hover table-condensed"', elements[0].opening) + "\n";

        var i = 0;
        let thead = elements[1].opening + "\n";
        let typeId0 = 'id="' + tableId + elements[3].type + (0) + '"';
        thead += str_replace('%s', typeId0, elements[3].opening) + "\n";
        for (let j = 0; j < colNum; j++) {
            let colName = head[j];
            if(templates[0].name != '*') {
                colName = templates[j].name;
            }
            colIndex = array_keys(head, colName)[0];
            typeId1 = 'id="' + tableId + elements[4].type + j + '"';
            thead += str_replace('%s', typeId1, elements[4].opening) + head[colIndex] + elements[4].closing + "\n";
        }

        thead += elements[3].closing + "\n";
        thead += elements[1].closing + "\n";

        let tbody = elements[2].opening + "\n";
        // let body = values;
        for (let i = 0; i < rowNum; i++) {

            let row = (values[i] !== null) ? values[i] : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');

            typeId0 = 'id="' + tableId + elements[3].type + (i) + '"';
            tbody += str_replace('%s', typeId0, elements[3].opening) + "\n";

            for (let j = 0; j < colNum; j++) {
                let k = i * colNum + j;
                let colIndex = 0;
                let dataIndex = array_keys(head, head[j])[0];
                if(templates[0].name != '*') {
                    dataIndex = array_keys(head, templates[j]['name'])[0];
                    colIndex = dataIndex;
                }

                noTHead = templates[j] !== undefined && templates[j]['content'] != '' && templates[j]['enabled'] == 1;

                let html = row[dataIndex];
                if (noTHead) {
                    html = Phink.Web.UI.Plugin.applyTemplate(templates, row, j);
                }
                
                if (templates[colIndex] !== undefined && templates[colIndex]['enabled'] == 1) {
                    typeId1 = 'id="' + tableId + elements[5].type + k + '"';
                    tbody += str_replace('%s', typeId1, elements[5].opening) + html + elements[5].closing + "\n";
                }
            }
            tbody += elements[3].closing + "\n";
        }
        tbody += elements[2].closing + "\n";

        result += ((noTHead) ? '' : thead) + tbody;

        result += elements[0].closing + "\n";

        document.querySelector(tableId).innerHTML = result;

        if (typeof callback === 'function') {
            callback.call(this);
        }
    }
    static create() {
        return new Phink.Web.UI.Table();
    }
}


Phink.DOM.ready(function () {

    Phink.Backend.loadScriptsArray(Phink.DOM.depends, function () {
        Phink.Backend.loadScriptsArray(Phink.DOM.sources, function() {
            if (typeof window[Phink.DOM.main] === 'function') {
                var initnow = 'phink_app_init_' + Date.now();
                window[initnow] = window[Phink.DOM.main];
                window[Phink.DOM.main] = null;
                window[initnow]();
            }
        });
    });
    Phink.Backend.bindEvents();
});
