import { NegociacaoController } from "./controllers/NegociacaoController";

const controller = new NegociacaoController();

//$('.form').submit(controller.adiciona.bind(controller))
//.addEventListener('submit', controller.adiciona.bind(controller));

$('#btn-incluir').click(controller.adiciona.bind(controller));
$('#btn-importar').click(controller.importaDados.bind(controller));

//Union Types, Type Guards and Alias Type 
type aliasType = string | number;
function processaToken(token: aliasType) {

    // muda o dígito 2 por X!
    if (typeof token === "string") {
        return token.replace(/2/g, 'X');
    } else {
        return token.toFixed().replace(/2/g, 'X');
    }
}

const tokenProcessado1 = processaToken('1234');
const tokenProcessado2 = processaToken(1234);