'use strict';

import RPC from './RPC';
import * as methods from './daemonMethods';

export default class Daemon extends RPC {

  constructor({
    hostname = '127.0.0.1',
    port = 28081,
  }) {

    super({ hostname, port });
  }

  /**
   * @typedef {Object} BaseRPCResponse
   * @property {string} status
   */

  /**
   *
   * @typedef {BaseRPCResponse} GetBlockCountResponse
   * @property {int} count
   *
   * @returns {Promise<GetBlockCountResponse>}
   */
  async getBlockCount() {

    return await this._request(methods.GET_BLOCK_COUNT);
  }

  /**
   *
   * @param {int} blockHeight
   *
   * @returns {Promise<string>} - block hash
   */
  async onGetBlockHash(blockHeight) {

    return await this._request(methods.ON_GET_BLOCK_HASH, [blockHeight]);
  }

  /**
   *
   * @typedef {BaseRPCResponse} GetBlockTemplateResponse
   * @property {string} blocktemplateBlob
   * @property {uint} difficulty
   * @property {uint} height
   * @property {string} prevHash
   * @property {uint} reservedOffset
   *
   *
   * @param {string} walletAddress
   * @param {uint} reserveSize
   *
   * @returns {Promise<GetBlockTemplateResponse>}
   */
  async getBlockTemplate(walletAddress, reserveSize) {

    return await this._request(methods.GET_BLOCK_TEMPLATE, {
      wallet_address: walletAddress,
      reserve_size: reserveSize,
    });
  }

}
