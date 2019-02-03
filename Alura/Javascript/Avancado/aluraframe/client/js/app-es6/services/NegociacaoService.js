import { HttpService } from './HttpService';
import { Negociacao } from '../models/Negociacao';
import { NegociacaoDAO } from '../dao/NegociacaoDAO';
import { ConnectionFactory } from '../services/ConnectionFactory';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();

    }

    obterNegociacoes(tipo) {
        return Promise.all([
            this._obterNegociacoesSemanaAtual(),
            this._obterNegociacoesSemanaPassada(),
            this._obterNegociacoesSemanaRetrasada(),
        ]).then(negociacoes => negociacoes.reduce((finalArr, array) => finalArr.concat(array), []));
    }

    _obterNegociacoesSemanaAtual() {
        return this._http.get('/negociacoes/semana').then(result => {
                return result.map(objNeg => new Negociacao(objNeg.quantidade,
                    objNeg.valor, new Date(objNeg.data)));
                // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                //     objNeg.valor, new Date(objNeg.data))));
                /*callback(null, JSON.parse(xhr.response)
                    .map(objNeg => new Negociacao(objNeg.quantidade,
                        objNeg.valor, new Date(objNeg.data))));*/
            })
            .catch((err) => {
                console.error(err);
                throw new Error("Falha ao importar negociações da semana");
                // reject(msgErr);
                //callback(msgErr);
            });
    }

    _obterNegociacoesSemanaPassada() {
        return this._http.get('/negociacoes/anterior').then(result => {
                return result.map(objNeg => new Negociacao(objNeg.quantidade,
                    objNeg.valor, new Date(objNeg.data)));
                // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                //     objNeg.valor, new Date(objNeg.data))));
                /*callback(null, JSON.parse(xhr.response)
                    .map(objNeg => new Negociacao(objNeg.quantidade,
                        objNeg.valor, new Date(objNeg.data))));*/
            })
            .catch((err) => {
                console.error(err);
                throw new Error("Falha ao importar negociações da semana anterior");
                // reject(msgErr);
                //callback(msgErr);
            });
    }

    _obterNegociacoesSemanaRetrasada() {
        return this._http.get('/negociacoes/retrasada').then(result => {
                return result.map(objNeg => new Negociacao(objNeg.quantidade,
                    objNeg.valor, new Date(objNeg.data)));
                // resolve(result.map(objNeg => new Negociacao(objNeg.quantidade,
                //     objNeg.valor, new Date(objNeg.data))));
                /*callback(null, JSON.parse(xhr.response)
                    .map(objNeg => new Negociacao(objNeg.quantidade,
                        objNeg.valor, new Date(objNeg.data))));*/
            })
            .catch((err) => {
                console.error(err);
                throw new Error("Falha ao importar negociações da semana retrasada");
                // reject(msgErr);
                //callback(msgErr);
            });
    }

    cadastrarNegociacao(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => {
                return new NegociacaoDAO(connection)
            }).then(dao => {
                return dao.adiciona(negociacao);
            }).then(negociacao => {
                return this._http.post('/negociacoes', {
                    data: negociacao.data.toISOString(),
                    quantidade: negociacao.quantidade,
                    valor: negociacao.valor
                });
            }).then(() => {
                return "Negociação cadastrada com sucesso";
            }).catch(err => {
                console.error(err);
                throw new Error("Não foi possivel concluir o cadastro da negociação");
            })
    }

    listaNegociacoes() {
        return ConnectionFactory.getConnection().then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.lista())
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possivel listar os registros de negociação');
            });

    }

    apagar() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDAO(connection).deletar())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possivel deletar os registros de negociação');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negExistente =>
                        negociacao.isEquals(negExistente))
                ))
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possivel importar os registros de negociação');            
            })
    }
}