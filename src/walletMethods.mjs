'use strict';

// Definition of all wallet methods: https://getmonero.org/resources/developer-guides/wallet-rpc.html

export const GET_BALANCE = 'getbalance';
export const GETADDRESS = 'getaddress';
export const GETHEIGHT = 'getheight';
export const TRANSFER = 'transfer';
export const TRANSFER_SPLIT = 'transfer_split';
export const SWEEP_DUST = 'sweep_dust';
export const SWEEP_ALL = 'sweep_all';
export const STORE = 'store';
export const GET_PAYMENTS = 'get_payments';
export const GET_BULK_PAYMENTS = 'get_bulk_payments';
export const GET_TRANSFERS = 'get_transfers';
export const GET_TRANSFER_BY_TXID = 'get_transfer_by_txid';
export const INCOMING_TRANSFERS = 'incoming_transfers';
export const QUERY_KEY = 'query_key';
export const MAKE_INTEGRATED_ADDRESS = 'make_integrated_address';
export const SPLIT_INTEGRATED_ADDRESS = 'split_integrated_address';
export const STOP_WALLET = 'stop_wallet';
export const MAKE_URI = 'make_uri';
export const PARSE_URI = 'parse_uri';
export const RESCAN_BLOCKCHAIN = 'rescan_blockchain';
export const SET_TX_NOTES = 'set_tx_notes';
export const GET_TX_NOTES = 'get_tx_notes';
export const SIGN = 'sign';
export const VERIFY = 'verify';
export const EXPORT_KEY_IMAGES = 'export_key_images';
export const IMPORT_KEY_IMAGES = 'import_key_images';
export const GET_ADDRESS_BOOK = 'get_address_book';
export const ADD_ADDRESS_BOOK = 'add_address_book';
export const DELETE_ADDRESS_BOOK = 'delete_address_book';
export const RESCAN_SPENT = 'rescan_spent';
export const START_MINING = 'start_mining';
export const STOP_MINING = 'stop_mining';
export const GET_LANGUAGES = 'get_languages';
export const CREATE_WALLET = 'create_wallet';
export const OPEN_WALLET = 'open_wallet';
