//Twilio
var logfmt = require("logfmt");
var http = require("http");
var twilio = require("twilio");
var config = require("../config");

module.exports.sendText = function(number,message){
     var client = new twilio.RestClient(config.twilio.sid,config.twilio.auth);
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

module.exports.receiveText = function(req, res){
    if (twilio.validateExpressRequest(req, config.twilio.auth, {url: config.twilio.smsWebhook})) {
	res.header('Content-Type', 'text/xml');
	var body = req.param('Body').trim();
	var from = req.param('From');

	console.log(body);
	console.log(from);

    }

    else {
        res.statusCode = 403;
    }


}
