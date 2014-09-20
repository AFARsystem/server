//Twilio
var logfmt = require("logfmt");
var http = require("http");
var twilio = require("twilio");
var TWILIO_SID = "AC65713b161d8e4fa2be27a4dd77bf5a60";
var TWILIO_AUTH = "6c2747b860112eb7770cfe6741f3b727";

exports.sendText = function(number,message){
     var client = new twilio.RestClient(TWILIO_SID,TWILIO_AUTH);
    client.messages.create({
	to: number,
        from:'+19292442978',
        body: message
    }, function(error, message) {
        if (error) {
            console.log(error.message);
        }
    });

}

exports.receiveText = function(req, res){
    if (twilio.validateExpressRequest(request, config.twilio.key, {url: config.twilio.smsWebhook}) || config.disableTwilioSigCheck) {
	response.header('Content-Type', 'text/xml');
	var body = request.param('Body').trim();
	var from = request.param('From');

	console.log(body);
	console.log(from);

    }

    else {
        response.statusCode = 403;
    }


}
