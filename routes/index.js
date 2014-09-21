//Twilio
var logfmt = require("logfmt");
var http = require("http");
var twilio = require("twilio");
var config = require("../config");

//Mongodb
var dburl = "mongodb://localhost/AFAR"
var collections = ['users'];
var db = require("mongojs").connect(dburl, collections);

//Google Maps
var gm = require("googlemaps");

function processMessage(s, number){
    var finalString="";
    var arr = s.trim().split("\n");
    
    if(arr.shift()==="swagmaster2000"){
	var address = arr.shift();
	var city = arr.shift();
	var country = arr.shift();
	var detail = arr.shift();

	finalString+= 'EMERGENCY: ' + detail + '\n';
	finalString+= "LOCATION: "+address+", "+city+", "+country+"\n";
	finalString+= "CONTACT: "+number;
	sendDistress(finalString,city);
    }else{
	finalString = "Please don't fool around with this stuff; this is srs business.";
	return finalString;
    }

    return "Your emergency distress call has been sent out.";
    
    //If the first element of the array is swagmaster, then the input message was an emergency.
}

function sendText(number,message){
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

function sendDistress(message, city){
    db.users.find({"city":city}, function(err, docs){
	if(err){
	    console.log("There was an error");

	} else {
	    
	    for(var x=0;x<docs.length;x++){
		sendText(docs[x].number, message);
	    }
	}
    })
}

module.exports.processUser = function(req, res){
    console.log(req.body);

    db.users.find({"number":req.body.number}, function(err, docs){
	if(docs.length==0){
	    console.log("success");
	    db.users.save(req.body);
	    res.send("Success");
	} else {
	    res.send("That username has been updated already,");
	    console.log("Wat");
	}
    });
};

module.exports.receiveText = function(req, res){
    if (twilio.validateExpressRequest(req, config.twilio.auth, {url: config.twilio.smsWebhook})) {
	res.header('Content-Type', 'text/xml');
	var body = req.param('Body');
	var from = req.param('From');

	sendText(from, processMessage(body, from));
    }

    else {
        res.statusCode = 403;
    }
}
