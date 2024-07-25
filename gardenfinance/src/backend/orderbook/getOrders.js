const { Orderbook } = require('@gardenfi/orderbook');

const getOrders = async (orderbook, address) => {
  const orders = await orderbook.getOrders(address, {
    verbose: true,
    taker: false,
  });
  return orders;
};

module.exports = { getOrders };
