//////////////////////////////////////////////////////////////////////////////////
// xmlHttpLib.js
// Cross-platform Javascript XML and HTTP request library
// Solution designed by: David Luu
// Email: swsupport@parsingprose.com
// http://www.parsingprose.com
//
// Simplifies making HTTP POST & GET requests with pseudo support for session
// state persistence & cookies. Allows you to make HTTP requests without having to
// learn AJAX or XmlHttpRequest object. This solution is free, open source, and is 
// a 1 file library solution. It can't do as much compared to other AJAX
// Javascript libraries, but is really simple for making HTTP requests. However,
// this library is not designed for making asynchronous HTTP requests.
//
// Library makes use of the appropriate XmlHttpRequest object available to the 
// platform being used. Library does not support file uploads, binary data, or 
// multi-part form data.
//
// Library provided "as is".
// Please retain original credits when modifying or redistributing this library.
//
// Session state & cookie support ported from VBScript solution provided at
// http://blog.netnerds.net/2006/04/asp-sustain-remote-cookie-sessions-in-an-asp-script-using-vbscript/
// JSON & cross-platform XmlHttpRequest and XML functions based on code samples from various
// AJAX books. Cross-platform print function was self-conceived.
//
// Revision History
//	06/31/07 - v1.0 - initial release
//	07/22/07 - v1.1 - revised methods to return an object for ease of use
//
//////////////////////////////////////////////////////////////////////////////////

/*
Method httpPost: make an HTTP POST request
Parameters:
url - request URL
data - POST data
cookie - optional cookie to supply, supply empty string if not used
	  value will be set to response cookie upon request completion
respType - optional response type to supply. Supply empty string if not used.
           Default is "text". Valid values are: text, xml, json
Return value: httpResp object, see constructor below for details
*/
function httpPost(url, data, cookie, respType){
	//Set default/dummy cookie if none or "" supplied
	//Set default response type if none or "" supplied
	var tmpCookie = "dummy=dummy;";
	var tmpRespType = "text";
	if(cookie.length > 0){
		tmpCookie = cookie;
	}
	if(respType.length > 0){
		tmpRespType = respType;
	}
	//Instantiate XMLHttpRequest object
	//var XMLHTTP = new ActiveXObject("MSXML2.serverXMLHttp");
	var XMLHTTP = xmlHttp();
	
	//Set up request (synchronous)
	XMLHTTP.open("POST",url,false);
	
	XMLHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	//Set (optional) cookie
	XMLHTTP.setRequestHeader("Cookie","excuse the Microsoft bug");
	XMLHTTP.setRequestHeader("Cookie",tmpCookie);
	
	//make/send request
	XMLHTTP.send(data);
	
	//wait for response
	while(XMLHTTP.readyState != 4){
        	XMLHTTP.waitForResponse(1000);
	}
	
	//parse response cookie to be returned & can be used to persist session state
	var strHeaders = XMLHTTP.getAllResponseHeaders();
	var retCookie = tmpCookie;
	var theCookie = "";
	var endpos = 0;
	var hArr = strHeaders.split("Set-Cookie: ");
	for(kk = 1; kk < hArr.length; kk++){
		endpos = hArr[kk].indexOf("path=/") - 2;
		theCookie = hArr[kk].substring(0,endpos);
		retCookie = retCookie + " " + theCookie;
	}	
	if(retCookie.length == 0){
		retCookie = cookie;
	}
	
	//return HTTP Response as an object with the following properties
	var theResp;
	if(tmpRespType == "xml"){
		theResp = new httpResp(retCookie, strHeaders, XMLHTTP.responseXML, XMLHTTP.status);
	}else if(tmpRespType == "json"){
		var txtResp = XMLHTTP.responseText;
		var func = new Function("return "+txtResp);
		var jsonObj = func();
	
		//Alternative JSON processing
		//var txtResp = XMLHTTP.responseText
		//when resp is not an array then do this
		//var jsonObj = eval("("+txtResp+")");
		//else when resp is array like "[1,2,3]" then do this
		//var jsonObj = eval(txtResp);
	
		//now can access as jsonObj.member
		theResp = new httpResp(retCookie, strHeaders, jsonObj, XMLHTTP.status);
	}else{ //(tmpRespType == "text")
		theResp = new httpResp(retCookie, strHeaders, XMLHTTP.responseText, XMLHTTP.status);
	}
	return theResp;
}

/*
Method httpGet: make an HTTP GET request
Parameters:
url - request URL
cookie - optional cookie to supply, supply empty string if not used
	  value will be set to response cookie upon request completion
respType - optional response type to supply. Supply empty string if not used.
           Default is "text". Valid values are: text, xml, json
Return value: httpResp object, see constructor below for details
*/
function httpGet(url, cookie, respType){
	//Set default/dummy cookie if none or "" supplied
	//Set default response type if none or "" supplied
	var tmpCookie = "dummy=dummy;";
	var tmpRespType = "text";
	if(cookie.length > 0){
		tmpCookie = cookie;
	}
	if(respType.length > 0){
		tmpRespType = respType;
	}
	//Instantiate XMLHttpRequest object
	//var XMLHTTP = new ActiveXObject("MSXML2.serverXMLHttp");
	var XMLHTTP = xmlHttp();
	
	//Set up request (synchronous)
	XMLHTTP.open("GET",url,false);
	
	//Set (optional) cookie
	XMLHTTP.setRequestHeader("Cookie","excuse the Microsoft bug");
	XMLHTTP.setRequestHeader("Cookie",tmpCookie);
	
	//make/send request
	XMLHTTP.send(""); //send no/blank data since is GET request
	
	//wait for response
	while(XMLHTTP.readyState != 4){
        	XMLHTTP.waitForResponse(1000);
	}
	
	//parse response cookie to be returned & can be used to persist session state
	var strHeaders = XMLHTTP.getAllResponseHeaders();
	var retCookie = tmpCookie;
	var theCookie = "";
	var endpos = 0;
	var hArr = strHeaders.split("Set-Cookie: ");
	for(kk = 1; kk < hArr.length; kk++){
		endpos = hArr[kk].indexOf("path=/") - 2;
		theCookie = hArr[kk].substring(0,endpos);
		retCookie = retCookie + " " + theCookie;
	}	
	if(retCookie.length == 0){
		retCookie = cookie;
	}
	
	//return HTTP Response as an object with the following properties
	var theResp;
	if(tmpRespType == "xml"){
		theResp = new httpResp(retCookie, strHeaders, XMLHTTP.responseXML, XMLHTTP.status);
	}else if(tmpRespType == "json"){
		var txtResp = XMLHTTP.responseText;
		var func = new Function("return "+txtResp);
		var jsonObj = func();
	
		//Alternative JSON processing
		//var txtResp = XMLHTTP.responseText
		//when resp is not an array then do this
		//var jsonObj = eval("("+txtResp+")");
		//else when resp is array like "[1,2,3]" then do this
		//var jsonObj = eval(txtResp);
	
		//now can access as jsonObj.member
		theResp = new httpResp(retCookie, strHeaders, jsonObj, XMLHTTP.status);
	}else{ //(tmpRespType == "text")
		theResp = new httpResp(retCookie, strHeaders, XMLHTTP.responseText, XMLHTTP.status);
	}
	return theResp;
}

//Return XMLHttpRequest object for cross platform/scripting use (MS & Mozilla)
function xmlHttp(){
	//create either of Microsoft versions of the object or
	try{return new ActiveXObject("MSXML2.serverXMLHttp");}catch(e){};
	try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(e){};
	try{return new ActiveXObject("Microsoft.XMLHTTP");}catch(e){};
	//create the version used by other Mozilla based browsers
	try{return new XMLHttpRequest();}catch(e){};
	return null; //could not create object
}

//Constructor for HTTP response object
function httpResp(sessionCookie, httpHeaders, content, status)
{
  this.cookie = sessionCookie;
  this.headers = httpHeaders;
  this.content = content;	//can be text, XML, or JSON
  this.statusCode = status;
}

//Return XML document object for cross platform/scripting use (MS & Mozilla)
function xmlObj(text){
	//create either of Microsoft versions of the object or
	try{
		var msDoc = new ActiveXObject("Microsoft.XMLDOM");
		msDoc.async = "false";
		msDoc.loadXML(text);
		return msDoc;
	}catch(e){};
	//create the version used by other Mozilla based browsers
	try{
		var parser = new DOMParser();
		var mozDoc = parser.parseFromString(text,"text/xml");
		return mozDoc;
	}catch(e){};
	return null; //could not create object
}

//Cross-platform print function for Javascript.
//Prints out supplied text string to the appropriate platform output
function print(txtStr){
	//Case for web browsers
	try{Alert(txtStr);}catch(e){};
	//Case for Windows Scripting Host (WSH)
	try{WScript.Echo(txtStr);}catch(e){};
	//Case for Active Server Pages (ASP)
	try{Response.Write(txtStr);}catch(e){};
	//Otherwise, do nothing
	return;
}