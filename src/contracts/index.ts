export const getSigner = async (library: any) => {
  // const { library } = useWeb3React();

  // await window.ethereum.enable();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = library.getSigner();
  return signer;
};