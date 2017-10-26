var db = openDatabase('Library', '1.0', 'My library', 5 * 1024 * 1024);

window.onload = function () {
    db.changeVersion('1.0', '1.0', migrateDB, onError, onSuccess);
}

function createTable(transaction) {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS authors(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "firstName TEXT, " +
        "lastName TEXT, " +
        "dateCreated TIMESTAMP DEFAULT(datetime('now', 'localtime')))");

    transaction.executeSql("CREATE TABLE IF NOT EXISTS books(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "authorId INTEGER, " +
        "title TEXT, " +
        "type TEXT)");
}

function onError(error) {
    console.log("Error code: " + error.code + " Message: " + error.message);
}

function onSuccess() {
    console.log("Migration complete!");
}

function insert() {
    db.transaction(function (t) {
        t.executeSql("INSERT INTO authors(firstName, lastName) "
            + " VALUES('Daniel', 'Bertolini')", itemInserted);
    });
}

function onInsert() {
    /* db.transaction(function (t) {
        t.executeSql("INSERT INTO authors(firstName, lastName) "
            + " VALUES('Daniel', 'Bertolini')", itemInserted);
    }); */
    var firstName = 'Daniel';
    var lastName = 'Bertolini';
    db.transaction(function (t) {
        t.executeSql("INSERT INTO authors(firstName, lastName) VALUES(?, ?)"
            , [firstName, lastName], itemInserted);
    });
}

function itemInserted(transaction, results) {
    alert("Id: " + results.insertId);
}

function onUpdate() {
    var authorId = 1;
    var lastName = 'Correia';
    db.transaction(function (t) {
        t.executeSql("UPDATE authors SET lastName = ? WHERE id = ?"
            , [lastName, authorId]);
    });
}

function onDelete() {
    var authorId = 1;
    db.transaction(function (t) {
        t.executeSql("DELETE FROM authors WHERE id = ?", [authorId]);
    });
}

function onSelect() {
    /* db.transaction(function (t) {
        t.executeSql("SELECT * FROM authors", [], displayResults)
    }); */

    db.readTransaction(function (t) {
        t.executeSql("SELECT * FROM authors", [], displayResults)
    });
}

function onSelectFiltered() {
    var lastName = '%rr%';
    db.readTransaction(function (t) {
        t.executeSql("SELECT * FROM authors WHERE lastName LIKE ?", [lastName], displayResults)
    });
}

function onSelectJoin() {
    db.transaction(function (t) {
        t.executeSql("SELECT a.firstName, a.lastName, b.title " +
            "FROM authors a " +
            "INNER JOIN books b ON a.id = b.authorId", [], displayResults)
    });
}

function displayResults(transaction, results) {
    for (var i = 0; i < results.rows.length; i++) {
        var item = results.rows.item(i);
        $('#items').append('<li>' + item.firstName + " " + item.lastName + '</li>');
    }
}