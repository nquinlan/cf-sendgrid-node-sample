// All the makings of an Express app
var express = require('express');
var app = express();

// Multipart form parsing
var multipart = require('connect-multiparty');

app.use(multipart());

// Include the file "bird", this allows for bird call lookup
var bird = require("./bird");

// Load the Cloud Foundry Services Data
// This is initiall a string, so we parse it into JSON
var services = JSON.parse(process.env.VCAP_SERVICES);

// Find the first SendGrid service and use that
// You'll need different code if you have multiple instances of SendGrid
var sendgridService = services.sendgrid[0];
var sendgrid = require('sendgrid')(sendgridService.credentials.username, sendgridService.credentials.password);

// Serve all requests, made by any method to `/`
app.all('/', function (req, res) {
	
	// Get a bird call based on the subject of an email,
	// parsed and posted here by SendGrid's Parse Webhook
	// https://sendgrid.com/docs/API_Reference/Webhooks/parse.html
	bird(req.body.subject, function (b) {
		// Send an email using SendGrid's Node.js library
		// http://github.com/sendgrid/sendgrid-nodejs
		sendgrid.send({
			to: req.body.from,
			from: "nick@sendgrid.com",
			subject: "Thanks for watching how to use Cloud Foundry and SendGrid 👍",
			html: b.info
		}, function (err, json) {
			res.send(json);
		});
	});

});

// Listen on port 3000 by development, or whatever port Cloud Foundry provides
var server = app.listen(process.env.VCAP_APP_PORT || 3000, function () {
	console.log("App listening on", server.address().port);
});
