// defining all variables and constants
// import { wsRequest } from './wsRequest.js';
import './wsRequest.js';
// import { requestFromMiniserver, getValuefromMS, getStatusCodefromMS } from './wsRequest.js';
// const wsRequest = require('./wsRequest.js');


var miniserverData = {
    username: "",
    password: "",
    ips: [],
    returnedDevices: []
};


const wsOptions = {
    host: "",
    headers: {
        'Authorization': 'Basic ' + btoa(`${miniserverData.username}:${miniserverData.password}`)
            // 'Authorization': 'Basic ' + new Buffer.from(user.username + ':' + user.password, 'utf8').toString('base64')
    }
}
const wsCommands = {
    loxAppWs: '/data/LoxAPP3.json',
    liveLearnList: "/jdev/sps/livelearn/list"
}

// all functions
function addItem() {
    var x = document.getElementById("device-types");
    var option = document.createElement("option");
    option.text = "Test" + x.length;
    x.add(option);
}

function addOption(datalist, option) {
    var ipInput = document.getElementById("savedMiniserver");
    var option = document.createElement('option');
    option.value = "opt1";
    ipInput.appendChild(option);
}

// function startWork() {

// }

function changePasswordVisability() {
    var passwordType = document.getElementById("password");
    if (passwordType.type === "password") {
        passwordType.type = "text";
    } else {
        passwordType.type = "password";
    };
}


function connect() {
    debugger;
    connect1();
}

function connect1() {
    miniserverData.username = document.getElementById("username").value;
    miniserverData.password = document.getElementById("password").value;
    console.log(miniserverData.username + ":" + miniserverData.password);
    console.log(miniserverData);

    getAllIps()
        // getGetAllLearnedDevicesFromAllMs();
}

function getAllIps() {
    var tempIps = document.getElementsByClassName("miniserverIp");
    tempIps = Array.from(tempIps);

    miniserverData.ips = [];
    tempIps.forEach(element => {
        if (element.value != "") {
            miniserverData.ips.push(element.value);
        }
    });
    console.log(miniserverData.ips);
}

function getGetAllLearnedDevicesFromAllMs() {
    miniserverData.ips.forEach(getGetAllLearnedDevicesfromMs()).then(() => {
        console.log("All Devices found");
    });
}

function getGetAllLearnedDevicesfromMs(currentIp) {
    console.log(`Starting Webservice for ${currentIp}`);
    wsOptions.host = currentIp;
    wsRequest.getValuefromMS(wsOptions, liveLearnList).then((wsResult) => {
        wsResult = JSON.parse(wsResult);
        console.log(wsRequest);

        for (var i in wsResult[0].devices) {
            let deviceName = wsResult[0].devices[i].deviceType;
            let deviceType = wsResult[0].devices[i].type;

            if (!foundedDeviceTypes.includes(deviceType)) {
                foundedDeviceTypes.push(deviceType);
            }
            foundedDeviceTypes[foundedDeviceTypes.indexof(deviceType)].push(deviceName);
        };
        console.log(foundedDeviceTypes);
    }).then(() => {
        console.log("Got all Devices from Miniserver", currentIp);
    });
}