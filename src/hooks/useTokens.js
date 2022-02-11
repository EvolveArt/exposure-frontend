import { ChainId } from '@sushiswap/sdk';

// import iconFTM from 'assets/imgs/ftm.png';
import iconWFTM from 'assets/imgs/CRO.png';
import iconWETH from 'assets/imgs/CRO.png';
import iconMMF from 'assets/imgs/mmf.png';
import iconUSDC from 'assets/imgs/usdc.png';
// import iconDAI from 'assets/imgs/dai.png';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  [25]: [
    // {
    //   address: '',
    //   name: 'Cronos',
    //   symbol: 'CRO',
    //   decimals: 18,
    //   icon: iconCRO,
    // },
    {
      address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
      name: 'Wrapped Cro',
      symbol: 'WCRO',
      decimals: 18,
      icon: iconWFTM,
    },
    {
      address: '0x97749c9b61f878a880dfe312d2594ae07aed7656',
      name: 'Mad Meerkat Finance',
      symbol: 'MMF',
      decimals: 18,
      icon: iconMMF,
    },
    {
      address: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
    // {
    //   address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
    //   name: 'Tether USD',
    //   symbol: 'fUSDT',
    //   decimals: 6,
    //   icon: iconUSDT,
    // },
    // {
    //   address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    //   name: 'USD Coin',
    //   symbol: 'USDC',
    //   decimals: 6,
    //   icon: iconUSDC,
    // },
    // {
    //   address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
    //   name: 'Dai Stablecoin',
    //   symbol: 'DAI',
    //   decimals: 18,
    //   icon: iconDAI,
    // },
  ],
  [ChainId.ARBITRUM]: [
    // {
    //   address: '',
    //   name: 'Ether',
    //   symbol: 'ETH',
    //   decimals: 18,
    //   icon: iconETH,
    // },
    {
      address: '0xf1277d1ed8ad466beddf92ef448a132661956621',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      icon: iconWETH,
    },
  ],
};

export default function useTokens() {
  const chain = isMainnet ? 25 : ChainId.ARBITRUM;

  const tokens = Tokens[chain];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'ftm'
        ? ''
        : addr;
    return (tokens || []).find(
      tk => tk.address.toLowerCase() === address.toLowerCase()
    );
  };

  return { getTokenByAddress, tokens };
}
