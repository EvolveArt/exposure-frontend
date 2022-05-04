import { ChainId } from "@sushiswap/sdk";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { NetworkConnector } from "./NetworkConnector";

import EXPOSURE_LOGO_URL from "../assets/imgs/logoWhite.png";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const RPC = isMainnet
	? {
			[ChainId.MAINNET]: process.env.REACT_APP_NETWORK_RPC,
	  }
	: {
			[ChainId.RINKEBY]: process.env.REACT_APP_NETWORK_TEST_RPC,
	  };

export const network = new NetworkConnector({
	defaultChainId: 1,
	urls: RPC,
});

export const injected = new InjectedConnector({
	supportedChainIds: isMainnet
		? [
				1, // MAINNET
		  ]
		: [
				4, // ROPSTEN
		  ],
});

export const walletlink = new WalletLinkConnector({
	url: process.env.REACT_APP_NETWORK_RPC || "",
	appName: "Rhapsody",
	appLogoUrl: EXPOSURE_LOGO_URL,
});

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: process.env.REACT_APP_NETWORK_RPC || "" },
	chainId: 1,
	qrcode: true,
});
