//Configurando para se adequar ao browser utilizado
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

if(!Array.prototype.includes){
    Array.prototype.includes = function(obj) {
        return this.indexOf(obj) != -1;
    }
}