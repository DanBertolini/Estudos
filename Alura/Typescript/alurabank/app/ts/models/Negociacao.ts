export class Negociacao {

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
}