import React from "react";
import styles from "./styles.module.scss";
import logo from "assets/imgs/logoWhite.png";
import addIcon from "assets/imgs/plus1.png";
import { Flex, Image, Text, Link, Box } from "@chakra-ui/react";
import twitter from "../../assets/imgs/twitter.png";
import discord from "../../assets/imgs/discord.png";
import instagram from "../../assets/imgs/instagram.png";

const WaitingPage = () => {
  return (
    <div className={styles.container}>
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
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={addIcon}
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          width={"16px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={addIcon}
          width={"16px"}
          position="absolute"
          top={"100px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
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
          src={addIcon}
          width={"16px"}
          position="absolute"
          transform={"rotate(180deg)"}
          bottom={"-20px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
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
          width={"16px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
        <Box paddingTop={"60px"}>
          <Image
            src={logo}
            height={{ base: "60px", md: "106px" }}
            width={{ base: "240px", md: "492px" }}
            margin="auto"
            marginTop={{ base: "50px", md: "unset" }}
          />
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            fontSize="20px"
            lineHeight="35px"
            color={"white"}
            textAlign="center"
            paddingTop={"16px"}
          >
            A curated photography platform
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="28px"
            textAlign="center"
            letterSpacing="1px"
            paddingTop={"100px"}
            paddingBottom="16px"
            color={"#fff"}
          >
            Coming Soon
          </Text>
          <Flex gridGap={"20px"} width="fit-content" margin="auto">
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
        </Box>
      </Flex>
    </div>
  );
};

export default WaitingPage;
