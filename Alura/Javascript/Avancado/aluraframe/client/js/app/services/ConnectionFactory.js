'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, db_version, db_name, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            stores = ['negociacoes'];
            db_version = 2;
            db_name = 'alura';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Não é possivel instanciar a classe ConnectionFactory');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            var indexedDB = window.indexedDB;
                            var openRequest = indexedDB.open(db_name, db_version);

                            openRequest.onupgradeneeded = function (event) {
                                ConnectionFactory._createStores(event.target.result);
                            };

                            openRequest.onsuccess = function (response) {
                                if (!connection) {
                                    connection = response.target.result;
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Não é possivel chamar o metodo close diretamente');
                                    };
                                }

                                resolve(connection);
                            };

                            openRequest.onerror = function (response) {
                                reject(response.target.error);
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connectionUpgrade) {
                        stores.forEach(function (store) {
                            if (connectionUpgrade.objectStoreNames.contains(store)) {
                                connectionUpgrade.deleteObjectStore(store);
                            }

                            connectionUpgrade.createObjectStore(store, {
                                autoIncrement: true
                            });
                        });
                    }
                }, {
                    key: 'connectionClose',
                    value: function connectionClose() {
                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map