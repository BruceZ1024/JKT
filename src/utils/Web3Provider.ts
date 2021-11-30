import Web3 from 'web3';
import { ethers } from 'ethers';
import { EventHandler } from './EventManager';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  JKT_TOKEN_ADDRESS,
  MINER_TOKEN_ADDRESS,
  BSC_CHAIN_ID,
} from '@/const/address/tokenAddress';
import { Toast } from 'vant';

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
  private readonly jktTokenAddress: string;
  private readonly minerTokenAddress: string;
  // BSC chainId is '0x38'
  private readonly bscChainId: string;

  public constructor() {
    this.eventManager = EventHandler;
    this.jktTokenAddress = JKT_TOKEN_ADDRESS;
    this.minerTokenAddress = MINER_TOKEN_ADDRESS;
    this.bscChainId = BSC_CHAIN_ID;
  }

  public static getInstance(): Web3Provider {
    if (!Web3Provider.instance) {
      Web3Provider.instance = new Web3Provider();
    }
    return Web3Provider.instance;
  }

  public getEventManager() {
    if (!this.eventManager) {
      this.eventManager = EventHandler;
    }
    return this.eventManager;
  }

  /**
   * prepare all need data
   */
  private async prepareConnectWallet() {
    if (!this.prepared) {
      const web3Provider = Web3Provider.getInstance();
      const hasWallet = await web3Provider.checkWallet();
      if (hasWallet) {
        web3Provider.registerGlobalListener();
        // ask user to connect wallet
        await web3Provider.requestAccount();

        const currentChainId = await web3Provider.getChainId();
        const isBscChain = web3Provider.checkChainId(currentChainId);
        if (isBscChain) {
          web3Provider.initContracts();
          this.prepared = true;
        } else {
          Toast.fail('Please change to BSC chain!');
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
        this.prepared = false;
        this.eventManager.emit('accountsChanged');
        if (accounts.length !== 0) {
          const [a] = accounts;
          // console.info(`change account: ${a}`);
        }
      },
    );

    // chainChanged event
    this.provider.on('chainChanged', (chainId: string) => {
      // console.info(`change chainId: ${chainId}`);
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
        // console.info('Ethereum successfully detected!');
        // From now on, this should always be true:
        // provider === window.ethereum
        return true;
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        Toast.fail('Please install MetaMask!');
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * wake up wallet to request account
   */
  private async requestAccount() {
    try {
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      const [a] = accounts;
      this.currentAccount = a;
      // console.info(`currentAccount: ${this.currentAccount}`);
    } catch (error) {
      this.currentAccount = undefined;
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
    }
  }

  /**
   * initialize contract
   */
  private initContracts() {
    const web3 = new Web3();
    web3.setProvider(this.provider);

    this.jktContract = new web3.eth.Contract(JKT_ABI, this.jktTokenAddress);
    this.minerContract = new web3.eth.Contract(MINER_ABI, this.minerTokenAddress);
  }

  /**
   * get chainId
   */
  private async getChainId() {
    const chainId = await this.provider.request({
      method: 'eth_chainId',
    });
    // console.info(`current chainId: ${chainId}`);
    return chainId;
  }

  /**
   * check whether current chain is BSC chain
   * @param chainId
   */
  private checkChainId(chainId: string) {
    // 0x61 is testNet
    // 0x38 is BSC, will change to 0x38 in the future
    if (chainId !== this.bscChainId) {
      this.prepared = false;
      this.eventManager.emit('NotBscChain');
      return false;
    } else {
      return true;
    }
  }

  public async checkIsBSCChain() {
    try {
      await this.prepareConnectWallet();
      const currentChainId = await this.getChainId();
      return this.checkChainId(currentChainId);
    } catch (e) {
      return false;
    }

  }

  /**
   * create new contract based on provided lpToken address
   * @param lpToken
   */
  public async createLpTokenContract(lpToken: string) {
    await this.prepareConnectWallet();
    const web3 = new Web3();
    web3.setProvider(this.provider);
    return new web3.eth.Contract(JKT_ABI, lpToken);
  }

  /**
   * check account whether has parent
   */
  public async getParentInfo() {
    try {
      await this.prepareConnectWallet();
      const parentAddr = await this.minerContract.methods.getParent(this.currentAccount).call();
      // console.info(`getParent: ${parentAddr}`);
      return parentAddr;
    } catch (e) {
      return false;
    }
  }

  /**
   * bind parent account with current account
   * @param parentAccount
   */
  public async bindParentAccount(parentAccount: string) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.bindParent(parentAccount).send({ from: this.currentAccount });
      // console.info(`bindParentAccount: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
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
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.getUserInfoEx(this.currentAccount).call();
      // console.info(`getUserInfoEx: ${JSON.stringify(res)}`);
      const [eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT] = res;
      return {
        eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT,
      };
    } catch (e) {
      return false;
    }
  }

  /**
   * get hash information
   * eTotalHashRate = 1; // 总算力
   * eTotalLpHashRate = 2; // 总质押的算力
   * eStartBlock = 3;
   * eLpBurn = 4; // 质押burn的JKT
   * eVipBurn = 5; // 买VIP burn的JKT
   * eLastUpdateBlock = 6;
   * eOneShareGet = 7;
   * eOneShareScale = 8;
   * eTotalMint = 9; // 总发放的收益
   * eThresholdMutiple = 10;
   */
  public async getHashInformation() {
    await this.prepareConnectWallet();
    const res = await this.minerContract.methods.getHashInfo().call();
    // console.info(`getHashInfo: ${JSON.stringify(res)}`);
    const [eTotalHashRate, eTotalLpHashRate, eStartBlock, eLpBurn, eVipBurn, eLastUpdateBlock, eOneShareGet, eOneShareScale, eTotalMint, eThresholdMutiple] = res;
    return {
      eTotalHashRate,
      eTotalLpHashRate,
      eStartBlock,
      eLpBurn,
      eVipBurn,
      eLastUpdateBlock,
      eOneShareGet,
      eOneShareScale,
      eTotalMint,
      eThresholdMutiple,
    };
  }

  /**
   * calculate the price of update vip
   * @param updateLevel
   */
  public async calculateVipPrice(updateLevel: number) {
    try {
      await this.prepareConnectWallet();
      const price = await this.minerContract.methods.getVipPrice(this.currentAccount, updateLevel).call();
      // console.info(`getVipPrice: ${price}`);
      return price;
    } catch (e) {
      return false;
    }
  }

  /**
   * upgrade vip level, newLevel must be greater than current level
   * @param newLevel
   */
  public async upgradeVip(newLevel: number) {
    try {
      await this.prepareConnectWallet();
      const result = await this.checkAllowance(this.jktContract);
      if (result === '0') {
        if (!await this.getApprove(this.jktContract)) {
          return false;
        }
      }
      const res = await this.minerContract.methods.buyVip(newLevel).send({ from: this.currentAccount });
      // console.info(`buyVip: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }

  /**
   * get exchange for 1 USDT equal how much JKT
   */
  public async getExchangeOfUsdtToJkt() {
    try {
      await this.prepareConnectWallet();
      const exchange = await this.minerContract.methods.getExchangeCountOfOneUsdt(this.jktTokenAddress).call();
      // console.info(`getExchangeCountOfOneUsdt: ${exchange}`);
      return exchange;
    } catch (e) {
      return undefined;
    }
  }


  /**
   * get JKT balance
   */
  public async getJKTBalance() {
    try {
      await this.prepareConnectWallet();
      const bal = await this.jktContract.methods.balanceOf(this.currentAccount).call();
      // console.info(`balance: ${bal}`);
      return bal;
    } catch (e) {
      return false;
    }
  }

  /**
   * get JKT decimals
   */
  public async getJKTDecimals() {
    try {
      await this.prepareConnectWallet();
      const decimals = await this.jktContract.methods.decimals().call();
      // console.info(`decimals: ${decimals}`);
      return decimals;
    } catch (e) {
      return false;
    }
  }

  /**
   * get JKT totalSupply
   */
  public async getJKTTotal() {
    try {
      await this.prepareConnectWallet();
      const total = await this.jktContract.methods.totalSupply().call();
      // console.info(`total: ${total}`);
      return total;
    } catch (e) {
      return false;
    }
  }

  /**
   * get balance of provided lpToken
   */
  public async getBalance(contract) {
    try {
      await this.prepareConnectWallet();
      const bal = await contract.methods.balanceOf(this.currentAccount).call();
      // console.info(`balance: ${bal}`);
      return bal;
    } catch (e) {
      return false;
    }
  }

  /**
   * get the decimals of provided lpToken
   */
  public async getDecimals(contract) {
    try {
      await this.prepareConnectWallet();
      const decimals = await contract.methods.decimals().call();
      // console.info(`decimals: ${decimals}`);
      return decimals;
    } catch (e) {
      return false;
    }
  }

  /**
   * get the symbol of provided lpToken
   * @param contract
   */
  public async getSymbol(contract) {
    try {
      await this.prepareConnectWallet();
      const symbol: string = await contract.methods.symbol().call();
      // console.info(`symbol: ${symbol}`);
      return symbol;
    } catch (error) {
      return '';
    }
  }

  /**
   * check allowance of provided lpToken
   */
  public async checkAllowance(contract) {
    try {
      await this.prepareConnectWallet();
      const allowance: string = await contract.methods.allowance(this.currentAccount, this.minerTokenAddress).call();
      // console.info(`allowance: ${allowance}`);
      return allowance;
    } catch (error) {
      return '0';
    }
  }

  /**
   * get approve permission of provided lpToken
   */
  public async getApprove(contract) {
    try {
      await this.prepareConnectWallet();
      const res = await contract.methods.approve(this.minerTokenAddress, ethers.constants.MaxUint256).send({ from: this.currentAccount });
      // console.info(`approve: ${JSON.stringify(res)}`);
      return res;
    } catch (error) {
      return false;
    }
  }

  /**
   * get DeFi earning amount
   */
  public async getDefiEarning() {
    try {
      await this.prepareConnectWallet();
      const reward = await this.minerContract.methods.getPendingReward(this.currentAccount).call();
      // console.info(`getPendingReward: ${reward}`);
      return reward;
    } catch (e) {
      return false;
    }
  }

  /**
   * claimed DeFi earning rewards
   */
  public async withdrawFarmReward() {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.withdrawLpReward().send({ from: this.currentAccount });
      // console.info(`withdrawLpReward: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }


  /**
   * get all of farm LpToken list
   */
  public async getFarmList() {
    try {
      await this.prepareConnectWallet();
      const lpTokenList = await this.minerContract.methods.getPools().call();
      // console.info(`getPools: ${lpTokenList}`);
      return lpTokenList;
    } catch (e) {
      return [];
    }
  }


  /**
   * get information of stake LP pool
   * @param lpToken
   */
  public async getStakePoolInfo(lpToken) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.getLpInfo(this.currentAccount, lpToken).call();
      // console.info(`getStakePoolInfo: ${JSON.stringify(res)}`);
      const [lpTokenStaked, jktStaked, power, serviceCharge, getPower, apy] = res;
      return { lpTokenStaked, jktStaked, power, serviceCharge, getPower, apy };
    } catch (e) {
      return {};
    }
  }

  /**
   * redeem money
   * @param lpToken
   * @param percent
   */
  public async redeem(lpToken: string, percent: number) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.takeBack(lpToken, percent).send({ from: this.currentAccount });
      // console.info(`takeBack: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }

  /**
   * transfer other lpToken to JKT amount
   * @param lpToken
   * @param amount
   * @param percent
   */
  public async transferLpTokenToJKT(lpToken, amount, percent) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.getLpPayJKT(lpToken, amount, percent).call();
      // console.info(`getLpPayJKT: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }

  /**
   * get APY for different lpScale
   * @param lpScale
   */
  public async getApyForStake(lpScale) {
    try {
      await this.prepareConnectWallet();
      const apy = await this.minerContract.methods.getApy(lpScale).call();
      // console.info(`getApy: ${apy}`);
      return apy;
    } catch (e) {
      return false;
    }
  }

  /**
   * get lpScale
   * @param lpToken
   * @param percent
   */
  public async getHashRate(lpToken, percent) {
    try {
      await this.prepareConnectWallet();
      const lpScale = await this.minerContract.methods.getHashRateByPct(lpToken, percent).call();
      // console.info(`getHashRateByPct: ${lpScale}`);
      return lpScale;
    } catch (e) {
      return false;
    }
  }

  /**
   * get computing power
   * @param lpToken
   * @param amount
   * @param percent
   */
  public async getComputingPower(lpToken, amount, percent) {
    try {
      await this.prepareConnectWallet();
      const power = await this.minerContract.methods.getPower(lpToken, amount, percent).call();
      // console.info(`getPower: ${power}`);
      return power;
    } catch (e) {
      return false;
    }
  }

  /**
   * stake money
   * @param lpToken
   * @param amount
   * @param percent
   * @param value
   */
  public async stake(lpToken, amount, percent, value?) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.deposit(lpToken, amount, percent).send({
        from: this.currentAccount,
        value: value,
      });
      // console.info(`deposit: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }

  /**
   * transfer money to others
   * @param toAddress
   * @param amount
   */
  public async transferMoney(toAddress, amount) {
    try {
      await this.prepareConnectWallet();
      const res = await this.jktContract.methods.transfer(toAddress, amount).send({
        from: this.currentAccount,
      });
      // console.info(`transfer: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      return false;
    }
  }


  /**
   * get current account address
   */
  public async getAccountAddress() {
    !this.currentAccount && await this.prepareConnectWallet();
    return this.currentAccount;
  }

  /**
   * get JKT token contract
   */
  public async getJKTContract() {
    !this.jktContract && await this.prepareConnectWallet();
    return this.jktContract;
  }

  /**
   * get wallet BNB balance
   */
  public async getWalletBalance() {
    try {
      const wei = await this.provider.request({ method: 'eth_getBalance', params: [this.currentAccount, 'latest'] });
      const balance = Web3.utils.fromWei(wei, 'ether');
      // console.info(`getWalletBalance: ${balance}`);
      return balance;
    } catch (error) {
      return false;
    }
  }

   /**
   * Get information for login
   */
    public async getSignInfo() {
      try {
        await this.prepareConnectWallet();
        const signText = 'login@' + new Date().getTime();
        const signature  = await this.provider.request({method:"personal_sign", params:[this.currentAccount, signText]});
        const retObj = {signText, signature};
        // console.info(`signature: ${signature}`);
        localStorage.setItem('signInfo', JSON.stringify(retObj));
        return retObj
      } catch (error) {
        localStorage.removeItem('signInfo');
        return undefined;
      }
    }
}
