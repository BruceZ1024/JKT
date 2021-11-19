const farmConfig = {
  "farmList": [
    {
      "farmSymbol": "JKT-BIT",
      "farmIcon": "BIT",
      "authTypes": [ "BIT","JKT"],
      "lpToken": "0x55FB5d3e107aAf137f608A76C1E13bED91880aD7",
      "decimal": 18,
      "stakeList": [
        {
          "title": "JKT Staked:",
          "description": "Rewards in JKT"
        },
        {
          "title": "BIT Staked:"
        },
        {
          "title": "Power:"
        }
      ]
    },
    {
      "farmSymbol": "JKT-USDT ( LP )",
      "farmIcon": "USDT-LP",
      "authTypes": ["JKT-USDT"],
      "lpToken": "0x8744d993162B543251879260B7029BfEBf6156Be",
      "decimal": 18,
      "stakeList": [
        {
          "title": "LP Staked:",
          "description": "Rewards in JKT"
        },
        {
          "title": "Power:"
        }
      ]
    },
    {
      "farmSymbol": "JKT-USDT",
      "farmIcon": "USDT",
      "lpToken": "0x8994077E9Fc24d5140d04eC879362ba54Ee8289b",
      "authTypes": ["USDT", "JKT"],
      "decimal": 18,
      "stakeList": [
        {
          "title": "JKT Staked:",
          "description": "Rewards in JKT"
        },
        {
          "title": "USDT Staked:"
        },
        {
          "title": "Power:"
        }
      ]
    },
    {
      "farmSymbol": "JKT",
      "farmIcon": "JKT",
      "authTypes": ["JKT"],
      "lpToken": "0x8744d993162B543251879260B7029BfEBf6156Be",
      "decimal": 18,
      "stakeList": [
        {
          "title": "JKT Staked:",
          "description": "Rewards in JKT"
        },
        {
          "title": "Power:"
        }
      ]
    },
    {
      "farmSymbol": "JKT-BNB",
      "farmIcon": "BNB",
      "authTypes": ["BNB", "JKT"],
      "lpToken": "0x0000000000000000000000000000000000000002",
      "decimal": 18,
      "stakeList": [
        {
          "title": "JKT Staked:",
          "description": "Rewards in JKT"
        },
        {
          "title": "BNB Staked:"
        },
        {
          "title": "Power:"
        }
      ]
    }
  ]
}

export default farmConfig;
