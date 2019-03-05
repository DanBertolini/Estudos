import { Igualavel } from './Igualavel';
import { Imprimivel } from './Imprimivel';
export interface NegociacaoUtils<T> extends Imprimivel, Igualavel<T> {

}