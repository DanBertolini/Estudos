window.requestFileSystem = window.requestFileSystem ||
    window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);


function getFile(fileSystem) {
    fileSystem.root.getFile("", { create: true }, fileOpened, handleError);
}

function getDirectory(fileSystem) {
    fileSystem.root.getDirectory("Chapter16", { create: true },
        directoryOpened, handleError);
}

function directoryOpened(directoryEntry) {
    directoryEntry.getFile("example.txt", { create: true }, fileOpened, handleError);
}

function directoryOpened(directoryEntry) {
    directoryEntry.remove(directoryRemoved, handleError);
    //directoryEntry.removeRecursively(directoryRemoved, handleError);
}
function directoryRemoved() {
    alert('Success');
}

function fileOpened(fileEntry) {
    fileEntry.createWriter(writeToFile, handleError);
}
function writeToFile(fileWriter) {
    fileWriter.onwriteend = function () { alert('Success'); };
    fileWriter.onerror = function () { alert('Failed'); };
    fileWriter.seek(fileWriter.length);
    fileWriter.write(new Blob(['Hello world'], { type: 'text/plain' }));
}

function readFile(file) {
    var fileReader = new FileReader();
    fileReader.onloadend = function () { alert(this.result); };
    fileReader.onerror = function () { alert('Failed'); };
    fileReader.readAsText(file);
}

function fileOpened(fileEntry) {
    fileEntry.remove(fileRemoved, handleError);
}
function fileRemoved() {
    alert('Success');
}


function handleError(error) {
    alert(error.code);
}