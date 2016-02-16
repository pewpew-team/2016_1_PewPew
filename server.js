var express = require('express'),
    errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var counter = 0;

app.use(function (req, res, done) {
	console.log('Request #%s at %s \n\t URL: %s   method: %s \n\t body: ', ++counter, new Date(), req.url ,req.method, req.body);
	done();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json());

app.post('/login', function(req, res) {
	var username = req.body.user;
	var password = req.body.password;
	// Hardcoded for dev
	if (username === 'username' && password === 'userpass') {
		var authToken = 'simpleToken';
		res.json({'token': authToken})
	}
	res.send();
});

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
