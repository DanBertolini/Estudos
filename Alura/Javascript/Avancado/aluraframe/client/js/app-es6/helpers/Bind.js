import { ProxyFactory } from '../services/ProxyFactory';

export class Bind {
    constructor(modelObj, view, ...props) {
        let proxy = ProxyFactory.create(modelObj, props,
            model => view.update(model));
        view.update(modelObj);

        return proxy;
    }
}