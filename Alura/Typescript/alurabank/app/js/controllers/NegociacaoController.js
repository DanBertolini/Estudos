System.register(["./../services/NegociacaoService", "../models/index", "../views/index", "../helpers/decorators/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var NegociacaoService_1, index_1, index_2, index_3, index_4, NegociacaoController, DiasSemana;
    return {
        setters: [
            function (NegociacaoService_1_1) {
                NegociacaoService_1 = NegociacaoService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._lstNegociacoes = new index_1.ListaNegociacoes();
                    this._negociacoesView = new index_2.NegociacoesView("#negociacoesView", true);
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
                    this._negociacaoService = new NegociacaoService_1.NegociacaoService();
                    this._negociacoesView.atualizaView(this._lstNegociacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._diaDaSemana(data)) {
                        this._mensagemView.atualizaView('Somente em dias úteis');
                    }
                    const negociacao = new index_1.Negociacao(parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()), data);
                    this._lstNegociacoes.adiciona(negociacao);
                    this._negociacoesView.atualizaView(this._lstNegociacoes);
                    this._mensagemView.atualizaView("Negociação cadastrada com sucesso");
                    index_4.imprime(negociacao, this._lstNegociacoes);
                }
                _diaDaSemana(data) {
                    return data.getDay() != DiasSemana.SABADO && data.getDay() != DiasSemana.DOMINGO;
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const isOk = (res) => {
                            if (res.ok) {
                                return res;
                            }
                            else {
                                throw new Error(res.statusText);
                            }
                        };
                        try {
                            let negociacoesImportadas = yield this._negociacaoService.importarNegociacoes(isOk);
                            const negociacoesJaCadastradas = this._lstNegociacoes.paraArray();
                            negociacoesImportadas
                                .filter(negociacao => !negociacoesJaCadastradas.some(neg => neg.ehIgual(negociacao)))
                                .forEach(this._lstNegociacoes.adiciona.bind(this._lstNegociacoes));
                            this._negociacoesView.atualizaView(this._lstNegociacoes);
                        }
                        catch (err) {
                            this._mensagemView.atualizaView(err.message);
                        }
                    });
                }
            };
            __decorate([
                index_3.domInjector('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInjector('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInjector('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle(1000),
                index_3.logarTempoExecucao()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
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
