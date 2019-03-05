import { Negociacao } from "./Negociacao";
import { logarTempoExecucao } from "../helpers/decorators/index";
// import { Imprimivel } from "./Imprimivel";
// import { Igualavel } from "./Igualavel";
import { NegociacaoUtils } from "./NegociacaoUtils";

export class ListaNegociacoes implements NegociacaoUtils<ListaNegociacoes>{
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    //@logarTempoExecucao(true)
    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(compare: ListaNegociacoes) {
        return JSON.stringify(this._negociacoes) == JSON.stringify(compare._negociacoes);
    }
}