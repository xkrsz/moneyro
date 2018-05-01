'use strict';

import { Wallet } from '../src';

const wallet = new Wallet();

(async () => {
  try {
    const response = await wallet.getHeight();
    console.log(response);
  } catch (err) {
    console.error(err);
  }
})();
