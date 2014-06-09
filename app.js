var express = require('express');
var app = express();
var multipart = require('connect-multiparty');

app.use(multipart());



app.all('/', function (req, res) {
	

	
});

var server = app.listen(process.env.VCAP_APP_PORT || 3000, function () {
	console.log("App listening on", server.address().port);
});
