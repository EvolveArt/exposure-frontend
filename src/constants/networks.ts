import { ChainId } from "@sushiswap/sdk";

export const NETWORK_LABEL: any = {
	[ChainId.MAINNET]: "Ethereum",
	[ChainId.RINKEBY]: "Rinkeby",
	[ChainId.ROPSTEN]: "Ropsten",
	[ChainId.GÖRLI]: "Görli",
	[ChainId.KOVAN]: "Kovan",
	[ChainId.ARBITRUM]: "Arbitrum",
	[ChainId.MATIC]: "Matic",
	[ChainId.MATIC_TESTNET]: "Matic Testnet",
	[ChainId.XDAI]: "xDai",
	[ChainId.BSC]: "BSC",
	[ChainId.BSC_TESTNET]: "BSC Testnet",
};

export const Contracts = {
	[ChainId.MAINNET]: {
		SalePlatform: "",
		ExposureMain: "",
	},
	[ChainId.RINKEBY]: {
		SalePlatform: "0xaE00fB9C9054258a4d012aD90Fb4d6A045C07Dd4",
		ExposureMain: "0x3be98534CFe9d75d43AB9d649a7Fd2144176bB93",
	},
};
