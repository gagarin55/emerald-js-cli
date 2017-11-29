var vorpal = require('vorpal')();
var chalk = require('chalk');

var handlers = require('./handlers');

const { Vault, JsonRpc, HttpTransport, VaultJsonRpcProvider } = require('emerald-js');

var local = 'http://localhost:1920';

var vault = new Vault(new VaultJsonRpcProvider(new JsonRpc(new HttpTransport(local))));


vorpal.command('listAccounts [chain]', 'Return the list of all accounts from the keystore')
    .option('-h, --show_hidden', 'Show hidden accounts')
    .types({
        string: ['_']
    })
    .action(function (args, callback) {
        return handlers.listAccounts(this, args, vault);
    });

vorpal.command('exportAccount <address> [chain]', 'Returns an account keyfile associated with the account')
    .types({ string: ['_'] })
    .action(function (args, callback) {
        return handlers.exportAccount(this, args, vault);
    });

vorpal.command('importMnemonic <mnemonic> <hdpath> <passphrase> [chain]', '')
    .types({ string: ['_'] })
    .action(function (args, callback) {
        return handlers.importMnemonic(this, args, vault);
    });

vorpal.command('generateMnemonic', '')
    .types({ string: ['_'] })
    .action(function (args, callback) {
        return handlers.generateMnemonic(this, args, vault);
    });

vorpal
    .delimiter('emerald-vault#')
    .show();