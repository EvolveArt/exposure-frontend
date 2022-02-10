import { Button, Flex, Image, Text, Link } from "@chakra-ui/react";
import React from "react";

import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import mintType from "../../assets/imgs/mintType.png";
import agenda from "../../assets/imgs/agenda.png";
import available from "../../assets/imgs/available.png";
import ether from "../../assets/imgs/ether.png";
import Header from "../../components/Header";

const collection = {
  title: "Touching Strangers",
  image: "/images/strangers.png",
  author: "Richard Renaldi",
  description:
    "Desmemoria is a photographic, anthropological and social account of the azucareros community in Cuba – workers in the sugar industry and revolutionaries of the first hour. Pierre-Elie de Pibrac spent nearly a year immersed in various Cuban families in this community... See more",
  mintType: "Random mint",
  mintPrice: "0.9",
  mintAvailable: "75",
  releaseDate: "18/02/2022",
  releaseHour: "16:00",
  citation:
    "“Sugar is our history, without it, it is impossible to understand the essence and soul of Cuba”.",
};

const TopPage = (collection: {
  title: string;
  image: string;
  author: string;
  description: string;
  mintType: string;
  mintPrice: string;
  mintAvailable: string;
  releaseDate: string;
  releaseHour: string;
  citation: string;
}) => {
  return (
    <>
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={"center"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
        position="relative"
      >
        <Flex
          width={{
            base: "100%",
            md: "calc(50% - 12px)",
            lg: "calc(40% - 12px)",
          }}
          height={{ base: "fit-content", md: "80vh" }}
          paddingTop={{ base: "50px", md: "unset" }}
          paddingBottom={{ base: "50px", md: "unset" }}
          justifyContent={{ base: "center", md: "end" }}
          alignItems="center"
          position="relative"
        >
          <Image src={collection.image}></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            left="0"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            right={{ base: "0", md: "-35px" }}
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            right="0"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"14px"}
            right="50%"
            left="50%"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            left="0"
          ></Image>
        </Flex>
        <Flex
          flexDirection={"column"}
          width={{
            base: "100%",
            md: "calc(50% - 12px)",
            lg: "calc(60% - 12px)",
          }}
          height={{ base: "fit-content", md: "80vh" }}
          justifyContent="center"
          position="relative"
          paddingBottom={{ base: "50px", md: "unset" }}
          paddingTop="50px"
        >
          <Image
            display={{ base: "none", md: "unset" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"0"}
            right="0px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            left="0px"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"0"}
            right="0px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            transform={"rotate(180deg)"}
            bottom={"14px"}
            right="50%"
            left="50%"
          ></Image>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="800"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"4px"}
          >
            {collection.title}
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={"16px"}
            lineHeight="28px"
            paddingBottom={"24px"}
          >
            By {collection.author}
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={"16px"}
            lineHeight="28px"
            paddingBottom={"26px"}
          >
            {collection.description}
          </Text>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={mintType} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              {collection.mintType}
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={ether} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              Mint price -{" "}
              <span style={{ fontWeight: "800" }}>
                {collection.mintPrice} ETH
              </span>
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={available} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"17px"}
            >
              Mint available -{" "}
              <span style={{ fontWeight: "800" }}>
                0 / {collection.mintAvailable}
              </span>
            </Text>
          </Flex>
          <Flex flexDirection={"row"} gridGap="9px">
            <Image src={agenda} width="29px" height="29px" />
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="28px"
              paddingBottom={"35px"}
            >
              Release date -{" "}
              <span style={{ fontWeight: "800" }}>
                {collection.releaseDate}
              </span>{" "}
              at{" "}
              <span style={{ fontWeight: "800" }}>
                {collection.releaseHour} GMT
              </span>
            </Text>
          </Flex>
          <Flex border={"1px solid #000"} width="100%">
            <Button
              fontSize={"16px"}
              lineHeight="20px"
              fontWeight={"700"}
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
              Mint
            </Button>
          </Flex>
          <Link fontWeight={"700"} margin="auto" paddingTop={"29px"}>
            See collection on Opensea
          </Link>
        </Flex>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          opacity="0.1"
          width={"27px"}
          position="absolute"
          top={"83px"}
          right={"50%"}
          left="50%"
        ></Image>
      </Flex>
    </>
  );
};

const CollectionPage = () => {
  return (
    <div>
      <Header />
      {TopPage(collection)}
    </div>
  );
};

export default CollectionPage;
