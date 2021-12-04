import {
  BIT_TOKEN_ADDRESS,
  BNB_TOKEN_ADDRESS,
  JKT_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
  USDT_LP_TOKEN_ADDRESS,
  BTC_TOKEN_ADDRESS,
  ETH_TOKEN_ADDRESS
} from './address/tokenAddress';


const farmConfig = {
  'farmList': [
    {
      'farmSymbol': 'JKT',
      'farmIcon': 'JKT',
      'authTypes': ['JKT'],
      'lpToken': JKT_TOKEN_ADDRESS,
      'decimal': 18,
      'stakeList': [
        {
          'title': 'JKT Staked:',
          'description': 'Rewards in JKT',
        },
        {
          'title': 'Power:',
        },
      ],
    },
    {
      'farmSymbol': 'JKT-USDT(LP)',
      'farmIcon': 'USDT-LP',
      'authTypes': ['JKT-USDT(LP)'],
      'lpToken': USDT_LP_TOKEN_ADDRESS,
      'decimal': 18,
      'stakeList': [
        {
          'title': 'LP Staked:',
          'description': 'Rewards in JKT',
        },
        {
          'title': 'Power:',
        },
      ],
    },
    {
      'farmSymbol': 'JKT-USDT',
      'farmIcon': 'USDT',
      'lpToken': USDT_TOKEN_ADDRESS,
      'authTypes': ['USDT', 'JKT'],
      'decimal': 18,
      'stakeList': [
        {
          'title': 'JKT Staked:',
          'description': 'Rewards in JKT',
        },
        {
          'title': 'USDT Staked:',
        },
        {
          'title': 'Power:',
        },
      ],
    },
    {
      'farmSymbol': 'JKT-BIT',
      'farmIcon': 'BIT',
      'authTypes': ['BIT', 'JKT'],
      'lpToken': BIT_TOKEN_ADDRESS,
      'decimal': 9,
      'stakeList': [
        {
          'title': 'JKT Staked:',
          'description': 'Rewards in JKT',
        },
        {
          'title': 'BIT Staked:',
        },
        {
          'title': 'Power:',
        },
      ],
    },
    {
      'farmSymbol': 'JKT-BNB',
      'farmIcon': 'BNB',
      'authTypes': ['BNB', 'JKT'],
      'lpToken': BNB_TOKEN_ADDRESS,
      'decimal': 18,
      'stakeList': [
        {
          'title': 'JKT Staked:',
          'description': 'Rewards in JKT',
        },
        {
          'title': 'BNB Staked:',
        },
        {
          'title': 'Power:',
        },
      ],
    },
    // {
    //   'farmSymbol': 'JKT-BTC',
    //   'farmIcon': 'BTC',
    //   'authTypes': ['BTC', 'JKT'],
    //   'lpToken': BTC_TOKEN_ADDRESS,
    //   'decimal': 18,
    //   'stakeList': [
    //     {
    //       'title': 'JKT Staked:',
    //       'description': 'Rewards in JKT',
    //     },
    //     {
    //       'title': 'BTC Staked:',
    //     },
    //     {
    //       'title': 'Power:',
    //     },
    //   ],
    // },
    // {
    //   'farmSymbol': 'JKT-ETH',
    //   'farmIcon': 'ETH',
    //   'authTypes': ['ETH', 'JKT'],
    //   'lpToken': ETH_TOKEN_ADDRESS,
    //   'decimal': 18,
    //   'stakeList': [
    //     {
    //       'title': 'JKT Staked:',
    //       'description': 'Rewards in JKT',
    //     },
    //     {
    //       'title': 'ETH Staked:',
    //     },
    //     {
    //       'title': 'Power:',
    //     },
    //   ],
    // },
  ],
};

export default farmConfig;
