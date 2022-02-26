import React from "react";
import styles from "./styles.module.scss";
import logo from "assets/imgs/logoWhite.png";
import addIcon from "assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import { Flex, Image, Text } from "@chakra-ui/react";
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
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          top={"114px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          top={"114px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          transform={"rotate(180deg)"}
          bottom={"-6px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          src={addIcon}
          filter="invert(1)"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
        <Image src={logo} height="48px" width={"220px"} />
        <Text color={"white"} fontFamily="Inter" letterSpacing={"1px"}>
          Coming Soon
        </Text>
        <Flex gridGap={"20px"} width="fit-content" paddingTop={"100px"}>
          <Image src={instagram} height="30px" />
          <Image src={twitter} height="30px" margin="auto" />
          <Image src={discord} height="30px" />
        </Flex>
      </Flex>
    </div>
  );
};

export default WaitingPage;
