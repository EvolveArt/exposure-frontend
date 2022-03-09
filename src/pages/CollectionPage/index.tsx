import {
	Button,
	Flex,
	Image,
	Text,
	Link,
	useRadio,
	useRadioGroup,
	Box,
	HStack,
} from "@chakra-ui/react";
import React, { Suspense, useEffect, useState } from "react";

import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import mintType from "../../assets/imgs/mintType.png";
import agenda from "../../assets/imgs/agenda.png";
import available from "../../assets/imgs/available.png";
import largeGrid from "../../assets/imgs/largegrid.png";
import smallGrid from "../../assets/imgs/smallgrid.png";
import ether from "../../assets/imgs/ether.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useApi } from "api";
// eslint-disable-next-line
import { Collection } from "interfaces";
import { formatError, formatName, getRandomIPFS } from "utils";
// import showToast from "utils/toast";
import { useSalesContract } from "contracts";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import Loader from "react-loader-spinner";
import SuspenseImg from "components/SuspenseImg";
import styles from "./styles.module.scss";

const TopPage = (collection: Collection) => {
	const { purchase, purchaseThroughAuction, getPrice } = useSalesContract();
	const [minting, setMinting] = useState(false);
	const [auctionPrice, setAuctionPrice] = useState("");
	const { account } = useWeb3React();

	const toast = useToast();

	const handleMint = async () => {
		if (minting) return;
		setMinting(true);

		try {
			if (collection?.mintMode === 0) {
				const tx = await purchaseThroughAuction(
					collection.dropId,
					ethers.utils.parseEther(collection.mintPrice.toString()),
					account
				);
				await tx.wait();
			} else {
				const tx = await purchase(
					collection.dropId,
					1,
					ethers.utils.parseEther(collection.mintPrice.toString()),
					account
				);
				await tx.wait();
			}
			toast({ status: "success", title: "NFT Minted!" });
			setMinting(false);
		} catch (error) {
			console.error(error);
			toast({ status: "error", title: formatError(error) });
			setMinting(false);
		}
	};

	const updateAuctionPrice = async () => {
		if (collection?.dropId === undefined) return;
		let _currentPrice = await getPrice(collection?.dropId);
		setAuctionPrice(_currentPrice);
	};

	useEffect(() => {
		const _intervalId = setInterval(() => updateAuctionPrice(), 5000);

		return () => clearInterval(_intervalId);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collection?.mintMode]);

	return (
		<>
			<Flex
				width={{ base: "90%", lg: "80%" }}
				minHeight={"80vh"}
				flexDirection={{ base: "column", md: "row" }}
				justifyContent='center'
				alignItems={"center"}
				paddingTop={"85px"}
				margin='auto'
				gridGap={"24px"}
				zIndex='1'
				paddingBottom={"100px"}
				position='relative'>
				<Flex
					width={{
						base: "100%",
						md: "calc(50% - 12px)",
						lg: "calc(40% - 12px)",
					}}
					height={{ base: "fit-content", md: "80vh" }}
					paddingTop={{ base: "50px", md: "unset" }}
					paddingBottom={{ base: "50px", md: "unset" }}
					justifyContent={{ base: "center", md: "end" }}
					alignItems='center'
					position='relative'>
					<Image
						src={getRandomIPFS(`ipfs://${collection?.logoImageHash}`)}></Image>
					<Image
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						top={"0"}
						left='0'></Image>
					<Image
						display={{ base: "unset", md: "none" }}
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						top={"0"}
						right={{ base: "0", md: "-35px" }}></Image>
					<Image
						display={{ base: "unset", md: "none" }}
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						bottom={"-65px"}
						right='0'></Image>
					<Image
						display={{ base: "unset", md: "none" }}
						src={ticon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						top={"14px"}
						left='0'
						right='0'
						marginLeft='auto'
						marginRight='auto'></Image>
					<Image
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						bottom={"0"}
						left='0'></Image>
				</Flex>
				<Flex
					flexDirection={"column"}
					width={{
						base: "100%",
						md: "calc(50% - 12px)",
						lg: "calc(60% - 12px)",
					}}
					height={{ base: "fit-content", md: "80vh" }}
					justifyContent='center'
					position='relative'
					paddingBottom={{ base: "50px", md: "unset" }}
					paddingTop='50px'>
					<Image
						display={{ base: "none", md: "unset" }}
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						top={"0"}
						right='0px'></Image>
					<Image
						display={{ base: "unset", md: "none" }}
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						bottom={"0"}
						left='0px'></Image>
					<Image
						src={addIcon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						bottom={{ base: "0", md: "-65px" }}
						right='0px'></Image>
					<Image
						display={{ base: "unset", md: "none" }}
						src={ticon}
						opacity='0.1'
						width={"27px"}
						position='absolute'
						transform={"rotate(180deg)"}
						bottom={"14px"}
						left='0'
						right='0'
						marginLeft='auto'
						marginRight='auto'></Image>
					<Text
						fontFamily='Inter'
						fontStyle='normal'
						fontWeight='800'
						fontSize='30px'
						lineHeight='56px'
						paddingBottom={"4px"}>
						{collection?.collectionName}
					</Text>
					<Text
						fontFamily='Inter'
						fontStyle='normal'
						fontWeight='normal'
						fontSize={"16px"}
						lineHeight='28px'
						paddingBottom={"24px"}>
						By {formatName(collection?.artists[0])}
					</Text>
					<Text
						fontFamily='Inter'
						fontStyle='normal'
						fontWeight='normal'
						fontSize={"16px"}
						lineHeight='28px'
						paddingBottom={"26px"}>
						{collection?.description}
					</Text>
					<Flex flexDirection={"row"} gridGap='9px'>
						<Image src={mintType} width='29px' height='29px' />
						<Text
							fontFamily='Inter'
							fontStyle='normal'
							fontWeight='normal'
							fontSize='16px'
							lineHeight='28px'
							paddingBottom={"17px"}>
							{collection?.mintMode === 0 ? "Dutch Auction" : "Random Mint"}
						</Text>
					</Flex>
					<Flex flexDirection={"row"} gridGap='9px'>
						<Image src={ether} width='29px' height='29px' />
						<Text
							fontFamily='Inter'
							fontStyle='normal'
							fontWeight='normal'
							fontSize='16px'
							lineHeight='28px'
							paddingBottom={"17px"}>
							Mint price -{" "}
							<span style={{ fontWeight: "800" }}>
								{collection?.mintMode === 0
									? ethers.utils.formatEther(auctionPrice)
									: collection?.mintPrice}{" "}
								ETH
							</span>
						</Text>
					</Flex>
					<Flex flexDirection={"row"} gridGap='9px'>
						<Image src={available} width='29px' height='29px' />
						<Text
							fontFamily='Inter'
							fontStyle='normal'
							fontWeight='normal'
							fontSize='16px'
							lineHeight='28px'
							paddingBottom={"17px"}>
							Mint available -{" "}
							<span style={{ fontWeight: "800" }}>
								0 / {collection?.totalSupply}
							</span>
						</Text>
					</Flex>
					<Flex flexDirection={"row"} gridGap='9px'>
						<Image src={agenda} width='29px' height='29px' />
						<Text
							fontFamily='Inter'
							fontStyle='normal'
							fontWeight='normal'
							fontSize='16px'
							lineHeight='28px'
							paddingBottom={"35px"}>
							Release date -{" "}
							<span style={{ fontWeight: "800" }}>
								{new Date(collection?.releaseDate || "").toString()}
							</span>{" "}
							{/* at{" "}
							<span style={{ fontWeight: "800" }}>
								{collection?.releaseDate} GMT
							</span> */}
						</Text>
					</Flex>
					<Flex border={"1px solid #000"} width='100%'>
						<Button
							fontSize={"16px"}
							lineHeight='20px'
							fontWeight={"700"}
							fontFamily={"Inter"}
							color={"white"}
							bg={"#000"}
							borderRadius='0px'
							width={"100%"}
							height={"64px"}
							style={{ marginInlineStart: "unset" }}
							_hover={{
								transform: "translate3d(4px,4px,0px)",
							}}
							onClick={handleMint}>
							{minting ? "Minting..." : "Mint"}
						</Button>
					</Flex>
					<Link fontWeight={"700"} margin='auto' paddingTop={"29px"}>
						See collection on Opensea
					</Link>
				</Flex>
				<Image
					display={{ base: "none", md: "unset" }}
					src={addIcon}
					opacity='0.1'
					width={"27px"}
					position='absolute'
					top={"83px"}
					left='0'
					right='0'
					marginLeft='auto'
					marginRight='auto'></Image>
			</Flex>
			<Flex
				width={{ base: "90%", lg: "80%" }}
				flexDirection='column'
				justifyContent='center'
				alignItems={"center"}
				margin='auto'
				zIndex='1'
				border='solid 2px #000'>
				<Text
					fontWeight='800'
					fontSize={{ base: "30px", md: "40px" }}
					lineHeight={{ base: "40px", md: "53px" }}
					textAlign={"center"}
					paddingTop='25px'
					paddingLeft='32px'
					paddingRight={"32px"}
					paddingBottom='20px'>
					{collection?.description}
				</Text>
				<Text paddingBottom={"25px"} fontSize='16px' lineHeight={"28px"}>
					{formatName(collection?.artists[0])}
				</Text>
			</Flex>
		</>
	);
};

function RadioCard(props: any) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				_checked={{
					filter: "brightness(0) saturate(100%)",
				}}
				padding='5px'>
				{props.children}
			</Box>
		</Box>
	);
}

const CollectionPage = () => {
	const options = [largeGrid, smallGrid];
	const [currentCollection, setCurrentCollection] = useState<Collection | null>(
		null
	);

	const { getCollectionInfo } = useApi();

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "framework",
		defaultValue: "react",
		onChange: console.log,
	});

	const { dropId }: any = useParams();

	useEffect(() => {
		const fetchCurrentCollection = async () => {
			const _collection: any = await getCollectionInfo(dropId);
			// console.log(_collection);
			setCurrentCollection(_collection.data);
		};

		if (dropId) {
			fetchCurrentCollection();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropId]);

	const group = getRootProps();
	return (
		<div>
			<Header />
			{TopPage(currentCollection as Collection)}
			<Flex
				position='relative'
				margin={"auto"}
				width={{ base: "88vw", lg: "80vw" }}
				marginTop='90px'>
				<Text
					fontFamily='Inter'
					fontStyle='normal'
					fontWeight='bold'
					fontSize='30px'
					lineHeight='56px'
					paddingBottom={"32px"}
					marginLeft='10px'>
					Available photographs
				</Text>
				{[]
					.fill(0 as never, 0, currentCollection?.totalSupply)
					.map((elem, index) => {
						return (
							<Suspense
								fallback={
									<Loader type='Oval' color='rgb(109, 186, 252)' height={32} />
								}>
								<SuspenseImg
									src={getRandomIPFS(
										`ipfs://${currentCollection?.metadataHash}/${index}.png`
									)}
									className={styles.media}
									alt={`Photo ${index}`}
								/>
							</Suspense>
						);
					})}
				<HStack
					{...group}
					position='absolute'
					right='0'
					top='15px'
					display={{ base: "none", md: "flex" }}
					flexDirection='row'>
					{options.map((value) => {
						const radio = getRadioProps({ value });
						return (
							<RadioCard key={value} {...radio}>
								<Image
									src={value}
									filter='brightness(0) saturate(100%) invert(79%) sepia(0%) saturate(1169%) hue-rotate(47deg) brightness(93%) contrast(90%)'></Image>
							</RadioCard>
						);
					})}
				</HStack>
			</Flex>
			<Footer />
		</div>
	);
};

export default CollectionPage;
