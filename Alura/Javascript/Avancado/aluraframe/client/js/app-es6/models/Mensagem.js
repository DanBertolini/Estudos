export class Mensagem {

    constructor(texto = "", status = "success") {
        this._texto = texto;
        this._status = status;
    }

    get texto() {
        return this._texto
    }

    set texto(texto) {
        this._texto = texto;
    }

    get status() {
        return this._status
    }

    set status(status) {
        switch (status) {
            case 'error':
                this._status = 'danger';
                break;
            case 'success':
                this._status = 'success';
                break;
            default:
                this.status = status;
        }
    }
}