
	var myUserName = document.getElementById('username');

	myUserName.onkeydown = function(e) {
		console.log("key down");		
	}

	myUserName.onkeypress = function(e) {
		console.log("key press", e);		

		if (e.keyCode === 13) {
			alert("Return was pressed");
		}
	}

	myUserName.onkeyup = function(e) {
		console.log("key up");		
	}