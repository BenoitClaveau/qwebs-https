/*!
 * qwebs-https
 * Copyright(c) 2015 Benoît Claveau
 * MIT Licensed
 */
"use strict";

var Q = require("q"),
    fs = require("fs"),
    DataError = require("qwebs").DataError;

function HttpsService($config) {
	if (!$config) throw new DataError({ message: "[HttpsService] Qwebs config is not defined."});
    if (!$config.https) throw new DataError({ message: "Https section is not defined in qwebs config."});
    if (!$config.https.key) throw new DataError({ message: "Https key is not defined in qwebs config."});
	if (!$config.https.cert) throw new DataError({ message: "Https cert is not defined in qwebs config."});
	
    this.$config = $config;
	    
    var key = fs.readFileSync($config.https.key);
	var cert = fs.readFileSync($config.https.cert);
	
	this.options = {
		key: key,
		cert: cert
	};
};

exports = module.exports = HttpsService;