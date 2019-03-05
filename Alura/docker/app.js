var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

//Modo antigo de utilizar roteamento
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/form-get.html');
});

//retorno do submit
app.get('/SubmitHello', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Hello ' + request.query.userName + '!<br />');
    response.end('Have a great day!');
    console.log('Handled request from ' + request.query.userName);
});

//Criando uma rota para chamar o arquivo html
app.get('/post', function (request, response) {
    response.sendFile(__dirname + '/public/form-post.html');
});

//retorno do submit
app.post('/SubmitHelloPost', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Hello ' + request.body.userName + '!<br />');
    response.end('Have a great day!');
});

app.get('/:teste', function (request, response) {
    response.write('Hello ' + request.params.teste + '!<br />');
});

var port = 3000;
app.listen(port);
console.log('Listening on port: ' + port);