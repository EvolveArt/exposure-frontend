import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
// import logo from "../../assets/imgs/logoWhite.png";
// import twitter from "../../assets/imgs/twitter.png";
// import discord from "../../assets/imgs/discord.png";
// import instagram from "../../assets/imgs/instagram.png";
import { logoWhite, discord, instagram, twitter } from "../../constants/cdn.constants";

const Footer = () => {
	return (
		<div>
			<Flex
				minH={"300px"}
				backgroundColor='#000'
				marginTop={"100px"}
				flexDirection='column'>
				<Box
					position={"relative"}
					width={{ base: "90%", lg: "80%" }}
					marginLeft='auto'
					marginRight={"auto"}>
					<Flex
						flexDirection={{ base: "column", md: "row" }}
						marginRight='auto'
						marginLeft='auto'
						paddingTop='45px'
						position={"relative"}
						height={{ base: "fit-content" }}
						width='100%'>
						<Link href='/#' _focus={{ outline: "none !important" }}>
							<Image src={logoWhite} height='38px' margin='auto'></Image>
						</Link>
						<Flex
							paddingTop={{ base: "32px", md: "unset" }}
							marginLeft={{ base: "unset", md: "auto" }}
							gridGap={{ base: "24px", md: "15px" }}
							marginTop={"auto"}
							marginBottom='auto'
							flexDirection={{ base: "column" }}>
							<Flex
								paddingTop={{ base: "32px", md: "unset" }}
								marginLeft={{ base: "unset", md: "auto" }}
								gridGap={{ base: "24px", md: "32px" }}
								marginTop={"auto"}
								marginBottom='auto'
								flexDirection={{ base: "column", md: "row" }}>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									_focus={{ outline: "none !important" }}>
									Curated drop
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href='/exploreCollection'
									_focus={{ outline: "none !important" }}>
									Collections
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href={"/artists"}
									_focus={{ outline: "none !important" }}>
									Artists
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href={"/HelpCenter"}
									_focus={{ outline: "none !important" }}>
									Help Center
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href={"/contact"}
									_focus={{ outline: "none !important" }}>
									Contact us
								</Link>
							</Flex>
							<Flex
								paddingTop={{ base: "0px", md: "unset" }}
								marginLeft={{ base: "unset", md: "auto" }}
								gridGap={{ base: "24px", md: "32px" }}
								marginTop={"auto"}
								marginBottom='auto'
								flexDirection={{ base: "column", md: "row" }}>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									_focus={{ outline: "none !important" }}>
									Terms & Conditions
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href='/exploreCollection'
									_focus={{ outline: "none !important" }}>
									Privacy Policy
								</Link>
								<Link
									color={"#fff"}
									fontWeight='600'
									fontSize='14px'
									lineHeight='28px'
									letterSpacing={"1px"}
									href={"/artists"}
									_focus={{ outline: "none !important" }}>
									Cookie Policy
								</Link>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						margin='auto'
						gridGap={"20px"}
						width='fit-content'
						paddingTop={"90px"}
						paddingBottom={{ base: "110px", md: "unset" }}>
						<Link
							href={"https://instagram.com/rhapsodycurated"}
							target='_blank'
							_focus={{ outline: "none !important" }}>
							<Image src={instagram} height='30px' />
						</Link>
						<Link
							href={"https://twitter.com/rhapsodycurated"}
							target='_blank'
							_focus={{ outline: "none !important" }}>
							<Image src={twitter} height='30px' margin='auto' />
						</Link>
						<Link
							href={"https://discord.com/invite/gGfeUXCVWD"}
							target='_blank'
							_focus={{ outline: "none !important" }}>
							<Image src={discord} height='30px' />
						</Link>
					</Flex>
				</Box>
			</Flex>
		</div>
	);
};

export default Footer;
