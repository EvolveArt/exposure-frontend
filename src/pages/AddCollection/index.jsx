/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Header from "components/Header";
import { Button, Flex, useToast } from "@chakra-ui/react";
import addImage from "../../assets/imgs/addImage.png";
import closeIcon from "assets/svgs/close.svg";
import Select from "react-dropdown-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useApi } from "api";
import "./styles.css";
import { ethers } from "ethers";
// import toast from "utils/toast";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { getSigner, useExposureContract, useSalesContract } from "contracts";
import { ClipLoader } from "react-spinners";
import { formatName } from "utils";
import { ADMIN_ADDRESSES } from "constants/index";
import { useHistory } from "react-router-dom";
// import { kebabCase } from "lodash";

const corsHeader = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
}

const AddCollection = () => {
	const [logo, setLogo] = useState(null);
	const [metadataHash, setMetadataHash] = useState(null);
	const [photos, setPhotos] = useState(null);
	const [name, setName] = useState("");
	const [season, setSeason] = useState("");
	const [verbatim, setVerbatim] = useState("");
	const [verbatimAuthor, setVerbatimAuthor] = useState("");
	const [copyRights, setCopyRights] = useState("");
	const [adding, setAdding] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [nameError, setNameError] = useState(null);
	const [seasonError, setSeasonError] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState(null);
	const [maxMintPerWallet, setMaxMintPerWallet] = useState(1);

	const [walletError, setWalletError] = useState(null);
	const [mintError, setMintError] = useState(null);
	const [teasingTime, setTeasingTime] = useState(
		new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	);
	const [dropTime, setDropTime] = useState(
		new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	);
	const [now, setNow] = useState(new Date());

	const { getAllArtists, apiUrl, getNonce, getAllArtistSeasons } = useApi();
	const { createDrop, setDropIPFS } = useExposureContract();
	const { setAuction, createSale } = useSalesContract();

	const [artists, setArtists] = useState([]);
	const [seasonList, setSeasonList] = useState([]);
	const [selected, setSelected] = useState(null);
	const [selectedSeason, setSelectedSeason] = useState(null);
	const [selectedMintType, setSelectedMintType] = useState([]);

	const { account, library } = useWeb3React();
	const { authToken } = useSelector((state) => state.ConnectWallet);

	// DUTCH AUCTION
	const [startingPrice, setStartingPrice] = useState(0);
	const [decreasingConstant, setDecreasingConstant] = useState(0);
	const [auctionStart, setAuctionStart] = useState(0);
	const [auctionPeriod, setAuctionPeriod] = useState(0);
	// SALE
	const [saleStart, setSaleStart] = useState(0);
	const [mint, setMint] = useState(0);

	const history = useHistory();
	const toast = useToast();

	const generateMetadata = async (
		_name,
		_description,
		_image,
		_artist,
		_collection,
		_season
	) => {
		// Upload image on ipfs
		let ipfsHash = await uploadOnIPFS(_image);

		let tempMetadata = {
			name: _name,
			description: _description,
			external_url: "https://rhapsody.art",
			image: `ipfs://${ipfsHash}`,
			attributes: [
				{ trait_type: "Artist", value: _artist },
				{ trait_type: "Collection", value: _collection },
				{ trait_type: "Season", value: _season },
			],
		};

		return tempMetadata;
	};

	const removeImage = () => {
		setLogo(null);
	};

	const removePhotos = (idx) => {
		setPhotos(() => photos.filter((photo, i) => i !== idx));
	};

	const inputRef = useRef(null);
	const inputPhotoRef = useRef(null);

	useEffect( () => {
		async function fetchData() {
			const _artists = await getAllArtists();
			setArtists(_artists.data);
		}

		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect( () => {
		async function fetchData() {
			const _seasons = await getAllArtistSeasons(account);
			setSeasonList(_seasons.data);
		}
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account]);

	useEffect(() => {
		if (account && authToken) {
			if (!ADMIN_ADDRESSES.includes(account.toLowerCase()))
				history.replace("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, authToken]);

	useEffect(() => {
		if (artists?.length) {
			setSelected([artists[0]]);
		}
	}, [artists]);

	const handleFileSelect = (e) => {
		if (e.target.files.length > 0) {
			const file = e.target.files[0];

			const reader = new FileReader();

			reader.onload = function(e) {
				setLogo(e.target.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const handlePhotoSelect = async (e) => {
		if (e.target.files.length > 0) {
			// Convert the FileList into an array and iterate
			let files = Array.from(e.target.files).map((file) => {
				// Define a new file reader
				let reader = new FileReader();

				// Create a new promise
				return new Promise((resolve) => {
					// Resolve the promise after reading file
					reader.onload = () =>
						resolve({
							file,
							name: file.name.replace(/\.[^/.]+$/, ""),
							src: reader.result,
						});

					// Reade the file as a data URL
					reader.readAsDataURL(file);
				});
			});

			// At this point you'll have an array of results
			let res = await Promise.all(files);
			setPhotos(res.map(pt => ({
				photo: pt,
				description: ''
			})));
		}
	};

	const generateMetadataAndUpload = async () => {
		if (uploading) return;
		setUploading(true);

		try {
			let metadatas = [];
			for (const {photo, description: photoDescription} of photos) {
				const metadata = await generateMetadata(
					photo.name,
					photoDescription,
					photo.file,
					formatName(selected[0]),
					name,
					season?.length > 0 ? season : selectedSeason[0].name
				);
				metadatas.push(metadata);
			}
			// console.log(JSON.stringify(metadatas));
			const result = await axios({
				method: "post",
				url: `${apiUrl}/ipfs/uploadMetadata2Server`,
				data: JSON.stringify(metadatas),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
					...corsHeader
				},
			});

			const imageHash = result.data.data;
			setMetadataHash(imageHash);

			setUploading(false);
		} catch (e) {
			console.error(e);
			setUploading(false);
		}
	};

	const validateName = () => {
		if (name.length === 0) {
			setNameError("This field can't be blank");
		} else {
			setNameError("");
		}
	};
	const validateSeasonName = () => {
		if (season.length === 0 && seasonList?.length === 0) {
			setSeasonError("This field can't be blank");
		} else {
			setSeasonError("");
		}
	};

	const validateDescription = () => {
		if (description.length === 0) {
			setDescriptionError("This field can't be blank");
		} else {
			setDescriptionError(null);
		}
	};

	const validateMaxMintPerWallet = () => {
		if (maxMintPerWallet > 200) {
			setWalletError("Max Mint Per wallet too high.");
		} else {
			setWalletError("");
		}
	};

	const validateMint = () => {
		if (mint.length === 0) {
			setMintError("This field can't be blank");
		} else {
			setMintError("");
		}
	};

	const clipImage = (image, cb) => {
		// const CANVAS_SIZE = 128;
		const canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		cb(canvas.toDataURL());
	};

	const handleAddCollection = async () => {
		if (adding) return;

		setAdding(true);

		const img = new Image();
		img.onload = function() {
			clipImage(img, async (logodata) => {
				try {
					const { data: nonce } = await getNonce(account, authToken);

					let signature;
					let signatureAddress;

					try {
						const signer = await getSigner(library);
						const msg = `Approve Signature on Rhapsody with nonce ${nonce}`;

						signature = await signer.signMessage(msg);
						signatureAddress = ethers.utils.verifyMessage(msg, signature);
					} catch (err) {
						toast({
							status: "error",
							title:
								"You need to sign the message to be able to add a collection.",
						});
						setAdding(false);
						return;
					}

					const formData = new FormData();
					formData.append("name", name);
					formData.append("imgData", logodata);
					const result = await axios({
						method: "post",
						url: `${apiUrl}/ipfs/uploadCollectionImage2Server`,
						data: formData,
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${authToken}`,
							...corsHeader
						},
					});

					const imageHash = result.data.data;

					const tx = await createDrop(
						selected[0].address,
						photos?.length,
						account
					);
					const res = await tx.wait();
					res.events.map(async (evt) => {
						if (
							evt.topics[0] ===
							"0x01a6d33d95d2560a8c53f00317beb1d0364b3ecf2d43f647d2b4671df27f4f45"
						) {
							// Get the Drop ID
							const _dropId = ethers.utils.hexDataSlice(evt.data, 0);
							const dropId = ethers.BigNumber.from(_dropId).toNumber();

							// Call setAuction or createSale
							const _tx =
								selectedMintType[0] === "Dutch Auction"
									? await setAuction(
											dropId,
											ethers.utils.parseEther(startingPrice.toString()),
											ethers.utils.parseEther(decreasingConstant.toString()),
											Math.floor(dropTime.valueOf() / 1000),
											auctionPeriod,
											account
									  )
									: await createSale(
											dropId,
											ethers.utils.parseEther(mint.toString()),
											Math.floor(dropTime.valueOf() / 1000),
											maxMintPerWallet,
											account
									  );

							await _tx.wait();

							// Set the Drop IPFS
							const __tx = await setDropIPFS(dropId, metadataHash, account);
							await __tx.wait();

							// Finally add the collection to the DB
							const data = {
								dropId,
								collectionName: name,
								season: season?.length > 0 ? season : selectedSeason[0].name,
								verbatim,
								verbatimAuthor,
								copyRights,
								teasingDate: teasingTime,
								releaseDate: dropTime,
								mintPrice: mint,
								maxMintPerWallet,
								mintMode: selectedMintType[0] === "Dutch Auction" ? "0" : "1",
								description,
								artists: [selected[0]._id],
								logoImageHash: imageHash,
								metadataHash,
								totalSupply: photos?.length,
								signature,
								signatureAddress,
								address: account
							};

							await axios({
								method: "post",
								url: `${apiUrl}/collection/collectionDetails`,
								data: JSON.stringify(data),
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${authToken}`,
									...corsHeader
								},
							});

							toast({
								status: "success",
								title: "Collection added!",
								description:
									"The collection has successfuly been added to Rhapsody.",
							});
							setAdding(false);
						} else {
							toast({
								status: "error",
								title: "Tx didn't pass!",
								description: "The collection was not added to Rhapsody.",
							});
						}
					});

					// history.push("/");
				} catch (e) {
					console.log("Error: ", e);
					setAdding(false);
				}
			});
		};
		img.src = logo;
	};

	const uploadOnIPFS = async (_file) => {
		// initialize the form data
		const formData = new FormData();

		// append the file form data to
		formData.append("file", _file);
		console.log(_file);

		// call the keys from .env
		const API_KEY = process.env.REACT_APP_PINATA_API_KEY;
		const API_SECRET = process.env.REACT_APP_PINATA_SECRET_API_KEY;

		// the endpoint needed to upload the file
		const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

		const response = await axios.post(url, formData, {
			maxContentLength: "Infinity",
			headers: {
				"Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
				pinata_api_key: API_KEY,
				pinata_secret_api_key: API_SECRET,
				...corsHeader
			},
		});

		return response.data.IpfsHash;
	};

	return (
		<>
			<Header />
			<Flex
				width={{ base: "90%", lg: "80%" }}
				minHeight={"80vh"}
				flexDirection='column'
				justifyContent='center'
				alignItems={"center"}
				paddingTop={"85px"}
				margin='auto'
				gridGap={"24px"}
				zIndex='1'
				paddingBottom={"100px"}>
				<div className={styles.inputGroup}>
					<div className={styles.inputWrapper}>
						<div className={styles.logoUploadBox}>
							{logo ? (
								<>
									<img src={logo} alt='Collection Logo' />
									<div className={styles.removeOverlay}>
										<div className={styles.removeIcon} onClick={removeImage}>
											<img src={closeIcon} alt='CloseIcon' />
										</div>
									</div>
								</>
							) : (
								<div
									className={styles.uploadOverlay}
									onClick={() => inputRef.current?.click()}>
									<input
										ref={inputRef}
										type='file'
										accept='image/*'
										hidden
										onChange={handleFileSelect}
									/>
									<div className={styles.upload}>
										<img
											src={addImage}
											style={{ width: "25px", margin: "auto" }}
											alt='AddImage'
										/>
										<div className={styles.uploadInner}>
											Ajouter image de Collection
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Nom de la Collection</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, nameError && styles.hasError)}
							maxLength={40}
							placeholder='Nom de la collection'
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={validateName}
						/>
						<div className={styles.lengthIndicator}>{name.length}/40</div>
						{nameError && <div className={styles.error}>{nameError}</div>}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Saison</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, nameError && styles.hasError)}
							maxLength={40}
							placeholder='Nouvelle saison'
							value={season}
							disabled={selectedSeason}
							onBlur={validateSeasonName}
							onChange={(e) => setSeason(e.target.value)}
						/>
						{seasonError && <div className={styles.error}>{seasonError}</div>}
						<div className={styles.lengthIndicator}>{season.length}/40</div>
						<div className={styles.inputWrapper}>
							<Select
								options={seasonList}
								clearable
								disabled={season.length !== 0 }
								values={selectedSeason}
								onChange={([col]) => {
									setSelectedSeason(col ? [col]: null);
								}}
								className={styles.input}
								itemRenderer={({ item, methods }) => (
									<div
										key={item._id}
										className={styles.collectionInput}
										onClick={() => {
											methods.clearAll();
											methods.addItem(item);
										}}>
										<div className={styles.collectionName}>
											{item.name}
										</div>
									</div>
								)}
								contentRenderer={({ props: { values } }) =>
									values?.length > 0 ? (
										<div className={styles.collection}>
											<div className={styles.collectionName}>
												{values[0].name}
											</div>
										</div>
									) : (
										<div className={styles.collection}><div className={styles.seasonPlaceholder}>Choisir une season existante</div></div>
									)
								}
							/>
						</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Verbatim</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input)}
							maxLength={200}
							placeholder='Verbatim'
							value={verbatim}
							onChange={(e) => setVerbatim(e.target.value)}
						/>
						<div className={styles.lengthIndicator}>{verbatim.length}/200</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Verbatim Author</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input)}
							maxLength={50}
							placeholder='Verbatim Author'
							value={verbatimAuthor}
							onChange={(e) => setVerbatimAuthor(e.target.value)}
						/>
						<div className={styles.lengthIndicator}>
							{verbatimAuthor.length}/50
						</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Droit d'auteur</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input)}
							maxLength={50}
							placeholder="Droit d'auteur"
							value={copyRights}
							onChange={(e) => setCopyRights(e.target.value)}
						/>
						<div className={styles.lengthIndicator}>
							{copyRights.length}/50
						</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Artiste</div>
					<div className={styles.inputWrapper}>
						<Select
							options={artists}
							// disabled={isMinting}
							values={selected}
							onChange={([col]) => {
								setSelected([col]);
								// setNft(col.erc721Address);
								// setType(col.type);
							}}
							className={styles.input}
							placeholder='Choose Artist'
							itemRenderer={({ item, methods }) => (
								<div
									key={item._id}
									className={styles.collectionInput}
									onClick={() => {
										methods.clearAll();
										methods.addItem(item);
									}}>
									<img
										src={`https://cloudflare-ipfs.com/ipfs/${item.imageHash}`}
										alt='artist-img'
										className={styles.collectionLogo}
									/>
									<div className={styles.collectionName}>
										{item.firstname + " " + item.lastname}
									</div>
								</div>
							)}
							contentRenderer={({ props: { values } }) =>
								values?.length > 0 ? (
									<div className={styles.collection}>
										<img
											src={`https://cloudflare-ipfs.com/ipfs/${values[0].imageHash}`}
											className={styles.collectionLogo}
											alt='artist-img'
										/>
										<div className={styles.collectionName}>
											{values[0].firstname + " " + values[0].lastname}
										</div>
									</div>
								) : (
									<div className={styles.collection} />
								)
							}
						/>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Mint Type</div>
					<div className={styles.inputWrapper}>
						<Select
							options={["Dutch Auction", "Sale"]}
							// disabled={isMinting}
							values={selectedMintType}
							onChange={([value]) => {
								setSelectedMintType([value]);
								// console.log(selectedMintType);
								// setNft(col.erc721Address);
								// setType(col.type);
							}}
							className={styles.input}
							placeholder='Choose Mint Type'
							itemRenderer={({ item, methods }) => (
								<div
									key={item}
									className={styles.collectionInput}
									onClick={() => {
										methods.clearAll();
										methods.addItem(item);
									}}>
									<div className={styles.collectionName}>{item}</div>
								</div>
							)}
							contentRenderer={({ props: { values } }) =>
								values?.length > 0 ? (
									<div className={styles.collection}>
										<div className={styles.collectionName}>{values[0]}</div>
									</div>
								) : (
									<div className={styles.collection} />
								)
							}
						/>
					</div>
				</div>
				<div className={styles.inputGroup}>
					{selectedMintType[0] === "Dutch Auction" && (
						<>
							<div className={styles.inputGroup}>
								<div className={styles.inputTitle}>Prix de depart (ETH)</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										max={200}
										placeholder='Prix de depart'
										value={startingPrice}
										onChange={(e) => setStartingPrice(e.target.valueAsNumber)}
										type='number'
									/>
									<div className={styles.lengthIndicator}>
										{startingPrice}/200
									</div>
								</div>
							</div>
							<div className={styles.inputGroup}>
								<div className={styles.inputTitle}>
									Facteur de decroissance (ETH/s)
								</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										placeholder='Facteur de decroissance'
										value={decreasingConstant}
										onChange={(e) =>
											setDecreasingConstant(e.target.valueAsNumber)
										}
										type='number'
									/>
									<div className={styles.lengthIndicator}>
										{decreasingConstant}/200
									</div>
								</div>
							</div>
							{/* <div className={styles.inputGroup}>
								<div className={styles.inputTitle}>
									Debut de l'enchere (UNIX timestamp)
								</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										placeholder='Debut de l"enchere'
										value={auctionStart}
										onChange={(e) => setAuctionStart(e.target.valueAsNumber)}
										type='number'
									/>
								</div>
							</div> */}
							<div className={styles.inputGroup}>
								<div className={styles.inputTitle}>Duree (s)</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										placeholder='Duree de l"enchere'
										value={auctionPeriod}
										onChange={(e) => setAuctionPeriod(e.target.valueAsNumber)}
										type='number'
									/>
								</div>
							</div>
						</>
					)}
					{selectedMintType[0] === "Sale" && (
						<>
							<div className={styles.inputGroup}>
								<div className={styles.inputTitle}>Prix de la vente (ETH)</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										max={200}
										placeholder='Prix de la vente'
										value={mint}
										onChange={(e) => setMint(e.target.valueAsNumber)}
										type='number'
									/>
									<div className={styles.lengthIndicator}>{mint}/200</div>
								</div>
							</div>
							{/* <div className={styles.inputGroup}>
								<div className={styles.inputTitle}>
									Debut de la vente (UNIX timestamp)
								</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, null && styles.hasError)}
										placeholder='Debut de la vente'
										value={saleStart}
										onChange={(e) => setSaleStart(e.target.valueAsNumber)}
										type='number'
									/>
								</div>
							</div> */}
							<div className={styles.inputGroup}>
								<div className={styles.inputTitle}>
									Nb max de mint par wallet
								</div>
								<div className={styles.inputWrapper}>
									<input
										className={cx(styles.input, walletError && styles.hasError)}
										max={200}
										placeholder='Limite de mint par wallet'
										value={maxMintPerWallet}
										onChange={(e) =>
											setMaxMintPerWallet(e.target.valueAsNumber)
										}
										onBlur={validateMaxMintPerWallet}
										type='number'
									/>
									<div className={styles.lengthIndicator}>
										{maxMintPerWallet}/200
									</div>
									{walletError && (
										<div className={styles.error}>{walletError}</div>
									)}
								</div>
							</div>
						</>
					)}
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Description</div>
					<div className={styles.inputWrapper}>
						<textarea
							className={cx(
								styles.input,
								styles.longInput,
								descriptionError && styles.hasError
							)}
							maxLength={200}
							placeholder='Information Complémentaire'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							onBlur={validateDescription}
						/>
						<div className={styles.lengthIndicator}>
							{description.length}/200
						</div>
						{descriptionError && (
							<div className={styles.error}>{descriptionError}</div>
						)}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Date affichage teasing</div>
					<div className={styles.inputWrapper}>
						<Datetime
							value={teasingTime}
							className={"calendarAboveInput"}
							onChange={(val) => setTeasingTime(val.toDate())}
							inputProps={{
								className: styles.input,
								onKeyDown: (e) => e.preventDefault(),
								// disabled: auctionStarted || contractApproving || confirming,
							}}
							closeOnSelect
							isValidDate={(cur) =>
								cur.valueOf() > now.getTime() - 1000 * 60 * 60 * 24
							}
						/>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Date du drop</div>
					<div className={styles.inputWrapper}>
						<Datetime
							value={dropTime}
							className={"calendarAboveInput"}
							onChange={(val) => setDropTime(val.toDate())}
							inputProps={{
								className: styles.input,
								onKeyDown: (e) => e.preventDefault(),
								// disabled: auctionStarted || contractApproving || confirming,
							}}
							closeOnSelect
							isValidDate={(cur) =>
								cur.valueOf() > now.getTime() - 1000 * 60 * 60 * 24
							}
						/>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputWrapper}>
						{
							photos?.length &&
								photos.map(({photo, description}, idx) =>
									 <div className={styles.imageDescription}>
										<div className={styles.logoUploadBox}>
											<img src={photo.src} alt='collection-photograph' />
											<div className={styles.removeOverlay}>
												<div className={styles.removeIcon} onClick={() => removePhotos(idx)}>
													<img src={closeIcon} alt='CloseIcon' />
												</div>
											</div>
										</div>
										<textarea
											className={cx(
												styles.input,
												styles.longInput,
												styles.imgDescriptionDivider
											)}
											maxLength={200}
											placeholder='Information Complémentaire'
											value={description}
											onChange={(e) => setPhotos(oldPhotos => {
												oldPhotos[idx].description = e.target.value;
												return [...oldPhotos];
											})}
										/>
									</div>
								)

						}
						{(!photos || photos.length === 0) && (
							<div className={styles.logoUploadBox}>
								<div
									className={styles.uploadOverlay}
									onClick={() => inputPhotoRef.current?.click()}>
									<input
										ref={inputPhotoRef}
										type='file'
										accept='image/*'
										hidden
										onChange={handlePhotoSelect}
										multiple
									/>
									<div className={styles.upload}>
										<img
											src={addImage}
											style={{ width: "25px", margin: "auto" }}
											alt='AddImage'
										/>
										<div className={styles.uploadInner}>Ajouter une image</div>
									</div>
								</div>

						</div>
						)}
						{photos && (
							<Button
								fontSize={"sm"}
								fontWeight={600}
								fontFamily={"Inter"}
								color={"white"}
								bg={"#000"}
								borderRadius='0px'
								width={"200px"}
								height={"64px"}
								mt={5}
								style={{ marginInlineStart: "unset" }}
								_hover={{
									transform: "translate3d(4px,4px,0px)",
								}}
								className={cx(uploading && styles.disabled)}
								onClick={generateMetadataAndUpload}>
								{uploading ? (
									<ClipLoader color='#FFF' size={16} />
								) : (
									"Generate & Upload"
								)}
							</Button>
						)}
						{metadataHash && <div>{metadataHash}</div>}
					</div>
				</div>
				{metadataHash && (
					<Flex border={"1px solid #000"} width='200px' marginRight={"auto"}>
						<Button
							fontSize={"sm"}
							fontWeight={600}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							width={"200px"}
							height={"64px"}
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}
							onClick={handleAddCollection}>
							{adding ? "Adding.." : "Add Collection"}
						</Button>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default AddCollection;
