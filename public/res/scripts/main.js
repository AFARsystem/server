window.onload = function(){
 

	$("#send-data").click(function sendData(){
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var number = $("#number").val();
	    var city = $("#city").val();

		var data = {
		    "firstname" : firstname,
		    "lastname" : lastname,
		    "number" : number,
		    "city" : city
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
