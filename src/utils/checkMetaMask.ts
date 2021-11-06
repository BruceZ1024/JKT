import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

let provider: any;
let currentAccount: any;
async function getChainId() {
  const chainId = await provider.request({
    method: 'eth_chainId',
  });
  console.info(`chainId: ${chainId}`);
}

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts: any) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    const [a] = accounts;
    currentAccount = a;
    console.info(`currentAccount: ${currentAccount}`);
  }
}

async function getAccount() {
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    const [a] = accounts;
    currentAccount = a;
    console.info(`currentAccount: ${currentAccount}`);
  } catch (error) {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(error);
  }

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already connected.
  provider.on('accountsChanged', handleAccountsChanged);
}

async function checkMetaMask() {
  const web3 = new Web3();
  console.log(web3);
  provider = await detectEthereumProvider();

  if (provider) {
    console.info('Ethereum successfully detected!');

    // From now on, this should always be true:
    // provider === window.ethereum
    await getChainId();
    await getAccount();
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error('Please install MetaMask!');
  }
}

export default checkMetaMask;
