const { Orderbook, Assets } = require('@gardenfi/orderbook');
const { sha256 } = require('ethers');
const crypto = require('crypto');

const createOrder = async (orderbook, wallet, sendAddress) => {
  const sendAmount = 0.001 * 1e8;
  const receiveAmount = sendAmount - 0.03 * sendAmount;
  const secret = crypto.randomBytes(32).toString('hex');
  const secretHash = sha256(secret);

  const orderId = await orderbook.createOrder({
    fromAsset: Assets.bitcoin_testnet.BTC,
    toAsset: Assets.ethereum_sepolia.WBTC,
    sendAddress,
    receiveAddress: await wallet.getAddress(),
    sendAmount: sendAmount.toString(),
    receiveAmount: receiveAmount.toString(),
    secretHash,
  });

  return orderId;
};

module.exports = { createOrder };
