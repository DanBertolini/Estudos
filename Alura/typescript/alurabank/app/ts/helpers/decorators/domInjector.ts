export function domInjector(selector: string) {

    return (target: any, key: string) => {
        let elemento: JQuery

        console.log(`Executando domInjector na propriedade ${key}`)
        const getter = () => {
            if(!elemento) {
                console.log(`Buscando o elemento do DOM pelo seletor ${selector}`)
                elemento = $(selector);
            }

            return elemento;
        }

        Object.defineProperty(target, key, { get: getter });
        
    }
}