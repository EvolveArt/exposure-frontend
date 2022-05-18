import axios from "axios";
// eslint-disable-next-line
import { Artist } from "interfaces";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const corsHeader = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"Origin, X-Requested-With, Content-Type, Accept",
};

export const useApi = () => {
	const apiUrl = isMainnet
		? "https://exposure-rest-api.herokuapp.com"
		: "https://exposure-rest-api.herokuapp.com";
	// const apiUrl = isMainnet
	// 	? "http://localhost:5001"
	// 	: "http://localhost:5001";

	const getAuthToken = async (address: string | null | undefined) => {
		let result = await axios({
			method: "post",
			url: `${apiUrl}/auth/getToken`,
			data: JSON.stringify({ address: address }),
			headers: { "Content-Type": "application/json", ...corsHeader },
		});
		if (result.data.status === "success") {
			let token = result.data.token;
			return token;
		}
		return null;
	};

	const getAccountDetails = async (authToken: string | null | undefined) => {
		const res = await axios({
			method: "get",
			url: `${apiUrl}/account/getaccountinfo`,
			headers: {
				Authorization: `Bearer ${authToken}`,
				...corsHeader,
			},
		});

		return res.data;
	};

	const getNonce = async (
		address: string | null | undefined,
		authToken: string | null | undefined
	) => {
		const res = await axios({
			method: "get",
			url: `${apiUrl}/account/nonce/${address}`,
			headers: {
				Authorization: `Bearer ${authToken}`,
				...corsHeader,
			},
		});
		return res.data;
	};

	// const getIsModerator = async (address: string | null | undefined) => {
	// 	const { data } = await axios({
	// 		method: "get",
	// 		url: `${apiUrl}/mod/isModerator/${address}`,
	// 	});
	// 	if (data.status === "success") {
	// 		return data.data;
	// 	}
	// 	return false;
	// };

	const postArtist = async (
		artist: Artist,
		authToken: string | null | undefined
	) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/artist/artistDetails`,
			data: JSON.stringify(artist),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...corsHeader,
			},
		});

		return res.data;
	};

	const publishDrop = async (
		dropId: number,
		shouldPublish: boolean,
		authToken: string | null | undefined
	) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/collection/publish`,
			data: { dropId, shouldPublish },
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...corsHeader,
			},
		});

		return res.data;
	};

	const getAllArtists = async () => {
		const res = await axios({
			method: "GET",
			url: `${apiUrl}/artist/fetchAllArtists`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
		});

		return res.data;
	};

	const getAllArtistSeasons = async (address: string) => {
		const res = await axios({
			method: "GET",
			url: `${apiUrl}/season/getArtistSeasons?address=${address}`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
		});

		return res.data;
	};

	const getAllCollections = async (
		isAvailable?: boolean | null,
		artists?: string[],
		address?: string
	) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/collection/fetchAllCollections`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { isAvailable, artists, address },
		});

		return res.data;
	};

	const searchCollections = async (searchString: string) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/collection/searchCollection`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { searchString },
		});

		return res.data;
	};

	const searchArtists = async (searchString: string) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/artist/searchArtist`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { searchString },
		});

		return res.data;
	};

	const getLatestCollection = async () => {
		const res = await axios({
			method: "GET",
			url: `${apiUrl}/collection/getLatestCollection`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
		});

		return res.data;
	};

	const getCollectionInfo = async (dropId: number) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/collection/getCollectionInfo`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { dropId },
		});

		return res.data;
	};

	const getArtistInfo = async (address: string) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/artist/getArtistInfo`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { address },
		});

		return res.data;
	};

	const updateAccountDetails = async (
		email: string,
		authToken: string | null | undefined,
		signature: string,
		signatureAddress: string
	) => {
		const formData = new FormData();
		formData.append("email", email);
		formData.append("signature", signature);
		formData.append("signatureAddress", signatureAddress);

		const res = await axios({
			method: "post",
			url: `${apiUrl}/account/accountdetails`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authToken}`,
				...corsHeader,
			},
		});
		return res.data;
	};

	const updateMint = async (
		dropId: number,
		amount: number,
		price: string,
		address: string | null | undefined
	) => {
		const res = await axios({
			method: "POST",
			url: `${apiUrl}/collection/updateMint`,
			headers: {
				"Content-Type": "application/json",
				...corsHeader,
			},
			data: { dropId, amount, price, address },
		});

		return res.data;
	};

	return {
		getAuthToken,
		getAccountDetails,
		postArtist,
		getNonce,
		apiUrl,
		getAllArtists,
		getAllArtistSeasons,
		getAllCollections,
		getCollectionInfo,
		getArtistInfo,
		getLatestCollection,
		updateMint,
		searchCollections,
		searchArtists,
		updateAccountDetails,
		publishDrop,
		// getIsModerator,
	};
};
