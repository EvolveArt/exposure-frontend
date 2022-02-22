export interface Artist {
  address: string,
  firstname: string,
  lastname: string,
  twitter?: string,
  instagram?: string,
  description: string,
  imageHash: string
}

export interface Collection {
  collectionName: string,
  artists: Artist[],
  description: string,
  logoImageHash: string,
  totalSupply: number,
  teasingDate: Date,
  releaseDate: Date,
  mintPrice: number,
  maxMintPerWallet: number,
  minted: number,
  mintMode: string
}
