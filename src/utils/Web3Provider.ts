import Web3 from 'web3';
import { ethers } from 'ethers';
import { EventHandler } from './EventManager';
import detectEthereumProvider from '@metamask/detect-provider';
import { JKT_TOKEN_ADDRESS, MINER_TOKEN_ADDRESS } from '@/const/address/tokenAddress';

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
      return false;
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
    this.minerContract = new web3.eth.Contract(MINER_ABI, MINER_TOKEN_ADDRESS);

    console.log(this.jktContract, this.minerContract);
  }

  /**
   * get chainId
   */
  private async getChainId() {
    const chainId = await this.provider.request({
      method: 'eth_chainId',
    });
    console.info(`current chainId: ${chainId}`);
    return chainId;
  }

  /**
   * check whether current chain is BSC chain
   * @param chainId
   */
  private checkChainId(chainId: string) {
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
    try {
      await this.prepareConnectWallet();
      const parentAddr = await this.minerContract.methods.getParent(this.currentAccount).call();
      console.info(`getParent: ${parentAddr}`);
      return parentAddr;
    } catch (e) {
      return false;
    }
  }

  /**
   * bind parent account
   * @param parentAccount
   */
  public async bindParentAccount(parentAccount: string) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.bindParent(parentAccount).send({ from: this.currentAccount });
      console.info(`bindParentAccount: ${JSON.stringify(res)}`);
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
      console.info(`getUserInfoEx: ${JSON.stringify(res)}`);
      const [, eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT] = res;
      return {
        eUserLevel, eSelfHash, eTeamHash, ePendingCoin, eTakedCoin, eBurnJKT,
      };
    } catch (e) {
      return false;
    }
  }

  /**
   * get lp information
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
  public async getLpInformation() {
    await this.prepareConnectWallet();
    const res = await this.minerContract.methods.getLpInfo().call();
    console.info(`getLpInfo: ${JSON.stringify(res)}`);
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
   * know the price of update vip
   * @param updateLevel
   */
  public async updateVipPrice(updateLevel: number) {
    try {
      await this.prepareConnectWallet();
      const price = await this.minerContract.methods.getVipPrice(this.currentAccount, updateLevel).call();
      console.info(`price: ${price}`);
      return price;
    } catch (e) {
      return false;
    }
  }

  /**
   * update vip level
   * @param newLevel
   */
  public async updateVip(newLevel: number) {
    try {
      await this.prepareConnectWallet();
      const res = await this.minerContract.methods.buyVip(newLevel).send({ from: this.currentAccount });
      console.info(`buyVip: ${JSON.stringify(res)}`);
    } catch (e) {
      return false;
    }
  }

  /**
   * get information of stake pool
   * @param lpToken
   */
  public async getStakePoolInfo(lpToken) {
    try {
      const res = await this.minerContract.methods.getLpInfo(this.currentAccount, lpToken).call();
      console.info(`getStakePoolInfo: ${JSON.stringify(res)}`);
    } catch (e) {
      return false;
    }
  }


  /**
   * transfer
   * @param lpToken
   * @param amount
   * @param percent
   */
  public async transferLpTokenToJKT(lpToken, amount, percent) {
    try {
      const res = await this.minerContract.methods.getLpPayJKT(lpToken, amount, percent).send({ from: this.currentAccount });
      console.info(`getLpPayJKT: ${JSON.stringify(res)}`);
    } catch (e) {
      return false;
    }
  }

  /**
   * get JKT balance
   */
  public async getJKTBalance() {
    try {
      await this.prepareConnectWallet();
      const bal = await this.jktContract.methods.balanceOf(this.currentAccount).call();
      console.info(`balance: ${bal}`);
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
      console.info(`decimals: ${decimals}`);
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
      console.info(`total: ${total}`);
      return total;
    } catch (e) {
      return false;
    }
  }

  /**
   * check allowance
   */
  public async checkAllowance() {
    try {
      await this.prepareConnectWallet();
      const allowance: string = await this.jktContract.methods.allowance(this.currentAccount, MINER_TOKEN_ADDRESS).call();
      return allowance;
    } catch (error) {
      console.info(error.errorCode);
      return false;
    }
  }

  /**
   * get approve permission
   */
  public async getApprove() {
    try {
      await this.prepareConnectWallet();
      return await this.jktContract.methods.approve(MINER_TOKEN_ADDRESS, ethers.constants.MaxUint256).send({ from: this.currentAccount });
    } catch (error) {
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
}

/**
 JKT 地址 0x7f73f70a32394807C9cC06dAA33e6D25084B66Ea
 领BNB空投进行测试
 https://testnet.binance.org/faucet-smart

 tp metamask
 github

 绑定上级
 user 自己的地址
 parent 上级地址
 function bindParent(address user, address parent)

 获取上级地址
 function getParent(address user) external view returns (address);

 获取用户数据
 function getUserInfoEx() public view returns (uint256[] memory) {
  返回
  uint constant eUserLevel = 1; // 用户vip等级
  uint constant eSelfHash = 2; // 用户自己算力
  uint constant eTeamHash = 3; // 用户团队算力
  uint constant ePendingCoin = 4; // 用户待领取收益
  uint constant eTakedCoin = 5;
  uint constant eBurnJKT = 6;

  获取挖矿的总数据
  function getLpInfo() public  view returns (uint256[] memory)
  返回
  uint constant eTotalHashRate = 1; // 总算力
  uint constant eTotalLpHashRate = 2; // 总质押的算力
  uint constant eStartBlock = 3;
  uint constant eLpBurn = 4; // 质押burn的JKT
  uint constant eVipBurn = 5; // 买VIP burn的JKT
  uint constant eLastUpdateBlock = 6;
  uint constant eOneShareGet = 7;
  uint constant eOneShareScale = 8;
  uint constant eTotalMint = 9; // 总发放的收益
  uint constant eThresholdMutiple = 10;

  获取vip价格
  user 用户地址
  newLevel 新的vip级别(有可能从别的vip级别升级过来,这个是差价)
  返回 vip价格
  function getVipPrice(address user, uint256 newLevel) public view returns (uint256) {

    买vip
    function buyVip(uint256 newLevel) public

    质押时获取应该质押多少JKT
    lpToken 质押的另外的币的地址
    amount 币数量
    percent 质押比例
    function getLpPayJKT(address lpToken, uint256 amount, uint256 percent) public view returns (uint256) {
      返回 JKT数量

      获取质押池信息
      user 用户
      lpToken 质押币
      function getLpInfo(address user, address lpToken) public view returns (uint256[4] memory)
      返回
      0 质押币数量
      1 JKT数量
      2 算力
      3 手续费

      获取质押池不同算力权重
      function getHashRateByPct(address lpToken, uint256 pct) public view returns(uint256) {

        获取质押收益
        function withdrawLpReward() public

        质押
        lpToken 另一个币的地址
        amount 数量
        percent 比例
        function deposit(address lpToken, uint256 amount, uint256 percent)

        提取本金
        function takeBack(address lpToken, uint256 pct)
 **/
