import { NegociacaoImportada, Negociacao } from "../models/index";

export class NegociacaoService {
    importarNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {
        return fetch('http://localhost:9000/dados')
            .then(handler)
            .then(result => result.json())
            .then((dados: NegociacaoImportada[]) => dados.map(d => new Negociacao(d.vezes, d.montante, new Date())))
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível importar negociações")
            });
    }
}

export interface HandlerFunction {
    (res: Response): Response;
}