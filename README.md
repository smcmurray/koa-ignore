# koa-ignore
Koa middleware to make other middleware conditional

# koa 2.x

koa-ignore is koa 2.x middleware.

# Installation

````
$ npm install koa-ignore
````
or
````
$ yarn add koa-ignore
````

# Usage

````
let koa = require('koa');
let ignore = require('koa-ignore');

let app = new koa();

app.use(ignore(any, old, middleware).if(ctx=> 'json' != ctx.accepts(['json','html'])));
app.use(ignore(other).unless(isThursday);
````

This will cause koa to invoke the middleware 'any', 'old', and 'middleware' for requests that accept json more than html, but not for any other requests.
It will also invoke the 'other' middleware only for requests on Thursdays (given the proper definition of isThursday).

# API

## koa-ignore

koa-ignore returns a function which takes a list of middleware and returns an object. That object contains two methods:

* if
* unless

Both methods return a koa middleware.

## if(function)

koa-ignore will invoke the function with the context of the current request, and ignore the middleware in question if the function evaluates truthily.

For example,

````
let skip = require('koa-ignore');

app.use(skip(logger).if(ctx=>ctx.secure));
````
will skip the logger middleware for any requests that do not use the https protocol.

## unless(function)

koa-ignore will invoke the function with the context of the current request, and ignore the middleware in question unless the function evaluates truthily.

For example,

````
let skip = require('koa-ignore');
let logger = skip(require('crazy-logger'));

app.use(logger.unless(()=>1073741824 < os.free()));
````
will skip the crazy-logger middleware unless there is at least 1 GiB of free memory available.
