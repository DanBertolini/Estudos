'use strict';

System.register(['./HttpService', '../models/Negociacao', '../dao/NegociacaoDAO', '../services/ConnectionFactory'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao, NegociacaoDAO, ConnectionFactory, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_servicesConnectionFactory) {
            ConnectionFactory = _servicesConnectionFactory.ConnectionFactory;
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes(tipo) {
                        return Promise.all([this._obterNegociacoesSemanaAtual(), this._obterNegociacoesSemanaPassada(), this._obterNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
                            return negociacoes.reduce(function (finalArr, array) {
                                return finalArr.concat(array);
                            }, []);
                        });
                    }
                }, {
                    key: '_obterNegociacoesSemanaAtual',
                    value: function _obterNegociacoesSemanaAtual() {
                        return this._http.get('/negociacoes/semana').then(function (result) {
                            return result.map(function (objNeg) {
                                return new Negociacao(objNeg.quantidade, objNeg.valor, new Date(objNeg.data));
                            });
                            // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                            //     objNeg.valor, new Date(objNeg.data))));
                            /*callback(null, JSON.parse(xhr.response)
                                .map(objNeg => new Negociacao(objNeg.quantidade,
                                    objNeg.valor, new Date(objNeg.data))));*/
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error("Falha ao importar negociações da semana");
                            // reject(msgErr);
                            //callback(msgErr);
                        });
                    }
                }, {
                    key: '_obterNegociacoesSemanaPassada',
                    value: function _obterNegociacoesSemanaPassada() {
                        return this._http.get('/negociacoes/anterior').then(function (result) {
                            return result.map(function (objNeg) {
                                return new Negociacao(objNeg.quantidade, objNeg.valor, new Date(objNeg.data));
                            });
                            // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                            //     objNeg.valor, new Date(objNeg.data))));
                            /*callback(null, JSON.parse(xhr.response)
                                .map(objNeg => new Negociacao(objNeg.quantidade,
                                    objNeg.valor, new Date(objNeg.data))));*/
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error("Falha ao importar negociações da semana anterior");
                            // reject(msgErr);
                            //callback(msgErr);
                        });
                    }
                }, {
                    key: '_obterNegociacoesSemanaRetrasada',
                    value: function _obterNegociacoesSemanaRetrasada() {
                        return this._http.get('/negociacoes/retrasada').then(function (result) {
                            return result.map(function (objNeg) {
                                return new Negociacao(objNeg.quantidade, objNeg.valor, new Date(objNeg.data));
                            });
                            // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                            //     objNeg.valor, new Date(objNeg.data))));
                            /*callback(null, JSON.parse(xhr.response)
                                .map(objNeg => new Negociacao(objNeg.quantidade,
                                    objNeg.valor, new Date(objNeg.data))));*/
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error("Falha ao importar negociações da semana retrasada");
                            // reject(msgErr);
                            //callback(msgErr);
                        });
                    }
                }, {
                    key: 'cadastrarNegociacao',
                    value: function cadastrarNegociacao(negociacao) {
                        var _this = this;

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function (negociacao) {
                            return _this._http.post('/negociacoes', {
                                data: negociacao.data.toISOString(),
                                quantidade: negociacao.quantidade,
                                valor: negociacao.valor
                            });
                        }).then(function () {
                            return "Negociação cadastrada com sucesso";
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error("Não foi possivel concluir o cadastro da negociação");
                        });
                    }
                }, {
                    key: 'listaNegociacoes',
                    value: function listaNegociacoes() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.lista();
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error('Não foi possivel listar os registros de negociação');
                        });
                    }
                }, {
                    key: 'apagar',
                    value: function apagar() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection).deletar();
                        }).then(function () {
                            return 'Negociações apagadas com sucesso';
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error('Não foi possivel deletar os registros de negociação');
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {
                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negExistente) {
                                    return negociacao.isEquals(negExistente);
                                });
                            });
                        }).catch(function (err) {
                            console.error(err);
                            throw new Error('Não foi possivel importar os registros de negociação');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map