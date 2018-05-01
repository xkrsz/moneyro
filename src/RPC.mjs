'use strict';

import got from 'got';
import _ from 'lodash';

export default class RPC {

  /**
   * @typedef {Object} BaseRPCResponse
   * @property {string} status - General RPC error code. "OK" means everything looks good.
   */

  hostname = '127.0.0.1';
  port;

  get apiUrl() { return `http://${this.hostname}:${this.port}/json_rpc`; }

  constructor({
                hostname = this.hostname,
                port,
              } = {}) {

    this.hostname = hostname;
    this.port = port;
  }

  _getOptions(method, params = {}) {

    let options = {
      json: true,
      body: {
        jsonrpc: '2.0',
        id: '0',
        method: method,
      },
    };

    if (!_.isEmpty(params)) options.body.params = params;

    return options;
  }

  /**
   * Sends a request to defined host.
   *
   * @param {string} method - RPC method name.
   * @param {Object} params - Additional parameters.
   * @returns {Promise<*>}
   */
  async request(method, params = {}) {

    const response = await got.post(this.apiUrl, this._getOptions(method, params));

    switch (response.statusCode) {
      case 200:
        const result = response.body.result;
        if (_.isObject(result)) {
          return this._keysToCamelCase(result);
        }

        return result;
      default:
        throw new Error('Received negative response from server.');
    }
  }

  /**
   * Converts object keys to camelCase.
   *
   * @param {Object} object
   * @returns {Object}
   * @private
   */
  _keysToCamelCase(object) {
    return _.mapKeys(object, (value, key) => _.camelCase(key));
  }

}
