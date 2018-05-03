'use strict';

import RPC from './RPC';
import * as methods from './walletMethods';

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

  /**
   * @typedef {Object} GetBalanceResponse
   * @property {uint} balance - The total balance of the current monero-wallet-rpc in session.
   * @property {uint} unlockedBalance - Unlocked funds are those funds that are sufficiently deep enough
   * in the Monero blockchain to be considered safe to spend.
   */

  /**
   * Return the wallet's balance.
   *
   * @return {Promise<GetBalanceResponse>}
   */
  async getBalance() {

    return await this.request(methods.GET_BALANCE);
  }

  /**
   * @typedef {Object} GetAddressResponse
   * @property {string} address - The 95-character hex address string of the monero-wallet-rpc in session.
   */

  /**
   * Returns the wallet's current block height.
   *
   * @return {Promise<GetAddressResponse>}
   */
  async getAddress() {
    return await this.request(methods.GET_ADDRESS);
  }

  /**
   * @typedef {Object} GetHeightResponse
   * @property {uint} - The current monero-wallet-rpc's blockchain height. If the wallet has been offline
   * for a long time, it may need to catch up with the daemon.
   */

  /**
   *
   * @return {Promise<GetHeightResponse>}
   */
  async getHeight() {

    return await this.request(methods.GET_HEIGHT);
  }

  /**
   * @typedef {Object} Destination
   * @property {uint} amount - Amount to send to each destination, in atomic units.
   * @property {string} address - Destination public address.
   */

  /**
   * @typedef {array<Destination>} Destinations
   */

  /**
   * @typedef {Object} TransferResponse
   * @property {int} fee
   * @property {string} txHash
   * @property {string} txKey
   * @property {string} [txBlob]
   */

  // noinspection JSValidateJSDoc
  /**
   * Send monero to a number of recipients.
   *
   * @param {Destinations} destinations - Array of destinations to receive XMR.
   * @param {uint} mixin - Number of outpouts from the blockchain to mix with (0 means no mixing).
   * @param {uint} unlockTime - Number of blocks before the monero can be spent (0 to not add a lock).
   * @param {0|1|2|3} priority
   * @param {boolean} getTxHex
   * @param {string} [paymentId] - Random 32-byte/64-character hex string to identify a transaction.
   * @param {boolean} [getTxKey]
   * @param {boolean} [doNotRelay]
   *
   * @returns {Promise<TransferResponse>}
   */
  async transfer({
    destinations,
    mixin,
    unlockTime,
    priority,
    getTxHex,
    paymentId = '',
    getTxKey = false,
    doNotRelay = false,
  }) {

    const params = {
      destinations,
      fee: 0,
      mixin,
      unlock_time: unlockTime,
      payment_id: paymentId,
      get_tx_key: getTxKey,
      priority,
      do_not_relay: doNotRelay,
      get_tx_hex: getTxHex,
    };

    return await this.request(methods.TRANSFER, params);
  }

  /**
   * Create a new wallet. You need to have set the
   * argument "–wallet-dir" when launching monero-wallet-rpc to make this work.
   * 
   * @param {string} fileName - File name.
   * @param {string} password - Password.
   * @param {string} language Language for your wallets' seed.
   * 
   * @returns {Promise<{}>}
   */
  async create(fileName, password, language) {

    const params = {
      filename: fileName,
      password,
      language,
    };

    return await this.request(methods.CREATE_WALLET, params);
  }

  /**
   * Open a wallet. You need to have set the
   * argument "–wallet-dir" when launching monero-wallet-rpc to make this work.
   * 
   * @param {string} fileName - File name.
   * @param {string} password - Password.
   * 
   * @returns {Promise<{}>}
   */
  async open(fileName, password) {

    const params = {
      fileName: filename,
      password,
    };

    return await this.request(methods.OPEN_WALLET, params);
  }

  /**
   * Stops the wallet, storing the current state.
   * 
   * @returns {Promise<{}>}
   */
  async stop() {

    return await this.request(methods.STOP_WALLET);
  }

  /**
   * @typedef {Object} Payment
   * @property {string} paymentId
   * @property {string} txHash
   * @property {uint} amount
   * @property {uint} blockHeight
   * @property {uint} unlockTime
   */

  /**
   * @typedef {Object} GetPaymentsResponse
   * @property {array<Payment>} payments
   */

  /**
   * Get a list of incoming payments using a given payment id.
   * 
   * @param paymentId - Payment id.
   * 
   * @returns {Promise<GetPaymentsResponse>}
   */
  async getPayments(paymentId) {

    const params = {
      payment_id: paymentId,
    };

    return await this.request(methods.STORE, params);
  }

}
