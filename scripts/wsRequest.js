// window.require = require;
// const electron = window.require('electron')
// ------------ Half nichts ---------------
// https://stackoverflow.com/questions/61021885/electron-window-require-is-not-a-function-even-with-nodeintegration-set-to-true?rq=1

// const { app, BrowserWindow } = require('electron');
// const window = new BrowserWindow();
// window.loadFile('../scripts/main.js');
const http = require('http');
const when = require('when');

/**
 * 
 * @param {*} httpOptions contains the miniserver host & authentication data for the https request 
 * @param {*} command contains the webservice command
 * @param {*} [raw] 
 * @returns 
 */
function requestFromMiniserver(httpOptions, command, raw) {
    var def = when.defer(),
        options = Object.assign({}, httpOptions);

    options.path = command;

    console.log("Starting Webserice Request: " + httpOptions.host + command);
    http.get(options, function(res) {
        var respObj = {
            httpStatusCode: res.statusCode,
            data: ""
        };
        res.on('data', function(data) {
            respObj.data += data;
        });
        res.on('end', function() {
            if (raw) {
                console.log("Request successfull!");
                def.resolve(respObj);
            } else {
                try {
                    respObj.json = JSON.parse(respObj.data);
                    console.log("Request successfull!");
                    def.resolve(respObj);
                } catch (error) {
                    console.error(error.message);
                    def.reject(error);
                };
            };
        });
        res.on('error', function(error) {
            console.log("Got error: " + error.message);
            def.reject(error);
        });
    });

    return def.promise;
};

/**
 * 
 * @param {*} wsOptions  contains the miniserver host & authentication data for the webservice 
 * @param {*} command contains the webservice command
 * @returns 
 */
function getValuefromMS(wsOptions, command) {
    return requestFromMiniserver(wsOptions, command).then(function(respObj) {
        return respObj.json.LL.value;
    });
};

/**
 * 
 * @param {*} wsOptions contains the miniserver host & authentication data for the webservice 
 * @param {*} command contains the webservice command
 * @returns 
 */
function getStatusCodefromMS(wsOptions, command) {
    return requestFromMiniserver(wsOptions, command).then(function(respObj) {
        return respObj.json.LL.Code || respObj.json.LL.code;
    });
};

// module.exports = { requestFromMiniserver, getValuefromMS, getStatusCodefromMS };
module.exports.requestFromMiniserver = requestFromMiniserver;
module.exports.getValuefromMS = getValuefromMS;
module.exports.getStatusCodefromMS = getStatusCodefromMS;