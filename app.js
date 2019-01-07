const bitcore = require('bitcore-lib')
const explorers = require('bitcore-explorers');
const insight = new explorers.Insight('https://testnet.decred.org'); // https://mainnet.decred.org/
const network = bitcore.Networks.dcrdtestnet // dcrdlivenet

// generate client pub/priv key
const clientPrivateKey = new bitcore.PrivateKey('f91b705c29978d7f5472201129f3edac61da67e4e2ec9dde1f6b989582321dbf', network)
const clientPublicKey = bitcore.PublicKey(clientPrivateKey)
const clientAddress = clientPublicKey.toAddress(network)

spend(5, 'TcsX4QyWV9GsWSHAWkJSJ6aUm1BxBB2tHxg')
async function spend(amount, toAddress) {
  const transaction = new bitcore
  .Transaction(network)
  .from(await getUnspentUtxos(clientAddress))
  .to(toAddress, amount * 100000000) // 100000000 atoms == 1 DCR
  .change(clientAddress)
  .sign(clientPrivateKey)
  console.log('\n\n spend', transaction)
}

function getUnspentUtxos(address) {
  return new Promise((res, rej) => {
    insight.getUnspentUtxos(address, (err, utxos) => {
      if (err) rej(err)
      res(utxos)
    })
  })
}
