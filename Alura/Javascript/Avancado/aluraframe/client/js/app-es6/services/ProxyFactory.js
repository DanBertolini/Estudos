export class ProxyFactory {
    static create(obj, props, callback) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return callback(target);
                    }
                }

                return Reflect.get(target, prop, receiver)
            },
            set(target, prop, value, receiver) {
                let setter = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    callback(target);
                }
               return setter;
            }
        });
    }

    static _isFunction(obj){
        return typeof(obj) == typeof(Function)
    }
}