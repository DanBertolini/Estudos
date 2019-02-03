'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export('NegociacaoDAO', NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDAO, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {
                                resolve(negociacao);
                            };

                            request.onerror = function (e) {
                                reject(e.target.error);
                            };
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var cursor = _this2._connection.transaction('negociacoes', 'readonly').objectStore("negociacoes").openCursor();

                            var negociacoes = [];

                            cursor.onsuccess = function (response) {
                                var cursor = response.target.result;
                                if (cursor) {
                                    negociacoes.push(new Negociacao(cursor.value._quantidade, cursor.value._valor, cursor.value._data));
                                    cursor.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };
                            cursor.onerror = function (response) {
                                reject(response.target.result);
                            };
                        });
                    }
                }, {
                    key: 'deletar',
                    value: function deletar() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                resolve();
                            };

                            request.onerror = function (e) {
                                reject(e.target.error);
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export('NegociacaoDAO', NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDAO.js.map