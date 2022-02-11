// import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const checkBalance = async (address, library) => {
  // const { library } = useWeb3React();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  let balance = await library.getBalance(address);
  balance = ethers.utils.formatEther(balance);
  return balance;
};
const WalletUtils = {
  checkBalance,
};

export default WalletUtils;
