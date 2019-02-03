export class Negociacao {
    constructor(quantidade, valor, data) {
        this._quantidade = quantidade || 1;
        this._valor = valor || 0.0;
        this._data = data ? new Date(data.getTime()) : new Date();
        Object.freeze(this);
    }

    get volume(){
        return this._quantidade * this._valor;
    } 

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    isEquals(outraNegociacao){
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}