'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

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

            _export('ListaNegociacoes', ListaNegociacoes = function () {
                function ListaNegociacoes() {
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];
                    this._filtroAtual = '';
                    //this._atualizaView = atualizaView;
                }

                _createClass(ListaNegociacoes, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        this._negociacoes.push(negociacao);
                        //this._atualizaView(this);
                        //Reflect.apply(this._atualizaView, this._contexto, [this]);
                    }
                }, {
                    key: 'esvazia',
                    value: function esvazia() {
                        this._negociacoes = [];
                        //this._atualizaView(this);
                        //Reflect.apply(this._atualizaView, this._contexto, [this]);
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(criterio) {
                        if (this._filtroAtual == criterio) {
                            this._negociacoes.reverse();
                        } else {
                            this._negociacoes.sort(function (a, b) {
                                return a[criterio] - b[criterio];
                            });
                        }

                        this._filtroAtual = criterio;
                    }
                }, {
                    key: 'negociacoes',
                    get: function get() {
                        return Object.assign([], this._negociacoes);
                    }
                }, {
                    key: 'volumeTotal',
                    get: function get() {
                        return this._negociacoes.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0);
                    }
                }]);

                return ListaNegociacoes;
            }());

            _export('ListaNegociacoes', ListaNegociacoes);
        }
    };
});
//# sourceMappingURL=ListaNegociacoes.js.map