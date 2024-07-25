const bitcoin = require("bitcoinjs-lib");
const { fromBase58Check } = require("bitcoinjs-lib/src/address");

const BuildAtomicSwapScript = (secretHash, redeemerAddress, initiatorAddress, expiry, network) => {
  const AtomicSwapScript = bitcoin.script.fromASM(`
        OP_IF
            OP_SHA256
            ${secretHash}
            OP_EQUALVERIFY
            OP_DUP
            OP_HASH160
            ${fromBase58Check(redeemerAddress).hash.toString("hex")}
        OP_ELSE
            ${bitcoin.script.number.encode(expiry).toString("hex")}
            OP_CHECKSEQUENCEVERIFY
            OP_DROP
            OP_DUP
            OP_HASH160
            ${fromBase58Check(initiatorAddress).hash.toString("hex")}
        OP_ENDIF
        OP_EQUALVERIFY
        OP_CHECKSIG
    `.trim().replace(/\s+/g, " "));
  const p2wsh = bitcoin.payments.p2wsh({
    redeem: {
      output: AtomicSwapScript,
    },
    network,
  });
  if (!p2wsh.address) throw new Error("Unable to generate atomic-swap script p2wsh address");
  return {
    AtomicSwapScript,
    address: p2wsh.address,
  };
};

module.exports = { BuildAtomicSwapScript };
