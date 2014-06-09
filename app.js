var express = require('express');
var app = express();
var multipart = require('connect-multiparty');

app.use(multipart());

var bird = require("./bird");

var services = JSON.parse(process.env.VCAP_SERVICES);

var sendgridService = services.sendgrid[0];
var sendgrid = require('sendgrid')(sendgridService.credentials.username, sendgridService.credentials.password);

app.all('/', function (req, res) {
	
	bird(req.body.subject, function (b) {
		var email = new sendgrid.Email({});

		email.addTo(req.body.from);
		email.setFrom("nick@sendgrid.com");
		email.setSubject("Thanks for coming to my talk at CF Summit!");
		email.setHtml(b.info);

		sendgrid.send(email, function (err, json) {
			res.send(json);
		});
	});

});

var server = app.listen(process.env.VCAP_APP_PORT || 3000, function () {
	console.log("App listening on", server.address().port);
});
