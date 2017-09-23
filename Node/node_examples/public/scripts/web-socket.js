var wsUri = 'ws://echo.websocket.org/';
var webSocket;

var timerId = 0;

$(document).ready(function () {
    if (checkSupported()) {
        connect();
        $('#btnSend').click(doSend);
    }
});
function writeOutput(message) {
    var output = $("#divOutput");
    output.html(output.html() + '<br />' + message);
}

function checkSupported() {
    if (window.WebSocket) {
        writeOutput('WebSockets supported!');
        return true;
    }
    else {
        writeOutput('WebSockets NOT supported');
        $('#btnSend').attr('disabled', 'disabled');
        return false;
    }
}

function connect() {
    webSocket = new WebSocket(wsUri);
    webSocket.onopen = function (evt) { onOpen(evt) };
    webSocket.onclose = function (evt) { onClose(evt) };
    webSocket.onmessage = function (evt) { onMessage(evt) };
    webSocket.onerror = function (evt) { onError(evt) };
}

function doSend() {
    if (webSocket.readyState != webSocket.OPEN) {
        writeOutput("NOT OPEN: " + $('#txtMessage').val());
        return;
    }
    writeOutput("SENT: " + $('#txtMessage').val());
    webSocket.send($('#txtMessage').val());
}

function keepAlive() {
    var timeout = 15000;
    if (webSocket.readyState == webSocket.OPEN) {
        webSocket.send('');
    }
    timerId = setTimeout(keepAlive, timeout);
}
function cancelKeepAlive() {
    if (timerId) {
        cancelTimeout(timerId);
    }
}
function onOpen(evt) {
    writeOutput("CONNECTED");
    keepAlive();//Evitar errros de timeout mantendo o serviço ativo
}

function onClose(evt) {
    writeOutput("DISCONNECTED");
    cancelKeepAlive();
}

function onMessage(evt) {
    writeOutput('RESPONSE: ' + evt.data);
}

function onError(evt) {
    writeOutput('ERROR: ' + evt.data);
}