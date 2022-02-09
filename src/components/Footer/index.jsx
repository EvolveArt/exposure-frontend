import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/imgs/logoWhite.png";
import twitter from "../../assets/imgs/twitter.png";
import discord from "../../assets/imgs/discord.png";
import instagram from "../../assets/imgs/instagram.png";
import addIcon from "../../assets/imgs/plus.png";

const Footer = () => {
  return (
    <div>
      <Flex
        minH={"300px"}
        backgroundColor="#000"
        marginTop={"100px"}
        flexDirection="column"
      >
        <Box
          position={"relative"}
          width={{ base: "90%", lg: "80%" }}
          marginLeft="auto"
          marginRight={"auto"}
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            marginRight="auto"
            marginLeft="auto"
            paddingTop="45px"
            position={"relative"}
            height={{ base: "fit-content", md: "103px" }}
            width="100%"
          >
            <Image src={logo} width="220px" height="57px"></Image>
            <Flex
              paddingTop={{ base: "32px", md: "unset" }}
              marginLeft={{ base: "unset", md: "auto" }}
              gridGap={{ base: "24px", md: "32px" }}
              marginTop={"auto"}
              marginBottom="auto"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Curated drop
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Collections
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Artists
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Q&A
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
              >
                Contact us
              </Link>
            </Flex>
          </Flex>
          <Flex
            margin="auto"
            gridGap={"20px"}
            width="fit-content"
            paddingTop={"90px"}
            paddingLeft={"25px"}
            paddingBottom={{ base: "110px", md: "unset" }}
          >
            <Image src={instagram} height="30px"></Image>
            <Image src={twitter} height="23px" margin="auto"></Image>
            <Image src={discord} height="30px"></Image>
          </Flex>
          <Image
            src={addIcon}
            opacity="0.8"
            width={"27px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            right="-10px"
            filter={"invert(1)"}
          ></Image>
          <Image
            src={addIcon}
            opacity="0.8"
            width={"27px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            right="50%"
            left="50%"
            zIndex={"10"}
            filter={"invert(1)"}
          ></Image>
          <Image
            src={addIcon}
            width={"27px"}
            opacity="0.8"
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            left="0px"
            filter={"invert(1)"}
          ></Image>
        </Box>
      </Flex>
    </div>
  );
};

export default Footer;
