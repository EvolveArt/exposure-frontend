/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Header from "components/Header";
import { Button, Flex } from "@chakra-ui/react";
import addImage from "../../assets/imgs/addImage.png";
import closeIcon from "assets/svgs/close.svg";
import Select from "react-dropdown-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const AddCollection = () => {
	const [logo, setLogo] = useState(null);
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState(null);
	const [wallet, setWallet] = useState("");
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
	const [instagram, setInstagram] = useState("");
	const [instagramError, setInstagramError] = useState(null);

	const removeImage = () => {
		setLogo(null);
	};
	const inputRef = useRef(null);

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

	const validateWallet = () => {
		if (wallet.length !== 42) {
			setWalletError("Wrong size of address");
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

	const validateInstagram = () => {
		if (instagram.length === 0) {
			setInstagramError("This field can't be blank");
		} else {
			setInstagramError("");
		}
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
				{/* <div className={styles.formGroup}>
          <div className={styles.inputGroup} />
          <div className={styles.inputTitle}>Artiste</div>
          <div className={styles.inputWrapper} />
          <Select
            options={artists}
            disabled={isMinting}
            values={selected}
            onChange={([col]) => {
              setSelected([col]);
              setNft(col.erc721Address);
              setType(col.type);
            }}
            className={styles.select}
            placeholder="Choose Artist"
            itemRenderer={({ item, methods }) => (
              <div
                key={item.erc721Address}
                className={styles.collectionInput}
                onClick={() => {
                  methods.clearAll();
                  methods.addItem(item);
                }}
              >
                <img
                  src={`https://cloudflare-ipfs.com/ipfs/${item.logoImageHash}`}
                  className={styles.collectionLogo}
                />
                <div className={styles.collectionName}>
                  {item.collectionName}
                </div>
              </div>
            )}
            contentRenderer={({ props: { values } }) =>
              values.length > 0 ? (
                <div className={styles.collection}>
                  <img
                    src={`https://cloudflare-ipfs.com/ipfs/${values[0].logoImageHash}`}
                    className={styles.collectionLogo}
                  />
                  <div className={styles.collectionName}>
                    {values[0].collectionName}
                  </div>
                </div>
              ) : (
                <div className={styles.collection} />
              )
            }
          />
        </div> */}
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
										<div className={styles.uploadInner}>Ajouter une image</div>
									</div>
								</div>
							)}
						</div>
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
						}}>
						Add Artist
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default AddCollection;
