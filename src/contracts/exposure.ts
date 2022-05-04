import { ChainId } from "@sushiswap/sdk";

import { calculateGasMargin, getHigherGWEI } from "utils";
import { Contracts } from "constants/networks";
import useContract from "hooks/useContract";

import { EXPOSURE_MAIN_ABI } from "./abi";
import { useWeb3React } from "@web3-react/core";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";
const CHAIN = isMainnet ? ChainId.MAINNET : ChainId.RINKEBY;

export const useExposureContract = () => {
	const { getContract } = useContract();
	const { library } = useWeb3React();

	const getExposureContract = async () =>
		await getContract(Contracts[CHAIN].ExposureMain, EXPOSURE_MAIN_ABI);

	const createDrop = async (artist: string, max: number, from: string) => {
		const contract = await getExposureContract();
		const args = [artist, max];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};
		const gasEstimate = await contract.estimateGas[
			"createDrop(address,uint128)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.createDrop(...args, options);
	};

	const setDropIPFS = async (dropId: number, cid: string, from: string) => {
		const contract = await getExposureContract();
		const args = [dropId, cid];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas[
			"setDropIPFS(uint256,string)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.setDropIPFS(...args, options);
	};

	const unpauseDrop = async (
		dropId: number,
		shouldUnpause: boolean,
		from: string | null | undefined
	) => {
		const contract = await getExposureContract();
		const args = [dropId, shouldUnpause];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas["unpauseDrop(uint256,bool)"](
			...args,
			options
		);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.unpauseDrop(...args, options);
	};

	const getDropInfo = async (dropId: number) => {
		const contract = await getExposureContract();
		const args = [dropId];

		return await contract.drops(...args);
	};

	return {
		getExposureContract,
		createDrop,
		setDropIPFS,
		unpauseDrop,
		getDropInfo,
	};
};
