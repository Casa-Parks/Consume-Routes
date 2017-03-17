import * as stub from './stubs/routes.json';
import Consumer from '../dist/index.js';

import assert from 'assert';

var consumer = () => new Consumer(stub);

describe('Consumer', function () {
    var c = consumer();

    it('takes a collection of routes', function () {
        assert.equal(c.routes, stub);
    });

    it('can route to a named route', function () {
        assert.equal(
            c.route('get::home'),
            '/'
        );

        assert.equal(
            c.route('get::auth.sign-in.facebook'),
            '/sign-in/facebook'
        );
    });

    it('can route to a named route with parameters', function () {
        assert.equal(
            c.route('debugbar.clockwork', ['abc']),
            '/_debugbar/clockwork/abc'
        );

        assert.equal(
            c.route('debugbar.clockwork', {id: 'abc'}),
            '/_debugbar/clockwork/abc'
        );
    });

    it('can route to an action route', function () {
        assert.equal(
            c.action('App\\Http\\Controllers\\Me\\SettingsController@show'),
            '/me/settings'
        );

        assert.equal(
            c.action('App\\Http\\Controllers\\Auth\\TwitterController@process'),
            '/me/link/twitter'
        );
    });

    it('can route to an action route with parameters', function () {
        assert.equal(
            c.action('Barryvdh\\Debugbar\\Controllers\\OpenHandlerController@clockwork', ['abc']),
            '/_debugbar/clockwork/abc'
        );

        assert.equal(
            c.action('Barryvdh\\Debugbar\\Controllers\\OpenHandlerController@clockwork', {id: 'abc'}),
            '/_debugbar/clockwork/abc'
        );
    });

    it('receives an error when a parameter is missing', function () {
        assert.throws(
            () => c.route('debugbar.clockwork'),
            Error,
            "missing required parameter 'id' for uri '_debugbar/clockwork/{id}'"
        );

        assert.throws(
            () => c.action('Barryvdh\\Debugbar\\Controllers\\OpenHandlerController@clockwork'),
            Error,
            "missing required parameter 'id' for uri '_debugbar/clockwork/{id}'"
        );
    });
});
