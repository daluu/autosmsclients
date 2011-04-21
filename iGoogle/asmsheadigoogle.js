/* Pure AJAX/XMLHTTP only demo of AutoSMS API
This is the accompanying javascript code file
Code adapted from sample code from:
http://www.watacrackaz.com/autosms/api.php
http://www.watacrackaz.com/autosms/apiexample.zip
w/ potential customizations using XMLHTTP library code from
http://www.codeproject.com/KB/session/httpautomationlibs.aspx
http://www.codeproject.com/KB/session/httpautomationlibs/httplib_js.zip
*/
function handleCarrierListResponse(obj){
	//obj.text contains the text of the page that was requested
	var str = obj.text;
	var carrierList = str.split("||");
	for(carrier in carrierList){
		var carrierPair = carrierList[carrier].split('|');
		document.getElementById("Carrier").options[document.getElementById("Carrier").length] = new Option(carrierPair[0] + " - " + carrierPair[1], carrierPair[1]);
		/* Other method to populate select list via DOM
		var nextOpt = document.createElement('option');
		nextOpt.text = carrierPair[0] + " - " + carrierPair[1];
		nextOpt.value = carrierPair[1];
		var selList = document.getElementById('Carrier');
		try {
			selList.add(nextOpt, null); // standards compliant; maybe not IE
		}catch(ex) {
			selList.add(nextOpt); // IE only
		}
		*/
	}
}

function buildCarrierList(){
	var params = {};  
	params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
	var carrierUrl = "http://www.watacrackaz.com/autosms/autosms.php?getcarriers=1";
	gadgets.io.makeRequest(carrierUrl, handleCarrierListResponse, params);
}

function handleHttpResponse(obj) {
	//obj.text contains the text of the page that was requested
	var str = obj.text;
	result = str.split("||");
	var reply;
	if (!result[0]){
		reply = "There was a problem sending your message. Please try again in a few moments";
		getCode();
		return;
	}
	if (result[0] == "error"){
		reply = result[1];
		getCode();
	}else {
		reply = result[0];
		ClearFields();
	}
	document.getElementById("status_message").innerHTML = reply;
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
	
	var params = {};
	params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
	var url = "http://www.watacrackaz.com/autosms/autosms.php?blob=";
	var fullUrl = url + "0.4||" + code + "||" + escape(carrier) + "||" + number + "||" + escape(message);
	gadgets.io.makeRequest(fullUrl, handleHttpResponse, params);
}