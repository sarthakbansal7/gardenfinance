const { Actions, parseStatus } = require('@gardenfi/orderbook');
const { GardenJS } = require("@gardenfi/core");

const subscribeOrders = async (orderbook, garden, evmWallet, orderId) => {
  const account = await evmWallet.getAddress();
  orderbook.subscribeOrders(account, async (orders) => {
    const filteredOrder = orders.filter((order) => order.ID === orderId);
    if (filteredOrder.length === 0) return;

    const order = filteredOrder[0];
    const action = parseStatus(order);

    if (action === Actions.UserCanInitiate || action === Actions.UserCanRedeem) {
      const swapper = garden.getSwap(order);
      const swapOutput = await swapper.next();
      console.log(`Completed Action ${swapOutput.action} with transaction hash: ${swapOutput.output}`);
    }
  });
};

const unsubscribeOrders = (orderbook) => {
  orderbook.unsubscribeOrders();
};

module.exports = { subscribeOrders, unsubscribeOrders };
