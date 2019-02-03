'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_handleError',
                    value: function _handleError(res) {
                        if (res.ok) {
                            return res;
                        } else {
                            throw new Error(res.statusText);
                        }
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        return fetch(url).then(function (res) {
                            return _this._handleError(res);
                        }).then(function (res) {
                            return res.json();
                        });
                        /*
                        return new Promise((resolve, reject) => {
                            let xhr = new XMLHttpRequest();
                              xhr.open("GET", url, true);
                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        resolve(JSON.parse(xhr.response));
                                    } else {
                                        reject(xhr.response);
                                    }
                                }
                            };
                            xhr.send();
                        });
                        */
                    }
                }, {
                    key: 'post',
                    value: function post(url, body) {
                        var _this2 = this;

                        return fetch(url, {
                            headers: {
                                'Content-type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(body)
                        }).then(function (res) {
                            return _this2._handleError(res);
                        }).then(function (res) {
                            return res.json();
                        });
                        /*
                        return new Promise((resolve, reject) => {
                            let xhr = new XMLHttpRequest();
                              xhr.open("POST", url, true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        resolve(JSON.parse(xhr.response));
                                    } else {
                                        reject();
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(body));
                          });
                        */
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map