import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/imgs/logoWhite.png";
import twitter from "../../assets/imgs/twitter.png";
import discord from "../../assets/imgs/discord.png";
import instagram from "../../assets/imgs/instagram.png";
import addIcon from "../../assets/imgs/plus1.png";

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
            height={{ base: "fit-content" }}
            width="100%"
          >
            <Link href="/#">
              <Image src={logo} height="38px" margin="auto"></Image>
            </Link>
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
                href="/exploreCollection"
              >
                Collections
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
                href={"/artists"}
              >
                Artists
              </Link>
              <Link
                color={"#fff"}
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing={"1px"}
                href={"/QA"}
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
            paddingBottom={{ base: "110px", md: "unset" }}
          >
            <Link href={"https://instagram.com/exposure_art_"}>
              <Image src={instagram} height="30px" />
            </Link>
            <Link href={"https://twitter.com/exposure_art_"}>
              <Image src={twitter} height="30px" margin="auto" />
            </Link>
            <Link href={"https://discord.com/invite/gGfeUXCVWD"}>
              <Image src={discord} height="30px" />
            </Link>
          </Flex>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            right="-10px"
          ></Image>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            left="0"
            right="0"
            marginLeft="auto"
            marginRight="auto"
            zIndex={"10"}
          ></Image>
          <Image
            src={addIcon}
            width={"16px"}
            position="absolute"
            bottom={{ base: "40px", md: "-50px" }}
            left="0px"
          ></Image>
        </Box>
      </Flex>
    </div>
  );
};

export default Footer;
