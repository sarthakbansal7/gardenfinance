const { Assets: GardenAssets } = require('@gardenfi/orderbook');

const Assets = {
  bitcoin: GardenAssets.bitcoin.BTC,
  ethereum: GardenAssets.ethereum.WBTC,
  arbitrum: GardenAssets.ethereum_arbitrum.WBTC,
};

module.exports = { Assets };
