export function throttle(timeout: number = 500) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if(event) event.preventDefault();

        const originalMethod = descriptor.value;
        let timer = 0;
        descriptor.value = function (...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                originalMethod.apply(this, ...args);
            }, timeout);
        }

        return descriptor;
    }
}