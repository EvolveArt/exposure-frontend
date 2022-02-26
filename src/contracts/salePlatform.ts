import { ChainId } from "@sushiswap/sdk";

import { calculateGasMargin, getHigherGWEI } from "utils";
import { Contracts } from "constants/networks";
import useContract from "hooks/useContract";

import { SALE_PLATFORM_ABI } from "./abi";
import { useWeb3React } from "@web3-react/core";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";
const CHAIN = isMainnet ? ChainId.MAINNET : ChainId.RINKEBY;

export const useSalesContract = () => {
	const { getContract } = useContract();
	const { library } = useWeb3React();

	const getSalesContract = async () =>
		await getContract(Contracts[CHAIN].SalePlatform, SALE_PLATFORM_ABI);

	const createSale = async (
		dropId: number,
		price: number,
		start: number,
		limit: number,
		from: string
	) => {
		const contract = await getSalesContract();
		const args = [dropId, price, start, limit];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas[
			"createSale(uint256,uint128,uint64,uint64)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.createSale(...args, options);
	};

	const overrideArtistcut = async (
		dropId: number,
		cut: number,
		from: string
	) => {
		const contract = await getSalesContract();
		const args = [dropId, cut];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas[
			"overrideArtistcut(uint256,uint256)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.overrideArtistcut(...args, options);
	};

	const setAuction = async (
		auctionId: number,
		startingPrice: number,
		decreasingConstant: number,
		start: number,
		period: number,
		from: string
	) => {
		const contract = await getSalesContract();
		const args = [auctionId, startingPrice, decreasingConstant, start, period];

		const options = {
			from,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas[
			"setAuction(uint256,uint256,uint128,uint64,uint64)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.setAuction(...args, options);
	};

	const purchase = async (
		dropId: number,
		amount: number,
		value: any,
		from: string
	) => {
		const contract = await getSalesContract();
		const args = [dropId, amount];

		const options = {
			from,
			value,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas["purchase(uint256,uint256)"](
			...args,
			options
		);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.purchase(...args, options);
	};

	const purchaseThroughAuction = async (
		dropId: number,
		value: any,
		from: string
	) => {
		const contract = await getSalesContract();
		const args = [dropId];

		const options = {
			from,
			value,
			gasPrice: getHigherGWEI(library),
			gasLimit: 0,
		};

		const gasEstimate = await contract.estimateGas[
			"purchaseThroughAuction(uint256)"
		](...args, options);
		options.gasLimit = calculateGasMargin(gasEstimate);
		return await contract.purchaseThroughAuction(...args, options);
	};

	return {
		getSalesContract,
		createSale,
		purchase,
		purchaseThroughAuction,
		setAuction,
		overrideArtistcut,
	};
};
