/**
 * Copyright (c) 2022 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const pathMatch = require('path-match')({
	// path-to-regexp options
	sensitive: false,
	strict: false,
	end: false,
});

function middleWare(request, response, next) {

    request.routePath = routePath(request);

    next();
}

function routePath(request) {

	// create a match function from the route pattern
	const match = pathMatch(request.route.pattern);
	
	// match pur path
	const matches = match(request.path);

	// if we have some matches...
	if ('0' in matches) {
        // console.log(matches);
		return  matches[0].replace(/^([^\/])/, '/$1');
	}

    return ''
}

module.exports = { routePath, middleWare };
