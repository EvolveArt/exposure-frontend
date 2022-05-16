import React, { useState } from "react";

import Modal from "../Modal";
import {
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Text,
	useToast,
} from "@chakra-ui/react";
import { formatError, formatName, getRandomIPFS } from "utils";
import ether from "../../assets/imgs/ether.png";
import styles from "./styles.module.scss";
import { useSalesContract } from "contracts";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useApi } from "api";
import { CheckIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

// eslint-disable-next-line no-undef
// const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

const MintModal = ({ visible, onClose, collection, price }: any) => {
	const [amountToMint, setAmountToMint] = useState(1);
	const [minting, setMinting] = useState(true);
	const [success, setSuccess] = useState(false);
	const { purchase, purchaseThroughAuction } = useSalesContract();
	const { account } = useWeb3React();
	const toast = useToast();
	const { updateMint } = useApi();

	const handleMint = async () => {
		if (minting) return;
		setMinting(true);

		try {
			// console.log(typeof collection?.mintMode);
			if (collection?.mintMode === "0") {
				const tx = await purchaseThroughAuction(
					collection?.dropId,
					ethers.utils.parseEther(price.toString()),
					account
				);
				await tx.wait();
			} else {
				const _price = Number(collection?.mintPrice) * amountToMint;
				const tx = await purchase(
					collection?.dropId,
					amountToMint,
					ethers.utils.parseEther(_price.toString()),
					account
				);
				await tx.wait();
			}
			const _price = Number(collection?.mintPrice) * amountToMint;

			await updateMint(
				collection.dropId,
				amountToMint,
				ethers.utils.parseEther(_price.toString()).toNumber(),
				account
			);
			// toast({ status: "success", title: "NFT Minted!" });
			setSuccess(true);
			setMinting(false);
		} catch (error) {
			setSuccess(false);
			console.error(error);
			toast({ status: "error", title: formatError(error) });
			setMinting(false);
		}
	};

	return (
		<>
			{success ? (
				<Modal visible={visible} onClose={onClose}>
					<Heading fontSize='25px' textAlign='center' fontFamily='Inter'>
						Congratulations! You have successfuly minted your NFT
					</Heading>
					<Flex p='75px' justifyContent='center' alignItems='center'>
						<CheckIcon w={55} h={55} />
					</Flex>
					<Flex gap='15px' mt={5} flexDir='column'>
						<Flex border='1px solid black'>
							<Button
								fontSize={"sm"}
								fontWeight={600}
								fontFamily={"Inter"}
								color={"white"}
								bg={"#000"}
								borderRadius='0px'
								width='100%'
								height={"64px"}
								style={{ marginInlineStart: "unset" }}
								_hover={{
									transform: "translate3d(4px,4px,0px)",
								}}
								as={RouterLink}
								to='/'>
								Go back to Homepage
							</Button>
						</Flex>
						<Flex width={"100%"} alignItems='center' justifyContent={"center"}>
							<Link
								fontWeight={"700"}
								href={`https://testnets.opensea.io/assets/rhapsody?search[stringTraits][0][name]=Collection&search[stringTraits][0][values][0]=${collection?.collectionName}&search[sortAscending]=true&search[sortBy]=PRICE`}
								target='_blank'
								_focus={{ outline: "none !important" }}>
								See my NFT on Opensea
							</Link>
						</Flex>
					</Flex>
				</Modal>
			) : (
				<Modal
					visible={visible}
					secondTitle={minting ? "Minting in progress" : "Checkout"}
					desc={
						minting
							? "This process can take a few minutes. Feel free to leave this page."
							: "You are about to mint an NFT from the collection below"
					}
					onClose={onClose}>
					{minting ? (
						<>
							<div className={styles.stage}>
								<div className={styles.dotTyping}></div>
							</div>
						</>
					) : (
						<>
							<Flex border={"2px solid black"}>
								<Flex width='40%' p={5} borderRight='2px solid black'>
									<Image
										width={"200px"}
										src={getRandomIPFS(
											`ipfs://${collection?.logoImageHash}`
										)}></Image>
								</Flex>
								<Flex width={"60%"} p={3} flexDir='column'>
									<Text
										fontFamily='Inter'
										fontStyle='normal'
										fontWeight='800'
										fontSize='15px'
										paddingBottom={"4px"}>
										{collection?.collectionName}
									</Text>
									<Text
										fontFamily='Inter'
										fontStyle='normal'
										fontWeight='normal'
										fontSize={"8px"}
										paddingBottom={"24px"}>
										By{" "}
										{collection?.artists
											? formatName(collection?.artists[0])
											: "Unknown"}
									</Text>
									<Text
										fontFamily='Inter'
										fontStyle='normal'
										fontWeight='normal'
										fontSize={"12px"}
										paddingBottom={"4px"}>
										Price :{" "}
										<Text
											fontFamily='Inter'
											fontStyle='normal'
											fontWeight='bold'
											display='inline'
											fontSize={"12px"}>
											{price} ETH
										</Text>
									</Text>
									<Text
										fontFamily='Inter'
										fontStyle='normal'
										fontWeight='normal'
										fontSize={"12px"}
										paddingBottom={"24px"}>
										# of item :{" "}
										<Button
											borderRadius='full'
											bg='black'
											width='20px'
											height='20px'
											color='white'
											minWidth='unset'
											p={0}
											m='0 5px'
											onClick={() => setAmountToMint((state) => state - 1)}>
											-
										</Button>{" "}
										{amountToMint}{" "}
										<Button
											borderRadius='full'
											bg='black'
											width='20px'
											height='20px'
											color='white'
											minWidth='unset'
											p={0}
											m='0 5px'
											onClick={() => setAmountToMint((state) => state + 1)}>
											+
										</Button>
									</Text>
								</Flex>
							</Flex>
							<Flex paddingBottom={"5px"} borderBottom='2px solid black' mt={5}>
								<Text
									fontFamily='Inter'
									fontStyle='normal'
									fontWeight='bold'
									fontSize={"15px"}>
									Total
								</Text>
							</Flex>
							<Flex justifyContent={"flex-end"} mt={2}>
								<Image src={ether} width='22px' height='22px' />

								<Text
									fontFamily='Inter'
									fontStyle='normal'
									fontWeight='bold'
									textAlign='right'
									fontSize={"15px"}>
									{price ? (Number(price) * amountToMint).toFixed(2) : 0} ETH
								</Text>
							</Flex>
							<Flex gap='15px' mt={5}>
								<Flex
									justifyContent='center'
									alignItems='center'
									width='50%'
									onClick={onClose}>
									Cancel
								</Flex>
								<Flex border='1px solid black' width='50%'>
									<Button
										fontSize={"sm"}
										fontWeight={600}
										fontFamily={"Inter"}
										color={"white"}
										bg={"#000"}
										borderRadius='0px'
										width='100%'
										height={"64px"}
										style={{ marginInlineStart: "unset" }}
										_hover={{
											transform: "translate3d(4px,4px,0px)",
										}}
										onClick={handleMint}>
										Confirm checkout
									</Button>
								</Flex>
							</Flex>
						</>
					)}
				</Modal>
			)}
		</>
	);
};

export default MintModal;
