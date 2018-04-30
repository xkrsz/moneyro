'use strict';

import got from 'got';
import _ from 'lodash';

export default class Wallet {

  hostname = '127.0.0.1';
  port = 18082;
  username;
  password;

  get apiUrl() { return `http://${this.hostname}:${this.port}/json_rpc`; }

  constructor({
    hostname = '127.0.0.1',
    port = 18082,
    username = '',
    password = '',
  } = {}) {

    this.hostname = hostname;
    this.port = port;
    this.username = username;
    this.password = password;
  }

  async _request(method, params = {}) {

    let options = {
      forever: true,
      json: {
        jsonrpc: '2.0',
        id: '0',
        method: method,
      }
    };

    if (!_.isEmpty(params)) options.json.params = params;

    if (this.username !== '' && this.password !== '') {
      options.auth = {
        user: this.username,
        pass: this.password,
        sendImmediately: false,
      };
    }

    return await got.post(this.apiUrl, options);
  }

}
