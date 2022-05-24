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
			w={8}
			h={8}
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

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={"500"} fontSize={"lg"} mb={2}>
			{children}
		</Text>
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
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid
					templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
					spacing={8}>
					<Stack spacing={6}>
						<Box>
							<Image
								fontFamily={"heading"}
								color={useColorModeValue("gray.800", "white")}
								height='45px'
								src={"/images/white-logo.png"}></Image>
						</Box>
						<Text fontSize={"sm"}>
							© 2022 Rhapsody Curated. All rights reserved
						</Text>
						<Stack direction={"row"} spacing={6}>
							<SocialButton
								label={"Twitter"}
								href={"https://twitter.com/rhapsodycurated"}>
								<FaTwitter />
							</SocialButton>

							<SocialButton
								label={"Instagram"}
								href={"https://instagram.com/rhapsodycurated"}>
								<FaInstagram />
							</SocialButton>
							<SocialButton
								label={"Discord"}
								href={"https://discord.com/invite/gGfeUXCVWD"}>
								<FaDiscord />
							</SocialButton>
						</Stack>
					</Stack>

					<Stack align={"flex-start"}>
						<ListHeader>Navigate</ListHeader>
						<Link as={ReactRouterLink} to='/artists'>
							Photographers
						</Link>
						<Link as={ReactRouterLink} to='/exploreCollection'>
							Series
						</Link>
						<Link as={ReactRouterLink} to='/HelpCenter'>
							Help
						</Link>
						<Link as={ReactRouterLink} to='/contact'>
							Contact Us
						</Link>
						<Link as={ReactRouterLink} to='/search'>
							Search
						</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Sign Up to our Newsletter</ListHeader>
						<Stack direction={"row"}>
							<Input
								placeholder={"Your email address"}
								bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
								border={0}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={validateEmail}
								_focus={{
									bg: "whiteAlpha.300",
								}}
							/>
							<IconButton
								bg='black'
								color={useColorModeValue("white", "gray.800")}
								aria-label='Subscribe'
								icon={<BiMailSend />}
								onClick={onSave}
							/>
						</Stack>
						{emailError.length > 0 && <Text color='red'>{emailError}</Text>}
					</Stack>
					<Stack direction='row'>
						<Link as={ReactRouterLink} to='/artists'>
							T&Cs
						</Link>
						<Link as={ReactRouterLink} to='/privacy'>
							Privacy
						</Link>
						<Link as={ReactRouterLink} to='/cookies'>
							Cookies
						</Link>
					</Stack>
				</SimpleGrid>
			</Container>
		</Box>
	);
}
