'use strict';

import got from 'got';
import _ from 'lodash';

export default class RPC {

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

  async _request(method, params = {}) {

    return await got.post(this.apiUrl, this._getOptions(method, params));
  }

}
