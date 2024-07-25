const { Orderbook } = require('@gardenfi/orderbook');
const { TESTNET_ORDERBOOK_API } = require('../utils/constants');

const orderbookInit = async (signer) => {
  const orderbook = await Orderbook.init({
    url: TESTNET_ORDERBOOK_API,
    signer,
  });

  return orderbook;
};

module.exports = { orderbookInit };
