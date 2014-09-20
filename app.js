
//mongo jazz
var dburl = "mongodb://localhost/AFAR";
var collections = ["users"];
var db = require("mongojs").connect(dburl, collections);

//build and start up the server.
var express = require("express");
var app = express();
var server = app.listen(8000, function() {
    console.log("Listening on port %d", server.address().port)
})

//Twilio
var logfmt = require("logfmt");
var twilio = require("twilio");

//Password encryption
var bcrypt = require("bcrypt-nodejs");

//Include the body-parser middlewear
var bodyParser = require("body-parser");
app.use(bodyParser());
app.set("view options", {layout: false});

app.get("/", function(req, res){
    res.redirect("/register");
})
app.get("/register", function(req, res){
    res.sendfile("./public/index.html")
})

app.post("/newuser", function(req, res){
    console.log(req.body);
/*
    db.users.count({"username":req.body.username}, function(err,count){
	console.log(count);
    });
*/
    db.users.find({"username":req.body.username}, function(err,docs){
	console.log(docs);
    });
    db.users.find({"username":req.body.username}, function(err,docs){
	if(docs.length===0){
	    db.users.save(req.body);
	    res.send("Success!");
	    console.log("pls");
	    
	} else {
	    res.send("That username has been taken already.");
	    console.log("wat");
	}

    })
})

app.post('/sendtext', function(req, res){
    var client = new twilio.RestClient("AC65713b161d8e4fa2be27a4dd77bf5a60", "6c2747b860112eb7770cfe6741f3b727");
    client.messages.create({
	to: "+1"+req.body.phoneNumber,
        from:'+19292442978',
        body:"Hello "+req.body.name+", your meal is ready."
    }, function(error, message) {
        if (error) {
            console.log(error.message);
        }
    });
});


app.use(express.static(__dirname+'/public/'));
