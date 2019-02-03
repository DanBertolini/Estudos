import { Negociacao } from '../models/Negociacao';

export class NegociacaoDAO {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve(negociacao);
            }

            request.onerror = e => {
                reject(e.target.error);
            };
        });
    }

    lista() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction('negociacoes', 'readonly')
                .objectStore("negociacoes")
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = (response) => {
                let cursor = response.target.result;
                if (cursor) {
                    negociacoes.push(new Negociacao(cursor.value._quantidade,
                        cursor.value._valor, cursor.value._data));
                    cursor.continue();
                } else {
                    resolve(negociacoes);
                }
            };
            cursor.onerror = (response) => {
                reject(response.target.result);
            };
        });
    }

    deletar() {
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                reject(e.target.error);
            };
        });
    }
}