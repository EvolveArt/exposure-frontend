import { Flex, Image } from "@chakra-ui/react";
import Header from "components/Header";
import React from "react";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";

const Artists = () => {
  return (
    <div>
      <Header />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
        flexDirection={"column"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        {" "}
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"114px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"114px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          opacity="0.1"
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
          opacity="0.1"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          right="50%"
          left="50%"
        ></Image>
        <Image
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
      </Flex>
    </div>
  );
};

export default Artists;
