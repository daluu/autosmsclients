/* Pure AJAX/XMLHTTP only demo of AutoSMS API
This is the accompanying javascript code file
Code adapted from sample code from:
http://www.watacrackaz.com/autosms/api.php
http://www.watacrackaz.com/autosms/apiexample.zip
w/ potential customizations using XMLHTTP library code from
http://www.codeproject.com/KB/session/httpautomationlibs.aspx
http://www.codeproject.com/KB/session/httpautomationlibs/httplib_js.zip
*/
function handleCarrierListResponse(){
	if (http.readyState == 4) {
		//alert(http.responseText);
		var carrierList = http.responseText.split("||");
		for(carrier in carrierList){
			//alert(carrierList[carrier]); must access by index
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
}

function buildCarrierList(){
	var carrierUrl = "http://www.watacrackaz.com/autosms/autosms.php?getcarriers=1";
	try {
		http.open("GET", carrierUrl, true);
		http.onreadystatechange = handleCarrierListResponse;
		http.send(null);
	} catch (e) {
		alert("Get carrier list failed somehow. Service may be down."); return true;
	}
	//} catch (e) {alert(e.description); return true;}
}

function handleHttpResponse() { 
	if (http.readyState == 4) {
		result = http.responseText.split("||");
		var reply;
		if (!result[0]){
			reply = "There was a problem sending your message. Please try again in a few moments";
			getCode();
			return;
		}
		if (result[0] == "error"){
			reply = result[1];
			getCode();
		}
		else {
			reply = result[0];
			ClearFields();
		}
		document.getElementById("status_message").innerHTML = reply;
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
	//} catch (e) {alert("Send SMS failed for some reason"); return true;}
	} catch (e) {alert(e.description); return true;}
}

//xmlHttp() from optional xmlHttpLib.js
function getHTTPObject() {
  var xmlhttpObj;
  if (!xmlhttpObj && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttpObj = new XMLHttpRequest();
      //xmlhttpObj = new xmlHttp();
    } catch (e) {
	    alert("no xmlhttp");
	    //xmlhttpObj = null;
      xmlhttpObj = false;
    }
  }
  return xmlhttpObj;
}

var http = getHTTPObject();
//var http = xmlHttp();
//var http = CrossXHR(); //use Flash XmlHttpRequest
//for workaround to Mac OS X session state persistence
//issue between normal web content requests &
//XmlHttpRequests
//Flash library from http://www.pliantcode.com/lib/crossxhr.js
//seems Flash component not working within Mac OS X widget
