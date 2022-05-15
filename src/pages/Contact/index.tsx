import React, { useState } from "react";
import {
	Container,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	VStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Textarea,
	useToast,
	FormErrorMessage,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import Header from "components/Header";
import Footer from "components/Footer";
import axios from "axios";

const ContactPage = () => {
	const [mail, setMail] = useState("");
	const [message, setMessage] = useState("");
	const [emailError, setEmailError] = useState("");
	const [saving, setSaving] = useState(false);

	const validEmail = (email: string) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

	const toast = useToast();

	const validateEmail = () => {
		if (mail.length === 0 || validEmail(mail)) {
			setEmailError("");
		} else {
			setEmailError("Invalid email address.");
		}
	};

	const onSave = async () => {
		if (saving) return;

		try {
			setSaving(true);
			const data = {
				mail,
				message,
			};
			const corsHeader = {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers":
					"Origin, X-Requested-With, Content-Type, Accept",
			};
			await axios.post(
				"https://exposure-rest-api.herokuapp.com/contact/email",
				{
					data: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						...corsHeader,
					},
				}
			);
			setSaving(false);
		} catch {
			toast({ status: "error", title: "An error has occured !" });
			setSaving(false);
		}
	};

	return (
		<>
			<Header />
			<Container bg='white' maxW='full' mt={0} centerContent overflow='hidden'>
				<Flex>
					<Box
						bg='white'
						color='black'
						borderRadius='lg'
						m={{ sm: 4, md: 16, lg: 10 }}
						p={{ sm: 5, md: 5, lg: 16 }}>
						<Box p={4}>
							<Heading>Contact</Heading>
							<Text mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
								Fill up the form below to contact us
							</Text>

							<Box bg='white' borderRadius='lg'>
								<Box mt={5} color='#0B0E3F'>
									<VStack spacing={5}>
										<FormControl id='mail' isInvalid={emailError.length > 0}>
											<FormLabel>Mail</FormLabel>
											<InputGroup borderColor='#E0E1E7'>
												<InputLeftElement
													pointerEvents='none'
													children={<MdOutlineEmail color='gray.800' />}
												/>
												<Input
													type='text'
													size='md'
													value={mail}
													onChange={(event) => setMail(event.target.value)}
													onBlur={validateEmail}
												/>
											</InputGroup>
											{emailError.length > 0 && (
												<FormErrorMessage>{emailError}</FormErrorMessage>
											)}
										</FormControl>
										<FormControl id='message'>
											<FormLabel>Message</FormLabel>
											<Textarea
												value={message}
												onChange={(event) => setMessage(event.target.value)}
												borderColor='gray.300'
												_hover={{
													borderRadius: "gray.300",
												}}
												placeholder='message'
											/>
										</FormControl>
										<FormControl float='right'>
											<Button
												fontSize={"16px"}
												lineHeight='20px'
												fontWeight={"700"}
												fontFamily={"Inter"}
												color={"white"}
												bg={"#000"}
												borderRadius='0px'
												width={"100%"}
												height={"54px"}
												style={{ marginInlineStart: "unset" }}
												_hover={{
													transform: "translate3d(4px,4px,0px)",
												}}
												type='submit'
												_focus={{ outline: "none !important" }}
												disabled={
													emailError.length > 0 ||
													message.length === 0 ||
													saving
												}
												onClick={onSave}>
												{saving ? "Sending..." : "Send Message"}
											</Button>
										</FormControl>
									</VStack>
								</Box>
							</Box>
						</Box>
					</Box>
				</Flex>
			</Container>
			<Footer />
		</>
	);
};

export default ContactPage;
