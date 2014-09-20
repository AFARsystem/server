
//mongo jazz
var dburl = "mongodb://localhost/Users/LCAIR5/Desktop/Code/knokno/data/db/kkdb";
var collections = ["users","surveys"];
var db = require("mongojs").connect(dburl, collections);

//build and start up the server.
var express = require("express");
var app = express();
var server = app.listen(8000, function() {
	console.log("Listening on port %d", server.address().port)
})

//Include the body-parser middlewear
var bodyParser = require("body-parser");
app.use(bodyParser());
app.set("view options", {layout: false});

app.get("/", function(req, res){
	res.redirect("/landing");
})
app.get("/landing", function(req, res){
	res.sendfile("./public/index.html")
})

app.post("/auth/new-user", function(req, res){
	if( (!req.body.name || !req.body.email) || (!req.body.interests || !req.body.experiences)){
		res.send("One of the forms wasn't filled out.");
	}else{
		var searchObject = {
			name: req.body.name,
			email: req.body.email,
			interests: req.body.interests,
			experiences: req.body.experiences
		}


		try{
			db.surveys.find({"email": req.body.email}).insert( searchObject, function(err, saved){
				if(err || !saved){
					res.send("Something went wrong.");
					console.log("Something went awry");
				}else{
					res.send("Update successful!")
				}
			});

		}catch(err){
			db.surveys.insert(searchObject, function(err, saved){
				if(err || !saved){
					res.send("Something went wrong.");
				}else{
					res.send("Update successful");
				}
			});
		}
	}

	console.log("name: " + req.body.name);
	console.log("email: " + req.body.email);
	console.log("Interested in: " + req.body.interests);
	console.log("Willing to teach: " + req.body.experiences);
})


app.use(express.static(__dirname+'/public/'));
