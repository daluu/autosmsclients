/*
This is the accompanying javascript code file
Code adapted from sample code from:
http://www.watacrackaz.com/autosms/api.php
http://www.watacrackaz.com/autosms/apiexample.zip
w/ customizations using XMLHTTP library code from
http://www.codeproject.com/KB/session/httpautomationlibs.aspx
http://www.codeproject.com/KB/session/httpautomationlibs/httplib_js.zip
*/

var http = new XMLHttpRequest();

function handleHttpResponse() { 
	if (http.readyState == 4) {
		result = http.responseText.split("||");
		var reply;
		var errFlag;
		if (!result[0]){
		    reply = "There was a problem sending your message. Please try again in a few moments";
		    errFlag = true;
			getCode();
			return;
		}
		if (result[0] == "error") {
		    errFlag = true;
			reply = result[1];
			getCode();
		}
		else {
		    errFlag = false;
			reply = result[0];
			ClearFields();
		}
	    //document.getElementById("status_message").innerHTML = reply;        
		var msg = new Windows.UI.Popups.MessageDialog(reply, errFlag ? "Error:" : "Status:");
		msg.showAsync();
	}
}

function getCode(){
	var currentTime = new Date();
	var newtime = currentTime.getTime();
	document.getElementById("Code-Img").setAttribute("src", "http://www.watacrackaz.com/autosms/autosms.php?getcode=1&" + newtime);
}

function ClearFields(){
	document.getElementById("Carrier").value = "";
	document.getElementById("Number").value = "";
	document.getElementById("Message").value = "";
	document.getElementById("Code").value = "";
	getCode();
}

function sendsms() {
	carrier = document.getElementById("Carrier").value;
	number = document.getElementById("Number").value;
	message = document.getElementById("Message").value;
	code = document.getElementById("Code").value;
	
	var url = "http://www.watacrackaz.com/autosms/autosms.php?blob=";
	try {
		http.open("GET", url + "0.4||" + code + "||" + escape(carrier) + "||" + number + "||" + escape(message), true);
		http.onreadystatechange = handleHttpResponse;
		http.send(null);
	} catch (e) {
	    var msg = new Windows.UI.Popups.MessageDialog(e.description, "Error:");
	    msg.showAsync();
	}
}