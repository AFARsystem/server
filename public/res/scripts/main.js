window.onload = function(){
 

	$("#send-data").click(function sendData(){
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var username = $("#username").val();
		var password = $("#password").val();
		var number = $("#number").val();
		var email = $("#email").val();

		var data = {
		    "firstname" : firstname,
		    "lastname" : lastname,
		    "username" : username,
		    "password" : password,
		    "number" : number,
		    "email" : email
		};

		$.post("http://afar.jackcook.us/newuser",
	       data,
	       function(result){
		   	console.log("pls");
		   	console.log(result);
	       }
	    );

	    window.location = "index2.html";
	
	});




}
