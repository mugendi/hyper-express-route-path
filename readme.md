<!--
 Copyright (c) 2022 Anthony Mugendi

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# hyper-express-route-path

This is a tiny module that uses [path-match](https://www.npmjs.com/package/path-match) to determine the exact path extracted from a route.

This was built to work with [hyper-express](https://www.npmjs.com/package/hyper-express) and I use it to help manage static file serving.

## Ah! Oh! What does it do?

Say you have the route `/assets/*` to server your assets, and you try to access the file `/assets/vids/1.mp4`, it calculates the route path to be `/vids/1.mp4` so you can look for that file in your static directory.

Why this is important is because static files will effectively be served off many routes and you will need a way to map to them.

## Usage

You can use this as a middleware or within the route.

```javascript
const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server();

// require module
const heRoutePath = require('hyper-express-route-path');

// to use it as a middleware
webserver.use(heRoutePath.middleWare);

// Create GET route to serve 'Hello World'
webserver.get('/*', async (request, response) => {

	// Now every request object will have a new property; routePath
	response.send(request.routePath);
	// => '/vids/1.mp4' when accessing /vids/1.mp4

	//You can also use it within a route as follows
	let filePath = heRoutePath.routePath(request);
	// Of course we probably don't need this as we have already used it as a middleware ;)
	response.send(filePath);
	// => '/vids/1.mp4' when accessing /vids/1.mp4

});

// Activate webserver by calling .listen(port, callback);
webserver
	.listen(80)
	.then((socket) => console.log('Webserver started on port 80'))
	.catch((error) => console.log('Failed to start webserver on port 80'));
```
