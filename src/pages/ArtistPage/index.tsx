import React, { useEffect, useState } from "react";
import { Flex, Image, Link, Text } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
// import ticon from "../../assets/imgs/t.png";
// import twitter from "../../assets/imgs/twitter.png";
// import instagram from "../../assets/imgs/instagram.png";
import { useApi } from "api";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
// eslint-disable-next-line
import { Artist, Collection } from "interfaces";
import { formatName } from "utils";
import { instagram, twitter, getCDNLink } from "../../constants/cdn.constants";
import NftItem from "components/NFTitem";
// import LicensesModal from "components/LicensesModal";

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
          justifyContent={{ base: "center", md: "center" }}
          alignItems="center"
          position="relative"
          flexDir={"column"}
        >
          <Image
            src={getCDNLink(artist?.imageHash)}
            width={{ base: "90%", sm: "70%", md: "100%" }}
            boxShadow="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))"
          />
          <Flex
            justifyContent="center"
            alignItems="flex-start"
            mt={5}
            gap="20px"
            flexDir="column"
            width={{ base: "90%", sm: "70%", md: "100%" }}
          >
            <div>
              <Link
                href={`https://instagram.com/${artist.instagram}/`}
                target="_blank"
                _focus={{ outline: "none" }}
              >
                <Flex
                  gap={5}
                  fontFamily="Inter"
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="28px"
                  letterSpacing="1px"
                  color="#3E3E3E"
                >
                  <Image src={instagram} filter="invert(1)" height={"27px"} />
                  {artist.instagram}
                </Flex>
              </Link>
            </div>
            <div>
              <Link
                href={`https://twitter.com/${artist.twitter}/`}
                target="_blank"
                _focus={{ outline: "none" }}
              >
                <Flex
                  gap={5}
                  fontFamily="Inter"
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="28px"
                  letterSpacing="1px"
                  color="#3E3E3E"
                >
                  <Image src={twitter} filter="invert(1)" height={"27px"} />
                  {artist.twitter}
                </Flex>
              </Link>
            </div>
          </Flex>
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
          paddingTop={{ base: "10px", md: "50px" }}
        >
          <Text
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="800"
            fontSize="30px"
            lineHeight="56px"
            paddingBottom={"4px"}
            paddingTop={{ base: "50px", md: "65px" }}
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
      </Flex>
    </>
  );
};

const ArtistPage = () => {
  const { getArtistInfo, getAllCollections } = useApi();
  const [artist, setArtist] = useState<Artist>({} as Artist);
  const [collections, setCollections] = useState<Collection[]>(
    [] as Collection[]
  );

  const { address }: any = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      const _artist = await getArtistInfo(address);
      setArtist(_artist.data);

      const _collections = await getAllCollections(true, [_artist.data._id]);
      setCollections(_collections.data);
    };

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
        <Text
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight="28px"
          letterSpacing="1px"
        >
          Series
        </Text>
        <Flex flexWrap={"wrap"} width="100%">
          {collections?.map((collection: Collection) => {
            return NftItem(collection);
          })}
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default ArtistPage;
