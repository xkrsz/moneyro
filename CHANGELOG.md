# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- `RPC._keysToCamelCase()` implementation
- 

## [1.2.0] - 2018-05-03
### Added
- `Wallet.create()`
- `Wallet.open()`
- `Wallet.stop()`
- `Wallet.getPayments()`
- Deep converting key names in `RPC._keysToCamelCase()` method.

## [1.1.0] - 2018-05-01
### Added
- Wallet method definitions.
- `Wallet.getBalance()`
- `Wallet.getAddress()`
- `Wallet.getHeight()`
- `Wallet.transfer()`
- Wallet example usage.

### Changed
- Rename `RPC._request` to `RPC.request`, as it can be used for not implemented RPC methods.
