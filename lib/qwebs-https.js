/*!
 * qwebs-https
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const fs = require("fs");
const DataError = require("qwebs").DataError;
const https = require("https");

class HttpsServer {
  constructor($config, $qwebs) {
		if (!$config) throw new DataError({ message: "[HttpsServer] Qwebs config is not defined."});
		if (!$config.https) throw new DataError({ message: "Https section is not defined in qwebs config."});
		
		if ($config.https.start === false) return;
		
		if (!$config.https.port) throw new DataError({ message: "Https port is not defined in qwebs config."});
		if (!$config.https.key) throw new DataError({ message: "Https key is not defined in qwebs config."});
		if (!$config.https.cert) throw new DataError({ message: "Https cert is not defined in qwebs config."});
		if (!$config.https.ca) throw new DataError({ message: "Https ca is not defined in qwebs config."});
		if ($config.https.ca.length != 2) throw new DataError({ message: "Https ca is not well defined in qwebs config."});
		
		this.$config = $config;
		this.$qwebs = $qwebs;
			
		let options = {
			key: fs.readFileSync(this.$config.https.key),
			cert: fs.readFileSync(this.$config.https.cert),
			ca: [
					fs.readFileSync(this.$config.https.ca[0]),
					fs.readFileSync(this.$config.https.ca[1])
			]
		};

		https.createServer(options, (request, response) => {
			return this.$qwebs.invoke(request, response).catch(error => {
					return response.send(error);
				});
		}).listen(this.$config.https.port, () => {
			console.log("Https server started on", this.$config.https.port);
		});
	};
};

exports = module.exports = HttpsServer;
