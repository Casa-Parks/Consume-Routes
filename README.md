<p align="center">
<a href="https://travis-ci.org/Casa-Parks/Consume-Routes"><img src="https://travis-ci.org/Casa-Parks/Consume-Routes.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/capa-consume-routes"><img src="https://img.shields.io/npm/dt/capa-consume-routes.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/capa-consume-routes"><img src="https://img.shields.io/npm/v/capa-consume-routes.svg" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/capa-consume-routes"><img src="https://img.shields.io/github/license/Casa-Parks/Consume-Routes.svg" alt="License"></a>
</p>

## Introduction

Consume Routes is a simple JavaScript consumer for routing (built specifically for the Laravel package [Casa-Parks/Extract-Routes](https://github.com/Casa-Parks/Extract-Routes)).

## License

Extract Routes is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Installation

To get started with Consume Routes, use NPM to add the package to your project's dependencies:

    npm install --save capa-consume-routes

### Configuration

You're going to want to generate a route collection JSON object (in the same format as [tests/stubs/routes.json](tests/stubs/routes.json)), you can do this automatically in Laravel via the [Casa-Parks/Extract-Routes](https://github.com/Casa-Parks/Extract-Routes) package.

### Basic Usage

After providing the routes to a global object (such as `window.routes`), usage is as simple as:

```js
import Router from 'capa-consume-routes';

window.router = new Router(window.routes);
```

Then you can use it as expected:

```js
router.route('get::home');

router.route('get::auth.sign-in.facebook');

router.route('debugbar.clockwork', { id: 'abc' });

router.route('debugbar.clockwork', ['abc']);

router.action('App\\Http\\Controllers\\SettingsController@show');

// etc...
```

The two provided methods are:

```js
/**
 * Route to a named route.
 *
 * @param {String} name
 * @param {Object|Array} parameters
 *
 * @return {String}
 */
route(name, parameters = {})

/**
 * Route to an action.
 *
 * @param {String} action
 * @param {Object|Array} parameters
 *
 * @return {String}
 */
action(action, parameters = {})
```
