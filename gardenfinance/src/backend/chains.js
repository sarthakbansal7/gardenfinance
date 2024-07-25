const { Chains: GardenChains } = require('@gardenfi/orderbook');

const Chains = {
  bitcoin: GardenChains.bitcoin,
  ethereum: GardenChains.ethereum,
  arbitrum: GardenChains.ethereum_arbitrum,
};

module.exports = { Chains };
