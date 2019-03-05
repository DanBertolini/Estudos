// import { Imprimivel } from "./Imprimivel";
// import { Igualavel } from "./Igualavel";
import { NegociacaoUtils } from "./NegociacaoUtils";

export class Negociacao implements NegociacaoUtils<Negociacao> {

    constructor(readonly quantidade: number, readonly valor: number, readonly data: Date) {
        //Object.freeze(this);
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    // get quantidade() {
    //     return this._quantidade;
    // }

    // get valor() {
    //     return this._valor;
    // }

    // get data() {
    //     return new Date(this._data.getTime());
    // }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }

    ehIgual(compare: Negociacao) {
        return this.data.getDate() == compare.data.getDate() &&
            this.data.getMonth() == compare.data.getMonth() &&
            this.data.getFullYear() == compare.data.getFullYear() && this.volume == compare.volume;
    }
}