'use strict';

import RPC from './RPC';
import * as methods from './daemonMethods';

/**
 * Daemon class.
 */
export default class Daemon extends RPC {

  /**
   * @param {string} hostname - Daemon host address.
   * @param {uint} port - Daemon port.
   */
  constructor({
    hostname = '127.0.0.1',
    port = 28081,
  }) {

    super({ hostname, port });
  }

  /**
   * @typedef {Object} BaseRPCResponse
   * @property {string} status - General RPC error code. "OK" means everything looks good.
   */

  /**
   * @typedef {BaseRPCResponse} GetBlockCountResponse
   * @property {int} count - Block count.
   */

  /**
   * @returns {Promise<GetBlockCountResponse>}
   */
  async getBlockCount() {

    return await this._request(methods.GET_BLOCK_COUNT);
  }

  /**
   *
   * @param {int} blockHeight - Block Height.
   *
   * @returns {Promise<string>} - block hash
   */
  async onGetBlockHash(blockHeight) {

    return await this._request(methods.ON_GET_BLOCK_HASH, [blockHeight]);
  }

  /**
   *
   * @typedef {BaseRPCResponse} GetBlockTemplateResponse
   * @property {string} blocktemplateBlob - Blob on which to try to mine a new block.
   * @property {uint} difficulty - Difficulty of next block.
   * @property {uint} height - Height on which to mine.
   * @property {string} prevHash - Hash of the most recent block on which to mine the next block.
   * @property {uint} reservedOffset - Reserved offset.
   */

  /**
   *
   * @param {string} walletAddress - Address of wallet to receive coinbase transactions if block is successfully mined.
   * @param {uint} reserveSize - Reserve size.
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
