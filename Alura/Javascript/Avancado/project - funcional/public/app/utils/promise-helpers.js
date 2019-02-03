export const handleStatus = res => res.ok ? res.json() :
    Promise.reject(res.statusText);

export const log = param => {
    console.log(param);
    return param;
};

export const timeoutPromise = (milliseconds, promise) => {
    let timeout = new Promise((resolve, reject) => {
        setTimeout(() => reject(`Limite da promise excedido (limite: ${milliseconds} ms)`), milliseconds);
    });

    return Promise.race([promise, timeout]);
};

export const delay = milliseconds => value =>
    new Promise((resolve) => {
        setTimeout(() => resolve(value), milliseconds);
    });

export const retry = (retries, milliseconds, fnPromise) =>
    fnPromise().catch(err => {
        console.log(retries, err);
        return delay(milliseconds)().then(() => retries > 1 ?
            retry(--retries, milliseconds, fnPromise) : Promise.reject(err));
    });