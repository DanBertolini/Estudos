System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, NegociacaoService;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                importarNegociacoes(handler) {
                    return fetch('http://localhost:9000/dados')
                        .then(handler)
                        .then(result => result.json())
                        .then((dados) => dados.map(d => new index_1.Negociacao(d.vezes, d.montante, new Date())))
                        .catch(err => {
                        console.log(err);
                        throw new Error("Não foi possível importar negociações");
                    });
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
