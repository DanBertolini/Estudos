System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacao;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(quantidade, valor, data) {
                    this.quantidade = quantidade;
                    this.valor = valor;
                    this.data = data;
                }
                get volume() {
                    return this.quantidade * this.valor;
                }
                paraTexto() {
                    console.log('-- paraTexto --');
                    console.log(`Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`);
                }
                ehIgual(compare) {
                    return this.data.getDate() == compare.data.getDate() &&
                        this.data.getMonth() == compare.data.getMonth() &&
                        this.data.getFullYear() == compare.data.getFullYear() && this.volume == compare.volume;
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
