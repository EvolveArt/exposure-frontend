export interface Artist {
	address: string;
	firstname: string;
	lastname: string;
	twitter?: string;
	instagram?: string;
	description: string;
	imageHash: string;
}

export interface Collection {
	dropId: number;
	collectionName: string;
	artists: Artist[];
	description: string;
	logoImageHash: string;
	metadataHash: string;
	totalSupply: number;
	teasingDate: string;
	releaseDate: string;
	mintPrice: number;
	maxMintPerWallet: number;
	minted: number;
	mintMode: number;
}
