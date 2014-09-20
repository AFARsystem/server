window.onload = function(){
 

	$("#send-data").click(function sendData(){
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var username = $("#username").val();
		var number = $("#number").val();
		var email = $("#email").val();

		var data = {
		    "firstname" : firstname,
		    "lastname" : lastname,
		    "username" : username,
		    "number" : number,
		    "email" : email
		};

		$.post("http://localhost:8000/newuser",
	       data,
	       function(result){
		   	console.log("pls");
		   	console.log(result);
	       }
	    );

	    window.location = "index2.html";
	
	});




}
