/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Header from "components/Header";
import { Button, Flex } from "@chakra-ui/react";
import addImage from "../../assets/imgs/addImage.png";
import closeIcon from "assets/svgs/close.svg";
import Select from "react-dropdown-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useApi } from "api";
import "./styles.css";
import { ethers } from "ethers";
import toast from "utils/toast";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { getSigner } from "contracts";
import { ClipLoader } from "react-spinners";
import { formatName } from "utils";
// import { kebabCase } from "lodash";

const AddCollection = () => {
	const [logo, setLogo] = useState(null);
	const [metadataHash, setMetadataHash] = useState(null);
	const [photos, setPhotos] = useState(null);
	const [name, setName] = useState("");
	const [adding, setAdding] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [nameError, setNameError] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState(null);
	const [maxMintPerWallet, setMaxMintPerWallet] = useState(1);
	const [walletError, setWalletError] = useState(null);
	const [mint, setMint] = useState("");
	const [mintError, setMintError] = useState(null);
	const [teasingTime, setTeasingTime] = useState(
		new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	);
	const [dropTime, setDropTime] = useState(
		new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	);
	const [now, setNow] = useState(new Date());

	const { getAllArtists, apiUrl, getNonce } = useApi();

	const [artists, setArtists] = useState([]);
	const [selected, setSelected] = useState(null);

	const { account, library } = useWeb3React();
	const { authToken } = useSelector((state) => state.ConnectWallet);

	const generateMetadata = async (
		_name,
		_description,
		_image,
		_artist,
		_collection
	) => {
		// Upload image on ipfs
		let ipfsHash = await uploadOnIPFS(_image);

		let tempMetadata = {
			name: _name,
			description: _description,
			external_url: "https://exposure.art",
			image: `ipfs://${ipfsHash}`,
			attributes: [
				{ trait_type: "Artist", value: _artist },
				{ trait_type: "Collection", value: _collection },
			],
		};

		return tempMetadata;
	};

	const removeImage = () => {
		setPhotos(null);
	};

	const inputRef = useRef(null);
	const inputPhotoRef = useRef(null);

	useEffect(() => {
		const updateArtists = async () => {
			const _artists = await getAllArtists();
			setArtists(_artists.data);
		};
		updateArtists();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			setPhotos(res);
		}
	};

	const generateMetadataAndUpload = async () => {
		if (uploading) return;
		setUploading(true);

		try {
			let metadatas = [];
			for (const photo of photos) {
				const metadata = await generateMetadata(
					photo.name,
					description,
					photo.file,
					formatName(selected[0]),
					name
				);
				metadatas.push(metadata);
			}
			console.log(JSON.stringify(metadatas));
			const result = await axios({
				method: "post",
				url: `${apiUrl}/ipfs/uploadMetadata2Server`,
				data: JSON.stringify(metadatas),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
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

	const clipImage = (image, clipX, clipY, clipWidth, clipHeight, cb) => {
		// const CANVAS_SIZE = 128;
		const canvas = document.createElement("canvas");
		canvas.width = 1280;
		canvas.height = 720;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight, 0, 0, 1280, 720);
		cb(canvas.toDataURL());
	};

	const handleAddCollection = async () => {
		if (adding) return;

		setAdding(true);

		const img = new Image();
		img.onload = function() {
			const w = this.width;
			const h = this.height;
			const size = Math.min(w, h);
			const x = (w - size) / 2;
			const y = (h - size) / 2;
			clipImage(img, x, y, size, size, async (logodata) => {
				try {
					const { data: nonce } = await getNonce(account, authToken);

					let signature;
					let signatureAddress;

					try {
						const signer = await getSigner(library);
						const msg = `Approve Signature on Exposure with nonce ${nonce}`;

						signature = await signer.signMessage(msg);
						signatureAddress = ethers.utils.verifyMessage(msg, signature);
					} catch (err) {
						toast(
							"error",
							"You need to sign the message to be able to add a collection."
						);
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
						},
					});

					const imageHash = result.data.data;
					const data = {
						collectionName: name,
						teasingDate: teasingTime,
						releaseDate: dropTime,
						mintPrice: mint,
						maxMintPerWallet,
						mintMode: 0,
						description,
						artists,
						logoImageHash: imageHash,
						signature,
						signatureAddress,
					};

					await axios({
						method: "post",
						url: `${apiUrl}/collection/collectionDetails`,
						data: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					});

					toast(
						"success",
						"Collection added!",
						"The collection has successfuly been added to Exposure."
					);

					setAdding(false);

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
					<div className={styles.inputTitle}>Nb max de mint par wallet</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, walletError && styles.hasError)}
							max={200}
							placeholder='Wallet Address'
							value={maxMintPerWallet}
							onChange={(e) => setMaxMintPerWallet(e.target.valueAsNumber)}
							onBlur={validateMaxMintPerWallet}
							type='number'
						/>
						<div className={styles.lengthIndicator}>{maxMintPerWallet}/200</div>
						{walletError && <div className={styles.error}>{walletError}</div>}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Prix du Mint</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, mintError && styles.hasError)}
							maxLength={10}
							placeholder='Prix du Mint (ETH)'
							value={mint}
							onChange={(e) => setMint(e.target.value)}
							onBlur={validateMint}
						/>
						<div className={styles.lengthIndicator}>{mint.length}/10</div>
						{mintError && <div className={styles.error}>{mintError}</div>}
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
						<div className={styles.logoUploadBox}>
							{photos ? (
								<>
									<img src={photos[0].src} alt='collection-photograph' />
									<div className={styles.removeOverlay}>
										<div className={styles.removeIcon} onClick={removeImage}>
											<img src={closeIcon} alt='CloseIcon' />
										</div>
									</div>
								</>
							) : (
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
							)}
						</div>
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
