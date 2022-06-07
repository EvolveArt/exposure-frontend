import {
	Box,
	chakra,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	Input,
	IconButton,
	useColorModeValue,
	Image,
	useToast,
	Flex,
} from "@chakra-ui/react";
// eslint-disable-next-line
import React, { ReactNode, useState } from "react";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={10}
			h={10}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function LargeWithNewsletter() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const toast = useToast();

	const validEmail = (email: string) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

	const validateEmail = () => {
		if (email.length === 0 || validEmail(email)) {
			setEmailError("");
		} else {
			setEmailError("Invalid email address.");
		}
	};

	const onSave = async () => {
		try {
			await axios.post("https://exposure-rest-api.herokuapp.com/contact/save", {
				email: email,
			});

			toast({
				status: "success",
				title: "Email successfuly saved!",
			});
		} catch {
			toast({ status: "error", title: "An error has occured !" });
		}
	};

	return (
		<Box bg='black' color='white'>
			<Container as={Stack} maxW={"90vw"} py={10}>
				<SimpleGrid
					templateColumns={{ sm: "1fr", md: "1fr 1fr 1fr 1fr" }}
					spacing={8}>
					<Stack spacing={6}>
						<Box>
							<Image
								fontFamily={"heading"}
								color={useColorModeValue("gray.800", "white")}
								height='65px'
								src={"/images/white-logo.png"}></Image>
						</Box>
					</Stack>
					<Stack align={"flex-start"}>
						<Text
							fontFamily={"Inter"}
							fontWeight='600'
							fontSize='16px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'
							paddingBottom={"15px"}>
							Navigate
						</Text>
						<Link
							as={ReactRouterLink}
							to='/artists'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'>
							Photographers
						</Link>
						<Link
							as={ReactRouterLink}
							to='/exploreCollection'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'>
							Series
						</Link>
						<Link
							as={ReactRouterLink}
							to='/HelpCenter'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'>
							Help
						</Link>
						<Link
							as={ReactRouterLink}
							to='/contact'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'>
							Contact Us
						</Link>
						<Link
							as={ReactRouterLink}
							to='/search'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'>
							Search
						</Link>
					</Stack>
					<Stack align={"flex-start"} direction={"column"}>
						<Text
							fontFamily={"Inter"}
							fontWeight='600'
							fontSize='16px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'
							paddingBottom={"15px"}>
							Social Media
						</Text>
						<Flex gridGap={"5px"}>
							<SocialButton
								label={"Instagram"}
								href={"https://instagram.com/rhapsodycurated"}>
								<FaInstagram size={25} />
							</SocialButton>
							<SocialButton
								label={"Twitter"}
								href={"https://twitter.com/rhapsodycurated"}>
								<FaTwitter size={25} />
							</SocialButton>

							<SocialButton
								label={"Discord"}
								href={"https://discord.com/invite/gGfeUXCVWD"}>
								<FaDiscord size={25} />
							</SocialButton>
						</Flex>
					</Stack>

					<Stack align={"flex-start"}>
						<Text
							fontFamily={"Inter"}
							fontWeight='600'
							fontSize='16px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'
							paddingBottom={"15px"}>
							Sign Up to our Newsletter
						</Text>
						<Stack
							direction={"row"}
							border={"2px solid #CBCBCB"}
							borderRadius='3px'
							bg='#fff'
							width='350px'>
							<Input
								placeholder={"Email address"}
								height='50px'
								fontFamily='Inter'
								color={"#000"}
								border={"unset"}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={validateEmail}
								_focus={{
									bg: "whiteAlpha.300",
								}}
							/>
							<IconButton
								bg={"#fff"}
								color='#000'
								aria-label='Subscribe'
								icon={<BiMailSend />}
								onClick={onSave}
								height='100%'
							/>
						</Stack>
						{emailError.length > 0 && <Text color='red'>{emailError}</Text>}
					</Stack>
				</SimpleGrid>
				<Flex
					pb={{ base: "70px", sm: "50px", md: "0px" }}
					pt={{ base: "0px", md: "40px" }}>
					<Stack direction='row' pt={"20px"} spacing='16px'>
						<Link
							as={ReactRouterLink}
							to='/artists'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'>
							T&Cs
						</Link>
						<Link
							as={ReactRouterLink}
							to='/privacy'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'>
							Privacy
						</Link>
						<Link
							as={ReactRouterLink}
							to='/cookies'
							fontFamily='Inter'
							fontWeight='600'
							fontSize='14px'
							lineHeight='28px'
							letterSpacing='1px'
							color='#FFFFFF'>
							Cookies
						</Link>
					</Stack>
					<Text
						pt={"20px"}
						fontFamily='Inter'
						fontSize='16px'
						lineHeight='28px'
						color='#FFFFFF'
						position='absolute'
						bottom={"40px"}
						marginLeft='auto'
						marginRight={"auto"}
						left='0'
						right='0'
						width={"fit-content"}
						textAlign='center'>
						© 2022 Rhapsody Curated. All rights reserved
					</Text>
				</Flex>
			</Container>
		</Box>
	);
}
