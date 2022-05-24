export interface Artist {
	_id: string;
	address: string;
	firstname: string;
	lastname: string;
	twitter?: string;
	instagram?: string;
	description: string;
	imageHash: string;
	nbCollections: number;
}

export interface Season {
	_id: string;
	name: string;
	description: string;
	isDisplayed: boolean;
	address: string;
	collectionName: string;
	nbCollections: number;
}

export interface Collection {
	_id: string;
	dropId: number;
	collectionName: string;
	verbatim?: string;
	copyRights?: string;
	season?: Season;
	verbatimAuthor?: string;
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
	mintMode: string;
	soldOut: boolean;
	private: boolean;
}
