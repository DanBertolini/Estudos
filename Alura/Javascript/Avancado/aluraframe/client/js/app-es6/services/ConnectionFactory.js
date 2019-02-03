const stores = ['negociacoes'];
const db_version = 2;
const db_name = 'alura'
var connection = null;
var close = null

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possivel instanciar a classe ConnectionFactory');
    }
    static getConnection() {
        return new Promise((resolve, reject) => {
            let indexedDB = window.indexedDB;
            let openRequest = indexedDB.open(db_name, db_version);

            openRequest.onupgradeneeded = event => {
                ConnectionFactory._createStores(event.target.result);
            };

            openRequest.onsuccess = response => {
                if (!connection) {
                    connection = response.target.result;
                    close = connection.close.bind(connection)
                    connection.close = () => {
                        throw new Error('Não é possivel chamar o metodo close diretamente');
                    }
                }

                resolve(connection);
            };

            openRequest.onerror = response => {
                reject(response.target.error);
            };
        });
    }

    static _createStores(connectionUpgrade) {
        stores.forEach(store => {
            if (connectionUpgrade.objectStoreNames.contains(store)) {
                connectionUpgrade.deleteObjectStore(store);
            }

            connectionUpgrade.createObjectStore(store, {
                autoIncrement: true
            });
        });
    }

    static connectionClose() {
        if (connection) {
            close();
            connection = null;
        }
    }
}