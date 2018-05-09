'use strict';

import got from 'got';
import _ from 'lodash';

export default class RPC {

  /** @type {string} */
  hostname = '127.0.0.1';
  /** @type {uint} */
  port;

  get apiUrl() { return `http://${this.hostname}:${this.port}/json_rpc`; }

  constructor({
                hostname = this.hostname,
                port,
              } = {}) {

    this.hostname = hostname;
    this.port = port;
  }

  /**
   *
   * @param {string} method
   * @param {Object} [params]
   * @return {Object}
   * @protected
   */
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

    const options = this._getOptions(method, params);
    const response = await got.post(this.apiUrl, options);

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
    let camelCaseObject = _.cloneDeep(object);

    if (_.isArray(camelCaseObject)) {

      return _.map(camelCaseObject, this._keysToCamelCase);
    } else {

      camelCaseObject = _.mapKeys(camelCaseObject, (value, key) => {
        return _.camelCase(key);
      });

      return _.mapValues(camelCaseObject, (value) => {
        if (_.isPlainObject(value)) {
          return this._keysToCamelCase(value);
        } else if (_.isArray(value)) {
          return _.map(value, this._keysToCamelCase);
        } else {
          return value;
        }
      });
    }
  }

}
