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