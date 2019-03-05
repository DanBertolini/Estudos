import { logarTempoExecucao } from "../helpers/decorators/index";

//namespace Views {
export abstract class View<T> {

    private _escape: boolean;

    protected elemento: JQuery;

    constructor(selector: string, escape: boolean = false) {
        this.elemento = $(selector);
        this._escape = escape;
    }

    //@logarTempoExecucao()
    atualizaView(model: T): void {
        let template = this.template(model)
        if (this._escape)
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        this.elemento.html(template);
    }

    abstract template(model: T): string;
}

// }