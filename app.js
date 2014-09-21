
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

//Twilio things from routes.
var routes = require("./routes");

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

app.post("/newuser", routes.processUser);

app.post("/emergencytwiml", routes.getTwiml);

/*
app.post("/newuser", function(req, res){
    console.log(req.body);
    
    db.users.find({"number":req.body.number}, function(err,docs){
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
*/

app.post('/sendtext', function(req, res){
   
});

app.post('/sms', routes.receiveText);


app.use(express.static(__dirname+'/public/'));
