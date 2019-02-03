import { ListaNegociacoes, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";

export class NegociacaoController {
    private _inputData: JQuery;//HTMLInputElement;
    private _inputQuantidade: JQuery;//HTMLInputElement;
    private _inputValor: JQuery;//HTMLInputElement;
    private _lstNegociacoes = new ListaNegociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView", true);
    private _mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this._inputData = $('#data');//<HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = $('#quantidade');//document.querySelector('#quantidade') as HTMLInputElement;
        this._inputValor = $('#valor');//document.querySelector('#valor') as HTMLInputElement;
        this._negociacoesView.atualizaView(this._lstNegociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._diaDaSemana(data)) {
            this._mensagemView.atualizaView('Somente em dias úteis');
        }
            const negociacao = new Negociacao(parseInt(this._inputQuantidade.val()),
                parseFloat(this._inputValor.val()), data);

            this._lstNegociacoes.adiciona(negociacao);
            this._negociacoesView.atualizaView(this._lstNegociacoes);
            this._mensagemView.atualizaView("Negociação cadastrada com sucesso");

    }

    private _diaDaSemana(data: Date): boolean {
        return data.getDay() != DiasSemana.SABADO && data.getDay() != DiasSemana.DOMINGO
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