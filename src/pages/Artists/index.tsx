import { Flex, Image, Text } from "@chakra-ui/react";
import { useApi } from "api";
import ArtistCard from "components/ArtistCard";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import addIcon from "../../assets/imgs/plus.png";
import ticon from "../../assets/imgs/t.png";
import artistWrapper from "../../assets/imgs/artistsWrapper.png";
import Footer from "components/Footer";
// eslint-disable-next-line
import { Artist } from "interfaces";

const Artists = () => {
  const [artists, setArtists] = useState([]);

  const { getAllArtists } = useApi();

  useEffect(() => {
    const updateArtists = async () => {
      const _artists = await getAllArtists();
      setArtists(_artists.data);
      // console.log(_artists);
    };
    updateArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Image
          src={addIcon}
          filter="brightness(0)"
          width="16px"
          position="absolute"
          top={"100px"}
          left="0"
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width="16px"
          position="absolute"
          top={"100px"}
          right={{ base: "0", md: "-0px" }}
        ></Image>
        <Image
          src={addIcon}
          filter="brightness(0)"
          width="16px"
          position="absolute"
          bottom={"-20px"}
          right="0"
        ></Image>
        <Image
          display={{ base: "unset", md: "none" }}
          src={ticon}
          filter="brightness(0)"
          width="16px"
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
          width="16px"
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
          width="16px"
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
          width="16px"
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
          width="16px"
          position="absolute"
          bottom={"-20px"}
          left="0"
        ></Image>
        <Flex
          position="relative"
          marginRight={"auto"}
          width={{ base: "88vw", lg: "80vw" }}
          margin="auto"
          marginTop={"100px"}
        >
          <Image
            src={artistWrapper}
            position="absolute"
            transform="translate3d(-2px,3px,0px)"
            zIndex={"-1"}
            height="50px"
          />
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="bold"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"32px"}
            marginLeft="10px"
          >
            Artists
          </Text>
        </Flex>
        <Flex
          width={"100%"}
          flexWrap="wrap"
          justifyContent={"center"}
          alignItems="center"
          gridGap={"36px 0px"}
        >
          {artists.map((artist: Artist) => ArtistCard(artist))}
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default Artists;
