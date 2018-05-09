'use strict';

import { Wallet } from '../src';

const wallet = new Wallet({
  username: 'testusername',
  password: 'testpassword',
});

(async () => {
  try {
    await wallet.create('testwallet', 'testpassword');
    await wallet.open('testwallet', 'testpassword');
    const response = await wallet.getAddress();
    console.log(response);
  } catch (err) {
    console.error(err);
  }
})();
