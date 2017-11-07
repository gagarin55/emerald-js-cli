const { convert } = require('emerald-js');

function ethGetBalanceHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getBalance(args.address)
        .then(balance => vorpal.log(convert.toNumber(balance)))
        .catch(error => {
            vorpal.log(error.message);
        });
}

function ethGetBlockByNumberHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getBlockByNumber(args.blockNumber, args.full)
        .then(block => vorpal.log(block))
        .catch (error => vorpal.log(error.message));
}

function ethBlockNumberHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.blockNumber()
        .then(block => vorpal.log(block))
        .catch(error => vorpal.log(error.message));
}

function ethGetTransactionByHashHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getTransactionByHash(args.hash)
        .then(tx => vorpal.log(tx))
        .catch (error => vorpal.log(error.message));
}

function ethGetTransactionReceiptHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getTransactionReceipt(args.hash)
        .then(tx => vorpal.log(tx))
        .catch (error => vorpal.log(error.message));
}

function ethSyncingHandler(vorpal, ethRpc) {
    return ethRpc.eth.syncing().then((result) => {
        vorpal.log(result);
    });
}

function ethGasPriceHandler(vorpal, ethRpc) {
    return ethRpc.eth.gasPrice().then((result) => {
        vorpal.log(result);
    });
}


function ethProtocolVersionHandler(vorpal, ethRpc) {
    return ethRpc.eth.protocolVersion().then((result) => {
        vorpal.log(result);
    });
}

function ethGetTransactionCountHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getTransactionCount(args.address, args.blockNumber).then((result) => {
        vorpal.log(convert.toNumber(result));
    });
}

function web3ClientVersionHandler(vorpal, ethRpc) {
    return ethRpc.web3.clientVersion().then((result) => {
        vorpal.log(result);
    });
}

function netPeerCountHandler(vorpal, ethRpc) {
    return ethRpc.net.peerCount().then((count) => {
        vorpal.log(convert.toNumber(count));
    });
}

function netVersionHandler(vorpal, ethRpc) {
    return ethRpc.net.version().then((version) => {
        vorpal.log(version);
    });
}

module.exports = {
    web3_clientVersion: web3ClientVersionHandler,
    eth_getBalance: ethGetBalanceHandler,
    eth_getBlockByNumber: ethGetBlockByNumberHandler,
    eth_syncing: ethSyncingHandler,
    eth_gasPrice: ethGasPriceHandler,
    eth_protocolVersion: ethProtocolVersionHandler,
    eth_getTransactionCount: ethGetTransactionCountHandler,
    eth_getTransactionByHash: ethGetTransactionByHashHandler,
    eth_getTransactionReceipt: ethGetTransactionReceiptHandler,
    net_peerCount: netPeerCountHandler,
    net_version: netVersionHandler,
    eth_blockNumber: ethBlockNumberHandler,
};