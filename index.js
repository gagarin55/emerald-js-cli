var vorpal = require('vorpal')();
var chalk = require('chalk');

var handlers = require('./handlers');

const { JsonRpc, EthRpc, HttpTransport, NodeChecker } = require('emerald-js');

var url = 'https://mewapi.epool.io';
var gastracker = 'https://api.gastracker.io/web3';
var infura = 'https://mainnet.infura.io';

var ethRpc = new EthRpc(new JsonRpc(new HttpTransport(infura)));
var checker = new NodeChecker(ethRpc);

function chainHandler(self) {
    return checker.getChain().then((result) => {
        self.log(result);
    });
};

function checkHandler(self) {
    return checker.check().then((result) => {
        self.log(result);
    });
}

vorpal.command('check', 'Check node')
    .action(function (args, callback) {
        return checkHandler(this);
    });

vorpal.command('chain', 'Get chain')
    .action(function (args, callback) {
        return chainHandler(this);
    });

vorpal.command('web3_clientVersion', 'Get client version')
    .action(function (args, callback) {
        return handlers.web3_clientVersion(this, ethRpc);
    });

vorpal.command('net_peerCount', 'Returns number of peers currently connected to the client')
    .action(function (args, callback) {
        return handlers.net_peerCount(this, ethRpc);
    });

vorpal.command('net_version', 'Returns the current network id')
    .action(function (args, callback) {
        return handlers.net_version(this, ethRpc);
    });

vorpal.command('eth_protocolVersion', 'Returns the current ethereum protocol version')
    .action(function (args, callback) {
        return handlers.eth_protocolVersion(this, ethRpc);
    });

vorpal.command('eth_getBalance <address>', 'Returns the balance of the account of given address')
    .types({ string: ['_'] })
    .action(function (args, callback) {
        return handlers.eth_getBalance(this, args, ethRpc);
    });

vorpal.command('eth_getTransactionCount <address> [blockNumber]', 'Returns the number of transactions sent from an address')
    .types({ string: ['_'] })
    .action(function (args, callback) {
        return handlers.eth_getTransactionCount(this, args, ethRpc);
    });

vorpal.command('eth_syncing', 'Returns an object with data about the sync status or false')
    .action(function (args, callback) {
       return handlers.eth_syncing(this, ethRpc);
    });

vorpal
    .delimiter('emerald#')
    .show();