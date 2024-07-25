const { BitcoinNetwork, BitcoinWallet, BitcoinProvider, EVMWallet } = require("@catalogfi/wallets");
const { Orderbook, Chains, Assets, Actions, parseStatus } = require("@gardenfi/orderbook");
const { GardenJS } = require("@gardenfi/core");
const { JsonRpcProvider, Wallet } = require("ethers");
const { orderbookInit } = require('./orderbook/orderbookInit');
const { subscribeOrders, unsubscribeOrders } = require('./orderbook/subscribeOrders');
const { TESTNET_ORDERBOOK_API } = require('./utils/constants');

const initiateSwap = async (privateKey, sendAmount) => {
  const bitcoinWallet = BitcoinWallet.fromPrivateKey(privateKey, new BitcoinProvider(BitcoinNetwork.Mainnet));
  const signer = new Wallet(privateKey, new JsonRpcProvider("https://rpc.ankr.com/eth"));
  const evmWallet = new EVMWallet(signer);

  const orderbook = await orderbookInit(signer);

  const wallets = {
    [Chains.bitcoin]: bitcoinWallet,
    [Chains.ethereum]: evmWallet,
  };

  const garden = new GardenJS(orderbook, wallets);

  const receiveAmount = (1 - 0.3 / 100) * sendAmount;

  const orderId = await garden.swap(Assets.bitcoin.BTC, Assets.ethereum.WBTC, sendAmount, receiveAmount);

  await subscribeOrders(orderbook, garden, evmWallet, orderId);

  // To unsubscribe from order updates after some time (example: 5 minutes)
  setTimeout(() => {
    unsubscribeOrders(orderbook);
    console.log(`Unsubscribed from order updates for order ID: ${orderId}`);
  }, 300000); // 300000ms = 5 minutes

  return { orderId, message: 'Swap initiated' };
};

module.exports = { initiateSwap };
