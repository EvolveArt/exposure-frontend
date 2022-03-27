import { Flex, Image, Text, Button } from "@chakra-ui/react";
import Footer from "components/Footer";
import React from "react";
import Header from "../../components/Header/index";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import borderbl from "../../assets/imgs/borderbl.png";
import borderbr from "../../assets/imgs/borderbr.png";
import borderml from "../../assets/imgs/borderml.png";
import bordermr from "../../assets/imgs/bordermr.png";
import bordertl from "../../assets/imgs/bordertl.png";
import bordertr from "../../assets/imgs/bordertr.png";
import styles from "./styles.module.scss";
import arrow from "../../assets/imgs/ArrowRight.png";
import { Link } from "react-router-dom";

const Email = () => {
  return (
    <>
      <Header />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"calc(100vh - 80px)"}
        flexDirection={"column"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"107px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          transform={"rotate(180deg)"}
          bottom={"-14px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
        <Flex flexDir={"column"} maxWidth="548px" margin={"auto"}>
          <Flex
            position={"relative"}
            width="fit-content"
            padding="10px"
            marginLeft={"auto"}
            marginRight="auto"
          >
            <Image src={bordertl} position="absolute" top={"0"} left="0" />
            <Image src={borderbl} position="absolute" bottom={"0"} left="0" />
            <Image src={bordertr} position="absolute" top={"0"} right="0" />
            <Image src={borderbr} position="absolute" bottom={"0"} right="0" />
            <Image src={borderml} position="absolute" bottom={"45%"} left="0" />
            <Image
              src={bordermr}
              position="absolute"
              bottom={"45%"}
              right="0"
            />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="800"
              fontSize={{ base: "30px", md: "40px" }}
              lineHeight="53px"
              color={"#000"}
              textAlign="center"
            >
              Welcome to Exposure!
            </Text>
          </Flex>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="28px"
            textAlign="center"
            letterSpacing="1px"
            color={"#000"}
            padding="20px"
            paddingTop={"80px"}
            paddingBottom="35px"
            width={"100%"}
          >
            Enter your Email to be notified of futur drops on the Exposure
            plateform
          </Text>
          <input
            className={styles.input}
            maxLength={40}
            placeholder="Email Address"
            // onBlur={validateName}
          />
          <Flex
            border={"1px solid #000"}
            width="calc(100% - 40px)"
            margin={"auto"}
          >
            <Button
              fontSize={"sm"}
              fontWeight={600}
              fontFamily={"Inter"}
              color={"white"}
              bg={"#000"}
              borderRadius="0px"
              width={"100%"}
              height={"64px"}
              style={{ marginInlineStart: "unset" }}
              _hover={{
                transform: "translate3d(4px,4px,0px)",
              }}
            >
              Confirm
            </Button>
          </Flex>
          <Link to={"/"}>
            <Flex
              flexDir={"row"}
              width="fit-content"
              alignItems={"center"}
              marginLeft="auto"
              justifyContent="center"
              padding={"20px"}
            >
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                fontSize="16px"
                lineHeight="20px"
                textAlign="center"
              >
                Skip
              </Text>
              <Image src={arrow} width="30px" />
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default Email;
