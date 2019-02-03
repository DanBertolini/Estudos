import {getInstance} from './controllers/NegociacaoController';
let negociacaoController = getInstance();

document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
document.querySelector('#apaga').onclick = negociacaoController.esvazia.bind(negociacaoController);