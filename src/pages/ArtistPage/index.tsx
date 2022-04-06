import React, { useEffect, useState } from "react";
import { Flex, Image, Link, Text } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import twitter from "../../assets/imgs/twitter.png";
import instagram from "../../assets/imgs/instagram.png";
import { useApi } from "api";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
// eslint-disable-next-line
import { Artist } from "interfaces";
import { formatName, getRandomIPFS } from "utils";

const TopPage = (artist: Artist) => {
  return (
    <>
      <Flex padding={"30px"} display={{ base: "none", md: "unset" }} />
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
          justifyContent={{ base: "center", md: "center" }}
          alignItems="center"
          position="relative"
          flexDir={"column"}
        >
          <Image
            src={getRandomIPFS(`ipfs://${artist?.imageHash}`)}
            width={{ base: "90%", sm: "80%", md: "70%" }}
          ></Image>
          <Link
            href={`https://instagram.com/${artist.instagram}/`}
            target="_blank"
            _focus={{ outline: "none" }}
          >
            <Flex gridGap={"10px"} paddingBottom="20px" paddingTop={"30px"}>
              <Image src={instagram} filter="invert(1)" height={"27px"} />
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing="1px"
              >
                {artist.instagram}
              </Text>
            </Flex>
          </Link>
          <Link
            href={`https://twitter.com/${artist.twitter}/`}
            target="_blank"
            _focus={{ outline: "none" }}
          >
            <Flex gridGap={"10px"}>
              <Image src={twitter} filter="invert(1)" height={"27px"} />
              <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="600"
                fontSize="14px"
                lineHeight="28px"
                letterSpacing="1px"
              >
                {artist.twitter}
              </Text>
            </Flex>
          </Link>
          <Image
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            top={"0"}
            left="-7px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            top={"0"}
            right={{ base: "-7px" }}
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            bottom={"0px"}
            right="-7px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            top={"7px"}
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
            bottom={"0"}
            left="-7px"
            display={{ base: "unset", md: "none" }}
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
          justifyContent="start"
          position="relative"
          paddingBottom={{ base: "50px", md: "unset" }}
          paddingTop="50px"
        >
          <Image
            display={{ base: "none", md: "unset" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            top={"0"}
            right="-7px"
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            bottom={"0"}
            left="-7px"
          ></Image>
          <Image
            src={addIcon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            bottom={{ base: "0", md: "-65px" }}
            right="-7px"
            display={{ base: "unset", md: "none" }}
          ></Image>
          <Image
            display={{ base: "unset", md: "none" }}
            src={ticon}
            filter="brightness(0)"
            width={"16px"}
            position="absolute"
            transform={"rotate(180deg)"}
            bottom={"7px"}
            left="0"
            right="0"
            marginLeft="auto"
            marginRight="auto"
          ></Image>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="800"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"4px"}
            paddingTop={{ base: "unset", md: "100px" }}
          >
            {formatName(artist)}
          </Text>
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={"16px"}
            lineHeight="28px"
          >
            {artist.description}
          </Text>
        </Flex>
        <Image
          display={{ base: "none", md: "unset" }}
          src={addIcon}
          filter="brightness(0)"
          width={"16px"}
          position="absolute"
          top={"83px"}
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
        ></Image>
      </Flex>
    </>
  );
};

const ArtistPage = () => {
  const { getArtistInfo } = useApi();
  const [artist, setArtist] = useState<Artist>({} as Artist);

  const { address }: any = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      const _artist = await getArtistInfo(address);
      setArtist(_artist.data);
    };
    console.log(address);

    if (ethers.utils.isAddress(address)) fetchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div>
      <Header />
      {TopPage(artist)}
      <Flex
        width={{ base: "90%", lg: "80%" }}
        flexDirection={"column"}
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
          bottom={"-20px"}
          right="-7px"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={addIcon}
          filter="brightness(0)"
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
          left="-7px"
        ></Image>
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight="28px"
          letterSpacing="1px"
        >
          Works
        </Text>
        <Flex flexWrap={"wrap"} width="100%"></Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default ArtistPage;
