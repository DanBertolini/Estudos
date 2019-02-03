System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ListaNegociacoes;
    return {
        setters: [],
        execute: function () {
            ListaNegociacoes = class ListaNegociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                paraArray() {
                    return [].concat(this._negociacoes);
                }
            };
            exports_1("ListaNegociacoes", ListaNegociacoes);
        }
    };
});
