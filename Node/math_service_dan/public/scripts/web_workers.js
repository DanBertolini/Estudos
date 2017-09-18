var worker = new Worker('/scripts/myWork.js');
worker.onmessage = function (e) {
    $('#result').append(e.data + '<br />');
}
worker.onerror = function (e) {
    $('#result').append('Error: ' + e.data + '<br />');
}
$('document').ready(function () {
    $('#btnSend').on('click', function () {
        worker.postMessage($('#message').val());
    });
});