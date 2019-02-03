export class HttpService {

    _handleError(res) {
        if (res.ok) {
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleError(res))
            .then(res => res.json());
        /*
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send();
        });
        */
    }

    post(url, body) {

        return fetch(url, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            })
            .then(res => this._handleError(res))
            .then(res => res.json());
        /*
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject();
                    }
                }
            };
            xhr.send(JSON.stringify(body));

        });
        */
    }
}