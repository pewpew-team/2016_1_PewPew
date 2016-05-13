var express = require('express'),
    errorHandler = require('errorhandler'),
		bodyParser = require('body-parser'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8079,
    PUBLIC_DIR = __dirname + '/public_html';

var counter = 0;

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json());

app.use(function (req, res, done) {
	console.log('Request #%s at %s \n\t URL: %s   method: %s \n\t body: ', ++counter, new Date(), req.url ,req.method);
	console.log(req.body);
	done();
});



app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
