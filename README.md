# qwebs-https
Https server for [Qwebs](https://www.npmjs.com/package/qwebs).

## Features

  * [Qwebs](https://www.npmjs.com/package/qwebs)

### Add the https parameters in config.json

```json
{
  "https": {
    "key": "./path to private key to use for SSL",
    "cert": "./path to public x509 certificate",
    "ca": [
      "./path to interim 1.pem",
      "./path to interim 2.pem"
    ] 
  }
}
```

## Installation

```shell
npm install $qwebs --save
npm install $qwebs-http --save
npm install $qwebs-https --save
```

## Create a service.js

```service.js
"use strict";

class Service {
	constructor() {	
};

index(request, response) {
 let content = {
  text: `hello ${request.params.name}`
 };
 return response.send({ request: request, content: content });
};

exports = module.exports = Service;
```

## Define routes.json

```routes.json
{
    "services": [
        { "name": "$http", "location": "qwebs-http"},
        { "name": "$http", "location": "qwebs-https"},
        { "name": "$service", "location": "./service"}
    ],
    "locators": [
        { "get": "/:name", "service": "$service", "method": "index" },
    ]
}
```

## Create config.json

Activate https and http to redirect to https port

```config.json
{
    "routes": "./routes.json",
    "http": {
        "port": 3000,
        redirect: true
    }
    "https": {
        "port": 3443
        ...
    }
}
```

## Enjoy

Create a server.js

```server.js
"use strict";

const Qwebs = require("qwebs");
new Qwebs().load();
```

Run server on http://localhost:3000

```shell
node server.js
```
