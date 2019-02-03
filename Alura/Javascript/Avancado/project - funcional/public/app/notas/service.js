import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, compose } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js';

const API = '/notas';
const getItensFromNotes = notasM => notasM.map(notas => notas.$flatMap(notas => notas.itens));
const filterItensByCode = (code, itensM) => itensM.map(itens => itens.filter(item => item.codigo == code));
const sumItensValues = itensM => itensM.map(itens => itens.reduce((total, item) => total + item.valor, 0));



export const notasService = {
    listaAll() {
        return fetch(API)
            .then(handleStatus)
            //.then(notas => null)
            .then(Maybe.of)
            .catch(err => {
                console.error(err);
                return Promise.reject("Não foi possível obter notas fiscais");
            });
    },
    sumItens(code) {
        const filterItens = partialize(filterItensByCode, code);
        //const sumItens = pipe(getItensFromNotes, filterItens, sumItensValues);
        const sumItens = compose(sumItensValues, filterItens, getItensFromNotes);
        return this.listaAll()
            .then(sumItens)
            .then(result => result.getOrElse(0));
    }
}