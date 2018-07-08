var express = require('express');
var router = express.Router();
var app = express();
appFolder = process.argv.slice(2)[0] || 'src';
app.use(express.static(__dirname + '/' + appFolder));

// router.get('/', function (request, response) {
//     response.sendFile(__dirname + '/src/index.html');
// });

app.use('/api', router);

var port = appFolder === 'src' ? 3000 : 8080;
app.listen(port);
console.log('Listening on port: ' + port);