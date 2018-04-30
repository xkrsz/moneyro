'use strict';

import RPC from './RPC';

export default class Daemon extends RPC {

  constructor({
    hostname = '127.0.0.1',
    port = 28081,
  }) {

    super({ hostname, port });
  }

}
