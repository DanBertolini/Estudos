System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function processaToken(token) {
        if (typeof token === "string") {
            return token.replace(/2/g, 'X');
        }
        else {
            return token.toFixed().replace(/2/g, 'X');
        }
    }
    var NegociacaoController_1, controller, tokenProcessado1, tokenProcessado2;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoController_1.NegociacaoController();
            $('#btn-incluir').click(controller.adiciona.bind(controller));
            $('#btn-importar').click(controller.importaDados.bind(controller));
            tokenProcessado1 = processaToken('1234');
            tokenProcessado2 = processaToken(1234);
        }
    };
});
