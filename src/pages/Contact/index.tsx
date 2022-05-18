import React, { useState } from "react";
import {
	Container,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	VStack,
	Wrap,
	WrapItem,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Textarea,
	useToast,
	FormErrorMessage,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import Header from "components/Header";
import Footer from "components/Footer";

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

			toast({ status: "success", title: "Your demand has been received !" });
			setSaving(false);
		} catch {
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
							<Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
								<WrapItem>
									<Box>
										<Heading>Contact</Heading>
										<Text mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
											Fill up the form below to contact us
										</Text>
										<Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
											<VStack pl={0} spacing={3} alignItems='flex-start'>
												<Button
													size='md'
													height='48px'
													width='200px'
													variant='ghost'
													color='black'
													leftIcon={<MdPhone color='black' size='20px' />}>
													+91-988888888
												</Button>
												<Button
													size='md'
													height='48px'
													width='200px'
													variant='ghost'
													color='black'
													leftIcon={<MdEmail color='black' size='20px' />}>
													hello@abc.com
												</Button>
												<Button
													size='md'
													height='48px'
													width='200px'
													variant='ghost'
													color='black'
													leftIcon={<MdLocationOn color='black' size='20px' />}>
													Karnavati, India
												</Button>
											</VStack>
										</Box>
									</Box>
								</WrapItem>
								<WrapItem>
									<Box bg='white' borderRadius='lg'>
										<Box m={8} color='#0B0E3F'>
											<VStack spacing={5}>
												<FormControl
													id='mail'
													isInvalid={emailError.length > 0}>
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
															emailError.length > 0 || message.length === 0
														}
														onClick={onSave}>
														Send Message
													</Button>
												</FormControl>
											</VStack>
										</Box>
									</Box>
								</WrapItem>
							</Wrap>
						</Box>
					</Box>
				</Flex>
			</Container>
			<Footer />
		</>
	);
};

export default ContactPage;