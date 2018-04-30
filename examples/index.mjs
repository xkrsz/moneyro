'use strict';

import { Daemon } from '../src';

const daemon = new Daemon({
  hostname: 'testnet.xmrchain.net',
});

(async () => {
  try {
    const response = await daemon.getBlockCount();
    console.log(response);
  } catch (err) {
    console.error(err);
  }
})();
