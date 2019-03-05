System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function throttle(timeout = 500) {
        return (target, propertyKey, descriptor) => {
            if (event)
                event.preventDefault();
            const originalMethod = descriptor.value;
            let timer = 0;
            descriptor.value = function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    originalMethod.apply(this, ...args);
                }, timeout);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});
