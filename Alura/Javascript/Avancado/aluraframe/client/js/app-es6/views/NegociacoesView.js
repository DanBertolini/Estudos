import { View } from './View';
import { DateHelper } from '../helpers/DateHelper'
import { getInstance } from '../controllers/NegociacaoController';

export class NegociacoesView extends View{

    constructor(elemento) {
        super(elemento);

        elemento.addEventListener('click', function(event) {
            if(event.target.nodeName == "TH")
                getInstance().ordena(event.target.textContent.toLowerCase());
        });
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody id="result">
                    ${model.negociacoes.map(n => `
                        <tr>
                            <td>${DateHelper.formatDate(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    `).join('')}
                </tbody>
                    <tr>
                        <td colspan="3">Total</td>
                        <td> ${
                                model.volumeTotal
                                //model.negociacoes.reduce((total, n) => total + n.volume, 0.0)

                                // (function(){ let total = 0; model.negociacoes.map(n => { total += n.volume }); return total; })()
                            }
                        </td>
                <tfoot>
                </tfoot>
            </table>        
        `;
    }
}