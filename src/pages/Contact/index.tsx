import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  useToast,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import Header from "components/Header";
import Footer from "components/Footer";
import axios from "axios";
import arrowButton from "../../assets/imgs/ArrowButton.png";
import ScrollToTop from "react-scroll-to-top";

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
          data: data,
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
      <ScrollToTop
        smooth
        color="#000"
        component={<Image src={arrowButton} />}
        style={{ background: "unset" }}
      />
      <Container bg="white" maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="white"
            color="black"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Text
                textAlign="center"
                fontFamily="Inter"
                fontWeight="700"
                fontSize="30px"
                lineHeight="40px"
                color="#000000"
              >
                Contact Us
              </Text>
              <Text
                mt={{ sm: 3, md: 3, lg: 5 }}
                fontFamily="Inter"
                fontWeight="600"
                fontSize="16px"
                lineHeight="28px"
                letterSpacing="1px"
                color="#000000"
                textAlign="center"
              >
                Don’t hesitate to reach out using the contact form below.{"\n"}
                <br />
                We’ll get back to you as soon as possible.
              </Text>

              <Box bg="white" borderRadius="0">
                <Box mt={5} color="#0B0E3F">
                  <VStack spacing={5}>
                    <FormControl id="mail" isInvalid={emailError.length > 0}>
                      <FormLabel
                        style={{
                          fontFamily: "Inter",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "19px",
                          color: "#000000",
                        }}
                      >
                        Your email address*
                      </FormLabel>
                      <InputGroup>
                        {/* <InputLeftElement
													pointerEvents='none'
													children={<MdOutlineEmail color='gray.800' />}
												/> */}
                        <Input
                          borderRadius="3px"
                          border="2px solid #CBCBCB"
                          height={"60px"}
                          type="text"
                          size="md"
                          value={mail}
                          onChange={(event) => setMail(event.target.value)}
                          onBlur={validateEmail}
                          placeholder="Enter your email"
                          _focus={{ outline: "none !important" }}
                        />
                      </InputGroup>
                      {emailError.length > 0 && (
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl id="message">
                      <FormLabel
                        style={{
                          fontFamily: "Inter",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "19px",
                          color: "#000000",
                        }}
                      >
                        Your message*
                      </FormLabel>
                      <Textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        borderRadius="3px"
                        border="2px solid #CBCBCB"
                        placeholder="Type here"
                        height={"162px"}
                        _focus={{ outline: "none !important" }}
                      />
                    </FormControl>
                    <FormControl float="right">
                      <Flex border={"1px solid #000"} width="100%" mt={2}>
                        <Button
                          fontSize={"16px"}
                          lineHeight="20px"
                          fontWeight={"700"}
                          fontFamily={"Inter"}
                          color={"white"}
                          bg={"#000 !important"}
                          opacity={"1 !important"}
                          borderRadius="0px"
                          width={"100%"}
                          height={"60px"}
                          style={{ marginInlineStart: "unset" }}
                          _hover={{
                            transform: "translate3d(4px,4px,0px)",
                          }}
                          type="submit"
                          _focus={{ outline: "none !important" }}
                          disabled={
                            emailError.length > 0 ||
                            message.length === 0 ||
                            saving
                          }
                          onClick={onSave}
                        >
                          {saving ? "Sending..." : "Send message"}
                        </Button>
                      </Flex>
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
