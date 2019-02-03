'use strict';

System.register(['../services/NegociacaoService', '../views/NegociacoesView', '../views/MensagemView', '../models/ListaNegociacoes', '../models/Mensagem', '../models/Negociacao', '../helpers/DateHelper', '../helpers/Bind'], function (_export, _context) {
    "use strict";

    var NegociacaoService, NegociacoesView, MensagemView, ListaNegociacoes, Mensagem, Negociacao, DateHelper, Bind, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
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

            _export('NegociacaoController', NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena');
                    // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(),
                    //     ['adiciona', 'esvazia'],
                    //     model => this._negociacoesView.update(model));

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto', 'status');
                    // this._mensagem = ProxyFactory.create(new Mensagem(''), ['texto'],
                    //     (model) => this._mensagemView.update(model))

                    this._service = new NegociacaoService();
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.listaNegociacoes().then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        });

                        setTimeout(function () {
                            _this.importaNegociacoes();
                        }, 4 * 1000);
                    }
                }, {
                    key: 'add',
                    value: function add(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();
                        this._service.cadastrarNegociacao(negociacao).then(function (mensagem) {
                            _this2._mensagem.texto = mensagem;
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._limpaForm();
                        }).catch(function (err) {
                            _this2._mensagem.texto = err;
                            _this2._mensagem.status = 'error';
                        });
                    }
                }, {
                    key: 'esvazia',
                    value: function esvazia() {
                        var _this3 = this;

                        if (this._listaNegociacoes._negociacoes.length > 0) {
                            this._service.apagar().then(function (msg) {
                                _this3._listaNegociacoes.esvazia();
                                _this3._mensagem.texto = msg;
                            }).catch(function (err) {
                                _this3._mensagem.texto = err;
                                _this3._mensagem.status = 'error';
                            });
                        }
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        this._listaNegociacoes.ordena(coluna);
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this4 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adiciona(negociacao);
                            });
                            //this._mensagem.texto = "Negociações importadas com sucesso";
                        }).catch(function (err) {
                            _this4._mensagem.texto = err;
                            _this4._mensagem.status = 'error';
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(this._inputQuantidade.value, this._inputValor.value, DateHelper.textToDate(this._inputData.value));
                    }
                }, {
                    key: '_limpaForm',
                    value: function _limpaForm() {
                        this._inputData.value = "";
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }());

            _export('NegociacaoController', NegociacaoController);

            negociacaoController = new NegociacaoController();
            function getInstance() {
                return negociacaoController;
            }

            _export('getInstance', getInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map