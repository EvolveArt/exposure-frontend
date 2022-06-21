import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Header from "components/Header";
import { Button, Flex, Image as ChakraImage, useToast } from "@chakra-ui/react";
// import addImage from "../../assets/imgs/addImage.png";
import { addImage } from "../../constants/cdn.constants";
import closeIcon from "assets/svgs/close.svg";
import axios from "axios";
import { ethers } from "ethers";
import { useApi } from "api";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
// import { useHistory } from "react-router-dom";
// import toast from "utils/toast";
import { getSigner } from "contracts";
import { ClipLoader } from "react-spinners";
import { ADMIN_ADDRESSES } from "constants/index";
import { useHistory } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import arrowButton from "../../assets/imgs/ArrowButton.png";

const corsHeader = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"Origin, X-Requested-With, Content-Type, Accept",
};

const AddArtist = () => {
	const [logoFile, setLogoFile] = useState(null);
	const [logoIMG, setLogoIMG] = useState(null);
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(null);
	const [surname, setSurname] = useState("");
	const [surnameError, setSurnameError] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState(null);
	const [wallet, setWallet] = useState("");
	const [walletError, setWalletError] = useState(null);
	const [twitter, setTwitter] = useState("");
	const [twitterError, setTwitterError] = useState(null);
	const [instagram, setInstagram] = useState("");
	const [instagramError, setInstagramError] = useState(null);
	const [adding, setAdding] = useState(false);

	const history = useHistory();
	const toast = useToast();

	const { account, library } = useWeb3React();
	const { apiUrl, getNonce } = useApi();
	const { authToken } = useSelector((state) => state.ConnectWallet);

	useEffect(() => {
		if (account && authToken) {
			if (!ADMIN_ADDRESSES.includes(account.toLowerCase()))
				history.replace("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, authToken]);

	const removeImage = () => {
		setLogoIMG(null);
	};
	const inputRef = useRef(null);

	const handleFileSelect = (e) => {
		if (e.target.files.length > 0) {
			const file = e.target.files[0];

			const reader = new FileReader();

			reader.onload = function(e) {
				setLogoFile(file);
				setLogoIMG(e.target.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const validateName = () => {
		if (name.length === 0) {
			setNameError("This field can't be blank");
		} else {
			setNameError("");
		}
	};

	const validateSurname = () => {
		if (surname.length === 0) {
			setSurnameError("This field can't be blank");
		} else {
			setSurnameError("");
		}
	};

	const validateDescription = () => {
		if (description.length === 0) {
			setDescriptionError("This field can't be blank");
		} else {
			setDescriptionError(null);
		}
	};

	const validateWallet = () => {
		if (wallet.length !== 42) {
			setWalletError("Wrong size of address");
		} else {
			setWalletError("");
		}
	};

	const validateTwitter = () => {
		if (twitter.length === 0) {
			setTwitterError("This field can't be blank");
		} else {
			setTwitterError("");
		}
	};

	const validateInstagram = () => {
		if (instagram.length === 0) {
			setInstagramError("This field can't be blank");
		} else {
			setInstagramError("");
		}
	};

	const isValid = (() => {
		if (!logoIMG) return false;
		if (nameError) return false;
		if (surnameError) return false;
		if (descriptionError) return false;
		if (twitterError) return false;
		if (instagramError) return false;
		if (walletError) return false;
		return true;
	})();

	const clipImage = (image, cb) => {
		// const CANVAS_SIZE = 128;
		const canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		cb(canvas.toDataURL());
	};

	const handleAddArtist = async () => {
		if (adding) return;

		setAdding(true);

		const img = new Image();
		img.onload = async function() {
			// const w = this.width;
			// const h = this.height;
			// const size = Math.min(w, h);
			// const x = (w - size) / 2;
			// const y = (h - size) / 2;
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
							staus: "error",
							title:
								"You need to sign the message to be able to add an artist.",
						});
						setAdding(false);
						return;
					}

					const formData = new FormData();
					formData.append("firstname", name);
					formData.append("address", wallet);
					formData.append("file", logoFile);
					// formData.append("ARWEAVE_KEY", process.env.REACT_APP_ARWEAVE_KEY);

					// const result = await axios({
					// 	method: "post",
					// 	url: `${process.env.REACT_APP_UPLOAD_API_URL}/arweave/image`,
					// 	data: formData,
					// 	maxContentLength: "Infinity",
					// 	maxBodyLength: "Infinity",
					// 	headers: {
					// 		"Content-Type": "multipart/form-data",
					// 		...corsHeader,
					// 	},
					// });

					const result = await axios({
						method: "post",
						url: `${apiUrl}/ipfs/uploadArtistImage2Server`,
						data: formData,
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${authToken}`,
						},
					});

					const imageHash = result.data.data;

					// const imageHash = result.data;
					console.log({ imageHash });

					const cdnLogoLink = await uploadOnCloudfare(logoFile, imageHash);
					console.log({ cdnLogoLink });

					const data = {
						address: wallet,
						firstname: name,
						lastname: surname,
						description,
						imageHash,
						twitter,
						instagram,
						signature,
						signatureAddress,
					};

					const resp = await axios({
						method: "post",
						url: `${apiUrl}/artist/artistDetails`,
						data: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					});

					if (resp.data.status === "failed") throw Error("Duplicate Values");

					toast({
						status: "success",
						title: "Artist added!",
						description: "The artist has successfuly been added to Rhapsody.",
					});

					setAdding(false);

					// history.push("/");
				} catch (e) {
					console.log("Error: ", e);
					setAdding(false);
				}
			});
		};
		img.src = logoIMG;
	};

	const uploadOnCloudfare = async (_file, id) => {
		const formData = new FormData();
		formData.append("file", _file);
		formData.append("id", id);

		try {
			const response = await axios({
				method: "post",
				url: `${process.env.REACT_APP_UPLOAD_API_URL}/cdn/image`,
				data: formData,
				maxContentLength: "Infinity",
				maxBodyLength: "Infinity",
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const cdnLink = response.data;
			return cdnLink;
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<>
			<Header />
			<ScrollToTop
				smooth
				color='#000'
				component={<ChakraImage src={arrowButton} />}
				style={{ background: "unset" }}
			/>
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
							{logoIMG ? (
								<>
									<img src={logoIMG} alt='ArtistImage' />
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
											Ajouter image de Profil
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Prenom</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, surnameError && styles.hasError)}
							maxLength={20}
							placeholder='Prenom Artiste'
							value={surname}
							onChange={(e) => setSurname(e.target.value)}
							onBlur={validateSurname}
						/>
						<div className={styles.lengthIndicator}>{surname.length}/20</div>
						{surnameError && <div className={styles.error}>{surnameError}</div>}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Nom</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, nameError && styles.hasError)}
							maxLength={20}
							placeholder='Nom Artiste'
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={validateName}
						/>
						<div className={styles.lengthIndicator}>{name.length}/20</div>
						{nameError && <div className={styles.error}>{nameError}</div>}
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
							maxLength={2000}
							placeholder='Information Complémentaire'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							onBlur={validateDescription}
						/>
						<div className={styles.lengthIndicator}>
							{description.length}/2000
						</div>
						{descriptionError && (
							<div className={styles.error}>{descriptionError}</div>
						)}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Wallet</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, walletError && styles.hasError)}
							maxLength={42}
							placeholder='Wallet Address'
							value={wallet}
							onChange={(e) => setWallet(e.target.value)}
							onBlur={validateWallet}
						/>
						<div className={styles.lengthIndicator}>{wallet.length}/42</div>
						{walletError && <div className={styles.error}>{walletError}</div>}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Twitter</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, twitterError && styles.hasError)}
							maxLength={100}
							placeholder='Twitter'
							value={twitter}
							onChange={(e) => setTwitter(e.target.value)}
							onBlur={validateTwitter}
						/>
						<div className={styles.lengthIndicator}>{twitter.length}/100</div>
						{twitterError && <div className={styles.error}>{twitterError}</div>}
					</div>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.inputTitle}>Instagram</div>
					<div className={styles.inputWrapper}>
						<input
							className={cx(styles.input, instagramError && styles.hasError)}
							maxLength={100}
							placeholder='Instagram'
							value={instagram}
							onChange={(e) => setInstagram(e.target.value)}
							onBlur={validateInstagram}
						/>
						<div className={styles.lengthIndicator}>{instagram.length}/100</div>
						{instagramError && (
							<div className={styles.error}>{instagramError}</div>
						)}
					</div>
				</div>
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
						className={cx((adding || !isValid) && styles.disabled)}
						onClick={isValid ? handleAddArtist : null}>
						{adding ? <ClipLoader color='#FFF' size={16} /> : "Add Artist"}
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default AddArtist;
