//Request library to make post requests.
var request = require("request");

//Twilio
var logfmt = require("logfmt");
var http = require("http");
var twilio = require("twilio");
var config = require("../config");
var client = new twilio.RestClient(config.twilio.sid,config.twilio.auth);

//Mongodb
var dburl = "mongodb://localhost/AFAR"
var collections = ['users'];
var db = require("mongojs").connect(dburl, collections);

//Google Maps
var gm = require("googlemaps");

function processMessage(s, number){
    var finalString="";
    var arr = s.trim().split("\n");

    console.log(arr);
    
    var address, country, city, detail;

    if(arr[0]==="swagmaster2000"){
	arr.shift();
	address = arr.shift();
	country = arr.shift();
	city = arr.shift();
	detail = arr.shift();
    } else {
	address = arr.shift();
	country = arr.shift();
	city = arr.shift();
	detail = arr.shift();
	if(!address||!country||!city||!detail){
	    return "Please format your text reports in the following fashion:<br>Rough location<br>Country<br>City<br>Detail";
	}	
    }

    finalString+= 'EMERGENCY: ' + detail + '\n';
    finalString+= "LOCATION: "+address+"\n";
    finalString+= "CONTACT: "+number;

    sendDistress(finalString, city, country);

    return "Your emergency distress call has been sent out.";
    
    //If the first element of the array is swagmaster, then the input message was an emergency.
}

function sendText(number,message){
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

function sendDistress(message, city, country){
    console.log(message);
    
    db.users.find({"city":city}, function(err, docs){
	if(err){
	    console.log("There was an error");

	} else {
	    
	    for(var x=0;x<docs.length;x++){
		sendText(docs[x].number, message);

	    }
	}
    })
    
    //console.log(client);
    //console.log("\n");

    /*
    client.calls.create({
	url: "http://afar.jackcook.us/emergencytwiml",
	to: ,
	sendDigits: "1234#",
	from: "+19292442978",
	method: "POST"
    }, function(err, call) {
	process.stdout.write(call.sid);
    });
    */
}

module.exports.getTwiml = function(req, res){
    var resp = new twilio.TwimlResponse();

    resp.say({voice:'alice',language:"en"}, "There is an emergency.");

    res.writeHead(200, {
	'Content-Type':'text/xml'
    });

    res.end(resp.toString());
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
