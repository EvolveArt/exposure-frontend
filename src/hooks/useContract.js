import { useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

export default () => {
	const { chainId, library } = useWeb3React();

	const getContract = useCallback(
		async (address, abi) => {
			if (chainId) {
				// await window.ethereum.enable();
				// const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = library.getSigner();

				return new ethers.Contract(address, abi, signer);
			} else {
				const provider = new ethers.providers.JsonRpcProvider(
					isMainnet
						? "https://eth-mainnet.alchemyapi.io/v2/qWyqqCpE1hzR-_HlJwe-RUu8Uy0YvnoP"
						: "https://eth-rinkeby.alchemyapi.io/v2/Xsu8vJ7-9wZqTyU9rFR2TegPPRSHxuFS",
					isMainnet ? 1 : 4
				);

				return new ethers.Contract(address, abi, provider);
			}
		},
		[chainId, library]
	);

	return { getContract };
};
