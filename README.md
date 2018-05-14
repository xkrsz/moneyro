# moneyro
Node.js library for interacting with Monero API.

[![npm version](https://badge.fury.io/js/moneyro.svg)](https://badge.fury.io/js/moneyro)
[![dependencies Status](https://david-dm.org/krszwsk/moneyro/status.svg)](https://david-dm.org/krszwsk/moneyro)

## Library not tested in production environment yet.

## Table of contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
  - [Running `monero-wallet-rpc`](#running-monero-wallet-rpc)
- [Usage](#usage)
- [API](#api)

## Installation
```
yarn add moneyro
```

## Prerequisites
`Wallet` needs a running `monero-wallet-rpc`, while `Daemon` connects to `monerod`.

Head to https://getmonero.org/downloads/ and download Command-Line tools for your platform.

### Running `monero-wallet-rpc`
1. Start your daemon:
```
./monerod --testnet
```
2. Start wallet RPC client
```
./monero-wallet-rpc \
  --testnet --rpc-bind-port 18082 \
  --wallet-dir <folder-for-your-wallets> \
  --disable-rpc-login \
  --log-level 4
```

And that's it, you're ready to use `moneyro`.

## Usage
### Wallet
```js
import { Wallet } from 'moneyro';

const wallet = new Wallet();

(async () => {
  try {
    await wallet.create('test-wallet', 'strongpassword');
    const response = await wallet.getAddress();
    console.log(response); // { address: '...', addresses: [ ... ] }
  } catch (err) {
    console.error(err);
  }
})();
```

### Daemon
```js
import { Daemon } from 'moneyro';

const daemon = new Daemon({
  hostname: 'testnet.xmrchain.net',
});

(async () => {
  try {
    const response = await daemon.getBlockCount();
    console.log(response); // { count: 1098883, status: 'OK' }
  } catch (err) {
    console.error(err);
  }
})();
```

## API
### Wallet
#### constructor([options])

##### options
Type: `Object`

###### hostname
Type: `string`<br>
Default: `'127.0.0.1'`

###### port
Type: `int`<br>
Default: `18082`

###### username
Type: `string`

###### password
Type: `string`


#### create(filename, password, [language])
Creates a new wallet. You need to have set the
argument "–wallet-dir" when launching monero-wallet-rpc to make this work.

##### filename
Type: `string`

##### password
Type: `string`

##### language
Type: `string`<br>
Default: `'English'`


#### open(filename, password)
Opens a wallet. You need to have set the
argument "–wallet-dir" when launching monero-wallet-rpc to make this work.

##### filename
Type: `string`

##### password
Type: `string`

#### getBalance()

##### Returns `Promise`:
###### balance
Type: `uint`

###### unlockedBalance
Type: `uint`

#### transfer(options)
Transfers monero to specified recipient(s).

##### options
Type: `Object`

###### destinations
Type: `array<{ amount: uint, address: string }>`

###### mixin
Type: `uint`

Number of outpouts from the blockchain to mix with (0 means no mixing).

###### unlockTime
Type: `uint`

Number of blocks before the monero can be spent (0 to not add a lock).

###### priority
Type: `uint`<br>
Options: 
- `0`
- `1`
- `2`
- `3`

###### getTxHex
Type: `boolean`

###### paymentId
Type: `string`<br>
Default: `''`

Random 32-byte/64-character hex string to identify a transaction.

###### getTxKey
Type: `boolean`<br>
Default: `false`

###### doNotRelay
Type: `boolean`<br>
Default: `false`

### Daemon
