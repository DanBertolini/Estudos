//Configurando para se adequar ao browser utilizado
window.indexedDB = window.indexedDB || window.mozIndexedDB
    || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var indexedDB = window.indexedDB;
var openRequest = indexedDB.open('Library', 1);
var db;

openRequest.onupgradeneeded = function (event) {
    console.log(event);
    db = event.target.result;
    var store = db.createObjectStore("authors",
        { keypath: 'id', autoIncrement: true });
    //response.currentTarget.result.deleteObjectStore("authors");

    store.createIndex('lastName', 'lastName', { unique: false });
    //store.deleteIndex('lastName');
};

openRequest.onsuccess = function (response) {
    db = openRequest.result;
};

openRequest.onerror = function (response) {
    console.log("Error code: " + response.target.errorCode);
};

function onInsert() {
    var trans = db.transaction('authors', 'readwrite');
    var authors = trans.objectStore("authors");
    var request = authors.add({ firstName: 'Daniel', lastName: 'Bertolini' });
    request.onsuccess = function (response) {
        console.log('New record id: ' + request.result);
    };
    request.onerror = function (response) {
        // display error 
    };
}

function onUpdate() {
    var trans = db.transaction('authors', 'readwrite');
    var authors = trans.objectStore("authors");
    var request = authors.put({ firstName: 'Bob', lastName: 'Defoe' }, 1);
    request.onsuccess = function (response) {
        console.log('Updated record id: ' + request.result);
    };
    request.onerror = function (response) {
        // display error
    };
}

function onDelete() {
    var trans = db.transaction('authors', 'readwrite');
    var authors = trans.objectStore("authors");
    var request = authors.delete(1);
    request.onsuccess = function (response) {
        // success! 
    };
    request.onerror = function (response) {
        // display error 
    };
}

function onSelect() {
    var trans = db.transaction('authors', 'readonly');
    var authors = trans.objectStore("authors");
    var request = authors.get(1);
    request.onsuccess = function (response) {
        var author = response.target.result;
        alert('Last name: ' + author.lastName);
    };
    request.onerror = function (response) {
        // display error 
    };
}

function onSelectCursor() {
    var trans = db.transaction('authors', 'readonly');
    var authors = trans.objectStore("authors");
    var request = authors.openCursor();
    request.onsuccess = function (response) {
        var cursor = response.target.result;
        //when it finishes iteration it become a null a cursor
        if (!cursor) {
            alert('No records found.');
            return;
        }

        alert('Id: ' + cursor.key + ' Last name: ' + cursor.value.lastName);
        cursor.continue();
    };
    request.onerror = function (response) {
        // display error 
    };
}

function onSelectCursorIndexed() {
    var trans = db.transaction('authors', 'readonly');
    var authors = trans.objectStore("authors");
    var index = authors.index('lastName');

    //index.openCursor(IDBKeyRange.only('Twain')); 
    //Retorna apenas o item cujo indice seja igual ao valor do parametro

    //index.openCursor(IDBKeyRange.bound('Defoe', 'Verne', true, true)); 
    //Define um range com os itens de modo que o primeiro item que possuir index
    //igual ao 1º parametro e o ultimo item possuir index igual ao 2º parametro
    //Caso o 3º parametro seja false o primeiro item do retorno é desconsiderado.
    //Caso o 4º parametro seja true o ultimo item do retorno é desconsiderado.

    //upperBound funciona igual ao bound mas apenas manipula a extremidade final
    //lowerBound funciona igual ao bound mas apenas manipula a extremidade inicial

    var request = index.openCursor(null, IDBCursor.PREV);

    request.onsuccess = function (response) {
        var cursor = response.target.result;
        //when it finishes iteration it become a null a cursor
        if (!cursor) {
            alert('No records found.');
            return;
        }

        alert('Index value (lastName): ' + cursor.key
            + ' First name: ' + cursor.value.firstName);

        cursor.continue();
    };
    request.onerror = function (response) {
        // display error 
    };
}

function deletaDB() {
    var dropRequest = indexedDB.deleteDatabase('Library');
    dropRequest.onsuccess = function (response) {
        // success! 
    };
    dropRequest.onerror = function (response) {
        // display error 
    };
}