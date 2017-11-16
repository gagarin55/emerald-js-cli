const { convert } = require('emerald-js');


function listAccountsHandler(vorpal, args, vault) {
    vorpal.log(args);
    return vault.listAccounts(args.chain, args.options.show_hidden)
        .then(result => vorpal.log(result))
        .catch (error => vorpal.log(error.message));
}

function generateMnemonicHandler(vorpal, args, vault) {
    return vault.generateMnemonic()
        .then(result => vorpal.log(result))
        .catch (error => vorpal.log(error.message));
}

function exportAccountHandler(vorpal, args, vault) {
    vorpal.log(args);
    return vault.exportAccount(args.address, args.chain)
        .then(result => vorpal.log(result))
        .catch (error => vorpal.log(error.message));
}

function importMnemonicHandler(vorpal, args, vault) {
    return vault.importMnemonic(args.passphrase, '', '', args.mnemonic, args.chain)
        .then(result => vorpal.log(result))
        .catch (error => vorpal.log(error.message));
}

module.exports = {
    listAccounts: listAccountsHandler,
    exportAccount: exportAccountHandler,
    generateMnemonic: generateMnemonicHandler,
    importMnemonic: importMnemonicHandler,
};