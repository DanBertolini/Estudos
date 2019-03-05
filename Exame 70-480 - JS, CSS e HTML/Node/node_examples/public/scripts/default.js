$(document).ready(function () {
    $('#btnAdd').on('click', addNumbers);
    $('#btnSubtract').on('click', subtractNumbers);
    $('#btnMultiplication').on('click', multiplyNumbers);
    $('#btnDivision').on('click', divideNumbers);
});

// Refatoração de código para atender a todas as requisições semelhantes

//Adição utilizando exemplo de metodo GET
function addNumbers() {
    var data = getFormData();
    serverAddition(data).done(displayResult);
}
function serverAddition(data) {
    return $.getJSON('/addition', data);
}

//Subtração utilizando exemplo de metodo POST
function subtractNumbers() {
    var data = getFormData();
    serverSubtraction(data).done(displayResult);
}
function serverSubtraction(data) {
    return $.post('/subtraction', data, 'json');
}

//Multiplicação utilizando exemplo de metodo PUT
function multiplyNumbers() {
    var data = getFormData();
    serverMultiplication(data).done(displayResult);
}
function serverMultiplication(data) {
    return $.ajax({
        url: '/multiply',
        data: data,
        type: 'PUT',
        dataType: 'json',
        cache: false
    });
}

//Divisão utilizando exemplo de metodo DELETE
function divideNumbers() {
    var data = getFormData();
    serverDivision(data).done(displayResult).fail(displayError);
}
function serverDivision(data) {
    return $.ajax({
        url: '/divide',
        data: data,
        type: 'DELETE',
        dataType: 'json',
        cache: false
    });
}

function getFormData() {
    var x = $('#x').val();
    var y = $('#y').val();
    return { "x": x, "y": y };
}
function displayResult(serverData) {
    $('#result').html(serverData.result);
}

function displayError(serverData, error) {
    var value = 'No result';
    if ('result' in serverData) value = serverData.result;
    $('#result').html(value + ' - ' + error);
}

//OUTRAS FORMAS DE IMPLEMENTAR UMA REQUISIÇÃO AJAX

function addNumbers_ajaxGetRequest() {

    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var data = { "x": x, "y": y };

    $.getJSON('/addition', data, function (data) {
        $('#result').html(data.result);
    });
}
// Utilizando JQuery para chamar a requisiçao REST através do metodo $.ajax()
function addNumbers_ajaxRequest() {
    var data = { "x": x, "y": y };
    $.ajax({
        url: '/addition',// URL relativa da requisição
        data: data,// Dados a serem enviados
        type: 'GET',// Tipo de requisição
        cache: false,
        dataType: 'json',// Tipo de dados que estão sendo enviados
        success: function (data) {// Em caso de sucesso
            console.log("Sucesso")
            $('#result').html(data.result);
        },
        error: function (error) {// Em caso de erro
            console.log("Falah")
        }
    });
}

// Forma basica de realizar uma requisição utilizando ajax
function addNumbers_ajaxRequest() {
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var result = document.getElementById('result');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener('progress', updateProgress, false);
    xmlhttp.open("GET", "/addition?x=" + x + "&y=" + y, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonObject = JSON.parse(xmlhttp.response);
            result.innerHTML = jsonObject.result;
        }
    };

    //No caso de requisições assicronas o resultado não fica dentro do metodo onreadystatechange
    //var jsonObject = JSON.parse(xmlhttp.response);
    //result.innerHTML = jsonObject.result;
}

function subtractNumbers() {
    var x = $('#x').val();
    var y = $('#y').val();
    var data = { "x": x, "y": y };
    $.post('/subtraction', data, function (data) {
        $('#result').html(data.result);
    }, 'json');
}
function multiplyNumbers() {
    var x = $('#x').val();
    var y = $('#y').val();
    var data = { "x": x, "y": y };
    $.ajax({
        url: '/multiply',
        data: data,
        type: 'PUT',
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('#result').html(data.result);
        }
    });
}
function divideNumbers() {
    var x = $('#x').val();
    var y = $('#y').val();
    var data = { "x": x, "y": y };
    $.ajax({
        url: '/divide',
        data: data,
        type: 'DELETE',
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('#result').html(data.result);
        }
    });
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
        console.log(percentComplete);
    } else {
        console.log('FOIII')
        // Need total size to compute progress
    }
}