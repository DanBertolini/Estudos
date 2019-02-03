export class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
        this._filtroAtual ='';
        //this._atualizaView = atualizaView;
    }

    get negociacoes() {
        return Object.assign([], this._negociacoes);
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        //this._atualizaView(this);
        //Reflect.apply(this._atualizaView, this._contexto, [this]);
    }

    esvazia() {
        this._negociacoes = [];
        //this._atualizaView(this);
        //Reflect.apply(this._atualizaView, this._contexto, [this]);
    }

    ordena(criterio) {
        if (this._filtroAtual == criterio) {
            this._negociacoes.reverse();
        } else {
            this._negociacoes.sort((a, b) => {
                return (a[criterio] - b[criterio]);
            });
        }

        this._filtroAtual = criterio;
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}