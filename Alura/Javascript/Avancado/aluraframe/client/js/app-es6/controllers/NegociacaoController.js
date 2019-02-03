import { NegociacaoService } from '../services/NegociacaoService';

import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';

import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';

import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

export class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena');
        // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(),
        //     ['adiciona', 'esvazia'],
        //     model => this._negociacoesView.update(model));

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto', 'status');
        // this._mensagem = ProxyFactory.create(new Mensagem(''), ['texto'],
        //     (model) => this._mensagemView.update(model))

        this._service = new NegociacaoService();
        this._init();
    }

    _init() {
        this._service.listaNegociacoes()
            .then(negociacoes => {
                negociacoes
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            });

        setTimeout(() => {
            this.importaNegociacoes();
        }, 4 * 1000);
    }

    add(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._service.cadastrarNegociacao(negociacao)
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.adiciona(negociacao);
                this._limpaForm();
            })
            .catch(err => {
                this._mensagem.texto = err;
                this._mensagem.status = 'error';
            });
    }

    esvazia() {
        if (this._listaNegociacoes._negociacoes.length > 0) {
            this._service.apagar()
                .then(msg => {
                    this._listaNegociacoes.esvazia();
                    this._mensagem.texto = msg;
                })
                .catch(err => {
                    this._mensagem.texto = err;
                    this._mensagem.status = 'error';
                });
        }
    }

    ordena(coluna) {
        this._listaNegociacoes.ordena(coluna);
    }

    importaNegociacoes() {
        this._service.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                //this._mensagem.texto = "Negociações importadas com sucesso";
            }).catch(err => {
                this._mensagem.texto = err;
                this._mensagem.status = 'error';
            });
    }

    _criaNegociacao() {
        return new Negociacao(this._inputQuantidade.value,
            this._inputValor.value,
            DateHelper.textToDate(this._inputData.value));
    }

    _limpaForm() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

export function getInstance(){
    return negociacaoController;
}