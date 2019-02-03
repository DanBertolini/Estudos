System.register(["../models/index", "../views/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController, DiasSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._lstNegociacoes = new index_1.ListaNegociacoes();
                    this._negociacoesView = new index_2.NegociacoesView("#negociacoesView", true);
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._negociacoesView.atualizaView(this._lstNegociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._diaDaSemana(data)) {
                        this._mensagemView.atualizaView('Somente em dias úteis');
                    }
                    const negociacao = new index_1.Negociacao(parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()), data);
                    this._lstNegociacoes.adiciona(negociacao);
                    this._negociacoesView.atualizaView(this._lstNegociacoes);
                    this._mensagemView.atualizaView("Negociação cadastrada com sucesso");
                }
                _diaDaSemana(data) {
                    return data.getDay() != DiasSemana.SABADO && data.getDay() != DiasSemana.DOMINGO;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiasSemana) {
                DiasSemana[DiasSemana["DOMINGO"] = 0] = "DOMINGO";
                DiasSemana[DiasSemana["SEGUNDA"] = 1] = "SEGUNDA";
                DiasSemana[DiasSemana["TER\u00C7A"] = 2] = "TER\u00C7A";
                DiasSemana[DiasSemana["QUARTA"] = 3] = "QUARTA";
                DiasSemana[DiasSemana["QUINTA"] = 4] = "QUINTA";
                DiasSemana[DiasSemana["SEXTA"] = 5] = "SEXTA";
                DiasSemana[DiasSemana["SABADO"] = 6] = "SABADO";
            })(DiasSemana || (DiasSemana = {}));
        }
    };
});
