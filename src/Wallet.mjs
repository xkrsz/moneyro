'use strict';

import RPC from './RPC';

export default class Wallet extends RPC {

  username;
  password;

  constructor({
    hostname = '127.0.0.1',
    port = 18082,
    username = '',
    password = ''
  } = {}) {

    super({ hostname, port });
    this.username = username;
    this.password = password;
  }

  _getOptions(method, params = {}) {

    let options = super._getOptions(method, params);
    if (this.username !== '' && this.password !== '') {
      options.auth = {
        user: this.username,
        pass: this.password,
        sendImmediately: false,
      };
    }

    return options;
  }

}
