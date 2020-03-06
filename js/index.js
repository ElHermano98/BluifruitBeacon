// Based on an example:
//https://github.com/don/cordova-plugin-ble-central


// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}



//the bluefruit UART Service
var blue ={
	serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
}

var ConnDeviceId;
var bleDeviceName;
var deviceList =[];

setTimeout("window.location.reload();",20000); //reload siden hvert 20. sekund. Dermed genindlæses Bluetooth-liste
 
function onLoad(){
	document.addEventListener('deviceready', onDeviceReady, false);
    bleDeviceList.addEventListener('touchstart', conn, false); // assume not scrolling
}

function onDeviceReady(){
	refreshDeviceList();
}

	 
function refreshDeviceList(){
	//deviceList =[];
	document.getElementById("bleDeviceList").innerHTML = ''; // empties the list
	if (cordova.platformId === 'android') { // Android filtering is broken
		ble.scan([], 5, onDiscoverDevice, onError);
	} else {
		//alert("Disconnected");
		ble.scan([blue.serviceUUID], 5, onDiscoverDevice, onError);
	}
}


function onDiscoverDevice(device){	
	if(device.name == "HERMAN"){
		/*
		var listItem = document.createElement('li'),
		html = device.name+ "," + device.id;
		listItem.innerHTML = html;
		document.getElementById("bleDeviceList").appendChild(listItem);
		*/
		test()		
	}if(device.name == "MARTIN"){
		/*
		var listItem = document.createElement('li'),
		html = device.name+ "," + device.id;
		listItem.innerHTML = html;
		document.getElementById("bleDeviceList").appendChild(listItem);
		*/
		test2()
	}

}





function onError(reason)  {
	alert("ERROR: " + reason); // real apps should use notification.alert
}
function test1(){
	var urlp='https://publish.kea.dk/';	
	openBrowser(urlp);
}


function test(){
	var url='https://api.thingspeak.com/update?api_key=3YNM0GH60LRYVWDB&field1=HERMAN';	
	openBrowser(url);
}

function test2(){
	var url2='https://api.thingspeak.com/update?api_key=3YNM0GH60LRYVWDB&field1=MARTIN';
	openBrowser(url2);
}


function openBrowser(urlp) {
   var target = '_blank';
   var options = "location=no"
   var ref = cordova.InAppBrowser.open(urlp, target, options);
}









