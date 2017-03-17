/**
 * Extract routes by a field.
 *
 * @param {Object|Array} routes
 *
 * @return {Object}
 */
let extract = function (field, routes = []) {
    let map = {};
    for (let key in routes) {
        let route = routes[key];

        if (typeof route[field] !== 'string' || route[field] === '') {
            continue;
        }

        map[route[field]] = key;
    }

    return map;
};

/**
 * Map a route.
 *
 * @param {Object} route
 * @param {Object|Array} parameters
 *
 * @return {String}
 */
let map = function (route, parameters = {}) {
    let uri = route.uri;

    route.parameters.forEach(parameter => {
        let index = uri.indexOf(`{${parameter}}`);
        let length = parameter.length + 2;
        let value = typeof parameters[parameter] === 'string' ? parameters[parameter] : null;

        if (value === null && Array.isArray(parameters) && parameters.length > 0) {
            value = parameters.shift();
        }

        if (index !== -1 && value === null) {
            throw new Error(`missing required parameter '${parameter}' for uri '${uri}'`);

            return;
        } else if (index === -1) {
            index = uri.indexOf(`{${parameter}?}`);
            length++;
        }

        uri = uri.substring(0, index) + value + uri.substring(index + length);
    });

    return uri[0] === '/' ? uri : `/${uri}`;
};

class Consumer {
    /**
     * Constructs a new consumer.
     *
     * @param {Object|Array} routes
     */
    constructor(routes = []) {
        this.routes = routes;

        this.names = extract('name', routes);
        this.actions = extract('action', routes);
    }

    /**
     * Route to a named route.
     *
     * @param {String} name
     * @param {Object|Array} parameters
     *
     * @return {String}
     */
    route(name, parameters = {}) {
        let route = this.names[name];

        if (route === undefined) {
            return undefined;
        }

        return map(this.routes[route], parameters);
    }

    /**
     * Route to an action.
     *
     * @param {String} action
     * @param {Object|Array} parameters
     *
     * @return {String}
     */
    action(action, parameters = {}) {
        let route = this.actions[action];

        if (route === undefined) {
            return undefined;
        }

        return map(this.routes[route], parameters);
    }
}

export default Consumer;
