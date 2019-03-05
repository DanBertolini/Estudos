// import { Negociacao } from './../models/index';
import { Imprimivel } from '../models/Imprimivel';

export function imprime(...negociacoes: Imprimivel[]){

    negociacoes.forEach(n => n.paraTexto());
}