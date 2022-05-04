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
		SalePlatform: "0x254196c40c3cFfFB6FBa1232A5083c72E83B8028",
		ExposureMain: "0x2E19da5a8C5445937ff0BA0D03984Cb756C774A3",
	},
};
