import Web3 from 'web3';
import { EventHandler } from './EventManager';
import detectEthereumProvider from '@metamask/detect-provider';
import { JKT_TOKEN_ADDRESS, MINER_TOKEN_ADDRESS, TEST_MINER_TOKEN_ADDRESS } from '@/const/address/tokenAddress';

const JKT_ABI = require('../const/abi/jkt_abi.json');
const MINER_ABI = require('../const/abi/miner_abi.json');

export default class Web3Provider {
  private static instance: Web3Provider;
  private prepared: boolean = false;
  private provider: any;
  private currentAccount: any;
  private jktContract: any;
  private minerContract: any;
  private eventManager: any;

  public constructor() {
    this.eventManager = EventHandler;
  }

  public static getInstance(): Web3Provider {
    if (!Web3Provider.instance) {
      Web3Provider.instance = new Web3Provider();
    }
    return Web3Provider.instance;
  }

  /**
   * prepare all need data
   */
  private async prepareConnectWallet() {
    if (!this.prepared) {
      const web3Provider = Web3Provider.getInstance();
      const walletState = await web3Provider.checkWallet();
      if (walletState) {
        web3Provider.registerGlobalListener();
        await web3Provider.requestAccount();

        const currentChainId = await web3Provider.getChainId();
        const isBscChain = web3Provider.checkChainId(currentChainId);
        if (isBscChain) {
          console.log('Current on BSC chain');
          web3Provider.initContracts();
          this.prepared = true;
        } else {
          console.log('Please change to BSC chain');
        }
      }
    }
  }

  /**
   *  register listener
   */
  private registerGlobalListener() {
    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already connected.
    this.provider.on('accountsChanged', (accounts: Array<string>) => {
        if (accounts.length !== 0) {
          const [a] = accounts;
          console.info(`change account: ${a}`);
          this.eventManager.emit('accountsChanged');
        }
      },
    );

    // chainChanged event
    this.provider.on('chainChanged', (chainId: string) => {
      console.info(`change chainId: ${chainId}`);
      this.checkChainId(chainId);
    });
  }

  /**
   * check whether install wallet
   */
  private async checkWallet() {
    this.provider = await detectEthereumProvider();

    try {
      if (this.provider) {
        console.info('Ethereum successfully detected!');
        // From now on, this should always be true:
        // provider === window.ethereum
        return true;
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!');
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * login wallet
   */
  private async requestAccount() {
    try {
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      const [a] = accounts;
      this.currentAccount = a;
      console.info(`currentAccount: ${this.currentAccount}`);
    } catch (error) {
      this.currentAccount = undefined;
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(error);
    }
  }

  /**
   * initialize contract
   */
  private initContracts() {
    const web3 = new Web3();
    web3.setProvider(this.provider);

    this.jktContract = new web3.eth.Contract(JKT_ABI, JKT_TOKEN_ADDRESS);
    this.minerContract = new web3.eth.Contract(MINER_ABI, TEST_MINER_TOKEN_ADDRESS);

    console.log(this.jktContract, this.minerContract);
  }

  /**
   * get chainId
   */
  private async getChainId() {
    const chainId = await this.provider.request({
      method: 'eth_chainId',
    });
    console.info(`chainId: ${chainId}`);
    return chainId;
  }

  /**
   * check whether current chain is BSC chain
   * @param chainId
   */
  private checkChainId(chainId: any) {
    // 0x61 is testNet
    // 0x38 is BSC, will change to 0x38 in the future
    if (chainId !== '0x61') {
      this.eventManager.emit('NotBscChain');
      return false;
    } else {
      return true;
    }
  }

  /**
   * check whether has parent
   */
  public async getParentInfo() {
    await this.prepareConnectWallet();
    const parentAddr = await this.minerContract.methods.getParent(this.currentAccount).call();
    console.log(parentAddr);
    return parentAddr;
  }

  /**
   * get user account information
   * eUserLevel = 1; // 用户vip等级
   * eSelfHash = 2; // 用户自己算力
   * eTeamHash = 3; // 用户团队算力
   * ePendingCoin = 4; // 用户待领取收益
   * eTakedCoin = 5;
   * eBurnJKT = 6;
   */
  public async getUserInfo() {
    await this.prepareConnectWallet();
    const res = await this.minerContract.methods.getUserInfoEx(this.currentAccount).call();
    console.log(res);
    const [, eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT] = res;
    return {
      eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT,
    };
  }

  /**
   * get JKT balance
   */
  public async getJKTBalance() {
    const bal = await this.jktContract.methods.balanceOf(this.currentAccount).call();
    console.info(`balance: ${bal}`);
  }

  /**
   * get JKT decimals
   */
  public async getJKTDecimals() {
    const decimals = await this.jktContract.methods.decimals().call();
    console.info(`decimals: ${decimals}`);
  }

  public async getJKTTotal() {
    const total = await this.jktContract.methods.totalSupply().call();
    console.info(`total: ${total}`);
  }
}
