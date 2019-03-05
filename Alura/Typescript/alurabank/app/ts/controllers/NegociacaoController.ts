import { NegociacaoService, HandlerFunction } from './../services/NegociacaoService';
import { ListaNegociacoes, Negociacao, NegociacaoImportada } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { logarTempoExecucao, domInjector, throttle } from "../helpers/decorators/index";
import { imprime } from '../helpers/index';

export class NegociacaoController {
    @domInjector('#data')
    private _inputData: JQuery;//HTMLInputElement;
    @domInjector('#quantidade')
    private _inputQuantidade: JQuery;//HTMLInputElement;
    @domInjector('#valor')
    private _inputValor: JQuery;//HTMLInputElement;
    private _lstNegociacoes = new ListaNegociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView", true);
    private _mensagemView = new MensagemView("#mensagemView");

    private _negociacaoService = new NegociacaoService();

    constructor() {
        // this._inputData = $('#data');//<HTMLInputElement>document.querySelector('#data');
        // this._inputQuantidade = $('#quantidade');//document.querySelector('#quantidade') as HTMLInputElement;
        // this._inputValor = $('#valor');//document.querySelector('#valor') as HTMLInputElement;
        this._negociacoesView.atualizaView(this._lstNegociacoes);
    }

    @throttle(1000)
    @logarTempoExecucao()
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._diaDaSemana(data)) {
            this._mensagemView.atualizaView('Somente em dias úteis');
        }
        const negociacao = new Negociacao(parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()), data);

        this._lstNegociacoes.adiciona(negociacao);
        this._negociacoesView.atualizaView(this._lstNegociacoes);
        this._mensagemView.atualizaView("Negociação cadastrada com sucesso");

        imprime(negociacao, this._lstNegociacoes);
    }

    private _diaDaSemana(data: Date): boolean {
        return data.getDay() != DiasSemana.SABADO && data.getDay() != DiasSemana.DOMINGO
    }

    @throttle()
    async importaDados() {

        const isOk:HandlerFunction = (res: Response) => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        try{
        let negociacoesImportadas: Negociacao[] = await this._negociacaoService.importarNegociacoes(isOk)
            // .then((negociacoesImportadas: Negociacao[]) => {
            //     const negociacoesJaCadastradas = this._lstNegociacoes.paraArray();
            //     return negociacoesImportadas
            //         .filter(negociacao => !negociacoesJaCadastradas
            //             .some(neg => neg.ehIgual(negociacao)));
            // })
            // .then((negocicoes: Negociacao[]) => negocicoes.forEach(this._lstNegociacoes.adiciona.bind(this._lstNegociacoes)))
            // .then(() => { this._negociacoesView.atualizaView(this._lstNegociacoes) })
            // .catch((err:Error) => {
            //     this._mensagemView.atualizaView(err.message)
            // });
            
            const negociacoesJaCadastradas = this._lstNegociacoes.paraArray();
            negociacoesImportadas
                .filter(negociacao => !negociacoesJaCadastradas.some(neg => neg.ehIgual(negociacao)))
                .forEach(this._lstNegociacoes.adiciona.bind(this._lstNegociacoes));
            this._negociacoesView.atualizaView(this._lstNegociacoes);
        } catch(err) {
            this._mensagemView.atualizaView(err.message)
        }
    }
}

enum DiasSemana {
    DOMINGO,
    SEGUNDA,
    TERÇA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO,
} 