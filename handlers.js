const { convert } = require('emerald-js');

function ethGetBalanceHandler(vorpal, args, ethRpc) {
    return ethRpc.eth.getBalance(args.address)
        .then(balance => vorpal.log(convert.toNumber(balance)))
        .catch(error => {
            vorpal.log(error.message);
        });
}

function ethSyncingHandler(vorpal, ethRpc) {
    return ethRpc.eth.syncing().then((result) => {
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
    eth_syncing: ethSyncingHandler,
    eth_protocolVersion: ethProtocolVersionHandler,
    eth_getTransactionCount: ethGetTransactionCountHandler,
    net_peerCount: netPeerCountHandler,
    net_version: netVersionHandler,
};