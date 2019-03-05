System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInjector(selector) {
        return (target, key) => {
            let elemento;
            console.log(`Executando domInjector na propriedade ${key}`);
            const getter = () => {
                if (!elemento) {
                    console.log(`Buscando o elemento do DOM pelo seletor ${selector}`);
                    elemento = $(selector);
                }
                return elemento;
            };
            Object.defineProperty(target, key, { get: getter });
        };
    }
    exports_1("domInjector", domInjector);
    return {
        setters: [],
        execute: function () {
        }
    };
});
