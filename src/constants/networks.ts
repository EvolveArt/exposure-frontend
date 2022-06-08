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
		SalePlatform: "0xcf837862e3FEBb660763dda7F660f029CA7a892e",
		ExposureMain: "0x72A912A5123630DA4de996e3176ECc9FD50a300b",
	},
};
